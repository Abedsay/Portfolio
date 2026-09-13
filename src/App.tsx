import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { AIQuality } from "./components/AIQuality";
import { Projects } from "./components/Projects";
import { EngineeringDirection } from "./components/EngineeringDirection";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { GithubCTA } from "./components/GithubCTA";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { EngineeringRail } from "./components/EngineeringRail";

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <Nav />
      <EngineeringRail />
      <main>
        <Hero />
        <About />
        <Experience />
        <AIQuality />
        <Projects />
        <EngineeringDirection />
        <Skills />
        <Education />
        <GithubCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
