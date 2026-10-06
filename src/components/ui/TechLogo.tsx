/* Brand logos (devicon "original" SVGs, MIT; simple-icons paths, CC0) live in /public/logos.
   Concept skills get thin line icons drawn in the same 24px grid. */

type Brand = { file: string; tint: string };

export const BRAND: Record<string, Brand> = {
  java: { file: "java", tint: "#e76f00" },
  python: { file: "python", tint: "#3776ab" },
  php: { file: "php", tint: "#777bb4" },
  spring: { file: "spring", tint: "#6db33f" },
  hibernate: { file: "hibernate", tint: "#59666c" },
  dropwizard: { file: "dropwizard", tint: "#24292e" },
  angular: { file: "angular", tint: "#dd0031" },
  react: { file: "react", tint: "#61dafb" },
  nodejs: { file: "nodejs", tint: "#5fa04e" },
  express: { file: "express", tint: "#000000" },
  angularjs: { file: "angularjs", tint: "#e23237" },
  javascript: { file: "javascript", tint: "#f7df1e" },
  jquery: { file: "jquery", tint: "#0769ad" },
  html5: { file: "html5", tint: "#e34f26" },
  css3: { file: "css3", tint: "#1572b6" },
  bootstrap: { file: "bootstrap", tint: "#7952b3" },
  json: { file: "json", tint: "#000000" },
  xml: { file: "xml", tint: "#005fad" },
  amazonwebservices: { file: "amazonwebservices", tint: "#ff9900" },
  jenkins: { file: "jenkins", tint: "#d24939" },
  maven: { file: "maven", tint: "#c71a36" },
  gradle: { file: "gradle", tint: "#02303a" },
  apacheant: { file: "apacheant", tint: "#a81c7d" },
  git: { file: "git", tint: "#f05032" },
  bitbucket: { file: "bitbucket", tint: "#0052cc" },
  subversion: { file: "subversion", tint: "#809cc9" },
  docker: { file: "docker", tint: "#2496ed" },
  kubernetes: { file: "kubernetes", tint: "#326ce5" },
  redhatopenshift: { file: "redhatopenshift", tint: "#ee0000" },
  cloudfoundry: { file: "cloudfoundry", tint: "#0c9ed5" },
  azure: { file: "azure", tint: "#0078d4" },
  linux: { file: "linux", tint: "#fcc624" },
  graphql: { file: "graphql", tint: "#e10098" },
  apachekafka: { file: "apachekafka", tint: "#231f20" },
  rabbitmq: { file: "rabbitmq", tint: "#ff6600" },
  apache: { file: "apache", tint: "#d22128" },
  oracle: { file: "oracle", tint: "#f80000" },
  postgresql: { file: "postgresql", tint: "#336791" },
  microsoftsqlserver: { file: "microsoftsqlserver", tint: "#cc2927" },
  mysql: { file: "mysql", tint: "#4479a1" },
  mongodb: { file: "mongodb", tint: "#47a248" },
  cassandra: { file: "cassandra", tint: "#1287b1" },
  tomcat: { file: "tomcat", tint: "#f8dc75" },
  redhat: { file: "redhat", tint: "#ee0000" },
  junit: { file: "junit", tint: "#25a162" },
  selenium: { file: "selenium", tint: "#43b02a" },
  jira: { file: "jira", tint: "#0052cc" },
  confluence: { file: "confluence", tint: "#172b4d" },
  githubcopilot: { file: "githubcopilot", tint: "#000000" },
};

/** Concept icons: stroke paths on a 24×24 grid. */
export const CONCEPT: Record<string, string> = {
  "c-sql": "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  "c-plsql": "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3m8-15v5M14 15l-2 2 2 2m4-4 2 2-2 2",
  "c-db": "M5 7c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 8.4 5 7Zm0 0v10c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7",
  "c-api": "M8 7 3 12l5 5m8-10 5 5-5 5M13.5 5l-3 14",
  "c-code": "M4 4h16v16H4zM8 10l-2 2 2 2m8-4 2 2-2 2m-3-5-2 6",
  "c-sync": "M4 12a8 8 0 0 1 13.7-5.7L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.7L4 15.5M4 20v-4.5h4.5",
  "c-check": "M12 3l7.5 3v6c0 4.3-3.2 7.6-7.5 9-4.3-1.4-7.5-4.7-7.5-9V6L12 3Zm-3.5 9 2.5 2.5 5-5",
  "c-loop": "M3 12a5 5 0 0 1 9-3l0 0a5 5 0 1 1 0 6l0 0a5 5 0 1 1-9-3Z",
  "c-lock": "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 15v2",
  "c-release": "M3 17h4l3-10 4 10 3-6h4M3 21h18M3 3h18",
  "c-envelope": "M3 6h18v12H3zM3 7l9 6 9-6",
  "c-doc": "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  "c-server": "M4 4h16v6H4zM4 14h16v6H4zM7.5 7h.01M7.5 17h.01M11 7h5M11 17h5",
  "c-support": "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3M20 19c0 1.7-2 2-5 2h-2",
  "c-search": "M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13ZM15.5 15.5 20 20M8 10.5h5",
  "c-sprint": "M4 12a8 8 0 1 0 2.3-5.7M4 4v4.5h4.5M12 8v4l3 2",
  "c-review": "M4 5h11v8H9l-4 3v-3H4zM15 9h5v8h-1v3l-4-3h-3v-2",
};

export function isBrand(key: string): boolean {
  return key in BRAND;
}

export function brandTint(key: string): string | null {
  return BRAND[key]?.tint ?? null;
}

type Props = { logo: string; size?: number; className?: string; alt?: string };

/** Renders a brand SVG, or a concept line icon in ink. Decorative unless `alt` is given. */
export default function TechLogo({ logo, size = 20, className = "", alt = "" }: Props) {
  const brand = BRAND[logo];
  if (brand) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/logos/${brand.file}.svg`}
        width={size}
        height={size}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        loading="lazy"
        decoding="async"
        className={className}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={size > 60 ? 0.9 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <path d={CONCEPT[logo] ?? CONCEPT["c-code"]} />
    </svg>
  );
}
