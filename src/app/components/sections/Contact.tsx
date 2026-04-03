import { motion } from "motion/react";
import { Mail, Linkedin, Github, Send, Briefcase, Phone } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! I'll get back to you soon.");
  };

  return (
    <section id="contact" className="h-screen snap-start flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            Let's <span className="text-[#00D4FF]">Connect</span>
          </h2>

          {/* Status Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Available for internships & full-time roles</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Social Links */}
            <div className="space-y-6">
              <a
                href="tel:8076472877"
                className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-[#00D4FF] transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center group-hover:bg-[#00D4FF] transition-colors">
                  <Phone className="w-6 h-6 text-[#00D4FF] group-hover:text-black" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="font-medium">+91 8076472877</div>
                </div>
              </a>

              <a
                href="mailto:anmolarora9177@gmail.com"
                className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-[#00D4FF] transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center group-hover:bg-[#00D4FF] transition-colors">
                  <Mail className="w-6 h-6 text-[#00D4FF] group-hover:text-black" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="font-medium">anmolarora9177@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/anmolarora917/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-[#00D4FF] transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center group-hover:bg-[#00D4FF] transition-colors">
                  <Linkedin className="w-6 h-6 text-[#00D4FF] group-hover:text-black" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">LinkedIn</div>
                  <div className="font-medium">linkedin.com/in/anmolarora917</div>
                </div>
              </a>

              <a
                href="https://github.com/anmol9177"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-[#00D4FF] transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center group-hover:bg-[#00D4FF] transition-colors">
                  <Github className="w-6 h-6 text-[#00D4FF] group-hover:text-black" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">GitHub</div>
                  <div className="font-medium">github.com/anmol9177</div>
                </div>
              </a>
            </div>

            {/* Right: Quick Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-[#00D4FF] focus:outline-none transition-colors"
                required
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-[#00D4FF] focus:outline-none transition-colors"
                required
              />

              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's discuss your project..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-[#00D4FF] focus:outline-none transition-colors resize-none"
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-[#00D4FF] text-black font-semibold rounded-lg hover:bg-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Footer Note for Hiring Managers */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <Briefcase className="w-4 h-4 text-[#00D4FF]" />
              <span>
                Hiring managers: Try the AI chat assistant (bottom-right) to learn more about my experience!
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
