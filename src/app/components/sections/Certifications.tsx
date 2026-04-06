import { motion, AnimatePresence } from "motion/react";
import { Award, Calendar, ExternalLink, X } from "lucide-react";
import { useState } from "react";

const certifications = [
  {
    id: 1,
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "March 2026",
    image: "/certificates/tensorflow-developer.png",
  },
  {
    id: 2,
    title: "AWS Machine Learning Specialty",
    issuer: "Amazon Web Services",
    date: "January 2026",
    image: "/certificates/aws-ml.png",
  },
  {
    id: 3,
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "December 2025",
    image: "/certificates/deep-learning.png",
  },
  {
    id: 4,
    title: "Natural Language Processing",
    issuer: "Stanford Online",
    date: "October 2025",
    image: "/certificates/nlp.png",
  },
  {
    id: 5,
    title: "Advanced Computer Vision",
    issuer: "Coursera",
    date: "August 2025",
    image: "/certificates/computer-vision.png",
  },
  {
    id: 6,
    title: "MLOps Engineering",
    issuer: "DataCamp",
    date: "June 2025",
    image: "/certificates/mlops.png",
  },
];

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  return (
    <section id="certifications" className="h-screen snap-start flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16">
            Certifications <span className="text-[#00D4FF]">&amp; Achievements</span>
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00D4FF] via-[#00D4FF] to-transparent" />

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Glowing Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="absolute left-[19px] top-1/2 -translate-y-1/2"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#00D4FF] relative">
                      <div className="absolute inset-0 rounded-full bg-[#00D4FF] animate-ping opacity-75" />
                    </div>
                  </motion.div>

                  {/* Card — now clickable */}
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full text-left bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-[#00D4FF] hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-[#00D4FF] transition-colors">{cert.title}</h3>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-[#00D4FF] transition-colors flex-shrink-0 ml-4" />
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#00D4FF]" />
                        <span>{cert.issuer}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#00D4FF]" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-3xl w-full bg-[#0A0A0F] border border-gray-800 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,212,255,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{selectedCert.issuer} · {selectedCert.date}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Certificate Image */}
              <div className="p-6">
                <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-800 flex items-center justify-center min-h-[300px]">
                  <img
                    src={selectedCert.image}
                    alt={`${selectedCert.title} certificate`}
                    className="w-full h-auto object-contain max-h-[60vh]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder-text')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder-text flex flex-col items-center justify-center py-16 text-gray-500';
                        placeholder.innerHTML = `
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mb-4 text-gray-600"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg>
                          <p class="text-lg font-medium text-gray-400">Certificate image coming soon</p>
                          <p class="text-sm mt-1">The certificate image will be added shortly</p>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
