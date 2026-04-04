import React, { useState, useEffect, useRef } from 'react';
import './SocialFab.css';

const SocialFab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const fabWrapRef = useRef(null);
  
  useEffect(() => {
    // Simple intersection observer to detect when this specific component is in view
    const observer = new IntersectionObserver(
        ([entry]) => {
            // Becomes "docked" (visible/active) when it scrolls into view
            setIsDocked(entry.isIntersecting);
        },
        { threshold: 0.5 }
    );

    if (fabWrapRef.current) {
        observer.observe(fabWrapRef.current);
    }
    return () => observer.disconnect();
  }, []);
  
  const fabMainRef = useRef(null);
  
  // Emojis for the main button
  const emojis = ['🎮', '⚡', '🏆', '🎯', '🌟', '🔥'];
  const [emojiIdx, setEmojiIdx] = useState(0);

  useEffect(() => {
    const handleBallDocked = () => {
       spawnParticles();
    };
    
    window.addEventListener('ball-docked', handleBallDocked);
    return () => window.removeEventListener('ball-docked', handleBallDocked);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate emojis if menu is closed (and docked or not docked? User said "automate... at first")
      // If closed, cycle emojis
      if (!isOpen) {
        setEmojiIdx((prev) => (prev + 1) % emojis.length);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [isOpen]);

  const socialLinks = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/deepak-kathiravan-53a932346?utm_source=share_via&utm_content=profile&utm_medium=member_android', // Replace with actual  
      color: 'linear-gradient(135deg,#0077b5,#005e93)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10V9h4v1.5A6 6 0 0 1 16 8zM2 9h4v12H2zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
        </svg>
      )
    },
    {
      label: 'Threads',
      url: 'https://www.threads.com/@abz.dpakkk.gg?invite=0', // Replace with actual
      color: 'linear-gradient(135deg,#1a1a1a,#333)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/abz.dpakkk.gg?igsh=MTc2aG1sdDh5eTZtYw==', // Replace with actual
      color: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none"/>
        </svg>
      )
    },
    {
      label: 'YouTube',
      url: 'https://youtube.com/@abzdeepak_gg?si=hHdxrrDaKF9aW69X', // Replace with actual
      color: 'linear-gradient(135deg,#ff0000,#cc0000)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 7s-.3-1.9-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.2 3 12 3 12 3s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5.1 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 1.9 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.7 12 21.7 12 21.7s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.7 1.2-2.7s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
        </svg>
      )
    },
    {
      label: 'WhatsApp',
      url: 'https://wa.me/918148526334', 
      color: 'linear-gradient(135deg,#25D366,#128C7E)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    },
    {
      label: 'Gmail',
      url: 'mailto:deepakharini15@gmail.com', 
      color: 'linear-gradient(135deg,#DB4437,#F4B400,#0F9D58,#4285F4)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        </svg>
      )
    },
    {
      label: 'Abz Insta',
      url: 'https://www.instagram.com/autobotz_esports?igsh=MXE1d3UzZ3lmb3ZlbA==', // Placeholder
      color: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none"/>
        </svg>
      )
    },
    {
      label: 'WA Community',
      url: 'https://chat.whatsapp.com/BRMVEH9bU5K5ifVnvJK6SM?mode=gi_t', // Placeholder
      color: 'linear-gradient(135deg,#128C7E,#075E54)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
           <path d="M2.004 22l1.649-6.014A9.92 9.92 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.92 9.92 0 0 1-5.011-1.353L2.004 22zM12 4a8 8 0 0 0-8 8c0 1.77.574 3.42 1.547 4.793l-1.01 3.682 3.754-1.028A7.957 7.957 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      )
    },
    {
      label: 'Discord',
      url: 'https://discord.gg/RKCU753xH',
      color: 'linear-gradient(135deg,#5865F2,#4752C4)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
      )
    }
  ];

  // Helper: Spawn particles
  const spawnParticles = () => {
    if (!fabWrapRef.current) return;
    const colors = ['#c8102e', '#ff8709', '#ffd700', '#fff', '#00f2ea', '#ff0055'];
    const count = 90; // "90 tiny pieces"

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        // Random angle for full explosion
        const angle = Math.random() * 360; 
        // Explode outward with variance
        const dist = 50 + Math.random() * 120; 
        
        const tx = Math.cos(angle * Math.PI / 180) * dist + 'px';
        const ty = Math.sin(angle * Math.PI / 180) * dist + 'px';
        
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Tiny pieces
        const size = 3 + Math.random() * 4;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'; // Mix of circles and squares
        
        fabWrapRef.current.appendChild(p);
        
        // Trigger animation
        requestAnimationFrame(() => {
            p.classList.add('pop');
        });
        
        // Cleanup
        setTimeout(() => {
            if (p && p.parentNode) p.parentNode.removeChild(p);
        }, 1200);
    }
  };

  const toggle = () => {
    if (!isOpen) {
        spawnParticles();
    }
    setIsOpen(!isOpen);
  }

  // Calculate position for items in a full circle around the button
  const radius = 130; // Increased radius for more separation
  
  return (
    <>
        <div 
            className={`fab-backdrop ${isOpen ? 'open' : ''}`} 
            onClick={() => setIsOpen(false)}
        />
        
        {socialLinks.map((link, index) => {
            const count = socialLinks.length;
            // Distribute evenly in a full circle (360 degrees)
            const step = 360 / count;
            const angleDeg = -90 + (index * step); // Start from top (-90 degrees)
            const angleRad = (angleDeg * Math.PI) / 180;
            
            const tx = Math.cos(angleRad) * radius;
            const ty = Math.sin(angleRad) * radius; 
            
            const rot = (Math.random() * 40 - 20) + 'deg'; 

            return (
                <a 
                    key={index}
                    className={`fab-item ${isOpen ? 'visible' : ''}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    style={{
                        '--tx': `${tx}px`,
                        '--ty': `${ty}px`,
                        '--rot': rot,
                        transitionDelay: isOpen ? `${index * 40}ms` : '0ms'
                    }}
                >
                    <div className="fab-btn" style={{ background: link.color }}>
                        {link.icon}
                    </div>
                    {/* Label is now optional or can be positioned better if needed */}
                    <span className="fab-label">{link.label}</span>
                </a>
            );
        })}

        <div className={`fab-main-wrap ${isOpen ? 'open' : ''} ${isDocked ? 'docked' : 'blueprint'}`} ref={fabWrapRef}>
            {/* Blueprint Ring */}
            <div className="fab-blueprint-ring"></div>
            
            {/* Active Content: Only show when docked (reached bottom) */}
            <div className={`fab-content ${isDocked ? 'visible' : ''}`}>
                <div className="blink"></div>
                <div className="ring"></div>
                <div className="ring2"></div>
                {!isOpen && <span className="fab-cta">tap me!</span>}
                
                <button className="fab-main" onClick={toggle} aria-label="Toggle menu" disabled={!isDocked}>
                    {isOpen ? '✕' : emojis[emojiIdx]}
                </button>
            </div>
        </div>
    </>
  );
};

export default SocialFab;