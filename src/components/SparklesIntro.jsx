"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RippleGrid from "./RippleGrid";
import './SparklesIntro.css';

const GREETINGS = [
  "Hi there.",
  "नमस्ते.",
  "வணக்கம்.",
  "హలో.",
  "നമസ്കാരം.",
  "Hola.",
  "Bonjour.",
  "你好.",
  "مرحبا.",
  "Olá.",
  "Привет.",
  "Hallo.",
  "こんにちは.",
  "안녕하세요.",
  "Ciao."
];

export function SparklesIntro() {
  const [index, setIndex] = useState(0);
  const [gridSize, setGridSize] = useState(28);
  const [vignette, setVignette] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      // Increased gridSize to make boxes smaller and more numerous on mobile
      setGridSize(isMobile ? 30 : 20);
      setVignette(isMobile ? 0 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="sparkles-intro-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', height: '100vh', width: '100vw' }}>
      
      {/* The RippleGrid acting as the full-screen background */}
      <div style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0,
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
        }} 
        className="light-theme-bg"
      >
        <RippleGrid
          enableRainbow={false}
          gridColor="#ff2929"
          rippleIntensity={0.015}
          gridSize={gridSize}
          gridThickness={15.0}
          fadeDistance={1.5}
          vignetteStrength={vignette}
          glowIntensity={0.65}
          opacity={0.75}
          gridRotation={0}
          mouseInteraction={true}
          mouseInteractionRadius={0.4}
        />
      </div>

      {/* The "Hi there" Greetings overlaid in the center */}
      <div className="sparkles-greeting-wrapper" style={{ zIndex: 1, position: 'absolute', pointerEvents: 'none' }}>
        <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={index === 0 ? { opacity: 0, scale: 1.8, filter: "blur(10px)" } : { opacity: 0, y: 20 }}
              animate={index === 0 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sparkles-greeting-text"
              style={{ margin: 0 }}
            >
              {GREETINGS[index]}
            </motion.h1>
         </AnimatePresence>
      </div>

    </div>
  );
}
