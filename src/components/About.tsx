"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 relative bg-black overflow-hidden">
      {/* Decorative vertical light strip */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-blue/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Bio text column (7 cols on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                the man behind this page
              </h2>
              {/* High-tech glow-line divider */}
              <div className="glow-line mt-4 w-48" />
            </div>

            {/* Bio paragraph with high-tech phrasing */}
            <p className="font-sans text-light-gray/90 leading-relaxed mb-6 text-base md:text-lg">
              I intend to build autonomous security systems that fuse RF intelligence with computer vision on custom hardware. I intend to also design PCBs and model their enclosures in Fusion 360, write the sensor fusion software, and integrate it into a single platform. My work targets critical infrastructure protection, perimeter defence, and asymmetric warfare applications in under-resourced environments. Studying Electrical and Electronics at Pan-Atlantic University and supporting grid operations as an intern. Nigerian-made. Defence-focused. Prototype-obsessed.
            </p>
            <p className="font-sans text-light-gray/80 leading-relaxed mb-8 text-base">
              The spectrum is a battlefield most people cannott see. I intend to build systems that see it, control it, and act on it by fusing sensors, signals, and hardware into platforms that work.
            </p>

            {/* Quick specifications grid panel with tech corners */}
            <div className="relative grid grid-cols-2 gap-6 w-full max-w-md border border-white/5 bg-black/50 p-6 rounded-lg tech-corners mt-8 glass-panel">
              {/* Corner brackets */}
              <div className="tech-corner-tl" />
              <div className="tech-corner-tr" />
              <div className="tech-corner-bl" />
              <div className="tech-corner-br" />

              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-white/40 uppercase block">Location</span>
                <span className="font-sans text-xs font-semibold text-white">Lagos, Nigeria</span>
              </div>
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-white/40 uppercase block">Availability</span>
                <span className="font-sans text-xs font-semibold text-sky-blue neon-text-blue">Open to work</span>
              </div>
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-white/40 uppercase block">Specialization</span>
                <span className="font-sans text-xs font-semibold text-white">Electronics, PCB Design, RF, Hardware design, Code</span>
              </div>
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-white/40 uppercase block">Preferred Stack</span>
                <span className="font-sans text-xs font-semibold text-white">Fusion360 & Kicad</span>
              </div>
            </div>
          </motion.div>

          {/* Profile image placeholder column (5 cols on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            {/* Glowing avatar container */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 group">
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-sky-blue/20 pointer-events-none"
              />

              {/* Rotating middle ring (opposite direction) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-dashed border-electric-blue/15 pointer-events-none"
              />

              {/* Rotating inner ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute inset-5 rounded-full border border-sky-blue/30 pointer-events-none"
              />

              {/* Avatar background with glowing blue border */}
              <div className="absolute inset-8 rounded-full overflow-hidden neon-border-blue bg-matte-gray flex items-center justify-center backdrop-blur-md">
                {/* Cybernetic Identity Abstract SVG Illustration */}
                <svg
                  className="w-3/4 h-3/4 text-sky-blue/60 group-hover:text-electric-blue/85 transition-colors duration-500"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Hexagon head wrapper */}
                  <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" className="opacity-40" />

                  {/* Grid lines inside head */}
                  <path d="M50,15 L50,85" strokeDasharray="3 3" />
                  <path d="M20,32.5 L80,67.5" strokeDasharray="3 3" />
                  <path d="M80,32.5 L20,67.5" strokeDasharray="3 3" />

                  {/* Core brain nodes */}
                  <circle cx="50" cy="50" r="10" className="fill-matte-black stroke-sky-blue" strokeWidth="2" />
                  <circle cx="50" cy="25" r="4" className="fill-electric-blue stroke-none" />
                  <circle cx="32" cy="60" r="4" className="fill-sky-blue stroke-none" />
                  <circle cx="68" cy="60" r="4" className="fill-sky-blue stroke-none" />

                  {/* Synapses linking nodes */}
                  <line x1="50" y1="29" x2="50" y2="40" />
                  <line x1="35" y1="58" x2="43" y2="53" />
                  <line x1="65" y1="58" x2="57" y2="53" />

                  {/* Scanning targeting ticks */}
                  <path d="M28,15 L15,15 L15,28" stroke="#00d2ff" strokeWidth="2" />
                  <path d="M72,15 L85,15 L85,28" stroke="#00d2ff" strokeWidth="2" />
                  <path d="M15,72 L15,85 L28,85" stroke="#00d2ff" strokeWidth="2" />
                  <path d="M85,72 L85,85 L72,85" stroke="#00d2ff" strokeWidth="2" />
                </svg>

                {/* Cyber scanner overlay beam */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d2ff]/10 to-transparent w-full h-[40%] animate-pulse translate-y-full" style={{
                  animationDuration: "3s"
                }} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
