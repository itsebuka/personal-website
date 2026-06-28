"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Sliders, Eye, EyeOff, Activity, RefreshCw } from "lucide-react";

const roles = [
  "Electronics",
  "PCB Design",
  "RF Systems (intended)",
  "Hardware Design (intended)",
  "Embedded Systems (intended)",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Oscilloscope Console State Controls
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [waveToggles, setWaveToggles] = useState({
    ch1: true,
    ch2: true,
    ch3: true,
    ch4: true,
    ch5: true,
  });
  const [isMouseTracking, setIsMouseTracking] = useState(true);
  const [userAmpScale, setUserAmpScale] = useState(1.0);
  const [userFreqScale, setUserFreqScale] = useState(1.0);
  const [userSweepSpeed, setUserSweepSpeed] = useState(1.0);
  const [waveTheme, setWaveTheme] = useState<"multicolor" | "cyan" | "skyblue" | "grey">("multicolor");

  // Typewriter effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullRole = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullRole.substring(0, displayText.length + 1));
        setTypingSpeed(100);

        if (displayText === currentFullRole) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setDisplayText(currentFullRole.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  // Track mouse coordinates for the oscilloscope sweep modulation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // HTML5 Canvas Oscilloscope Simulation Hook
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let currentFreq = 0.005;
    let currentAmp = 40;

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Calculate frequency and amplitude target
      const targetFreq = (isMouseTracking
        ? (0.001 + (mousePos.x / (window.innerWidth || 1)) * 0.012)
        : 0.005) * userFreqScale;
      const targetAmp = (isMouseTracking
        ? (5 + ((window.innerHeight - mousePos.y) / (window.innerHeight || 1)) * 90)
        : 40) * userAmpScale;

      // Smooth interpolation/damping for analog physics feel
      currentFreq += (targetFreq - currentFreq) * 0.04;
      currentAmp += (targetAmp - currentAmp) * 0.04;

      phase += 0.05 * userSweepSpeed; // speed of the sweep

      // 1. Draw Grid Lines (Scopes Graticule)
      ctx.strokeStyle = "rgba(135, 206, 235, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 45;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Center Axis line
      ctx.strokeStyle = "rgba(135, 206, 235, 0.08)";
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Define trace styles dynamically based on the waveTheme state
      const colors = {
        ch1: waveTheme === "cyan" ? "rgba(0, 210, 255, 0.4)" : waveTheme === "skyblue" ? "rgba(135, 206, 235, 0.4)" : waveTheme === "grey" ? "rgba(169, 169, 169, 0.4)" : "rgba(0, 210, 255, 0.4)",
        ch2: waveTheme === "cyan" ? "rgba(0, 210, 255, 0.2)" : waveTheme === "skyblue" ? "rgba(135, 206, 235, 0.2)" : waveTheme === "grey" ? "rgba(140, 140, 140, 0.2)" : "rgba(135, 206, 235, 0.2)",
        ch3: waveTheme === "cyan" ? "rgba(0, 210, 255, 0.25)" : waveTheme === "skyblue" ? "rgba(135, 206, 235, 0.25)" : waveTheme === "grey" ? "rgba(180, 180, 180, 0.2)" : "rgba(173, 216, 230, 0.25)",
        ch4: waveTheme === "cyan" ? "rgba(0, 210, 255, 0.22)" : waveTheme === "skyblue" ? "rgba(135, 206, 235, 0.22)" : waveTheme === "grey" ? "rgba(150, 150, 150, 0.25)" : "rgba(169, 169, 169, 0.22)",
        ch5: waveTheme === "cyan" ? "rgba(0, 210, 255, 0.16)" : waveTheme === "skyblue" ? "rgba(135, 206, 235, 0.16)" : waveTheme === "grey" ? "rgba(200, 200, 200, 0.18)" : "rgba(220, 220, 220, 0.16)",
        shadowCh1: waveTheme === "cyan" ? "rgba(0, 210, 255, 0.6)" : waveTheme === "skyblue" ? "rgba(135, 206, 235, 0.6)" : waveTheme === "grey" ? "rgba(169, 169, 169, 0.6)" : "rgba(0, 210, 255, 0.6)",
        shadowCh2: waveTheme === "cyan" ? "rgba(0, 210, 255, 0.3)" : waveTheme === "skyblue" ? "rgba(135, 206, 235, 0.3)" : waveTheme === "grey" ? "rgba(140, 140, 140, 0.3)" : "rgba(135, 206, 235, 0.3)",
      };

      // 2. Channel 1 - Electric Cyan Wave (Main Signal)
      if (waveToggles.ch1) {
        ctx.beginPath();
        ctx.strokeStyle = colors.ch1;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = colors.shadowCh1;

        for (let x = 0; x < width; x++) {
          const angle = x * currentFreq + phase;
          const rfNoise = (Math.random() - 0.5) * 1.5;
          const y = centerY + Math.sin(angle) * currentAmp + Math.sin(angle * 3) * (currentAmp * 0.15) + rfNoise;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 3. Channel 2 - Faded Sky Blue Wave (Phase shifted secondary track)
      if (waveToggles.ch2) {
        ctx.beginPath();
        ctx.strokeStyle = colors.ch2;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 5;
        ctx.shadowColor = colors.shadowCh2;

        for (let x = 0; x < width; x++) {
          const angle = x * (currentFreq * 0.7) - phase * 0.6;
          const thermalNoise = (Math.random() - 0.5) * 1.0;
          const y = centerY + Math.cos(angle + Math.PI / 3) * (currentAmp * 0.55) + thermalNoise;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 4. Channel 3 - Light Blue Sinusoidal Wave
      if (waveToggles.ch3) {
        ctx.beginPath();
        ctx.strokeStyle = colors.ch3;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 4;
        ctx.shadowColor = colors.ch3;

        for (let x = 0; x < width; x++) {
          const angle = x * (currentFreq * 1.2) + phase * 0.45;
          const rfNoise = (Math.random() - 0.5) * 0.8;
          const y = centerY + Math.sin(angle - Math.PI / 4) * (currentAmp * 0.45) + rfNoise;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 5. Channel 4 - Grey Square Wave (Band-limited with tanh for analog slope)
      if (waveToggles.ch4) {
        ctx.beginPath();
        ctx.strokeStyle = colors.ch4;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 3;
        ctx.shadowColor = colors.ch4;

        for (let x = 0; x < width; x++) {
          const angle = x * (currentFreq * 0.5) - phase * 0.35;
          const rawSine = Math.sin(angle);
          const squareSignal = Math.tanh(rawSine * 8); // Smooth square wave transitions
          const rfNoise = (Math.random() - 0.5) * 0.5;
          const y = centerY + squareSignal * (currentAmp * 0.6) + rfNoise;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 6. Channel 5 - Muted Silver/Grey Triangle Wave
      if (waveToggles.ch5) {
        ctx.beginPath();
        ctx.strokeStyle = colors.ch5;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 3;
        ctx.shadowColor = colors.ch5;

        for (let x = 0; x < width; x++) {
          const angle = x * (currentFreq * 0.8) + phase * 0.55;
          const triangleSignal = (2 / Math.PI) * Math.asin(Math.sin(angle));
          const rfNoise = (Math.random() - 0.5) * 0.6;
          const y = centerY + triangleSignal * (currentAmp * 0.5) + rfNoise;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Reset shadow effects
      ctx.shadowBlur = 0;

      // 7. Telemetry Text Labels on Canvas
      ctx.font = "9px Courier New, monospace";
      ctx.fillStyle = "rgba(135, 206, 235, 0.3)";
      ctx.fillText(`CH1: ${waveToggles.ch1 ? "ON " : "OFF"}  CH2: ${waveToggles.ch2 ? "ON " : "OFF"}  F_MULT: ${userFreqScale.toFixed(1)}x`, 25, height - 50);
      ctx.fillText(`CH3: ${waveToggles.ch3 ? "ON " : "OFF"}  CH4: ${waveToggles.ch4 ? "ON " : "OFF"}  CH5: ${waveToggles.ch5 ? "ON " : "OFF"}`, 25, height - 35);
      ctx.fillText(`MODE: ${isMouseTracking ? "TRACKING" : "INTERNAL"}  SWEEP_SPD: ${userSweepSpeed.toFixed(1)}x`, 25, height - 20);
      ctx.fillText(`TIMEBASE: 250ns/DIV  TRIG_MODE: AUTO`, width - 240, height - 20);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mousePos, waveToggles, isMouseTracking, userAmpScale, userFreqScale, userSweepSpeed, waveTheme]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Live Oscilloscope Signal Screen Canvas Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Side HUD cockpit telemetry metrics */}
      <div className="absolute left-10 top-[35%] hidden xl:flex flex-col gap-4 font-display text-[9px] tracking-[0.25em] text-white/20 select-none pointer-events-none z-10">
        <div>COORDINATES: Lagos // 6.5244 N | 3.3792 E</div>
        <div>SYS_LOAD: 0.12 index</div>
        <div>CORE_TEMP: 32C</div>
        <div className="w-24 h-[1.5px] bg-white/10 relative">
          <div className="absolute left-0 top-0 h-full w-2/3 bg-sky-blue/40" />
        </div>
      </div>

      <div className="absolute right-10 top-[35%] hidden xl:flex flex-col items-end gap-4 font-display text-[9px] tracking-[0.25em] text-white/20 select-none pointer-events-none z-10">
        <div>FW: EBUKA-PORTFOLIO_v1.0.4</div>
        <div>STATUS: SYS_OK</div>
        <div>STAGING: STABLE</div>
        <div className="w-24 h-[1.5px] bg-white/10 relative">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-electric-blue/40" />
        </div>
      </div>

      {/* Radial Gradient overlay to fade the grid at the edges */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/75 to-black pointer-events-none z-0" />

      {/* Cyberpunk ambient glowing background particles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-blue/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-blue/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center py-16 border border-white/[0.02] bg-black/40 backdrop-blur-sm rounded-xl px-12 md:px-24">
        {/* Glow corner brackets for Hero panel */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-sky-blue/30 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-sky-blue/30 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-sky-blue/30 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sky-blue/30 rounded-br-lg" />

        {/* Futuristic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 px-4 py-1.5 rounded-full border border-sky-blue/25 bg-sky-blue/5 backdrop-blur-sm text-xs font-semibold tracking-[0.25em] text-sky-blue uppercase shadow-[0_0_15px_rgba(135,206,235,0.05)]"
        >
          System Signal Sweep Active
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase"
        >
          <span className="text-sky-blue neon-text-blue">Ebuka&apos;s Website</span>
        </motion.h1>

        {/* Dynamic Typewriter text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-lg sm:text-2xl md:text-3xl text-light-gray/80 min-h-[40px] mb-12 max-w-xl font-medium tracking-wide"
        >
          <span className="text-sky-blue">&gt; </span>
          <span>{displayText}</span>
          <span className="animate-pulse font-bold text-sky-blue">|</span>
        </motion.div>

        {/* Collapsible Oscilloscope Console Panel */}
        <AnimatePresence>
          {isConsoleOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-2xl border border-sky-blue/20 bg-black/85 backdrop-blur-md p-6 rounded-lg mb-10 overflow-hidden relative glass-panel text-left font-mono"
            >
              {/* Cockpit corner ticks */}
              <div className="tech-corner-tl" />
              <div className="tech-corner-tr" />
              <div className="tech-corner-bl" />
              <div className="tech-corner-br" />

              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 select-none">
                <div className="flex items-center gap-2 text-sky-blue font-bold font-display text-xs tracking-wider">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>OSCILLOSCOPE TELEMETRY CONTROL BOARD</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWaveToggles({ ch1: true, ch2: true, ch3: true, ch4: true, ch5: true });
                    setIsMouseTracking(true);
                    setUserAmpScale(1.0);
                    setUserFreqScale(1.0);
                    setUserSweepSpeed(1.0);
                    setWaveTheme("multicolor");
                  }}
                  className="font-display text-[9px] tracking-widest text-white/40 hover:text-sky-blue transition-colors flex items-center gap-1 cursor-none"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  RESET SYSTEM
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                {/* Sliders Column */}
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-white/50 text-[10px] tracking-wider mb-1">
                      <span>SWEEP SPEED (TIMEBASE)</span>
                      <span className="text-sky-blue">{userSweepSpeed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={userSweepSpeed}
                      onChange={(e) => setUserSweepSpeed(parseFloat(e.target.value))}
                      className="w-full accent-sky-blue cursor-none"
                      title="Sweep Speed (Timebase)"
                      aria-label="Sweep Speed (Timebase)"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-white/50 text-[10px] tracking-wider mb-1">
                      <span>SIGNAL AMPLITUDE (VOLTS/DIV)</span>
                      <span className="text-sky-blue">{userAmpScale.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="2.5"
                      step="0.1"
                      value={userAmpScale}
                      onChange={(e) => setUserAmpScale(parseFloat(e.target.value))}
                      className="w-full accent-sky-blue cursor-none"
                      title="Signal Amplitude (Volts/Div)"
                      aria-label="Signal Amplitude (Volts/Div)"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-white/50 text-[10px] tracking-wider mb-1">
                      <span>SWEEP FREQUENCY (TRIG_FREQ)</span>
                      <span className="text-sky-blue">{userFreqScale.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={userFreqScale}
                      onChange={(e) => setUserFreqScale(parseFloat(e.target.value))}
                      className="w-full accent-sky-blue cursor-none"
                      title="Sweep Frequency (Trig Freq)"
                      aria-label="Sweep Frequency (Trig Freq)"
                    />
                  </div>
                </div>

                {/* Toggles & Theme Column */}
                <div className="flex flex-col gap-4">
                  {/* Channels Toggles */}
                  <div>
                    <span className="text-white/40 text-[9px] tracking-widest block mb-2">ACTIVE CHANNELS</span>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(waveToggles).map((ch) => {
                        const active = waveToggles[ch as keyof typeof waveToggles];
                        return (
                          <button
                            key={ch}
                            type="button"
                            onClick={() =>
                              setWaveToggles((prev) => ({
                                ...prev,
                                [ch]: !active,
                              }))
                            }
                            className={`px-2.5 py-1 rounded border text-[9px] tracking-wider uppercase font-bold transition-all duration-200 flex items-center gap-1 cursor-none ${
                              active
                                ? "border-sky-blue/30 bg-sky-blue/15 text-sky-blue shadow-[0_0_5px_rgba(0,210,255,0.2)]"
                                : "border-white/5 bg-white/2 text-white/30"
                            }`}
                          >
                            {active ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                            <span>{ch.toUpperCase()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mouse Mod Tracking Toggle */}
                  <div>
                    <span className="text-white/40 text-[9px] tracking-widest block mb-1">SIGNAL MODULATION</span>
                    <button
                      type="button"
                      onClick={() => setIsMouseTracking(!isMouseTracking)}
                      className={`w-full py-2 px-3 rounded border text-left font-display text-[9.5px] tracking-widest uppercase font-bold transition-all duration-200 cursor-none flex justify-between items-center ${
                        isMouseTracking
                          ? "border-sky-blue/40 bg-sky-blue/10 text-sky-blue"
                          : "border-white/5 bg-white/2 text-white/40"
                      }`}
                    >
                      <span>CURSOR MODULATION</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                        isMouseTracking ? "bg-electric-blue text-black" : "bg-white/10 text-white/30"
                      }`}>
                        {isMouseTracking ? "ENABLED" : "DISABLED"}
                      </span>
                    </button>
                  </div>

                  {/* Wave Theme Selector */}
                  <div>
                    <span className="text-white/40 text-[9px] tracking-widest block mb-2">TRACE VISUAL THEME</span>
                    <div className="flex gap-1.5">
                      {(["multicolor", "cyan", "skyblue", "grey"] as const).map((theme) => (
                        <button
                          key={theme}
                          type="button"
                          onClick={() => setWaveTheme(theme)}
                          className={`flex-1 py-1 rounded border text-[8px] tracking-wider uppercase font-bold transition-all duration-200 cursor-none ${
                            waveTheme === theme
                              ? "border-sky-blue bg-sky-blue/10 text-sky-blue shadow-[0_0_5px_rgba(0,210,255,0.2)]"
                              : "border-white/5 bg-white/2 text-white/40"
                          }`}
                        >
                          {theme === "multicolor" ? "MULTI" : theme}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            id="hero-cta"
            href="#projects"
            className="neon-btn-blue font-display font-bold tracking-widest text-sm py-4 px-10 rounded-md uppercase cursor-none transition-all duration-300 transform hover:scale-105"
          >
            Explore My Projects
          </a>

          {/* Collapsible Console Toggle */}
          <button
            type="button"
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            className={`font-display font-bold tracking-widest text-sm py-4 px-8 rounded-md uppercase cursor-none border transition-all duration-300 flex items-center gap-2 ${
              isConsoleOpen
                ? "border-sky-blue bg-sky-blue/10 text-sky-blue shadow-[0_0_12px_rgba(0,210,255,0.2)]"
                : "border-white/10 bg-white/2 text-light-gray hover:border-sky-blue/40 hover:text-sky-blue hover:bg-sky-blue/5"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{isConsoleOpen ? "Close Controls" : "Scope Controls"}</span>
          </button>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/itsebuka"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-3 rounded-md border border-white/5 bg-white/2 cursor-none text-light-gray hover:text-sky-blue hover:border-sky-blue/40 hover:bg-sky-blue/5 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-3 rounded-md border border-white/5 bg-white/2 cursor-none text-light-gray hover:text-sky-blue hover:border-sky-blue/40 hover:bg-sky-blue/5 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/eleoguuu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="p-3 rounded-md border border-white/5 bg-white/2 cursor-none text-light-gray hover:text-sky-blue hover:border-sky-blue/40 hover:bg-sky-blue/5 transition-all duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          className="absolute bottom-6 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Scroll Down</span>
          <ArrowDown className="w-4 h-4 text-sky-blue" />
        </motion.div>
      </div>
    </section>
  );
}
