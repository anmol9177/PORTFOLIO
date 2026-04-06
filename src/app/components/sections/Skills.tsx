import { motion } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, ChevronRight } from "lucide-react";

/* ─── Skill Database ─── */
interface SkillEntry {
  name: string;
  proficiency: number;
  level: string;
  category: string;
  tools: string[];
  description: string;
  projects: string[];
}

const skillsDB: Record<string, SkillEntry> = {
  "machine learning": {
    name: "Machine Learning",
    proficiency: 90,
    level: "Advanced",
    category: "Core AI",
    tools: ["Scikit-learn", "XGBoost", "LightGBM", "Feature Engineering"],
    description:
      "End-to-end ML pipeline design — from data wrangling and feature engineering to model selection, hyperparameter tuning, and deployment.",
    projects: [
      "Predictive Analytics Dashboard",
      "Customer Churn Classifier",
      "Anomaly Detection System",
    ],
  },
  python: {
    name: "Python",
    proficiency: 95,
    level: "Expert",
    category: "Languages",
    tools: ["NumPy", "Pandas", "FastAPI", "Flask", "Asyncio"],
    description:
      "Primary language for data science, automation, and backend development. Proficient in writing clean, production-grade Python with type hints and testing.",
    projects: [
      "REST API for ML Models",
      "Data Pipeline Automation",
      "CLI Tooling Suite",
    ],
  },
  nlp: {
    name: "Natural Language Processing",
    proficiency: 85,
    level: "Advanced",
    category: "Core AI",
    tools: ["spaCy", "Hugging Face Transformers", "NLTK", "LangChain"],
    description:
      "Text classification, sentiment analysis, named entity recognition, and building conversational AI systems with transformer architectures.",
    projects: [
      "Sentiment Analysis Engine",
      "Document Summarizer",
      "AI Chatbot Framework",
    ],
  },
  "computer vision": {
    name: "Computer Vision",
    proficiency: 80,
    level: "Intermediate+",
    category: "Core AI",
    tools: ["OpenCV", "YOLO", "MediaPipe", "Albumentations"],
    description:
      "Object detection, image segmentation, and real-time video processing pipelines. Experience with both classical CV and deep learning-based approaches.",
    projects: [
      "Real-Time Object Detector",
      "Image Classification API",
      "Gesture Recognition System",
    ],
  },
  "deep learning": {
    name: "Deep Learning",
    proficiency: 88,
    level: "Advanced",
    category: "Core AI",
    tools: ["CNNs", "RNNs", "Transformers", "GANs", "Attention Mechanisms"],
    description:
      "Designing and training neural network architectures including convolutional, recurrent, and transformer-based models for complex pattern recognition.",
    projects: [
      "Image Generation with GANs",
      "Sequence-to-Sequence Models",
      "Transfer Learning Pipeline",
    ],
  },
  "tensorflow/pytorch": {
    name: "TensorFlow / PyTorch",
    proficiency: 87,
    level: "Advanced",
    category: "Frameworks",
    tools: ["TensorFlow 2.x", "PyTorch", "Keras", "TensorBoard", "ONNX"],
    description:
      "Building, training, and deploying deep learning models using both major frameworks. Comfortable with custom training loops, distributed training, and model optimization.",
    projects: [
      "Custom Object Detection Model",
      "Neural Style Transfer App",
      "Model Optimization Pipeline",
    ],
  },
  mlops: {
    name: "MLOps",
    proficiency: 75,
    level: "Intermediate",
    category: "Engineering",
    tools: ["Docker", "MLflow", "DVC", "GitHub Actions", "AWS SageMaker"],
    description:
      "CI/CD for ML models, experiment tracking, model versioning, containerized deployments, and monitoring model drift in production.",
    projects: [
      "Automated ML Pipeline",
      "Model Registry System",
      "A/B Testing Framework",
    ],
  },
  "llm applications": {
    name: "LLM Applications",
    proficiency: 92,
    level: "Expert",
    category: "Core AI",
    tools: ["OpenAI API", "LangChain", "RAG", "Prompt Engineering", "Vector DBs"],
    description:
      "Building production-ready applications powered by large language models — retrieval-augmented generation, agent architectures, fine-tuning, and prompt engineering.",
    projects: [
      "RAG-Powered Knowledge Base",
      "AI Code Review Assistant",
      "Multi-Agent Orchestration System",
    ],
  },
};

const AVAILABLE_COMMANDS = [
  "help",
  "list",
  "clear",
  "all",
  ...Object.keys(skillsDB),
];

/* ─── Terminal line types ─── */
type LineType = "input" | "output" | "system" | "error" | "bar" | "divider";

interface TerminalLine {
  id: number;
  type: LineType;
  content: string;
  color?: string;
  barWidth?: number;           // for proficiency bar
  barGradient?: string;
}

/* ─── Proficiency bar gradient ─── */
function profGradient(p: number): string {
  if (p >= 90) return "from-emerald-400 to-cyan-400";
  if (p >= 80) return "from-cyan-400 to-blue-400";
  if (p >= 70) return "from-blue-400 to-indigo-400";
  return "from-indigo-400 to-purple-400";
}

/* ─── Generate output lines for a skill ─── */
let lineId = 0;
const nextId = () => ++lineId;

function generateSkillOutput(skill: SkillEntry): TerminalLine[] {
  const lines: TerminalLine[] = [];
  const push = (type: LineType, content: string, extra?: Partial<TerminalLine>) =>
    lines.push({ id: nextId(), type, content, ...extra });

  push("divider", "");
  push("system", `  ┌─ ${skill.name.toUpperCase()} ───────────────────────────`);
  push("output", `  │`);
  push("output", `  │  Category      ${skill.category}`);
  push("output", `  │  Level         ${skill.level}`);
  push("output", `  │  Proficiency   ${skill.proficiency}%`);
  push("bar",    `  │`, { barWidth: skill.proficiency, barGradient: profGradient(skill.proficiency) });
  push("output", `  │`);
  push("system", `  │  ► Tools & Frameworks`);
  push("output", `  │    ${skill.tools.join("  ·  ")}`);
  push("output", `  │`);
  push("system", `  │  ► Description`);

  // wrap description into ~60 char lines
  const words = skill.description.split(" ");
  let line = "  │    ";
  for (const word of words) {
    if ((line + word).length > 68) {
      push("output", line);
      line = "  │    " + word + " ";
    } else {
      line += word + " ";
    }
  }
  if (line.trim() !== "│") push("output", line);

  push("output", `  │`);
  push("system", `  │  ► Related Projects`);
  for (const proj of skill.projects) {
    push("output", `  │    ◆ ${proj}`);
  }
  push("output", `  │`);
  push("system", `  └──────────────────────────────────────`);

  return lines;
}

function generateHelpOutput(): TerminalLine[] {
  const lines: TerminalLine[] = [];
  const push = (type: LineType, content: string) =>
    lines.push({ id: nextId(), type, content });

  push("divider", "");
  push("system", "  Available commands:");
  push("output", "");
  push("output", "  skill <name>    Query a specific skill");
  push("output", "  list            Show all available skills");
  push("output", "  all             Display all skills overview");
  push("output", "  clear           Clear the terminal");
  push("output", "  help            Show this help message");
  push("output", "");
  push("system", "  Or click any skill chip below to query it.");
  push("output", "");

  return lines;
}

function generateListOutput(): TerminalLine[] {
  const lines: TerminalLine[] = [];
  const push = (type: LineType, content: string) =>
    lines.push({ id: nextId(), type, content });

  push("divider", "");
  push("system", "  ┌─ SKILL INDEX ──────────────────────────");
  push("output", "  │");

  const entries = Object.values(skillsDB);
  for (const skill of entries) {
    const bar = "█".repeat(Math.round(skill.proficiency / 5));
    const empty = "░".repeat(20 - Math.round(skill.proficiency / 5));
    push("output", `  │  ${skill.name.padEnd(22)} ${bar}${empty}  ${skill.proficiency}%`);
  }

  push("output", "  │");
  push("system", "  └──────────────────────────────────────────");
  push("output", "");

  return lines;
}

function generateAllOutput(): TerminalLine[] {
  const lines: TerminalLine[] = [];
  for (const skill of Object.values(skillsDB)) {
    lines.push(...generateSkillOutput(skill));
  }
  return lines;
}

/* ─── Boot-up sequence ─── */
function bootLines(): TerminalLine[] {
  return [
    { id: nextId(), type: "system", content: "  ╔══════════════════════════════════════════════════╗" },
    { id: nextId(), type: "system", content: "  ║     ANMOL ARORA — SKILL MATRIX v2.4.1           ║" },
    { id: nextId(), type: "system", content: "  ║     Neural Subsystem Online                      ║" },
    { id: nextId(), type: "system", content: "  ╚══════════════════════════════════════════════════╝" },
    { id: nextId(), type: "output", content: "" },
    { id: nextId(), type: "output", content: "  System initialized. 8 skill modules loaded." },
    { id: nextId(), type: "output", content: "  Type \"help\" for commands or click a skill below." },
    { id: nextId(), type: "output", content: "" },
  ];
}

/* ─── Component ─── */
export function Skills() {
  const [lines, setLines] = useState<TerminalLine[]>(bootLines);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // auto-scroll to bottom whenever lines change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  /* ─── Animated line output ─── */
  const outputLines = useCallback(
    (newLines: TerminalLine[]) => {
      setIsTyping(true);
      let i = 0;
      const batch = 3; // lines per tick for speed
      const interval = setInterval(() => {
        const chunk = newLines.slice(i, i + batch);
        if (chunk.length === 0) {
          clearInterval(interval);
          setIsTyping(false);
          return;
        }
        setLines((prev) => [...prev, ...chunk]);
        i += batch;
      }, 40);
    },
    []
  );

  /* ─── Process command ─── */
  const processCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      // echo the input line
      setLines((prev) => [
        ...prev,
        { id: nextId(), type: "input", content: `  anmol@skills ~$ ${raw}` },
      ]);

      if (cmd === "" ) return;
      if (cmd === "clear") {
        setLines(bootLines());
        return;
      }
      if (cmd === "help") {
        outputLines(generateHelpOutput());
        return;
      }
      if (cmd === "list") {
        outputLines(generateListOutput());
        return;
      }
      if (cmd === "all") {
        outputLines(generateAllOutput());
        return;
      }

      // try direct skill match
      const skillKey = cmd.replace(/^skill\s+/, "");
      const skill = skillsDB[skillKey];
      if (skill) {
        outputLines(generateSkillOutput(skill));
        return;
      }

      // fuzzy match
      const match = Object.keys(skillsDB).find(
        (k) => k.includes(skillKey) || skillKey.includes(k)
      );
      if (match) {
        outputLines(generateSkillOutput(skillsDB[match]));
        return;
      }

      outputLines([
        {
          id: nextId(),
          type: "error",
          content: `  ⚠ Skill "${raw}" not found. Type "list" to see available skills.`,
        },
      ]);
    },
    [outputLines]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    processCommand(input);
    setInput("");
  };

  const handleChipClick = (skillKey: string) => {
    if (isTyping) return;
    processCommand(skillKey);
    inputRef.current?.focus();
  };

  const skillChips = Object.entries(skillsDB);

  return (
    <section
      id="skills"
      className="h-screen snap-start flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-10">
            Technical <span className="text-[#00D4FF]">Skills</span>
          </h2>

          {/* ── Terminal Window ── */}
          <div className="rounded-2xl border border-gray-800 bg-[#0B0B12] overflow-hidden shadow-[0_0_60px_rgba(0,212,255,0.08)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111118] border-b border-gray-800">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 ml-3 text-xs text-gray-500 font-mono">
                <Terminal className="w-3.5 h-3.5" />
                skill-matrix — anmol@portfolio
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="h-[340px] overflow-y-auto p-4 font-mono text-sm leading-relaxed cursor-text scrollbar-thin"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#00D4FF33 transparent",
              }}
            >
              {lines.map((line) => (
                <div key={line.id} className="min-h-[1.4em]">
                  {line.type === "input" && (
                    <span className="text-[#00D4FF]">{line.content}</span>
                  )}
                  {line.type === "output" && (
                    <span className="text-gray-300">{line.content}</span>
                  )}
                  {line.type === "system" && (
                    <span className="text-[#00D4FF]/80">{line.content}</span>
                  )}
                  {line.type === "error" && (
                    <span className="text-red-400">{line.content}</span>
                  )}
                  {line.type === "bar" && (
                    <span className="text-gray-300">
                      {line.content}
                      {"  "}
                      <span className="inline-block align-middle">
                        <span
                          className={`inline-block h-2 rounded-full bg-gradient-to-r ${line.barGradient}`}
                          style={{ width: `${(line.barWidth || 0) * 2.5}px` }}
                        />
                        <span
                          className="inline-block h-2 rounded-full bg-gray-800"
                          style={{
                            width: `${(100 - (line.barWidth || 0)) * 2.5}px`,
                          }}
                        />
                      </span>
                    </span>
                  )}
                  {line.type === "divider" && (
                    <span className="text-gray-700">{line.content}</span>
                  )}
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleSubmit} className="flex items-center mt-1">
                <span className="text-[#00D4FF] whitespace-pre">
                  {"  anmol@skills ~$ "}
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-gray-100 outline-none caret-[#00D4FF] font-mono text-sm"
                  autoComplete="off"
                  spellCheck={false}
                />
                {isTyping && (
                  <span className="ml-1 inline-block w-2 h-4 bg-[#00D4FF] animate-pulse rounded-sm" />
                )}
              </form>
            </div>
          </div>

          {/* ── Skill Chips ── */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {skillChips.map(([key, skill], index) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChipClick(key)}
                className="group relative px-4 py-2 bg-[#0B0B12] border border-gray-800 rounded-full text-sm font-mono text-gray-300 hover:text-[#00D4FF] hover:border-[#00D4FF]/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all cursor-pointer"
              >
                <ChevronRight className="w-3 h-3 inline-block mr-1 text-gray-600 group-hover:text-[#00D4FF] transition-colors" />
                {skill.name}
                <span className="ml-2 text-xs text-gray-600 group-hover:text-[#00D4FF]/60 transition-colors">
                  {skill.proficiency}%
                </span>
              </motion.button>
            ))}
          </div>

          {/* hint */}
          <p className="text-center text-xs text-gray-600 mt-4 font-mono">
            click a skill or type a command — try{" "}
            <span
              className="text-[#00D4FF]/60 cursor-pointer hover:text-[#00D4FF] transition-colors"
              onClick={() => handleChipClick("list")}
            >
              "list"
            </span>
            {" "}or{" "}
            <span
              className="text-[#00D4FF]/60 cursor-pointer hover:text-[#00D4FF] transition-colors"
              onClick={() => handleChipClick("all")}
            >
              "all"
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
