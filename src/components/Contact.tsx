"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Github, Linkedin, Twitter, Mail, Terminal as TermIcon } from "lucide-react";

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // CLI State
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ type: "input" | "output" | "error" | "success"; text: string }>
  >([
    { type: "output", text: "Portfolio Terminal [Version 1.0.4]" },
    { type: "output", text: "Initializing telemetry connection bridge..." },
    { type: "output", text: "Type 'help' to view available system commands." },
    { type: "output", text: "" },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalStep, setTerminalStep] = useState<"idle" | "name" | "email" | "message">("idle");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cliContactData, setCliContactData] = useState({ name: "", email: "", message: "" });
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Mock transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Synchronize with the CLI terminal history for a unified feel!
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: `[SYSTEM] Message received from ${formData.name} via transmission panel.` },
        { type: "success", text: `[SUCCESS] Connection bridged successfully.` }
      ]);

      // Reset success notification after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = terminalInput.trim();
    if (!input && terminalStep === "idle") return;

    // Log the user input to terminal
    setTerminalHistory((prev) => [...prev, { type: "input", text: input || " " }]);
    setTerminalInput("");

    // Interactive contact flow
    if (terminalStep === "name") {
      setCliContactData((prev) => ({ ...prev, name: input }));
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: `Signal Owner registered: "${input}"` },
        { type: "output", text: "Enter your email address (Signal Origin):" }
      ]);
      setTerminalStep("email");
      return;
    }

    if (terminalStep === "email") {
      setCliContactData((prev) => ({ ...prev, email: input }));
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: `Signal Origin registered: "${input}"` },
        { type: "output", text: "Enter your payload message (Encrypted Payload):" }
      ]);
      setTerminalStep("message");
      return;
    }

    if (terminalStep === "message") {
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: `Payload registered: "${input}"` },
        { type: "output", text: "Transmitting payload to host..." }
      ]);

      // Mock latency
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "success", text: "[SUCCESS] Transmission bridged successfully." },
          { type: "success", text: `Bridge signal logged under reference SECURE_ID // LEVEL_03` }
        ]);
        setTerminalStep("idle");
      }, 1200);
      return;
    }

    // Normal command line mode
    const parts = input.toLowerCase().split(" ");
    const cmd = parts[0];

    switch (cmd) {
      case "help":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "System command registry:" },
          { type: "output", text: "  about        - Print profile summary details" },
          { type: "output", text: "  experience   - Output professional record log" },
          { type: "output", text: "  education    - Log academic enrollment details" },
          { type: "output", text: "  achievements - Log credential registry records" },
          { type: "output", text: "  skills       - Output technical capability index" },
          { type: "output", text: "  projects     - Log recent featured archives" },
          { type: "output", text: "  contact      - Initiate interactive connection bridge" },
          { type: "output", text: "  clear        - Clear terminal history logs" },
          { type: "output", text: "  help         - Log active command directory" }
        ]);
        break;
      case "about":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "PROFILE SUMMARY:" },
          { type: "output", text: "Ebuka Eleogu is an Electrical/Electronics student at Pan-Atlantic" },
          { type: "output", text: "University and a Junior Electrical Intern at Ikeja Electric." },
          { type: "output", text: "Focuses on multilayer PCB layouts, smart grid power distribution," },
          { type: "output", text: "circuit design in KiCad, and voltage stability forecasting." }
        ]);
        break;
      case "experience":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "PROFESSIONAL RECORD LOG:" },
          { type: "output", text: "  - Junior Electrical Intern @ Ikeja Electric (2026 - PRESENT)" },
          { type: "output", text: "    * Meter QA, compliance audits, fault analysis, grid diagnostics" },
          { type: "output", text: "  - Science Student @ Maryland Comprehensive Secondary School (2016 - 2023)" },
          { type: "output", text: "    * UTME score: 275, WASSCE distinctions" }
        ]);
        break;
      case "education":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "ACADEMIC ENROLLMENT DETAILS:" },
          { type: "output", text: "  - Bachelor of Science, Electrical & Electronics" },
          { type: "output", text: "    Pan-Atlantic University (Lagos, Nigeria)" },
          { type: "output", text: "    Key Courseworks: Circuit Theory, Digital Systems, Power Systems" }
        ]);
        break;
      case "achievements":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "CREDENTIAL REGISTRY RECORDS:" },
          { type: "output", text: "  - CERT-001: Robotics Project Lead (Pan-Atlantic University)" },
          { type: "output", text: "  - CERT-002: 4-bit Comparator PCB (Veroboard Lab Fabrication)" },
          { type: "output", text: "  - CERT-003: Voltage Stability Prediction ML Model (Python)" }
        ]);
        break;
      case "skills":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "TECHNICAL ARSENAL INDEX:" },
          { type: "output", text: "  - CAD/PCB Design: KiCad, Fusion 360, Multilayer Routing" },
          { type: "output", text: "  - Circuit & Prototyping: Veroboard Layouts, Hand Soldering, Breadboarding" },
          { type: "output", text: "  - Power & Signals: Smart Grid Testing, Fault Analysis, Power Quality" },
          { type: "output", text: "  - Code & ML: C++, Python, Microcontrollers (Arduino/ESP32), Machine Learning" }
        ]);
        break;
      case "projects":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "FEATURED WORK ARCHIVES:" },
          { type: "output", text: "  1. 3DOF Robotic Arm (Mechanical Design & Build — From Scratch)" },
          { type: "output", text: "  2. 4-bit Magnitude Comparator (KiCad Schematic & PCB Design)" },
          { type: "output", text: "  3. Voltage Stability Prediction Model (Python Smart Grid ML analysis)" }
        ]);
        break;
      case "clear":
        setTerminalHistory([]);
        break;
      case "contact":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Initializing telemetry connection wizard..." },
          { type: "output", text: "Enter your name (User Identifier):" }
        ]);
        setTerminalStep("name");
        break;
      default:
        setTerminalHistory((prev) => [
          ...prev,
          { type: "error", text: `Command not found: "${cmd}". Type 'help' for support.` }
        ]);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-black overflow-hidden">
      {/* Background visual details */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sky-blue/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Establish Connection
          </h2>
          <div className="glow-line mt-4 mx-auto w-48" />
        </div>

        {/* 2-Column High-tech cockpit: CLI Terminal on Left, Contact form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CLI Terminal Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="flex flex-col flex-1 terminal-window rounded-lg border border-white/5 overflow-hidden font-mono text-xs">
              {/* Window Header */}
              <div className="flex items-center justify-between bg-matte-gray/60 px-4 py-3 border-b border-white/5 select-none">
                <div className="flex items-center gap-2">
                  <TermIcon className="w-3.5 h-3.5 text-sky-blue" />
                  <span className="font-display text-[10px] tracking-wider text-white font-bold uppercase">
                    EBUKA-PORTFOLIO // CLI_BRIDGE
                  </span>
                </div>
                {/* Simulated dot window controls */}
                <div className="flex gap-1.5 opacity-60">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-sky-blue/60" />
                </div>
              </div>

              {/* Scrollable Output Screen */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 min-h-[300px] max-h-[380px] terminal-scrollbar select-text">
                {terminalHistory.map((item, idx) => {
                  if (item.type === "input") {
                    return (
                      <div key={idx} className="flex gap-1 text-white/50">
                        <span className="text-sky-blue font-bold">guest@portfolio:~$</span>
                        <span>{item.text}</span>
                      </div>
                    );
                  }
                  if (item.type === "error") {
                    return (
                      <div key={idx} className="text-red-400 leading-relaxed">
                        {item.text}
                      </div>
                    );
                  }
                  if (item.type === "success") {
                    return (
                      <div key={idx} className="text-electric-blue font-bold leading-relaxed neon-text-blue">
                        {item.text}
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="text-light-gray/80 leading-relaxed">
                      {item.text}
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Form Input Prompt */}
              <form onSubmit={handleTerminalSubmit} className="border-t border-white/5 bg-matte-gray/30 p-3 flex items-center gap-1.5">
                <span className="text-sky-blue font-bold select-none">
                  {terminalStep === "idle" ? "guest@portfolio:~$" : "prompt>"}
                </span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder={terminalStep === "idle" ? "Type command..." : "Enter value..."}
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder-white/10 caret-[#00d2ff]"
                  autoComplete="off"
                />
                <span className="terminal-cursor select-none" />
              </form>
            </div>

            {/* Direct details below terminal */}
            <div className="mt-4 p-4 border border-white/[0.03] bg-black/40 rounded-lg flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-blue" />
                <a href="mailto:eleogujoseph007@gmail.com" className="font-sans text-xs text-white/60 hover:text-sky-blue transition-colors cursor-none">
                  eleogujoseph007@gmail.com
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/itsebuka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded border border-sky-blue/20 bg-sky-blue/5 text-sky-blue hover:text-sky-blue hover:border-sky-blue/40 transition-all duration-300 cursor-none"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded border border-sky-blue/20 bg-sky-blue/5 text-sky-blue hover:text-sky-blue hover:border-sky-blue/40 transition-all duration-300 cursor-none"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/eleoguuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded border border-sky-blue/20 bg-sky-blue/5 text-sky-blue hover:text-sky-blue hover:border-sky-blue/40 transition-all duration-300 cursor-none"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-lg border border-white/5 relative h-full flex flex-col justify-between tech-corners laser-sweep">
              {/* Tech corner brackets */}
              <div className="tech-corner-tl" />
              <div className="tech-corner-tr" />
              <div className="tech-corner-bl" />
              <div className="tech-corner-br" />

              {/* Command line initiate transmission header prompt */}
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 select-none pointer-events-none font-display text-[9.5px] tracking-widest text-white/40">
                <span className="text-sky-blue font-bold">Ebuka&apos;s Portfolio</span>
                <span className="animate-pulse">initiate_transmission --port 443</span>
              </div>

              <div className="flex flex-col gap-6 flex-1 justify-center">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-display text-[10px] tracking-widest text-light-gray/60 uppercase">
                    User Identifier
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter name..."
                    className="font-sans text-sm text-white bg-black/40 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-sky-blue focus:ring-1 focus:ring-sky-blue/20 placeholder-white/20 transition-all duration-300"
                    autoComplete="off"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-display text-[10px] tracking-widest text-light-gray/60 uppercase">
                    Signal Origin (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email..."
                    className="font-sans text-sm text-white bg-black/40 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-sky-blue focus:ring-1 focus:ring-sky-blue/20 placeholder-white/20 transition-all duration-300"
                    autoComplete="off"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-display text-[10px] tracking-widest text-light-gray/60 uppercase">
                    Encrypted Payload
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Type message..."
                    className="font-sans text-sm text-white bg-black/40 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-sky-blue focus:ring-1 focus:ring-sky-blue/20 placeholder-white/20 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`neon-btn-blue w-full font-display font-bold tracking-widest text-xs py-4 px-6 rounded uppercase cursor-none transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border border-t-transparent border-sky-blue animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Signal</span>
                    </>
                  )}
                </button>
              </div>

              {/* Transmission success screen overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-black/95 rounded-lg flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm z-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="text-sky-blue mb-4"
                    >
                      <CheckCircle2 className="w-16 h-16 shadow-[0_0_15px_rgba(135,206,235,0.2)]" />
                    </motion.div>
                    <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2">
                      Transmission Terminated
                    </h4>
                    <p className="font-sans text-xs text-sky-blue neon-text-blue uppercase tracking-widest mb-4">
                      Status: Success | Signal Logged
                    </p>
                    <p className="font-sans text-sm text-light-gray/60 max-w-xs">
                      Connection successfully bridged. Payload received and processed.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
