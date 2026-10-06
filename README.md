# Ravali Kethiri — Portfolio

A quiet, single-scroll portfolio built around a looping, talking intro video.
White, black and grays only (brand logos keep their colours). Every piece of text comes from
`Ravali-Kethiri-Resume.docx`, and lives in [`src/lib/data.ts`](src/lib/data.ts).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Requires Node 20+. First-load JS for `/` is ~132 kB.

## Sections

| #  | Section        | Component                                   | Signature motion                                                   |
| -- | -------------- | ------------------------------------------- | ------------------------------------------------------------------ |
| —  | Navigation     | `src/components/Navigation.tsx`             | Glass pill after 40 px, sliding ink indicator, 2 px progress bar, clip-path mobile menu |
| —  | Hero           | `src/components/hero/Hero.tsx`              | Multiply-blended talking video, ghost first name, ▶/❚❚ sound button |
| 01 | About          | `src/components/sections/About.tsx` + `ui/IdCard.tsx` | Lanyard ID card: damped pendulum swing, idle sway, 3D flip |
| 02 | Skills         | `src/components/sections/Skills.tsx`        | Periodic table, diagonal wave reveal, family filter, inspector with brand logo |
| 03 | Work           | `src/components/sections/Work.tsx`          | Expanding accordion, clip-path wipe on the illustrative mini-UI    |
| 04 | Certifications | `src/components/sections/Certifications.tsx`| Ink flood row hover                                                |
| 05 | Experience     | `src/components/sections/Experience.tsx`    | Scroll-drawn spine; stops light up as it reaches them              |
| 06 | Contact        | `src/components/sections/Contact.tsx`       | Hopping letters, copy-email chip, spinning "say hello" badge       |

**Left out on purpose** (the résumé has no data for them): GitHub links, standalone projects,
and the Achievements gallery (no coding-platform stats, ranks or honours). Because there are no
projects, the Work gallery presents the three roles using the résumé's own bullets. To add
Achievements later, fill `ACHIEVEMENTS` in `data.ts` and add a section.

## Content

- `src/lib/data.ts` — `PROFILE`, `NAV`, `SKILL_GROUPS`, `EXPERIENCE`, `EDUCATION`, `PROJECTS`,
  `CERTIFICATIONS`, `ACHIEVEMENTS`, plus the derived `TIMELINE` and `rolesUsing()`
  (which roles mention a skill — used by the Skills inspector).
- `public/Ravali-Kethiri-Resume.pdf` — the download behind every "Résumé ↓" button. It was rendered
  from the .docx; to regenerate:

  ```bash
  textutil -convert html source/Ravali-Kethiri-Resume.docx -output /tmp/resume.html
  ```

  ```bash
  node scripts/resume-pdf.mjs /tmp/resume.html
  ```

  If you have a designed PDF export of the résumé, just drop it in at the same path.

## Rebuilding the hero video

Source files live in `source/` (`intro.mp4`, `photo.jpeg`). Needs `ffmpeg`, `cwebp` and Python 3 with `numpy`:

```bash
brew install ffmpeg webp
```

```bash
python3 -m pip install --user numpy
```

```bash
npm run hero
```

`scripts/build-hero-assets.py`:

1. **Crop** — detects the person against the backdrop (union bounding box over 8 frames) and makes a
   4:5 crop head-to-toe, centred, scaled to 768 px wide. Override with `--crop W:H:X:Y`
   (this video resolved to `crop=840:1050:508:27`).
2. **Whiten** — `colorlevels` with `--whiten` (default `0.93`) and snaps near-white luma to true
   white so the backdrop disappears under `mix-blend-mode: multiply`. This source's wall sits at
   ~240–250, so the spec's `0.98` left a visible gray box; use `--whiten 0.98` for a brighter wall.
3. **Seamless loop** — takes the first 10 s; the output is `src[0.5 s … 10 s]` with its last 0.5 s
   cross-faded (ffmpeg `xfade`) into `src[0 … 0.5 s]`, so when it wraps the next frame is exactly
   where the fade landed. Audio gets the same equal-power cross-fade, sample-accurate, in numpy
   (no `acrossfade`). Nothing is retimed, so lips stay in sync. Loop length: 9.5 s.
4. **Export** — `public/hero/hero.webm` (VP9 CRF 36 + Opus 80k) and `public/hero/hero.mp4`
   (H.264 CRF 24 slow, yuv420p, AAC 96k, `+faststart`). WebM is listed first.
5. **Stills** — `public/portrait-bust.webp` (480×600 head-to-shirt crop of `source/photo.jpeg`,
   or of a video frame if no photo) and `public/og.jpg` (1200×630; the name is drawn only if your
   ffmpeg has `drawtext`).

## Video & sound behaviour

- `<video muted loop playsInline preload="auto">`; on load it tries `play()` with sound and falls
  back to muted if the browser blocks it (a soft ping ring then circles the sound button).
- The first `pointerdown`, `keydown` or `touchend` anywhere unlocks sound — unless the visitor
  has explicitly muted.
- An IntersectionObserver pauses the video below 35 % hero visibility and resumes it on return.

## Quality checks

```bash
npm run build && npx next start -p 3123
```

```bash
node scripts/qa.mjs && node scripts/qa-interactions.mjs
```

`qa.mjs` screenshots every section at 1440×900 and 390×844 into `qa/`, asserts
`scrollWidth === innerWidth` and zero console errors. `qa-interactions.mjs` checks video
pause/resume/loop, the sound toggle, ID-card swing and keyboard flip, the skills inspector and filter,
the work accordion, the copy chip and the mobile menu (Esc, scroll lock, navigation).

Last run (Lighthouse 12, production build):
mobile Performance 96 · Accessibility 96 · Best Practices 100 · SEO 100;
desktop Performance 100 · Accessibility 97. The only accessibility flag left is the
intentionally dimmed timeline stops before they light up.

## Accessibility & motion

Semantic sections with one `h1` and ordered `h2`/`h3`, a skip link, visible focus rings, and text
equivalents for the video, ID card and illustrative UIs. `--mute` is `#6b6963` (nudged from
`#77756f` to pass WCAG AA). `prefers-reduced-motion` disables Lenis, the pendulum loop and
decorative animation.

## Credits & licences

- **Fonts** (self-hosted from `@fontsource`, SIL Open Font License 1.1): Inter Tight, Instrument
  Serif, JetBrains Mono — in `src/fonts/`.
- **Logos** in `public/logos/` (copy again with `node scripts/copy-logos.mjs`):
  - [devicon](https://devicon.dev) "original" SVGs — MIT, see `public/logos/LICENSE-devicon.txt`.
  - [simple-icons](https://simpleicons.org) paths (Apache Ant, OpenShift, Cloud Foundry, Red Hat,
    GitHub Copilot, Apache) — CC0, see `LICENSE-simple-icons.md` and `DISCLAIMER-simple-icons.md`.
  - All brand names and logos are trademarks of their respective owners and are used only to
    identify technologies listed on the résumé. Concept skills (REST, SOAP, TDD…) use custom line icons.
- Smooth scrolling: [Lenis](https://github.com/darkroomengineering/lenis) (MIT).
