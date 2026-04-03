import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const mockResponses = [
  "Anmol has 3+ years of experience in AI/ML development, specializing in NLP and computer vision. He's completed 15+ projects and holds 6 professional certifications.",
  "Anmol is proficient in Python, TensorFlow, PyTorch, and has hands-on experience building LLM applications using GPT-4, LangChain, and vector databases.",
  "Anmol is currently pursuing a Bachelor's in Computer Science with a focus on Artificial Intelligence at a top university. He maintains a strong academic record while contributing to open-source AI projects.",
  "You can reach Anmol at anmolarora9177@gmail.com or connect via LinkedIn. He typically responds within 24 hours and is actively seeking opportunities starting Summer 2026.",
  "Anmol has completed certifications including TensorFlow Developer (Google), AWS ML Specialty, Deep Learning Specialization (DeepLearning.AI), and advanced courses in NLP and Computer Vision.",
  "Notable projects include: Neural Style Transfer with PyTorch, a sentiment analysis engine with BERT, GPT-powered code assistant, real-time object detection with YOLO, medical image classifier, and a RAG-based chatbot.",
  "Anmol's strongest skills are Machine Learning (90%), Python (95%), and LLM Applications (92%). He also has expertise in MLOps, computer vision, and NLP.",
  "Anmol is passionate about building AI systems that solve real-world problems. He's particularly interested in LLM applications, multimodal AI, and responsible AI development.",
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    {
      text: "👋 Hi! I'm Anmol's AI Twin. Ask me anything about his experience, skills, projects, or availability!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)] || "Hello!";
      setMessages((prev) => [...prev, { text: randomResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button - More Prominent */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-[#00D4FF] to-cyan-400 shadow-[0_0_40px_rgba(0,212,255,0.6)] hover:shadow-[0_0_60px_rgba(0,212,255,0.8)] transition-all flex items-center justify-center group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Ring */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-[#00D4FF]"
          />
        )}
      </motion.button>

      {/* Label - Show when closed */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-10 right-28 z-50 px-4 py-2 bg-[#00D4FF] text-black text-sm font-medium rounded-lg shadow-lg"
        >
          💬 Chat with my AI Twin!
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#00D4FF]" />
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-50 w-96 h-[600px] bg-gray-900 rounded-2xl border-2 border-[#00D4FF] shadow-[0_0_60px_rgba(0,212,255,0.4)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00D4FF] to-cyan-400 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="font-semibold text-black">AI Twin Assistant</div>
                <div className="text-xs text-black/80">
                  Ask me about Anmol's experience
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-lg ${
                      message.isBot
                        ? "bg-gray-800 text-gray-100"
                        : "bg-[#00D4FF] text-black"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Anmol's skills..."
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#00D4FF] focus:outline-none text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping}
                  className="w-10 h-10 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00E5FF] transition-all flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
