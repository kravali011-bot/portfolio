#!/usr/bin/env python3
"""
Build the hero assets from the raw intro video (and optional photo).

    python3 scripts/build-hero-assets.py [--src source/intro.mp4] [--photo source/photo.jpeg]
                                         [--crop W:H:X:Y] [--seconds 10] [--fade 0.5]

Outputs
    public/hero/hero.mp4      H.264 yuv420p CRF24 + AAC 96k, +faststart
    public/hero/hero.webm     VP9 CRF36 + Opus 80k
    public/portrait-bust.webp 480x600 head-to-shirt still
    public/og.jpg             1200x630 social card

Seamless loop
    Take the first N seconds [0, L). The output is src[F, L) where the last F seconds are
    cross-faded into src[0, F). When playback wraps, the frame after the final one is
    src[F] - exactly where the fade landed - so there is no jump. Audio uses the same
    equal-gain cross-fade, sample accurate, in numpy. Nothing is stretched or retimed,
    so lips stay in sync.

Requires ffmpeg/ffprobe on PATH and numpy.
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
OUT_W = 768


def run(cmd, **kw):
    print("  $", " ".join(cmd[:6]), "…" if len(cmd) > 6 else "")
    return subprocess.run(cmd, check=True, **kw)


def probe(path):
    out = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate",
        "-of", "json", path,
    ])
    streams = json.loads(out)["streams"]
    v = next(s for s in streams if s["codec_type"] == "video")
    num, den = (int(x) for x in v["r_frame_rate"].split("/"))
    return v["width"], v["height"], num / den, any(s["codec_type"] == "audio" for s in streams)


def detect_person(path, w, h, seconds):
    """Union bounding box of non-background pixels over a few sampled frames."""
    sw, sh = w // 4, h // 4
    times = np.linspace(0.3, seconds - 0.3, 8)
    mask = np.zeros((sh, sw), bool)
    for t in times:
        raw = subprocess.check_output([
            "ffmpeg", "-v", "error", "-ss", f"{t:.2f}", "-i", path, "-frames:v", "1",
            "-vf", f"scale={sw}:{sh}", "-f", "rawvideo", "-pix_fmt", "gray", "-",
        ])
        frame = np.frombuffer(raw, np.uint8).reshape(sh, sw)
        bg = np.median(frame[:, : sw // 8])  # left strip is backdrop
        mask |= np.abs(frame.astype(int) - bg) > 28
    # ignore isolated noise: keep columns/rows with a meaningful share of foreground
    cols = np.where(mask.sum(0) > sh * 0.02)[0]
    rows = np.where(mask.sum(1) > sw * 0.01)[0]
    if not len(cols) or not len(rows):
        sys.exit("Could not detect the person - pass --crop W:H:X:Y")
    x0, x1, y0, y1 = cols[0] * 4, cols[-1] * 4, rows[0] * 4, rows[-1] * 4
    print(f"  person bbox x={x0}..{x1} y={y0}..{y1}")
    return x0, x1, y0, y1


def crop_for(bbox, w, h):
    """4:5 crop (768x960 output), centred on the person, head to toe."""
    x0, x1, y0, y1 = bbox
    ch = min(h, int((y1 - y0) * 1.06) // 2 * 2)
    cw = int(ch * 0.8) // 2 * 2
    cx = (x0 + x1) // 2
    cy = (y0 + y1) // 2
    x = max(0, min(w - cw, cx - cw // 2))
    y = max(0, min(h - ch, cy - ch // 2))
    return cw, ch, x, y


def build_audio(src, seconds, fade, tmp):
    raw = subprocess.check_output([
        "ffmpeg", "-v", "error", "-i", src, "-t", f"{seconds}", "-vn",
        "-f", "f32le", "-acodec", "pcm_f32le", "-ac", "2", "-ar", str(SR), "-",
    ])
    a = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
    n_total = int(round(seconds * SR))
    if len(a) < n_total:
        a = np.vstack([a, np.zeros((n_total - len(a), 2), np.float32)])
    a = a[:n_total]
    n = int(round(fade * SR))
    head, body = a[:n], a[n:]
    # equal-power cross-fade: tail of body fades out while the head fades in
    t = np.linspace(0, 1, n, endpoint=False, dtype=np.float32)[:, None]
    out = body.copy()
    out[-n:] = body[-n:] * np.cos(t * np.pi / 2) + head * np.sin(t * np.pi / 2)
    wav = os.path.join(tmp, "loop.wav")
    pcm = np.clip(out, -1, 1)
    run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-",
         "-c:a", "pcm_s16le", wav], input=pcm.tobytes())
    return wav, len(out) / SR


def build_video(src, crop, seconds, fade, fps, tmp, whiten):
    cw, ch, x, y = crop
    look = (f"crop={cw}:{ch}:{x}:{y},scale={OUT_W}:-2:flags=lanczos,"
            f"colorlevels=rimax={whiten}:gimax={whiten}:bimax={whiten},format=yuv420p,"
            # snap the last 1-2 code values of near-white to true (limited-range) white
            "lutyuv=y='if(gte(val\\,229)\\,235\\,val)'")
    body_len = seconds - fade
    fc = (
        f"[0:v]trim=0:{seconds},setpts=PTS-STARTPTS,{look},split=2[a][b];"
        f"[a]trim={fade}:{seconds},setpts=PTS-STARTPTS,fps={fps}[body];"
        f"[b]trim=0:{fade},setpts=PTS-STARTPTS,fps={fps}[head];"
        f"[body][head]xfade=transition=fade:duration={fade}:offset={body_len - fade}[v]"
    )
    out = os.path.join(tmp, "loop.mkv")
    run(["ffmpeg", "-v", "error", "-y", "-i", src, "-filter_complex", fc, "-map", "[v]",
         "-c:v", "ffv1", out])
    return out


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--src", default=os.path.join(ROOT, "source/intro.mp4"))
    p.add_argument("--photo", default=os.path.join(ROOT, "source/photo.jpeg"))
    p.add_argument("--crop", help="W:H:X:Y crop in source pixels (skips detection)")
    p.add_argument("--seconds", type=float, default=10.0)
    p.add_argument("--fade", type=float, default=0.5)
    p.add_argument("--whiten", type=float, default=0.93,
                   help="colorlevels max; lower pushes more of the backdrop to pure white "
                        "(0.98 suits a near-white wall; this source's backdrop sits at ~240-250)")
    args = p.parse_args()

    w, h, fps, has_audio = probe(args.src)
    seconds = args.seconds
    print(f"source {w}x{h} @ {fps:g}fps, audio={has_audio}")

    if args.crop:
        crop = tuple(int(v) for v in args.crop.split(":"))
    else:
        crop = crop_for(detect_person(args.src, w, h, seconds), w, h)
    print(f"crop={crop[0]}:{crop[1]}:{crop[2]}:{crop[3]}")

    hero = os.path.join(ROOT, "public/hero")
    os.makedirs(hero, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        print("video loop…")
        vid = build_video(args.src, crop, seconds, args.fade, fps, tmp, args.whiten)
        inputs = ["-i", vid]
        amap = []
        if has_audio:
            print("audio loop…")
            wav, dur = build_audio(args.src, seconds, args.fade, tmp)
            print(f"  loop length {dur:.3f}s")
            inputs += ["-i", wav]
            amap = ["-map", "1:a"]

        print("hero.mp4…")
        run(["ffmpeg", "-v", "error", "-y", *inputs, "-map", "0:v", *amap,
             "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-shortest",
             os.path.join(hero, "hero.mp4")])
        print("hero.webm…")
        run(["ffmpeg", "-v", "error", "-y", *inputs, "-map", "0:v", *amap,
             "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p",
             "-c:a", "libopus", "-b:a", "80k", "-shortest",
             os.path.join(hero, "hero.webm")])

    print("portrait-bust.webp…")
    if args.photo and os.path.exists(args.photo):
        # head-to-shirt crop of the supplied photo (4:5)
        pw, ph, _, _ = probe(args.photo)
        cw = int(min(pw * 0.74, ph * 0.84 * 0.8))
        bust_in, ss = args.photo, []
        vf = f"crop={cw}:{int(cw / 0.8)}:{int(pw * 0.1)}:{int(ph * 0.11)}"
    else:
        cw, ch, x, y = crop
        bw = int(cw * 0.5)
        bust_in, ss = args.src, ["-ss", "2"]
        vf = f"crop={bw}:{int(bw * 1.25)}:{x + (cw - bw) // 2}:{y}"
    with tempfile.TemporaryDirectory() as tmp:
        png = os.path.join(tmp, "bust.png")
        run(["ffmpeg", "-v", "error", "-y", *ss, "-i", bust_in,
             "-vf", vf + ",scale=480:600:flags=lanczos", "-frames:v", "1", png])
        # this ffmpeg build may lack libwebp, so encode with cwebp
        run(["cwebp", "-quiet", "-q", "82", png, "-o",
             os.path.join(ROOT, "public/portrait-bust.webp")])

    print("og.jpg…")
    cw, ch, x, y = crop
    font = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    draw = ""
    filters = subprocess.run(["ffmpeg", "-hide_banner", "-filters"], capture_output=True,
                             text=True).stdout
    if os.path.exists(font) and " drawtext " in filters:
        draw = (f",drawtext=fontfile='{font}':text='Ravali Kethiri':fontcolor=0x0d0d0d:"
                f"fontsize=84:x=80:y=230,drawtext=fontfile='{font}':"
                f"text='Senior Full Stack Java Developer':fontcolor=0x77756f:fontsize=34:x=84:y=340")
    # white card so the video's white backdrop disappears
    fc = (f"color=c=white:s=1200x630[bg];"
          f"[0:v]crop={cw}:{ch}:{x}:{y},scale=-2:600,"
          f"colorlevels=rimax={args.whiten}:gimax={args.whiten}:bimax={args.whiten}[p];"
          f"[bg][p]overlay=x=W-w-60:y=30:shortest=1{draw}[o]")
    run(["ffmpeg", "-v", "error", "-y", "-ss", "2", "-i", args.src, "-filter_complex", fc,
         "-map", "[o]", "-frames:v", "1", "-q:v", "3", os.path.join(ROOT, "public/og.jpg")])
    print("done.")


if __name__ == "__main__":
    main()
