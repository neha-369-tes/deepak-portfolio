import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './BubbleMenu.css';

const DEFAULT_ITEMS = [
  {
    label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '#',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '#',
    ariaLabel: 'Documentation',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'blog',
    href: '#',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '#',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

export default function BubbleMenu({
  className,
  style,
  menuBg = '#fff',
  menuContentColor = '#111',
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isMenuOpen) {
        setIsMenuOpen(true);
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [isMenuOpen]);

  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!bubbles.length) return;

    if (isMenuOpen) {
      gsap.killTweensOf([...bubbles, ...labels]);
      // Initialize GSAP states
      bubbles.forEach(bubble => {
        gsap.set(bubble, { scale: 0, transformOrigin: '50% 50%', display: 'flex' });
      });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      // Animate them in sequentially
      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else {
      // Hide them initially before the reveal
      bubbles.forEach(bubble => gsap.set(bubble, { display: 'none' }));
    }
  }, [isMenuOpen, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <div 
      ref={containerRef}
      className={`bubble-menu-items ${className || ''}`}
      style={{ ...style, pointerEvents: 'auto', paddingTop: 0, inset: 'auto' }}
    >
      <ul className="pill-list" role="list">
        {menuItems.map((item, idx) => (
          <li key={idx} role="listitem" className="pill-col">
            <div
              className="pill-link"
              style={{
                '--item-rot': `${item.rotation ?? 0}deg`,
                '--pill-bg': menuBg,
                '--pill-color': menuContentColor,
                '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                '--hover-color': item.hoverStyles?.textColor || menuContentColor,
                display: isMenuOpen ? 'flex' : 'none',
                cursor: 'default'
              }}
              ref={el => {
                 bubblesRef.current[idx] = el;
              }}
            >
              <span
                className="pill-label"
                ref={el => {
                   labelRefs.current[idx] = el;
                }}
              >
                {item.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}