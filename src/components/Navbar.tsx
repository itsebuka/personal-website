"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

interface NavLinkProps {
  name: string;
  href: string;
  isActive: boolean;
}

function NavLink({ name, href, isActive }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`relative font-sans text-sm font-medium tracking-wide uppercase transition-colors duration-300 cursor-none py-1.5 px-3 rounded-md ${
        isActive ? "text-sky-blue" : "text-light-gray hover:text-sky-blue"
      }`}
    >
      {name}
      {isActive && (
        <motion.span
          layoutId="activeNavIndicator"
          className="absolute inset-0 border border-sky-blue/40 bg-sky-blue/5 rounded-md -z-10 shadow-[0_0_8px_rgba(135,206,235,0.2)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  );
}

interface MobileNavLinkProps {
  name: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

function MobileNavLink({ name, href, isActive, onClick }: MobileNavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`font-sans text-base font-semibold tracking-wider uppercase py-2.5 px-4 rounded-lg border transition-colors duration-300 ${
        isActive
          ? "text-sky-blue border-sky-blue/30 bg-sky-blue/5 shadow-[0_0_10px_rgba(135,206,235,0.1)]"
          : "text-light-gray border-transparent hover:text-sky-blue hover:bg-white/5"
      }`}
    >
      {name}
    </a>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position to update sticky styling and active section
  useEffect(() => {
    const handleScroll = () => {
      // Toggle nav shrinking
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in view
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-black/60 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="nav-logo"
          className="flex items-center gap-2 group cursor-none"
        >
          <Terminal className="w-6 h-6 text-sky-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
          <span className="font-display font-bold text-lg tracking-wider text-white">
            Ebuka&apos;s Portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink name="Home" href="#home" isActive={activeSection === "home"} />
          <NavLink name="About" href="#about" isActive={activeSection === "about"} />
          <NavLink name="Services" href="#services" isActive={activeSection === "services"} />
          <NavLink name="Skills" href="#skills" isActive={activeSection === "skills"} />
          <NavLink name="Experience" href="#experience" isActive={activeSection === "experience"} />
          <NavLink name="Projects" href="#projects" isActive={activeSection === "projects"} />
          <NavLink name="Achievements" href="#achievements" isActive={activeSection === "achievements"} />
          <NavLink name="Contact" href="#contact" isActive={activeSection === "contact"} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-sky-blue transition-colors cursor-none p-1.5"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-b border-white/5 bg-black/95 backdrop-blur-xl absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-4 py-6 px-8">
              <MobileNavLink name="Home" href="#home" isActive={activeSection === "home"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink name="About" href="#about" isActive={activeSection === "about"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink name="Services" href="#services" isActive={activeSection === "services"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink name="Skills" href="#skills" isActive={activeSection === "skills"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink name="Experience" href="#experience" isActive={activeSection === "experience"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink name="Projects" href="#projects" isActive={activeSection === "projects"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink name="Achievements" href="#achievements" isActive={activeSection === "achievements"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink name="Contact" href="#contact" isActive={activeSection === "contact"} onClick={() => setIsMobileMenuOpen(false)} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
