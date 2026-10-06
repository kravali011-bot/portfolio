import type { CSSProperties, ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  /** heading lines; the last line's final word is set in serif italic via `accent` */
  lines: ReactNode[];
  accent: string;
  id: string;
  className?: string;
  children?: ReactNode;
};

/** Section tag ("03 — Selected work") + display heading with masked line reveal. */
export default function SectionHead({ index, label, lines, accent, id, className = "", children }: Props) {
  return (
    <header className={className}>
      <p className="tag rv">
        <b>{index}</b> — {label}
      </p>
      <h2 id={id} className="h-display mt-6">
        {lines.map((line, i) => (
          <span key={i} className="rv-mask" style={{ "--i": i } as CSSProperties}>
            <span>
              {line}
              {i === lines.length - 1 && (
                <>
                  {" "}
                  <em>{accent}</em>
                </>
              )}
            </span>
          </span>
        ))}
      </h2>
      {children}
    </header>
  );
}
