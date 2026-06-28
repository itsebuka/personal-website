import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ebuka Eleogu | Hardware Systems & RF",
  description: "Futuristic portfolio of Ebuka Eleogu. Specialized in multilayer PCB design, RF signal intelligence, embedded C++ firmware, and defense systems prototyping.",
  keywords: ["Ebuka Eleogu Portfolio", "Hardware Systems", "PCB Design Lagos", "RF Portfolio", "Embedded Systems C++", "KiCad Fusion 360 Prototyping", "Defense Tech Prototyping Nigeria"],
  authors: [{ name: "Ebuka Eleogu" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className={`${spaceGrotesk.variable} min-h-full bg-black text-[#e0e0e0] font-sans selection:bg-sky-blue/30 selection:text-white overflow-x-hidden relative bg-mesh-glow`}>
        {/* Dynamic ambient floating orbs globally behind content */}
        <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-sky-blue/3 rounded-full filter blur-[150px] pointer-events-none animate-float-1 z-0" />
        <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] bg-electric-blue/2.5 rounded-full filter blur-[130px] pointer-events-none animate-float-2 z-0" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-sky-blue/3 rounded-full filter blur-[140px] pointer-events-none animate-float-1 z-0" />
        
        {/* Overlay grid scanlines globally */}
        <div className="fixed inset-0 grid-bg opacity-[0.08] pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
