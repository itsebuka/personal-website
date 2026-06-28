"use client";

import { motion } from "framer-motion";
import { Calendar, CheckSquare } from "lucide-react";

interface Role {
  period: string;
  company: string;
  title: string;
  bullets: string[];
  skillsApplied: string[];
  active?: boolean;
}

const professionalLog: Role[] = [
  {
    period: "2026 - PRESENT",
    company: "Ikeja Electric Distribution Company",
    title: "Junior Electrical Engineering Intern",
    bullets: [
      "Performing quality assurance on meter installations and ensuring compliance with safety standards",
      "Assisting senior engineers in fault analysis, network troubleshooting, and power quality assessments across distribution substations",
      "Conducting field tests, logging meter readings, and maintaining comprehensive technical documentation for grid operations"
    ],
    skillsApplied: ["Power Systems", "Fault Analysis", "Power Quality Assessment", "Network Troubleshooting", "Field Testing", "Documentation", "Safety Standards", "Meter Installation", "Grid Operations", "Technical Documentation"],
    active: true,
  },
  {
    period: "2016 - 2023",
    company: "Maryland Comprehensive Secondary School",
    title: "Science Student",
    bullets: [
      "Graduated with a 275 in the Unified Tertiary Matriculation Examination (UTME)",
      "Graduated with a distinction in the West African Senior School Certificate Examination (WASSCE)",
      "Gained admission into Pan-Atlantic University to study Electrical and Electronics Engineering"
    ],
    skillsApplied: ["Grit", "Determination", "Perseverance", "Resilience", "Discipline"],
  },
  {
    period: "N/A",
    company: "None yet",
    title: "None yet",
    bullets: [
      "Coming soon...",
    ],
    skillsApplied: ["N/A"],
  },
];


export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-black overflow-hidden">
      {/* Visual cyber layout lines */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-blue/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Professional Timeline
          </h2>
          <div className="glow-line mt-4 mx-auto w-48" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/5 ml-4 md:ml-40 flex flex-col gap-12">
          {/* Laser-glow overlay line on the timeline border */}
          <div className="absolute left-[-1.5px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-sky-blue via-electric-blue to-transparent shadow-[0_0_10px_#00d2ff]" />

          {professionalLog.map((role, index) => (
            <motion.div
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 md:pl-12 group"
            >

              {/* Timeline Indicator Ring */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-matte-black border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125" style={{
                borderColor: role.active ? "#00d2ff" : "#87ceeb",
                boxShadow: role.active
                  ? "0 0 10px #00d2ff, inset 0 0 5px #00d2ff"
                  : "0 0 8px rgba(135,206,235,0.4)"
              }}>
                {role.active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-ping" />
                )}
              </div>

              {/* Mobile Period Badge (shown on top for mobile, hidden on desktop) */}
              <div className="md:hidden inline-block mb-3 px-3 py-1 rounded bg-white/2 border border-white/5 font-display text-[9px] tracking-widest text-sky-blue font-bold">
                {role.period}
              </div>

              {/* Desktop Period Badge (absolute on the left side) */}
              <div className="hidden md:block absolute -left-48 top-1 w-36 text-right font-display text-xs tracking-[0.2em] text-white/50 group-hover:text-sky-blue transition-colors duration-300">
                <span className="flex items-center justify-end gap-2 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-sky-blue" />
                  {role.period}
                </span>
              </div>

              {/* Experience Card */}
              <div className="glass-panel p-8 rounded-lg border border-white/5 group-hover:border-sky-blue/30 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.2)] tech-corners laser-sweep">
                {/* Tech corner brackets */}
                <div className="tech-corner-tl" />
                <div className="tech-corner-tr" />
                <div className="tech-corner-bl" />
                <div className="tech-corner-br" />

                {/* Header info */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider">
                      {role.title}
                    </h3>
                    <span className="font-sans text-sm text-sky-blue font-semibold mt-1 inline-block">
                      @ {role.company}
                    </span>
                  </div>
                  {role.active && (
                    <span className="flex items-center gap-1.5 font-display text-[9px] tracking-widest text-sky-blue border border-sky-blue/30 bg-sky-blue/5 px-2.5 py-1 rounded font-bold uppercase shadow-[0_0_8px_rgba(135,206,235,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                      Active Thread
                    </span>
                  )}
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-3 mb-6">
                  {role.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-3 font-sans text-sm text-light-gray/80 leading-relaxed">
                      <CheckSquare className="w-4 h-4 text-sky-blue mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-auto">
                  {role.skillsApplied.map((skill) => (
                    <span
                      key={skill}
                      className="font-sans text-[10px] tracking-wider text-light-gray/60 px-2 py-0.5 rounded border border-white/5 bg-matte-gray/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
