import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Neural Style Transfer",
    description: "Real-time artistic style transfer using deep convolutional networks",
    tech: ["PyTorch", "Computer Vision", "CNNs"],
    gradient: "from-blue-500 to-cyan-500",
    githubUrl: "https://github.com/anmol9177",
    demoUrl: "",
  },
  {
    id: 2,
    title: "Sentiment Analysis Engine",
    description: "Multi-language sentiment classifier using transformer models",
    tech: ["BERT", "Transformers", "NLP"],
    gradient: "from-purple-500 to-pink-500",
    githubUrl: "https://github.com/anmol9177",
    demoUrl: "",
  },
  {
    id: 3,
    title: "GPT-powered Code Assistant",
    description: "AI coding companion with context-aware suggestions",
    tech: ["GPT-4", "LangChain", "React"],
    gradient: "from-green-500 to-emerald-500",
    githubUrl: "https://github.com/anmol9177",
    demoUrl: "",
  },
  {
    id: 4,
    title: "Object Detection System",
    description: "Real-time object detection and tracking using YOLO",
    tech: ["YOLO", "OpenCV", "Python"],
    gradient: "from-orange-500 to-red-500",
    githubUrl: "https://github.com/anmol9177",
    demoUrl: "",
  },
  {
    id: 5,
    title: "Medical Image Classifier",
    description: "CNN-based diagnosis system for medical imaging",
    tech: ["TensorFlow", "ResNet", "Healthcare AI"],
    gradient: "from-indigo-500 to-purple-500",
    githubUrl: "https://github.com/anmol9177",
    demoUrl: "",
  },
  {
    id: 6,
    title: "Chatbot with RAG",
    description: "Retrieval-augmented generation chatbot for documentation",
    tech: ["LlamaIndex", "Vector DB", "FastAPI"],
    gradient: "from-cyan-500 to-blue-500",
    githubUrl: "https://github.com/anmol9177",
    demoUrl: "",
  },
];

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleDemoClick = (url: string) => {
    if (url) window.open(url, "_blank");
    else alert("Live demo is currently unavailable for this project.");
  };

  return (
    <section id="projects" className="h-screen snap-start flex items-center justify-center px-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16">
            Featured <span className="text-[#00D4FF]">Projects</span>
          </h2>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-[#00D4FF] transition-all group overflow-hidden"
              >
                {/* Hover Line Animation */}
                {hoveredId === project.id && (
                  <>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute top-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-[#00D4FF] to-transparent"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-[#00D4FF] to-transparent"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="absolute bottom-0 left-0 w-0.5 bg-gradient-to-t from-transparent via-[#00D4FF] to-transparent"
                    />
                  </>
                )}

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />

                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#00D4FF] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 relative z-20">
                    <button 
                      onClick={() => handleDemoClick(project.demoUrl)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-700 rounded text-sm hover:border-[#00D4FF] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </button>
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-700 rounded text-sm hover:border-[#00D4FF] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
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
