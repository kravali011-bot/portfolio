// Copies the brand logos used by the site into public/logos (run: node scripts/copy-logos.mjs).
// devicon "original" SVGs (MIT) and simple-icons paths (CC0) recoloured with their official hex.
import fs from "node:fs";
import path from "node:path";
import * as si from "simple-icons";

const out = path.resolve("public/logos");
fs.mkdirSync(out, { recursive: true });

const DEVICON = {
  java: "java-original", python: "python-original", php: "php-original",
  spring: "spring-original", hibernate: "hibernate-original", dropwizard: "dropwizard-original",
  angular: "angular-original", react: "react-original", nodejs: "nodejs-original",
  express: "express-original", angularjs: "angularjs-original", javascript: "javascript-original",
  jquery: "jquery-original", html5: "html5-original", css3: "css3-original",
  bootstrap: "bootstrap-original", json: "json-original", xml: "xml-original",
  amazonwebservices: "amazonwebservices-original-wordmark", jenkins: "jenkins-original",
  maven: "maven-original", gradle: "gradle-original", git: "git-original",
  bitbucket: "bitbucket-original", subversion: "subversion-original", docker: "docker-original",
  kubernetes: "kubernetes-original", azure: "azure-original", linux: "linux-original",
  graphql: "graphql-plain", apachekafka: "apachekafka-original", rabbitmq: "rabbitmq-original",
  oracle: "oracle-original", postgresql: "postgresql-original",
  microsoftsqlserver: "microsoftsqlserver-original", mysql: "mysql-original",
  mongodb: "mongodb-original", cassandra: "cassandra-original", tomcat: "tomcat-original",
  junit: "junit-original", selenium: "selenium-original", jira: "jira-original",
  confluence: "confluence-original",
};
const SIMPLE = {
  apacheant: "siApacheant", redhatopenshift: "siRedhatopenshift", cloudfoundry: "siCloudfoundry",
  redhat: "siRedhat", githubcopilot: "siGithubcopilot", apache: "siApache",
};

for (const [name, file] of Object.entries(DEVICON)) {
  fs.copyFileSync(`node_modules/devicon/icons/${name}/${file}.svg`, path.join(out, `${name}.svg`));
}
const tints = {};
for (const [name, key] of Object.entries(SIMPLE)) {
  const icon = si[key];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>${icon.title}</title><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
  fs.writeFileSync(path.join(out, `${name}.svg`), svg);
  tints[name] = icon.hex;
}
fs.copyFileSync("node_modules/devicon/LICENSE", path.join(out, "LICENSE-devicon.txt"));
fs.copyFileSync("node_modules/simple-icons/LICENSE.md", path.join(out, "LICENSE-simple-icons.md"));
fs.copyFileSync("node_modules/simple-icons/DISCLAIMER.md", path.join(out, "DISCLAIMER-simple-icons.md"));
console.log("copied", Object.keys(DEVICON).length + Object.keys(SIMPLE).length, "logos", tints);
