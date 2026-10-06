import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import RevealObserver from "./ui/RevealObserver";
import { SmoothScroll } from "@/lib/scroll";

/* Section order: Hero → About → Skills → Work → Certifications → Experience → Contact.
   Achievements is omitted: the résumé lists no coding-platform stats, ranks or honours. */
export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <RevealObserver />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
