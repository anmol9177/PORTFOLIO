import { motion } from "motion/react";
import { Brain, Code, Eye, MessageSquare, Cpu, Database, Wrench, Globe } from "lucide-react";

const skillsData = [
  {
    icon: Brain,
    name: "Machine Learning",
    proficiency: 90,
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    name: "Python",
    proficiency: 95,
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageSquare,
    name: "NLP",
    proficiency: 85,
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Eye,
    name: "Computer Vision",
    proficiency: 80,
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Cpu,
    name: "Deep Learning",
    proficiency: 88,
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Database,
    name: "TensorFlow/PyTorch",
    proficiency: 87,
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Wrench,
    name: "MLOps",
    proficiency: 75,
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Globe,
    name: "LLM Applications",
    proficiency: 92,
    color: "from-pink-500 to-rose-500",
  },
];

export function Skills() {
  return (
    <section id="skills" className="h-screen snap-start flex items-center justify-center px-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16">
            Technical <span className="text-[#00D4FF]">Skills</span>
          </h2>

          {/* Premium Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {skillsData.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative bg-[#0A0A0F] border border-gray-800 rounded-2xl p-6 group overflow-hidden shadow-lg"
              >
                {/* Glow Effect behind the card on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00D4FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300">
                    <skill.icon className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${skill.color} drop-shadow-md text-white`} />
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold mb-4 text-center text-gray-200 group-hover:text-white transition-colors">{skill.name}</h3>

                  {/* Circular/Custom Progress indicator */}
                  <div className="w-full flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span className="font-mono">Match</span>
                    <span className="font-bold text-[#00D4FF]">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1.5, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${skill.color} relative`}
                    >
                      <div className="absolute top-0 right-0 w-2 h-full bg-white opacity-50 shadow-[0_0_10px_white]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
