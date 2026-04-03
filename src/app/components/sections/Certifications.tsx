import { motion } from "motion/react";
import { Award, Calendar } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "March 2026",
  },
  {
    id: 2,
    title: "AWS Machine Learning Specialty",
    issuer: "Amazon Web Services",
    date: "January 2026",
  },
  {
    id: 3,
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "December 2025",
  },
  {
    id: 4,
    title: "Natural Language Processing",
    issuer: "Stanford Online",
    date: "October 2025",
  },
  {
    id: 5,
    title: "Advanced Computer Vision",
    issuer: "Coursera",
    date: "August 2025",
  },
  {
    id: 6,
    title: "MLOps Engineering",
    issuer: "DataCamp",
    date: "June 2025",
  },
];

export function Certifications() {
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

                  {/* Card */}
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-[#00D4FF] transition-colors">
                    <h3 className="text-lg font-semibold mb-3">{cert.title}</h3>

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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
