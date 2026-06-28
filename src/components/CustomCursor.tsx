"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse positions
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for the smooth trailing ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor if the device supports mouse hover states
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    const animFrameId = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        target.matches(
          "a, a *, button, button *, select, select *, input, textarea, [role='button'], [role='button'] *"
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? "#00d2ff" : "#87ceeb",
          boxShadow: isHovered
            ? "0 0 20px rgba(0, 210, 255, 0.6), inset 0 0 10px rgba(0, 210, 255, 0.4)"
            : "0 0 10px rgba(135, 206, 235, 0.3), inset 0 0 5px rgba(135, 206, 235, 0.2)",
          backgroundColor: isHovered
            ? "rgba(0, 210, 255, 0.05)"
            : "rgba(135, 206, 235, 0.02)",
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? "#00d2ff" : "#87ceeb",
          boxShadow: isHovered
            ? "0 0 8px #00d2ff, 0 0 15px #00d2ff"
            : "0 0 5px #87ceeb, 0 0 10px #87ceeb",
        }}
        transition={{ type: "tween", duration: 0.08 }}
      />
    </>
  );
}
