"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Minimalistic floating particles for SparklesIntro
    const particles = [];
    const particleCount = 8;

    class MinimalParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 40;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.06 + 0.02;
        this.floatPhase = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;

        this.opacity = Math.sin(time * 0.002 + this.floatPhase) * 0.05 + 0.03;
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(220, 20, 60, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(220, 20, 60, ${this.opacity * 0.05})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new MinimalParticle());
    }

    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.5, '#fafafa');
      gradient.addColorStop(1, '#ffffff');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update(elapsed);
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sparkles-intro-container">
      <canvas ref={canvasRef} className="sparkles-bg-canvas"></canvas>

      {/* The "Hi there" Greetings overlaid in the center */}
      <div className="sparkles-greeting-wrapper">
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
