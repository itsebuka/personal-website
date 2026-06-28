"use client";

import { Terminal } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black py-12 overflow-hidden">
      {/* Subtle top border gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-blue/20 to-transparent" />
      
      {/* Secondary accent line */}
      <div className="absolute top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-sky-blue/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-blue" />
            <span className="font-display font-bold text-sm tracking-wider text-white">
              Ebuka&apos;s Portfolio
            </span>
          </div>
          <p className="font-sans text-xs text-white/40 text-center md:text-left">
            &copy; {currentYear} Ebuka Eleogu. All rights reserved. Encrypted Connection.
          </p>
        </div>

        {/* Right Side: Version info */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <span className="font-display text-[9px] tracking-[0.25em] text-white/30 uppercase">
            FW: EBUKA-PORTFOLIO_v1.0.4 | CLK: 168MHz | SYS_OK
          </span>
        </div>

      </div>
    </footer>
  );
}
