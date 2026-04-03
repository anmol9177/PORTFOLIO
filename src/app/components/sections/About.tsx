import { motion } from "motion/react";
import { Users, Award, Code } from "lucide-react";

const stats = [
  { icon: Code, label: "Projects", value: "15+", target: "projects" },
  { icon: Award, label: "Certifications", value: "6", target: "certifications" },
  { icon: Users, label: "Contributions", value: "200+", target: "contact" },
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const skills = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "NLP",
  "Computer Vision",
  "LLMs",
  "MLOps",
  "React",
];

export function About() {
  return (
    <section id="about" className="h-screen snap-start flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Avatar + Stats */}
          <div>
            {/* Avatar Placeholder */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D4FF] to-cyan-500 blur-xl opacity-50" />
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-purple-500/20 border-2 border-[#00D4FF] flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.3)]"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0F]/50" />
                <span className="text-6xl relative z-10 hover:scale-110 transition-transform cursor-crosshair">🧠</span>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.button
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(stat.target)}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center hover:border-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all cursor-pointer w-full"
                >
                  <stat.icon className="w-6 h-6 text-[#00D4FF] mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1 text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Bio + Skills */}
          <div>
            <h2 className="text-5xl font-bold mb-6">
              About <span className="text-[#00D4FF]">Me</span>
            </h2>

            <p className="text-gray-400 leading-relaxed mb-8">
              I'm a passionate AI Engineer specializing in building intelligent systems
              that solve real-world problems. With expertise in machine learning, NLP,
              and computer vision, I create innovative solutions that push the boundaries
              of what's possible with AI.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              Currently seeking internships and full-time opportunities where I can
              contribute to cutting-edge AI projects and continue growing as an engineer.
            </p>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full text-sm text-[#00D4FF] hover:bg-[#00D4FF]/20 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
