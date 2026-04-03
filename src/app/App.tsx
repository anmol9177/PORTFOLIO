import { AIChatbot } from "./components/AIChatbot";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[#0A0A0F] text-gray-100 relative">
      {/* Grid Matrix Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />

      {/* AI Chat Twin */}
      <AIChatbot />
    </div>
  );
}
