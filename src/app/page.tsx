import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* High-tech Custom Cursor trailing effect */}
      <CustomCursor />

      {/* Sticky Shrinking Glass Navigation Bar */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* Full-viewport Hero Header with typewriter roles */}
        <Hero />

        {/* Bio diagnostic section with rotated vector avatar */}
        <About />

        {/* Services grid detailing developer offerings */}
        <Services />

        {/* Categories grid and infinite horizontal marquee scrolling ticker */}
        <Skills />

        {/* Vertical career timeline operational log */}
        <Experience />

        {/* Project grid utilizing customized SVG visual panels */}
        <Projects />

        {/* Achievements, certifications and open source metrics */}
        <Achievements />

        {/* Connection panel with glass inputs and glowing active state */}
        <Contact />
      </main>

      {/* Subtle system uptime and copyright footer */}
      <Footer />
    </>
  );
}
