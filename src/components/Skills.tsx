"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Cpu,
  Layers,
  Terminal,
  Shield,
  FileCode2,
  Server,
  Workflow,
  Radio
} from "lucide-react";

interface SkillCategory {
  title: string;
  description: string;
  icon: React.ElementType;
  skills: string[];
  integrity: number;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Hardware Design & CAD",
    description: "Multilayer PCB routing, mechanical CAD layout, and enclosure modeling",
    icon: Cpu,
    skills: ["KiCad", "Fusion 360", "Altium Designer", "Multilayer Signal Integrity", "Enclosure Tolerances", "DFM (Design for Manufacture)"],
    integrity: 60,
  },
  {
    title: "Power Systems & Diagnostics",
    description: "Smart grid telemetry, meter QA, network diagnostics, and fault analysis",
    icon: Radio,
    skills: ["Power Systems", "Fault Analysis", "Power Quality Assessment", "Network Troubleshooting", "Field Testing", "Safety Compliance"],
    integrity: 30,
  },
  {
    title: "Embedded Code & Microcontrollers",
    description: "Low-latency firmware, communication protocols, and hardware integration",
    icon: Terminal,
    skills: ["C++", "Python", "Microcontrollers (Arduino/ESP32)", "Bare Metal Firmware", "I2C/SPI/UART", "Soldering & Breadboarding"],
    integrity: 30,
  },
  {
    title: "ML & Smart Systems",
    description: "Data analytics, machine learning predictive models, and sensor processing",
    icon: Shield,
    skills: ["Machine Learning", "Data Analytics (Python)", "Voltage Stability Prediction", "Signal Processing", "OpenCV", "Predictive Modeling"],
    integrity: 40,
  },
];

// Flat list of skills for the scrolling marquee ticker
const marqueeSkills = [
  { name: "KiCad", icon: Cpu },
  { name: "Fusion 360", icon: Layers },
  { name: "C++", icon: Code },
  { name: "Python", icon: FileCode2 },
  { name: "Power Systems", icon: Radio },
  { name: "PCB Layout", icon: Cpu },
  { name: "Arduino", icon: Database },
  { name: "ESP32", icon: Server },
  { name: "Fault Analysis", icon: Shield },
  { name: "Proteus", icon: Workflow },
  { name: "Diagnostics", icon: Terminal },
];

const getBarColor = (val: number) => {
  if (val > 80) return "from-green-600 to-green-800 shadow-[0_0_8px_rgba(22,163,74,0.6)]";
  if (val >= 60) return "from-green-400 to-green-600 shadow-[0_0_8px_rgba(74,222,128,0.6)]";
  if (val > 30) return "from-yellow-400 to-yellow-600 shadow-[0_0_8px_rgba(250,204,21,0.6)]";
  return "from-red-500 to-red-700 shadow-[0_0_8px_rgba(239,68,68,0.6)]";
};

const getTextColor = (val: number) => {
  if (val > 80) return "text-green-600";
  if (val >= 60) return "text-green-400";
  if (val > 30) return "text-yellow-400";
  return "text-red-500";
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-black overflow-hidden">
      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-blue/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Technical Arsenal
          </h2>
          <div className="glow-line mt-4 mx-auto w-48" />
        </div>

        {/* 1. Infinite Horizontal Scrolling Marquee */}
        <div className="w-full overflow-hidden py-6 border-y border-white/5 bg-black/40 backdrop-blur-sm mb-20 relative">
          {/* Fading gradient mask on sides */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee gap-8 pr-8">
            {/* Render twice for continuous scrolling */}
            {[...marqueeSkills, ...marqueeSkills].map((skill, index) => {
              const IconComp = skill.icon;
              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex items-center gap-2.5 px-6 py-2.5 rounded-md border border-white/5 bg-matte-gray/50 text-white font-display text-sm tracking-widest uppercase hover:border-sky-blue/30 hover:bg-sky-blue/5 transition-all duration-300 shadow-[0_0_5px_rgba(255,255,255,0.01)]"
                >
                  <IconComp className="w-4 h-4 text-sky-blue" />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Categorized Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => {
            const IconComp = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                className="glass-panel p-8 rounded-lg neon-border-blue flex flex-col group tech-corners laser-sweep"
              >
                {/* Tech corner brackets */}
                <div className="tech-corner-tl" />
                <div className="tech-corner-tr" />
                <div className="tech-corner-bl" />
                <div className="tech-corner-br" />
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg border border-sky-blue/20 bg-sky-blue/5 text-sky-blue group-hover:text-sky-blue group-hover:border-sky-blue/40 group-hover:bg-sky-blue/5 transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                      {category.title}
                    </h3>
                    <p className="font-sans text-xs text-white/50">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* High-tech efficiency parameter bar */}
                <div className="mb-6 w-full bg-black/50 p-4 border border-white/5 rounded">
                  <div className="flex justify-between items-center mb-2 font-display text-[9px] tracking-wider text-white/50">
                    <span>INTEGRITY INDEX</span>
                    <span className={`${getTextColor(category.integrity)} font-bold`}>{category.integrity}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.integrity}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`absolute left-0 top-0 h-full bg-gradient-to-r ${getBarColor(category.integrity)}`} 
                    />
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-sans text-xs text-light-gray/80 px-3 py-1.5 rounded bg-white/2 border border-white/5 hover:border-sky-blue/30 hover:text-sky-blue transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
