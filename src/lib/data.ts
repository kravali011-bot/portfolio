/**
 * Every string on the site lives here and is taken from Ravali-Kethiri-Resume.docx.
 * Components only read from this file. Nothing here is invented: when the résumé has no data
 * for a section (projects with repos, coding-platform achievements, GitHub) it is left out.
 */

export type NavItem = { id: string; label: string };

export const PROFILE = {
  name: "Ravali Kethiri",
  firstName: "Ravali",
  initials: "RK",
  role: "Senior Full Stack Java Developer",
  email: "k.ravali011@gmail.com",
  location: "Dallas, TX",
  linkedin: "https://www.linkedin.com/in/ravali-kethiri",
  linkedinLabel: "linkedin.com/in/ravali-kethiri",
  github: null as string | null,
  resume: "/Ravali-Kethiri-Resume.pdf",
  /** First line of the Professional Summary, verbatim. */
  resumeSummary:
    "Senior Full Stack Java Developer with 9+ years of experience designing, building, deploying, and supporting enterprise web applications for healthcare and financial services organizations.",
  /** Second line used in About, verbatim from the summary. */
  summaryExtra:
    "Hands-on DevOps experience containerizing applications with Docker and deploying and orchestrating them on Kubernetes/OpenShift and Pivotal Cloud Foundry (PCF).",
  /** Paraphrase of the summary's closing line. */
  quote: "Owning a feature end to end, from requirements analysis to automated deployment, monitoring and production support.",
  years: "9+",
  sectors: "Healthcare & financial services",
};

/** Full Professional Summary, verbatim. */
export const SUMMARY: string[] = [
  "Senior Full Stack Java Developer with 9+ years of experience designing, building, deploying, and supporting enterprise web applications for healthcare and financial services organizations.",
  "Strong back-end expertise in Java 11 and Java 8, including Lambda/Streams, multithreading and concurrency, using Spring Boot, Spring MVC, Spring Security, and Hibernate/JPA to build RESTful and GraphQL microservices.",
  "Strong front-end expertise in Angular (versions 7–20) and React, building responsive user interfaces with JavaScript, HTML5, CSS3, and Bootstrap that consume REST APIs.",
  "Experienced in designing and maintaining CI/CD pipelines with Jenkins, Maven, and Gradle to automate build, test, and deployment of full-stack applications across Dev, QA, Staging, and Production.",
  "Hands-on DevOps experience containerizing applications with Docker and deploying and orchestrating them on Kubernetes/OpenShift and Pivotal Cloud Foundry (PCF).",
  "Practical AWS experience with EC2, S3, Elastic Beanstalk, SQS/SNS, IAM, CloudWatch, and Auto Scaling, plus Azure high-availability deployments; AWS Certified Solutions Architect – Associate.",
  "Skilled in application deployment and server administration on Apache Tomcat, WebSphere, JBoss, and WebLogic on Linux, including SSL certificate management and performance troubleshooting.",
  "Experienced with Oracle, PostgreSQL, MongoDB, and Cassandra, and with modernizing legacy Struts/JSP applications to Spring MVC and Angular.",
  "Oracle Certified Java SE 8 Programmer; comfortable owning a feature end to end, from requirements analysis and development through automated deployment, monitoring, testing, and Level 1–3 production support in Agile/Scrum teams.",
];

export const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/* ───────────────────────────── Skills ───────────────────────────── */

export type Skill = {
  name: string;
  symbol: string;
  /** brand logo key (public/logos/<key>.svg) or concept icon key */
  logo: string;
  /** extra lowercase keywords used to find the roles that mention this skill */
  kw?: string[];
};
export type SkillGroup = { family: string; short: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    family: "Languages",
    short: "Languages",
    skills: [
      { name: "Java 11", symbol: "Jv", logo: "java", kw: ["java 11"] },
      { name: "Java 8 (also 7/6)", symbol: "J8", logo: "java", kw: ["java 8"] },
      { name: "PL/SQL", symbol: "Pl", logo: "c-plsql", kw: ["pl/sql"] },
      { name: "SQL", symbol: "Sq", logo: "c-sql", kw: ["sql queries", "pl/sql and sql", "direct sql"] },
      { name: "Python", symbol: "Py", logo: "python" },
      { name: "PHP", symbol: "Ph", logo: "php" },
    ],
  },
  {
    family: "Java Frameworks",
    short: "Frameworks",
    skills: [
      { name: "Spring Boot", symbol: "Sb", logo: "spring" },
      { name: "Spring MVC", symbol: "Sm", logo: "spring", kw: ["spring mvc"] },
      { name: "Spring Security", symbol: "Ss", logo: "spring" },
      { name: "Spring Cloud", symbol: "Sc", logo: "spring" },
      { name: "Spring Batch", symbol: "Sh", logo: "spring" },
      { name: "Spring Data JPA", symbol: "Sd", logo: "spring", kw: ["jpa"] },
      { name: "Spring AOP/IOC", symbol: "Sa", logo: "spring", kw: ["aop"] },
      { name: "Hibernate 3/4", symbol: "Hb", logo: "hibernate", kw: ["hibernate"] },
      { name: "Dropwizard", symbol: "Dw", logo: "dropwizard" },
      { name: "Jersey", symbol: "Je", logo: "c-api", kw: ["jersey"] },
      { name: "Struts 1/2", symbol: "St", logo: "apache", kw: ["struts"] },
      { name: "JSF", symbol: "Jf", logo: "c-code" },
      { name: "MyBatis", symbol: "Mb", logo: "c-db" },
    ],
  },
  {
    family: "Front End",
    short: "Front End",
    skills: [
      { name: "Angular (7–20)", symbol: "Ng", logo: "angular", kw: ["angular (7", "angular,", "and angular"] },
      { name: "React", symbol: "Re", logo: "react" },
      { name: "Node.js", symbol: "No", logo: "nodejs" },
      { name: "Express.js", symbol: "Ex", logo: "express" },
      { name: "AngularJS", symbol: "Aj", logo: "angularjs" },
      { name: "JavaScript", symbol: "Js", logo: "javascript" },
      { name: "jQuery", symbol: "Jq", logo: "jquery" },
      { name: "AJAX", symbol: "Ax", logo: "c-sync" },
      { name: "HTML5", symbol: "Ht", logo: "html5", kw: ["html"] },
      { name: "CSS3", symbol: "Cs", logo: "css3", kw: ["css"] },
      { name: "Bootstrap", symbol: "Bs", logo: "bootstrap" },
      { name: "JSON", symbol: "Jn", logo: "json" },
      { name: "XML/XSLT", symbol: "Xm", logo: "xml", kw: ["xml"] },
    ],
  },
  {
    family: "AWS Cloud",
    short: "AWS",
    skills: [
      { name: "EC2", symbol: "E2", logo: "amazonwebservices" },
      { name: "S3", symbol: "S3", logo: "amazonwebservices" },
      { name: "Elastic Beanstalk", symbol: "Eb", logo: "amazonwebservices" },
      { name: "SQS/SNS", symbol: "Qs", logo: "amazonwebservices", kw: ["sqs"] },
      { name: "IAM", symbol: "Ia", logo: "amazonwebservices" },
      { name: "CloudWatch", symbol: "Cw", logo: "amazonwebservices" },
      { name: "Auto Scaling", symbol: "As", logo: "amazonwebservices" },
    ],
  },
  {
    family: "CI/CD & Build Tools",
    short: "CI/CD",
    skills: [
      { name: "Jenkins", symbol: "Jk", logo: "jenkins" },
      { name: "Maven", symbol: "Mv", logo: "maven" },
      { name: "Gradle", symbol: "Gr", logo: "gradle" },
      { name: "ANT", symbol: "An", logo: "apacheant", kw: ["ant "] },
      { name: "Git", symbol: "Gi", logo: "git", kw: ["github copilot"] },
      { name: "Bitbucket", symbol: "Bb", logo: "bitbucket" },
      { name: "SVN", symbol: "Sv", logo: "subversion" },
      { name: "Clover", symbol: "Cl", logo: "c-check" },
      { name: "Cruise Control", symbol: "Cc", logo: "c-loop" },
    ],
  },
  {
    family: "DevOps & Deployment",
    short: "DevOps",
    skills: [
      { name: "Docker", symbol: "Dk", logo: "docker" },
      { name: "Kubernetes", symbol: "K8", logo: "kubernetes" },
      { name: "OpenShift", symbol: "Os", logo: "redhatopenshift" },
      { name: "Pivotal Cloud Foundry (PCF)", symbol: "Pc", logo: "cloudfoundry", kw: ["pivotal cloud foundry", "pcf"] },
      { name: "Azure", symbol: "Az", logo: "azure" },
      { name: "Linux", symbol: "Lx", logo: "linux" },
      { name: "SSL certificate administration", symbol: "Sl", logo: "c-lock", kw: ["ssl"] },
      { name: "Dev/QA/Staging/Production release management", symbol: "Rm", logo: "c-release", kw: ["staging", "production environments"] },
    ],
  },
  {
    family: "Web Services & Messaging",
    short: "Services",
    skills: [
      { name: "REST", symbol: "Rs", logo: "c-api" },
      { name: "GraphQL", symbol: "Gq", logo: "graphql" },
      { name: "SOAP", symbol: "So", logo: "c-envelope" },
      { name: "WSDL", symbol: "Wd", logo: "c-doc" },
      { name: "JAX-WS/RS/RPC", symbol: "Jx", logo: "c-code" },
      { name: "JAXB", symbol: "Jb", logo: "c-code" },
      { name: "Apache Axis", symbol: "Ap", logo: "apache" },
      { name: "Kafka", symbol: "Kf", logo: "apachekafka" },
      { name: "ActiveMQ", symbol: "Mq", logo: "apache" },
      { name: "RabbitMQ (JMS)", symbol: "Rb", logo: "rabbitmq", kw: ["rabbitmq"] },
    ],
  },
  {
    family: "Databases",
    short: "Databases",
    skills: [
      { name: "Oracle (incl. TimesTen)", symbol: "Or", logo: "oracle", kw: ["oracle"] },
      { name: "PostgreSQL", symbol: "Pg", logo: "postgresql" },
      { name: "SQL Server", symbol: "Ms", logo: "microsoftsqlserver" },
      { name: "MySQL", symbol: "My", logo: "mysql" },
      { name: "DB2", symbol: "D2", logo: "c-db" },
      { name: "MongoDB", symbol: "Mg", logo: "mongodb" },
      { name: "Cassandra", symbol: "Ca", logo: "cassandra" },
    ],
  },
  {
    family: "App/Web Servers",
    short: "Servers",
    skills: [
      { name: "Apache Tomcat", symbol: "Tc", logo: "tomcat", kw: ["tomcat"] },
      { name: "JBoss", symbol: "Jo", logo: "redhat" },
      { name: "IBM WebSphere", symbol: "Ws", logo: "c-server", kw: ["websphere"] },
      { name: "WebLogic", symbol: "Wl", logo: "oracle" },
    ],
  },
  {
    family: "Monitoring & Support",
    short: "Support",
    skills: [
      { name: "Log4j", symbol: "L4", logo: "apache" },
      { name: "Level 1–3 production support", symbol: "L3", logo: "c-support", kw: ["level 1–3"] },
      { name: "Incident triage and root-cause analysis", symbol: "Ic", logo: "c-search", kw: ["triaging incidents"] },
    ],
  },
  {
    family: "Testing & Practices",
    short: "Practices",
    skills: [
      { name: "JUnit", symbol: "Ju", logo: "junit" },
      { name: "TestNG", symbol: "Tn", logo: "c-check" },
      { name: "Selenium", symbol: "Se", logo: "selenium" },
      { name: "TDD", symbol: "Td", logo: "c-loop", kw: ["test-driven development"] },
      { name: "Agile/Scrum", symbol: "Ag", logo: "c-sprint", kw: ["agile/scrum"] },
      { name: "JIRA", symbol: "Ji", logo: "jira" },
      { name: "Confluence", symbol: "Cf", logo: "confluence" },
      { name: "Code reviews", symbol: "Cr", logo: "c-review", kw: ["code reviews"] },
      { name: "GitHub Copilot", symbol: "Gc", logo: "githubcopilot" },
    ],
  },
];

/* ─────────────────────────── Experience ─────────────────────────── */

export type Role = {
  id: string;
  title: string;
  company: string;
  short: string;
  place: string;
  start: string;
  end: string;
  bullets: string[];
  environment: string[];
};

export const EXPERIENCE: Role[] = [
  {
    id: "ncdhhs",
    title: "Sr. Full Stack Java Developer",
    company: "North Carolina Department of Health and Human Services (DHHS)",
    short: "NC DHHS",
    place: "Raleigh, NC (Remote)",
    start: "Jan 2021",
    end: "September 2026",
    bullets: [
      "Built and maintained Jenkins CI/CD pipelines with Maven to automate build, test, and deployment of Java/Spring Boot services across Dev, QA, Staging, and Production environments.",
      "Containerized applications with Docker and deployed and orchestrated the services on OpenShift/Kubernetes.",
      "Provisioned and managed AWS infrastructure including EC2, S3, SQS, Elastic Beanstalk, CloudWatch, and Auto Scaling, and supported Azure high-availability deployments.",
      "Designed and developed full-stack modules on Java 11 and Java 8 using Spring Boot, Spring MVC, Spring Security, and Hibernate ORM, exposing REST APIs consumed by Angular (7–20) and React front ends.",
      "Developed responsive React front ends (functional components, Hooks, Context/Redux, React Router) for healthcare portals, building reusable component libraries and form workflows that consume Spring Boot and Node.js REST and GraphQL APIs.",
      "Built Node.js/Express.js services as a backend-for-frontend (BFF) layer that aggregates data from Java microservices, handles token-based authentication, and exposes REST endpoints optimized for React clients.",
      "Wrote unit and integration tests with Jest and React Testing Library for React components and Node.js services, and containerized Node.js apps with Docker for Jenkins-driven deployments to OpenShift.",
      "Built and deployed RESTful microservices with Spring Boot and Dropwizard, including a forum-style feature supporting image uploads and threaded comments.",
      "Applied Java 8 Lambda/Streams and Java 11 I/O APIs, and used multithreading and concurrency for asynchronous email generation.",
      "Modernized legacy Struts/JSP modules by migrating the presentation tier to Spring MVC and Angular while preserving existing business logic.",
      "Integrated GraphQL schemas, queries, and mutations for flexible client-data access across MongoDB and other data stores.",
      "Configured Oracle TimesTen in-memory database to accelerate high-frequency queries and tuned PL/SQL and SQL for production performance issues.",
      "Managed Cassandra cluster topology, node scaling, and CQL query/index tuning, and administered PostgreSQL across Dev, QA, Staging, and Production.",
      "Implemented LDAP-based single sign-on and PKI/digital-certificate authentication across web applications firm-wide.",
      "Wrote automated tests with TestNG and built a custom tool to compare query results across two data sources for data-quality validation.",
      "Served as subject-matter expert for client data onboarding, advising on financial-domain reference-data strategy and client review workflows.",
      "Provided Level 1–3 production support for healthcare and financial applications, triaging incidents and coordinating fixes with development teams.",
      "Used GitHub Copilot in Visual Studio to accelerate React front-end development, generate unit tests, and speed up code reviews and documentation.",
    ],
    environment: [
      "Java 11", "Java 8", "Spring Boot", "Spring MVC", "Hibernate", "Jenkins", "Maven", "Docker", "OpenShift",
      "Kubernetes", "AWS", "Azure", "Angular", "React", "Node.js", "Express.js", "Jest", "GraphQL",
      "Oracle TimesTen", "Oracle 11g", "PostgreSQL", "Cassandra", "MongoDB", "GitHub Copilot",
    ],
  },
  {
    id: "svb",
    title: "Sr. Full Stack Java Developer (remote)",
    company: "SVB Financial Group",
    short: "SVB Financial Group",
    place: "California",
    start: "Jan 2020",
    end: "Dec 2020",
    bullets: [
      "Built REST microservices with Spring Boot and deployed them on Pivotal Cloud Foundry (PCF); developed backend services using Java 8 APIs.",
      "Managed AWS IAM permissions and infrastructure across EC2, S3, Elastic Beanstalk, and CloudWatch.",
      "Administered SSL certificates and Apache Tomcat/WebSphere on Linux, partnering with DBA and network teams to resolve performance issues.",
      "Applied Test-Driven Development validated with Clover and Cruise Control continuous-integration tooling.",
      "Implemented asynchronous messaging with ActiveMQ and RabbitMQ (JMS) and used Log4j for application monitoring.",
      "Implemented Spring MVC/AOP-based security and business logic, with Hibernate/HQL for data access and Spring JDBC Template for direct SQL.",
      "Migrated Struts/JSP login and access-control modules to a Spring-based architecture and developed reusable custom JSP tags.",
      "Designed OR-mapping for one-to-one and many-to-one Oracle table relationships.",
      "Used AngularJS and React controllers to update entity models against a task-management database.",
      "Analyzed business requirements and produced high-level designs within an Agile/Scrum process, participating in sprint planning and daily stand-ups.",
      "Participated in code reviews and contributed to the team's best-practices documentation.",
    ],
    environment: [
      "Java 8", "Spring MVC/AOP/IOC/Boot", "Hibernate", "Jersey REST", "Pivotal Cloud Foundry", "OpenShift",
      "AWS (EC2, S3, Elastic Beanstalk, IAM, CloudWatch)", "WebLogic", "Tomcat", "Oracle 11g", "Elastic Search",
      "NoSQL", "ActiveMQ", "RabbitMQ", "SVN",
    ],
  },
  {
    id: "w3softtech",
    title: "Java Developer",
    company: "W3Softtech",
    short: "W3Softtech",
    place: "Hyderabad, India",
    start: "May 2017",
    end: "Aug 2019",
    bullets: [
      "Deployed applications to Apache Tomcat across QA and production environments, using SVN for version control and release management.",
      "Developed JSP/Servlet-based modules in a Waterfall SDLC, integrating Java APIs with jQuery, AJAX, and JSON for client-server communication.",
      "Built the front end using Struts 2 (MVC), JavaScript, HTML, and CSS, including server-side pagination for large data sets.",
      "Implemented persistence with Hibernate ORM against Oracle, writing SQL queries and stored procedures.",
      "Wrote Struts action/form classes, configured struts-config.xml, and integrated Struts and Hibernate with Spring for business logic.",
      "Conducted unit, integration, system, and user-acceptance testing and tracked defects in JIRA.",
    ],
    environment: [
      "Java", "J2EE", "Spring", "Hibernate", "Struts", "JSP/Servlets", "Tomcat", "Oracle", "SVN", "JIRA",
      "JavaScript", "jQuery", "JSON", "AJAX", "Eclipse",
    ],
  },
];

export type Education = { id: string; title: string; school: string; place: string; year?: string };

export const EDUCATION: Education[] = [
  {
    id: "bs",
    title: "Bachelor of Science, Computer Science and Engineering",
    school: "Jawaharlal Nehru Technological University",
    place: "India",
    year: "2016",
  },
  {
    id: "pgp",
    title: "Post Graduate Program in Artificial Intelligence & Machine Learning",
    school: "The University of Texas at Austin",
    place: "Austin, TX",
  },
];

/* ───────────────────────────── Work ───────────────────────────── */
/*  The résumé lists no standalone projects, so the Work gallery presents the three roles.
    Descriptions are verbatim résumé bullets; features are condensed from that role's bullets. */

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: { name: string; logo: string }[];
  github: string | null;
  ui: "portal" | "messaging" | "table";
};

export const PROJECTS: Project[] = [
  {
    id: "ncdhhs",
    index: "01",
    title: "NC DHHS",
    kicker: "Sr. Full Stack Java Developer · Jan 2021 – Sep 2026",
    description:
      "Designed and developed full-stack modules on Java 11 and Java 8 using Spring Boot, Spring MVC, Spring Security, and Hibernate ORM, exposing REST APIs consumed by Angular (7–20) and React front ends.",
    features: [
      "React front ends for healthcare portals",
      "Node.js/Express.js BFF layer",
      "Jenkins CI/CD across Dev → Prod",
      "Docker on OpenShift/Kubernetes",
      "GraphQL schemas over MongoDB",
      "LDAP single sign-on and PKI auth",
      "Oracle TimesTen and PL/SQL tuning",
      "Level 1–3 production support",
    ],
    tech: [
      { name: "Java", logo: "java" }, { name: "Spring Boot", logo: "spring" }, { name: "React", logo: "react" },
      { name: "Angular", logo: "angular" }, { name: "Node.js", logo: "nodejs" }, { name: "GraphQL", logo: "graphql" },
      { name: "Docker", logo: "docker" }, { name: "OpenShift", logo: "redhatopenshift" }, { name: "Jenkins", logo: "jenkins" },
      { name: "Cassandra", logo: "cassandra" },
    ],
    github: null,
    ui: "portal",
  },
  {
    id: "svb",
    index: "02",
    title: "SVB Financial Group",
    kicker: "Sr. Full Stack Java Developer · Jan 2020 – Dec 2020",
    description:
      "Built REST microservices with Spring Boot and deployed them on Pivotal Cloud Foundry (PCF); developed backend services using Java 8 APIs.",
    features: [
      "Async messaging with ActiveMQ and RabbitMQ",
      "AWS IAM, EC2, S3 and CloudWatch",
      "SSL and Tomcat/WebSphere on Linux",
      "TDD with Clover and Cruise Control",
      "Struts/JSP login moved to Spring",
      "Hibernate/HQL OR-mapping on Oracle",
    ],
    tech: [
      { name: "Java 8", logo: "java" }, { name: "Spring", logo: "spring" }, { name: "PCF", logo: "cloudfoundry" },
      { name: "AWS", logo: "amazonwebservices" }, { name: "RabbitMQ", logo: "rabbitmq" }, { name: "Hibernate", logo: "hibernate" },
      { name: "Oracle", logo: "oracle" }, { name: "Tomcat", logo: "tomcat" },
    ],
    github: null,
    ui: "messaging",
  },
  {
    id: "w3softtech",
    index: "03",
    title: "W3Softtech",
    kicker: "Java Developer · May 2017 – Aug 2019",
    description:
      "Built the front end using Struts 2 (MVC), JavaScript, HTML, and CSS, including server-side pagination for large data sets.",
    features: [
      "JSP/Servlet modules with jQuery and AJAX",
      "Hibernate ORM against Oracle",
      "SQL queries and stored procedures",
      "Struts integrated with Spring",
      "Tomcat deployments across QA and prod",
      "Unit to UAT testing, tracked in JIRA",
    ],
    tech: [
      { name: "Java", logo: "java" }, { name: "Spring", logo: "spring" }, { name: "Struts", logo: "apache" },
      { name: "Hibernate", logo: "hibernate" }, { name: "Oracle", logo: "oracle" }, { name: "jQuery", logo: "jquery" },
      { name: "Tomcat", logo: "tomcat" }, { name: "JIRA", logo: "jira" },
    ],
    github: null,
    ui: "table",
  },
];

/* ───────────────────────── Certifications ───────────────────────── */

export type Certification = { title: string; issuer?: string };

export const CERTIFICATIONS: Certification[] = [
  { title: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services" },
  { title: "Oracle Certified Java SE 8 Programmer – Associate", issuer: "Oracle" },
  { title: "Artificial Intelligence & Machine Learning Certified" },
];

/** The résumé has no coding-platform stats, ranks or honours, so this section is not rendered. */
export const ACHIEVEMENTS: never[] = [];

/* ───────────────────────── Derived helpers ───────────────────────── */

const roleText = EXPERIENCE.map((r) => ({
  short: r.short,
  text: (r.bullets.join(" ") + " " + r.environment.join(", ")).toLowerCase(),
}));

/** Roles whose bullets or environment mention a skill. */
export function rolesUsing(skill: Skill): string[] {
  const base = skill.name.toLowerCase().replace(/\s*\(.*\)$/, "").replace(/ \d\/\d$/, "");
  const keys = skill.kw ?? [base];
  return roleText.filter((r) => keys.some((k) => r.text.includes(k))).map((r) => r.short);
}

export type TimelineStop = {
  id: string;
  year: string;
  title: string;
  place: string;
  detail: string;
  kind: "education" | "work";
};

export const TIMELINE: TimelineStop[] = [
  {
    id: "bs",
    year: "2016",
    title: EDUCATION[0].title,
    place: `${EDUCATION[0].school}, ${EDUCATION[0].place}`,
    detail: "Computer Science and Engineering degree.",
    kind: "education",
  },
  ...[...EXPERIENCE].reverse().map<TimelineStop>((r) => ({
    id: r.id,
    year: `${r.start} – ${r.end}`,
    title: r.title,
    place: `${r.company}, ${r.place}`,
    detail: r.bullets[0],
    kind: "work",
  })),
  {
    id: "pgp",
    year: "Post graduate",
    title: EDUCATION[1].title,
    place: `${EDUCATION[1].school}, ${EDUCATION[1].place}`,
    detail: "Artificial Intelligence & Machine Learning.",
    kind: "education",
  },
];
