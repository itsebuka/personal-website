"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, Github, FileText,
  Download, BookOpen, Layers,
} from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import { projects } from "@/data/projects";

const FILE_ICON: Record<string, string> = {
  pdf: "📄", doc: "📝", docx: "📝", txt: "📃",
  image: "🖼️", zip: "📦", other: "📎",
};

const KIND_ICON = {
  github: Github,
  demo: ExternalLink,
  report: FileText,
  external: ExternalLink,
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const IconComp = project?.icon;

  if (!project || !IconComp) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 px-6">
        <CustomCursor />
        <span className="font-display text-6xl font-black text-white/10">404</span>
        <p className="font-mono text-sm text-white/40">Project not found.</p>
        <Link
          href="/#projects"
          className="px-6 py-2.5 border border-sky-blue/30 text-sky-blue font-display text-xs tracking-widest uppercase rounded hover:bg-sky-blue/10 transition-all duration-300 cursor-none"
        >
          Back to Projects
        </Link>
      </main>
    );
  }

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
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-blue/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">

        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-display text-xs tracking-widest text-white/50 hover:text-sky-blue uppercase transition-colors duration-300 cursor-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10"
        >
          {/* ── HEADER ─────────────────────────────────────────── */}
          <div className="border border-sky-blue/15 bg-[#080810] rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-blue/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex-shrink-0 w-24 h-24 rounded-xl border border-sky-blue/20 bg-sky-blue/5 flex items-center justify-center">
              <IconComp className="w-12 h-12 text-sky-blue" />
            </div>
            <div className="flex flex-col gap-4 flex-1 relative z-10">
              <span className="font-display text-[9px] tracking-[0.3em] text-sky-blue uppercase border border-sky-blue/20 px-2.5 py-1 rounded bg-sky-blue/5 w-fit">
                {project.tagline}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
                {project.title}
              </h1>
              <p className="font-sans text-sm text-white/60 leading-relaxed max-w-2xl">
                {project.description}
              </p>
              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-1">
                  {project.links.map((link) => {
                    const LIcon = KIND_ICON[link.kind] ?? ExternalLink;
                    const isPrimary = link.kind === "demo";
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded font-display text-xs tracking-widest uppercase transition-all duration-300 cursor-none ${
                          isPrimary
                            ? "bg-sky-blue/10 border border-sky-blue/30 text-sky-blue hover:bg-sky-blue/20 hover:shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                            : "border border-white/10 text-white/70 hover:text-sky-blue hover:border-sky-blue/40"
                        }`}
                      >
                        <LIcon className="w-4 h-4" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ── TECH STACK ─────────────────────────────────────── */}
          <div className="border border-sky-blue/10 bg-[#0a0a0a] rounded-xl p-6">
            <h2 className="font-display text-[10px] tracking-[0.3em] text-sky-blue uppercase mb-5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-sans text-xs text-white/70 px-3 py-1.5 rounded border border-white/8 bg-white/3 hover:border-sky-blue/30 hover:text-sky-blue transition-all duration-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── SUMMARY / README ───────────────────────────────── */}
          <div className="border border-sky-blue/10 bg-[#0a0a0a] rounded-xl p-6 md:p-8">
            <h2 className="font-display text-[10px] tracking-[0.3em] text-sky-blue uppercase mb-6 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Project Summary
            </h2>
            <div className="flex flex-col gap-5">
              {project.summary.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-sm text-white/70 leading-relaxed border-l-2 border-sky-blue/20 pl-4"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* ── FILES & DOWNLOADS ──────────────────────────────── */}
          <div className="border border-sky-blue/10 bg-[#0a0a0a] rounded-xl p-6">
            <h2 className="font-display text-[10px] tracking-[0.3em] text-sky-blue uppercase mb-5 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Files &amp; Downloads
            </h2>
            {project.files.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-3 border border-dashed border-white/5 rounded-lg">
                <Download className="w-8 h-8 text-white/10" />
                <p className="font-mono text-xs text-white/25 text-center leading-relaxed">
                  No files attached yet.<br />
                  Drop files into{" "}
                  <span className="text-sky-blue/40">public/files/{project.id}/</span>
                  {" "}and list them in{" "}
                  <span className="text-sky-blue/40">src/data/projects.ts</span>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.files.map((file) => (
                  <a
                    key={file.filename}
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/files/${project.id}/${file.filename}`}
                    download
                    className="flex items-center gap-4 p-4 bg-black border border-white/5 rounded-lg hover:border-sky-blue/30 hover:bg-sky-blue/3 transition-all duration-300 group cursor-none"
                  >
                    <span className="text-2xl">{FILE_ICON[file.type] ?? "📎"}</span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-display text-xs font-semibold text-white truncate group-hover:text-sky-blue transition-colors duration-200">
                        {file.label}
                      </span>
                      <span className="font-mono text-[9px] text-white/30 truncate mt-0.5">
                        {file.filename}
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
