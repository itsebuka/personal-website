"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, Github, FileText } from "lucide-react";
import { projects } from "@/data/projects";
import type { StaticProject } from "@/data/projects";

export default function Projects() {
  const router = useRouter();

  return (
    <section id="projects" className="py-24 relative bg-black overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-blue/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Featured Projects
          </h2>
          <div className="glow-line mt-4 mx-auto w-48" />
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project: StaticProject, index: number) => {
            const IconComp = project.icon;
            const techList = project.tech || [];
            const repoLink = project.links.find(l => l.kind === "github")?.url || "#";
            const liveLink = project.links.find(l => l.kind === "demo")?.url;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                onClick={() => router.push(`/projects/${project.id}`)}
                className="glass-panel rounded-lg overflow-hidden neon-border-blue flex flex-col group transform transition-transform duration-300 hover:-translate-y-2 cursor-none tech-corners laser-sweep"
              >
                {/* Tech corner ticks */}
                <div className="tech-corner-tl" />
                <div className="tech-corner-tr" />
                <div className="tech-corner-bl" />
                <div className="tech-corner-br" />

                {/* Visual Interface Mockup Header */}
                <div className="h-48 w-full bg-matte-gray border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                  {/* Subtle matrix dots in mockup background */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Static Scanline Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

                  {/* OS/Terminal window controls */}
                  <div className="absolute top-4 right-4 flex gap-1 select-none pointer-events-none opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-blue" />
                    <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-blue/30" />
                  </div>

                  {/* Project icon */}
                  <div className="w-40 h-40 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <IconComp className="w-16 h-16 text-sky-blue/40 group-hover:text-sky-blue/70 transition-colors duration-300" />
                  </div>

                  {/* Visual Badge overlay */}
                  <div className="absolute top-4 left-4 px-2 py-1 rounded bg-black/80 border border-white/5 font-display text-[9px] tracking-widest text-white/50 uppercase">
                    SYS_ID: {project.id ? project.id.substring(0, 5).toUpperCase() : `00${index + 1}`}
                  </div>

                  {/* High-tech telemetry logs */}
                  <div className="absolute bottom-2 left-4 right-4 flex justify-between font-display text-[7.5px] tracking-widest text-white/20 select-none group-hover:text-sky-blue/40 transition-colors duration-300">
                    <span>SYS_LOAD: 0.18</span>
                    <span>BITRATE: 12.4kbps</span>
                    <span>PING: 34ms</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex flex-col flex-1">

                  {/* Category and Title */}
                  <div className="mb-4">
                    <span className="font-display text-[10px] tracking-[0.2em] text-sky-blue uppercase block mb-1 font-semibold">
                      {project.tagline}
                    </span>
                    <div className="flex items-center gap-3">
                      <IconComp className="w-5 h-5 text-sky-blue" />
                      <h3 className="font-display text-xl font-bold text-white uppercase group-hover:text-sky-blue transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Project description */}
                  <p className="font-sans text-sm text-light-gray/70 leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {techList.map((techItem) => (
                      <span
                        key={techItem}
                        className="font-sans text-[10px] tracking-wider text-light-gray/60 px-2.5 py-1 rounded border border-white/5 bg-white/2"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>

                  {/* Links footer */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                    <button
                      onClick={(e) => { e.stopPropagation(); if (repoLink !== "#") window.open(repoLink, "_blank", "noopener,noreferrer"); }}
                      className="flex items-center gap-2 font-display text-xs tracking-widest text-light-gray hover:text-sky-blue transition-colors duration-300 cursor-none"
                    >
                      <Github className="w-4 h-4" />
                      <span>SOURCE</span>
                    </button>

                    <span className="flex items-center gap-1.5 font-display text-[10px] tracking-widest text-sky-blue/60 group-hover:text-sky-blue transition-colors duration-300 cursor-none">
                      <FileText className="w-3.5 h-3.5" />
                      <span>VIEW DETAILS</span>
                    </span>

                    <button
                      onClick={(e) => { e.stopPropagation(); if (liveLink) window.open(liveLink, "_blank", "noopener,noreferrer"); }}
                      className="flex items-center gap-2 font-display text-xs tracking-widest text-light-gray hover:text-sky-blue transition-colors duration-300 cursor-none ml-auto"
                    >
                      <span>LAUNCH</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
