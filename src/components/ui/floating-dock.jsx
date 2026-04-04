import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export const FloatingDock = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onTouchStart={(e) => mouseX.set(e.touches[0].pageX)}
      onTouchMove={(e) => mouseX.set(e.touches[0].pageX)}
      onTouchEnd={() => mouseX.set(Infinity)}
      onTouchCancel={() => mouseX.set(Infinity)}
      className={`floating-dock-container ${className || ""}`}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, onClick }) {
  const ref = useRef(null);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const baseSize = isMobile ? 35 : 40;
  const hoverSize = isMobile ? 55 : 80;
  const spread = isMobile ? 100 : 150;

  const sizeSync = useTransform(distance, [-spread, 0, spread], [baseSize, hoverSize, baseSize]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  const handleLinkClick = (e) => {
    if ('ontouchstart' in window) {
      setHovered(false);
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a href={href} aria-label={title} style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        onTouchCancel={() => setHovered(false)}
        className="floating-dock-icon-wrapper"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="floating-dock-tooltip"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: "50%", height: "50%" }} className="floating-dock-icon">
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
