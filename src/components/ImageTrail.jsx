import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

const ImageTrail = ({ items = [], children }) => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    let zIndex = 10;
    let imageIndex = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      if (!containerRef.current || items.length === 0) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Distance threshold so it doesn't spawn images too close to each other
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < 50) return; 

      lastX = x;
      lastY = y;

      const img = imagesRef.current[imageIndex];
      if (!img) return;

      gsap.killTweensOf(img);
      
      const imgWidth = img.offsetWidth || 150;
      const imgHeight = img.offsetHeight || 200;

      gsap.set(img, {
        x: x - imgWidth / 2,
        y: y - imgHeight / 2,
        zIndex: zIndex++,
        scale: 0.5,
        opacity: 1,
        rotation: (Math.random() - 0.5) * 30 
      });

      // Animate out
      gsap.to(img, {
        opacity: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(img, { opacity: 0 });
        }
      });

      imageIndex = (imageIndex + 1) % items.length;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [items.length]);

  return (
    <div className="image-trail-container" ref={containerRef}>
      {children}
      <div className="trail-images-wrapper">
        {items.map((src, i) => (
          <img
            key={i}
            ref={el => imagesRef.current[i] = el}
            className="trail-image"
            src={src}
            alt="trail"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageTrail;