import React, { useEffect, useRef } from "react";

export const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 120, // Reduced from 1200 so it doesn't freeze the browser natively, but let's see. 
  className = "",
  particleColor = "#FFFFFF",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let animationFrameId;

    const resize = () => {
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random();
        this.alphaChange = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += this.alphaChange;

        if (this.alpha <= 0) {
            this.alphaChange = Math.abs(this.alphaChange);
        } else if (this.alpha >= 1) {
            this.alphaChange = -Math.abs(this.alphaChange);
        }

        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;

        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      // calculate density based on area
      const area = width * height;
      const count = Math.floor(area / 100000 * particleDensity); 
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [background, minSize, maxSize, particleDensity, particleColor]);

  return (
    <div ref={containerRef} className={`relative block overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block pointer-events-none absolute inset-0 z-0 h-full w-full bg-transparent" />
    </div>
  );
};
