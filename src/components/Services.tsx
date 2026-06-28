"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Cloud, Shield } from "lucide-react";
import Link from "next/link";

interface Service {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ElementType;
}

const servicesList: Service[] = [
  {
    title: "PCB Design & Prototyping",
    tagline: "Multilayer Layout | DFM Rules",
    description: "Designing high-performance, multilayer PCBs using KiCad. Integrating impedance matching, analog/digital schematics routing, and strict Design For Manufacture rules.",
    features: ["Impedance Matched Differential Pairs", "BOM Optimization & Sourcing Specs", "Multilayer Signal Integrity Layout"],
    icon: Cpu,
  },
  {
    title: "Embedded Systems & Firmware",
    tagline: "C/C++ | Low-Latency Loops",
    description: "Programming low-latency sensor interfaces and hardware drivers (SPI, I2C, UART) for Arduino and ESP32 systems.",
    features: ["Arduino & ESP32 Programming", "Hardware Interrupt & Timer Control", "Low-power Sleep Mode Configurations"],
    icon: Terminal,
  },
  {
    title: "RF & Signals",
    tagline: "Circuit Simulation | Instrument Diagnostics",
    description: "Analyzing electrical signals, simulating circuits via Proteus, and using standard lab instruments like Oscilloscopes and Multimeters.",
    features: ["Proteus Circuit Simulation & Analysis", "Multimeter & Oscilloscope Signal Testing", "MATLAB & Simulink Signal Processing"],
    icon: Cloud,
  },
  {
    title: "Mechanical CAD & 3D Integration",
    tagline: "Fusion 360 Enclosures | Tolerances",
    description: "Modeling rugged hardware enclosures in Fusion 360. Performing structural and thermal stress simulations to ensure component protection and optimal air flow vents.",
    features: ["Fusion 360 Enclosure Tolerancing", "Thermal Management Heat Sinks", "3D Printing Prototyping Layouts"],
    icon: Shield,
  },
];


export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-black overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-blue/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Constructed Services
          </h2>
          <div className="glow-line mt-4 mx-auto w-48" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, index) => {
            const IconComp = service.icon;

            return (
              <Link
                key={service.title}
                href={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
                className="block cursor-none"
              >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-lg neon-border-blue flex flex-col justify-between group cursor-none tech-corners laser-sweep h-full"
              >
                {/* Tech corner ticks */}
                <div className="tech-corner-tl" />
                <div className="tech-corner-tr" />
                <div className="tech-corner-bl" />
                <div className="tech-corner-br" />

                <div>
                  {/* OS/Terminal window controls */}
                  <div className="flex gap-1.5 mb-6 opacity-35 select-none pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-blue" />
                    <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-blue/40" />
                  </div>
                  {/* Service Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3.5 rounded border border-sky-blue/20 bg-sky-blue/5 text-sky-blue group-hover:bg-sky-blue group-hover:text-black group-hover:shadow-[0_0_15px_#87ceeb] transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-display text-[9px] tracking-widest text-sky-blue uppercase block">
                        {service.tagline}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mt-0.5">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-light-gray/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="border-t border-white/5 pt-6 mt-6">
                  <ul className="flex flex-col gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 font-sans text-xs text-light-gray/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-blue shadow-[0_0_5px_#87ceeb]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
