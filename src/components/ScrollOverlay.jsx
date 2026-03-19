import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ScrollOverlay.css';

export default function ScrollOverlay() {
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const section = sectionRef.current;
    if (!overlay || !section) return;

    const paths = overlay.querySelectorAll('.shape-overlays__path');
    if (paths.length === 0) return;

    const NUM_POINTS = 10;
    const NUM_PATHS = paths.length;
    const DELAY_MAX = 0.28;
    const DELAY_PER_PATH = 0.22;

    let allPoints = [];
    let ptDelay = [];
    let isAnimating = false;
    let inTriggerBand = false;
    let lastY = window.scrollY;

    // Initialize all points to 100 (wave at bottom)
    for (let i = 0; i < NUM_PATHS; i++) {
      let pts = [];
      for (let j = 0; j < NUM_POINTS; j++) pts.push(100);
      allPoints.push(pts);
    }

    function render(fromBottom) {
      for (let i = 0; i < NUM_PATHS; i++) {
        let pts = allPoints[i];
        let d = '';
        if (fromBottom) {
          d += `M 0 ${pts[0]} C`;
          for (let j = 0; j < NUM_POINTS - 1; j++) {
            let p = (j + 1) / (NUM_POINTS - 1) * 100;
            let cp = p - (1 / (NUM_POINTS - 1) * 100) / 2;
            d += ` ${cp} ${pts[j]} ${cp} ${pts[j + 1]} ${p} ${pts[j + 1]}`;
          }
          d += ` V 100 H 0`;
        } else {
          d += `M 0 0 V ${pts[0]} C`;
          for (let j = 0; j < NUM_POINTS - 1; j++) {
            let p = (j + 1) / (NUM_POINTS - 1) * 100;
            let cp = p - (1 / (NUM_POINTS - 1) * 100) / 2;
            d += ` ${cp} ${pts[j]} ${cp} ${pts[j + 1]} ${p} ${pts[j + 1]}`;
          }
          d += ` V 0 H 0`;
        }
        paths[i].setAttribute('d', d);
      }
    }

    // Initialize wave at bottom baseline inside the transition section
    render(true);

    function buildTl(toZero, fromBottom, onComplete) {
      for (let i = 0; i < NUM_POINTS; i++) ptDelay[i] = Math.random() * DELAY_MAX;

      let tl = gsap.timeline({
        onUpdate: () => render(fromBottom),
        onComplete,
        defaults: { ease: 'power2.inOut', duration: 0.85 }
      });

      for (let i = 0; i < NUM_PATHS; i++) {
        let pts = allPoints[i];
        let pathDelay = DELAY_PER_PATH * (toZero ? i : (NUM_PATHS - i - 1));
        for (let j = 0; j < NUM_POINTS; j++) {
          tl.to(pts, { [j]: toZero ? 0 : 100 }, ptDelay[j] + pathDelay);
        }
      }
      return tl;
    }

    function runDown() {
      if (isAnimating) return;
      isAnimating = true;
      // Reset to start: wave is at the bottom, filling downwards
      allPoints.forEach(pts => pts.fill(100));
      render(true);

      // Phase 1: Animate wave from bottom (100) to top (0), covering the screen
      buildTl(0, true, () => {
        // Phase 1 complete. Screen is now covered.
        // Prepare for Phase 2: Reset points to top (0), but switch render mode
        allPoints.forEach(pts => pts.fill(0));
        render(false); // Render from top downwards

        // Phase 2: Animate wave from top (0) to bottom (100), revealing content below
        buildTl(100, false, () => {
          // Animation complete. Reset to initial state.
          allPoints.forEach(pts => pts.fill(100));
          render(true);
          isAnimating = false;
        });
      });
    }

    function runUp() {
      if (isAnimating) return;
      isAnimating = true;
      // Reset to start: wave is at the top, filling upwards
      allPoints.forEach(pts => pts.fill(0));
      render(false);

      // Phase 1: Animate wave from top (0) to bottom (100), covering the screen
      buildTl(100, false, () => {
        // Phase 1 complete. Screen is now covered.
        // Prepare for Phase 2: Reset points to top (0), but switch render mode
        allPoints.forEach(pts => pts.fill(0));
        render(true); // Render from bottom upwards

        // Phase 2: Animate wave from top (0) to bottom (100), revealing content above
        buildTl(100, true, () => {
          // Animation complete. Reset to initial state.
          allPoints.forEach(pts => pts.fill(100));
          render(true);
          isAnimating = false;
        });
      });
    }

    const onScroll = () => {
      if (isAnimating) {
        lastY = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const direction = currentY > lastY ? 'down' : 'up';
      const rect = section.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.5;
      const inBand = rect.top <= triggerLine && rect.bottom >= triggerLine;

      if (inBand && !inTriggerBand) {
        if (direction === 'down') {
          runDown();
        } else {
          runUp();
        }
      }

      if (!inBand) {
        inTriggerBand = false;
      } else {
        inTriggerBand = true;
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="transition-wave-section" aria-hidden="true">
      <svg
        ref={overlayRef}
        className="shape-overlays"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        id="waveOverlay"
      >
        <defs>
          <linearGradient id="gradientRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc143c" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="gradientWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dc143c" />
          </linearGradient>
        </defs>
        <path className="shape-overlays__path" fill="url(#gradientWhite)"></path>
        <path className="shape-overlays__path" fill="url(#gradientRed)"></path>
      </svg>
    </section>
  );
}
