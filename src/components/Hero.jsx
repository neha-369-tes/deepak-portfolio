import { useRef, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';
import './HeroBadge.css';

gsap.registerPlugin(ScrollTrigger);

const CHARS = '@#$%&*<>[]{}|/\\~^()!?';

const ScrambleText = ({ children, className = "" }) => {
  const elementRef = useRef(null);
  const intervalRef = useRef(null);
  
  const scramble = () => {
    const el = elementRef.current;
    if (!el) return;
    
    const original = children;
    const len = original.length;
    let iteration = 0;

    const revealAt = Array.from({ length: len }, (_, i) =>
      Math.floor(Math.random() * 4) + i * 4 // speed factor
    );
    const totalTicks = Math.max(...revealAt) + 5;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      let output = '';
      for (let i = 0; i < len; i++) {
        if (original[i] === ' ') { output += ' '; continue; }
        output += iteration >= revealAt[i]
          ? original[i]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = output;
      iteration++;
      if (iteration > totalTicks) {
        clearInterval(intervalRef.current);
        el.textContent = original;
      }
    }, 60); 
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (elementRef.current) elementRef.current.textContent = children;
  };

  // Trigger scramble on mount
  useEffect(() => {
    // Small delay to ensure layout is ready and it feels intentional
    const timer = setTimeout(() => {
        scramble();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      ref={elementRef}
      className={`scramble-text ${className}`}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {children}
    </span>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const slashRef = useRef(null);
  const maskTopRef = useRef(null);
  const maskBottomRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Play when Hero is at 60% viewport
          toggleActions: "play none none none"
        }
      });

      // 1. Initial State
      // Set masks to cover the image completely
      gsap.set(maskTopRef.current, { 
        clipPath: "polygon(0 0, 100% 0, 0 100%)", 
        autoAlpha: 1 
      });
      gsap.set(maskBottomRef.current, { 
        clipPath: "polygon(100% 0, 100% 100%, 0 100%)", 
        autoAlpha: 1 
      });
      
      gsap.set(slashRef.current, { 
        xPercent: -50,
        yPercent: -50,
        rotation: -53.13,
        scaleX: 0, 
        transformOrigin: "center center", // Scale out from the middle of the cut
        autoAlpha: 1
      });
      
      gsap.set(imageRef.current, { scale: 1.05, autoAlpha: 1 }); 

      // 2. The Katana Slash
      tl.to(slashRef.current, { 
        duration: 0.4, 
        scaleX: 1, 
        ease: "power2.out" 
      })
      .to(slashRef.current, { 
        duration: 0.2, 
        opacity: 0, 
        ease: "power2.in" 
      });

      // 3. The Cut (Masks slide apart)
      // Remove opacity fade during movement to keep the "solid cut" look
      tl.to(maskTopRef.current, {
        duration: 1.8,
        xPercent: -100,
        yPercent: -100,
        ease: "power2.inOut"
      }, "-=0.2")
      .to(maskBottomRef.current, {
        duration: 1.8,
        xPercent: 100,
        yPercent: 100,
        ease: "power2.inOut"
      }, "<")
      
      // Fade out masks at the end just in case
      .to([maskTopRef.current, maskBottomRef.current], {
        duration: 0.5,
        autoAlpha: 0
      }, "-=0.3")
      
      // 4. Image Settles
      .to(imageRef.current, {
        duration: 1.5,
        scale: 1,
        ease: "back.out(1.5)" // slightly rounder bounce
      }, "-=1.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section id="home" className="hero" ref={containerRef}>
      <div id="marker-hero" className="scroll-marker" style={{ top: '50%', right: '10%' }}></div>

      <div className="hero-grid">
        <motion.div
            className="hero-text-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="hero-text">
            <motion.h1 className="hero-main-title">
              <ScrambleText>Deepak</ScrambleText>
              <br />
              <ScrambleText>Kathiravan</ScrambleText>
            </motion.h1>
            <motion.p className="hero-subtitle">
              Executive Engineer <span className="highlight-company">@ Autobotz Esports</span>  
            </motion.p>
            <motion.div
               className="company-badge"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1.2 }}
            >
              <img src="/logos/Abz-Logo-Red-1.png" alt="Autobotz Logo" className="Badge-logo" />
              <span>Proudly Associated with Autobotz Esports Pvt. Ltd.</span>
            </motion.div>
            <motion.div className="hero-divider"></motion.div>
            <motion.p className="hero-description">
                Building scalable esports ecosystems while driving digital innovation through technology, strategy, and execution. Bridging the gap between competitive gaming and corporate excellence.
            </motion.p>
            </motion.div>

            <motion.div
                className="cta-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <div
                  className="btn btn-primary"
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </div>
                <div
                  className="btn btn-secondary"
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                </div>
            </motion.div>
        </motion.div>

        {/* Right Side: Katana Cut Image */}
        <div className="hero-image-wrapper">
            <div className="cut-container">
                {/* Autobotz Logo Behind the Person */}
                <div className="hero-bg-logo-container" ref={imageRef}>
                    <img src="/logos/Abz%20Logo%20Red-1.png" alt="Autobotz Logo Background" className="hero-bg-logo" />
                    <img src="/prof-pics/1.png" alt="Deepak Kathiravan" className="profile-img-natural" />
                </div>

                {/* The "Paper" Masks that get cut */}
                <div className="cut-mask mask-top" ref={maskTopRef}></div>
                <div className="cut-mask mask-bottom" ref={maskBottomRef}></div>

                {/* The Slash Line */}
                <div className="katana-slash-line" ref={slashRef}></div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
