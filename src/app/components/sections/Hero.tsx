import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowDown, Download, Briefcase, Upload } from "lucide-react";

const roles = [
  "Machine Learning Engineer",
  "AI Research Engineer",
  "NLP Specialist",
  "Computer Vision Engineer",
  "LLM Application Developer",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setResumeUrl(fileUrl);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const currentRole = roles[roleIndex] || "";
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setRoleIndex((roleIndex + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="h-screen snap-start flex items-center justify-center px-6 relative">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glowing Name */}
          <div className="relative inline-block mb-8">
            <h1 className="text-7xl md:text-8xl font-bold mb-2 relative">
              Anmol Arora
            </h1>
            <div className="absolute inset-0 blur-3xl bg-[#00D4FF] opacity-20" />
          </div>

          {/* Typewriter Role */}
          <div className="h-16 mb-12">
            <p className="text-2xl md:text-3xl text-[#00D4FF] font-mono">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-gray-400 text-lg"
            >
              Seeking internship & full-time opportunities.
            </motion.p>
          </div>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button 
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-[#00D4FF] text-black font-semibold rounded-lg hover:bg-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all flex items-center gap-2 group"
            >
              <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
              View Projects
            </button>
            <div className="relative flex gap-2">
              <a 
                href={resumeUrl}
                download="Anmol_Arora_Resume.pdf"
                className="px-8 py-4 border-2 border-[#00D4FF] text-[#00D4FF] font-semibold rounded-lg hover:bg-[#00D4FF]/10 transition-all flex items-center gap-2 group"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Download Resume
              </a>
              <label 
                title="Upload custom resume"
                className="px-4 py-4 border-2 border-gray-600 text-gray-400 font-semibold rounded-lg hover:bg-gray-800 hover:text-white cursor-pointer transition-all flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 text-[#00D4FF]" />
      </motion.div>
    </section>
  );
}
