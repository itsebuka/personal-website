"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Cpu, Terminal, Cloud, Shield } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

interface DocAttachment {
  filename: string;
  originalName: string;
  label: string;
  downloadUrl: string;
  uploadedAt: string;
}

interface ServiceData {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  slug: string;
}

const services: ServiceData[] = [
  {
    slug: "pcb-design-prototyping",
    title: "PCB Design & Prototyping",
    tagline: "Multilayer Layout | DFM Rules",
    description: "Designing high-performance, multilayer PCBs using KiCad. Integrating impedance matching, analog/digital schematics routing, and strict Design For Manufacture rules.",
    features: ["Impedance Matched Differential Pairs", "BOM Optimization & Sourcing Specs", "Multilayer Signal Integrity Layout"],
    icon: Cpu,
  },
  {
    slug: "embedded-systems-firmware",
    title: "Embedded Systems & Firmware",
    tagline: "C/C++ | Low-Latency Loops",
    description: "Programming low-latency sensor interfaces and hardware drivers (SPI, I2C, UART) for Arduino and ESP32 systems.",
    features: ["Arduino & ESP32 Programming", "Hardware Interrupt & Timer Control", "Low-power Sleep Mode Configurations"],
    icon: Terminal,
  },
  {
    slug: "rf-signals",
    title: "RF & Signals",
    tagline: "Circuit Simulation | Instrument Diagnostics",
    description: "Analyzing electrical signals, simulating circuits via Proteus, and using standard lab instruments like Oscilloscopes and Multimeters.",
    features: ["Proteus Circuit Simulation & Analysis", "Multimeter & Oscilloscope Signal Testing", "MATLAB & Simulink Signal Processing"],
    icon: Cloud,
  },
  {
    slug: "mechanical-cad-3d-integration",
    title: "Mechanical CAD & 3D Integration",
    tagline: "Fusion 360 Enclosures | Tolerances",
    description: "Modeling rugged hardware enclosures in Fusion 360. Performing structural and thermal stress simulations to ensure component protection and optimal air flow vents.",
    features: ["Fusion 360 Enclosure Tolerancing", "Thermal Management Heat Sinks", "3D Printing Prototyping Layouts"],
    icon: Shield,
  },
];

const FILE_ICONS: Record<string, string> = {
  pdf: "📄", doc: "📝", docx: "📝", md: "📋", markdown: "📋",
  txt: "📃", png: "🖼️", jpg: "🖼️", jpeg: "🖼️", mp4: "🎬", zip: "📦",
};
const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return FILE_ICONS[ext] || "📎";
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [documents, setDocuments] = useState<DocAttachment[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/services/${slug}/documents`);
        if (res.ok) {
          const data = await res.json();
          setDocuments(data);
        }
      } catch {
        // silently fail — no docs shown
      } finally {
        setLoadingDocs(false);
      }
    };
    if (slug) loadDocs();
  }, [slug]);

  if (!service) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <CustomCursor />
        <div className="flex flex-col items-center gap-4">
          <span className="font-display text-4xl font-black text-white/10">404</span>
          <p className="font-mono text-sm text-white/40">Service node not found.</p>
          <Link href="/#services" className="mt-4 px-6 py-2.5 border border-sky-blue/30 text-sky-blue font-display text-xs tracking-widest uppercase rounded hover:bg-sky-blue/10 transition-all duration-300 cursor-none">
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const IconComp = service.icon;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <CustomCursor />

      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(135, 206, 235, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(135, 206, 235, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-blue/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">

        {/* Back nav */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 font-display text-xs tracking-widest text-white/50 hover:text-sky-blue uppercase transition-colors duration-300 cursor-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col gap-10">

          {/* Header */}
          <div className="border border-sky-blue/15 bg-[#0a0a0a] rounded-lg p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="p-5 rounded-lg border border-sky-blue/20 bg-sky-blue/5 text-sky-blue shrink-0">
              <IconComp className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <span className="font-display text-[9px] tracking-[0.25em] text-sky-blue uppercase border border-sky-blue/20 px-2 py-1 rounded bg-sky-blue/5 w-fit">
                {service.tagline}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
                {service.title}
              </h1>
              <p className="font-sans text-sm text-white/60 leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="border border-sky-blue/10 bg-[#0a0a0a] rounded-lg p-6">
            <h2 className="font-display text-[10px] tracking-[0.25em] text-sky-blue uppercase mb-5">
              Capabilities &amp; Features
            </h2>
            <ul className="flex flex-col gap-3">
              {service.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 font-sans text-sm text-white/70">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-blue shadow-[0_0_6px_#87ceeb] shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div className="border border-sky-blue/10 bg-[#0a0a0a] rounded-lg p-6">
            <h2 className="font-display text-[10px] tracking-[0.25em] text-sky-blue uppercase mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents &amp; Resources
            </h2>

            {loadingDocs ? (
              <div className="py-8 text-center text-xs font-mono text-white/30">Querying resource registry...</div>
            ) : documents.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-white/5 rounded text-xs font-mono text-white/25">
                No documents attached to this service yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map((doc) => (
                  <a
                    key={doc.filename}
                    href={`http://localhost:5000${doc.downloadUrl}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-black border border-white/5 rounded hover:border-sky-blue/30 hover:bg-sky-blue/3 transition-all duration-300 group cursor-none"
                  >
                    <span className="text-2xl">{getFileIcon(doc.filename)}</span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-display text-xs font-semibold text-white truncate group-hover:text-sky-blue transition-colors duration-200">
                        {doc.label}
                      </span>
                      <span className="font-mono text-[9px] text-white/30 mt-0.5 truncate">
                        {doc.originalName}
                      </span>
                    </div>
                    <Download className="w-4 h-4 text-white/20 group-hover:text-sky-blue shrink-0 transition-colors duration-200" />
                  </a>
                ))}
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </main>
  );
}
