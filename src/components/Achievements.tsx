"use client";

import { motion } from "framer-motion";
import { Award, Terminal, CheckCircle2, CloudLightning } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: React.ElementType;
  badgeMockup: React.ReactNode;
}

const achievementsList: Milestone[] = [
  {
    id: "CERT-001",
    title: "Robotics Project Lead",
    issuer: "Pan-Atlantic University",
    date: "2025",
    description: "Led a design team in the mechanical and electrical integration of a 3DOF robotic arm for industrial and educational purposes.",
    icon: Award,
    badgeMockup: (
      <svg className="w-12 h-12 text-sky-blue/30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="#87ceeb" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="22" stroke="#87ceeb" strokeWidth="2" />
        <path d="M50,28 L50,72 M28,50 L72,50" stroke="#00d2ff" strokeWidth="1" />
        <circle cx="50" cy="50" r="4" className="fill-sky-blue stroke-none" />
      </svg>
    ),
  },
  {
    id: "CERT-003",
    title: "4 bit Comparator PCB",
    issuer: "Pan-Atlantic University",
    date: "2026",
    description: "I designed a 4-bit comparator PCB using Kicad 10.0.0, which was then fabricated from scratch using veroboards in my school lab.",
    icon: Terminal,
    badgeMockup: (
      <svg className="w-12 h-12 text-sky-blue/30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="#87ceeb" strokeWidth="2" />
        <path d="M35,45 L45,50 L35,55" stroke="#00d2ff" strokeWidth="2" />
        <line x1="50" y1="58" x2="60" y2="58" stroke="#87ceeb" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" stroke="#87ceeb" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>
    ),
  },
  {
    id: "CERT-004",
    title: "Voltage Stability Prediction ML model",
    issuer: "Pan Atlantic University",
    date: "2026",
    description: "I successfully created a voltage stability prediction model using Python and machine learning",
    icon: Award,
    badgeMockup: (
      <svg className="w-12 h-12 text-sky-blue/30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="25" y="25" width="50" height="50" rx="4" stroke="#87ceeb" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="15" stroke="#00d2ff" strokeWidth="1.5" />
        <path d="M50,35 L50,65 M35,50 L65,50" stroke="#87ceeb" strokeWidth="1" />
      </svg>
    ),
  },

];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative bg-black overflow-hidden">
      {/* Scanning backdrop */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-blue/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Credentials & Achievements
          </h2>
          <div className="glow-line mt-4 mx-auto w-48" />
        </div>

        {/* Achievements Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievementsList.map((item, index) => {
            const IconComp = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-lg neon-border-blue flex flex-col justify-between group cursor-none tech-corners laser-sweep"
              >
                {/* Tech corner brackets */}
                <div className="tech-corner-tl" />
                <div className="tech-corner-tr" />
                <div className="tech-corner-bl" />
                <div className="tech-corner-br" />
                <div>
                  {/* Badge Display Header */}
                  <div className="h-28 w-full bg-matte-gray/50 rounded border border-white/5 flex items-center justify-center p-4 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:10px_10px]" />

                    {/* Hologram secure watermark */}
                    <div className="absolute top-2 left-3 font-display text-[7px] text-sky-blue/20 select-none group-hover:text-electric-blue/40 transition-colors duration-300">
                      SECURE_ID // LEVEL_03
                    </div>

                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {item.badgeMockup}
                    </div>
                    {/* Badge ID */}
                    <span className="absolute bottom-2 right-3 font-display text-[8px] tracking-widest text-white/30 uppercase">
                      {item.id}
                    </span>
                  </div>

                  {/* Header Title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded bg-sky-blue/5 border border-sky-blue/20 text-sky-blue group-hover:border-sky-blue/30 group-hover:text-sky-blue transition-all duration-300">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-extrabold text-white uppercase tracking-wider">
                        {item.title}
                      </h3>
                      <span className="font-sans text-xs text-white/40 block mt-0.5">
                        {item.issuer}
                      </span>
                    </div>
                  </div>

                  {/* Description text */}
                  <p className="font-sans text-sm text-light-gray/70 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Footer validation */}
                <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between">
                  <span className="font-display text-[9px] tracking-widest text-sky-blue font-bold uppercase">
                    ISSUED // {item.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-display text-[9px] tracking-widest text-sky-blue neon-text-blue font-bold uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
