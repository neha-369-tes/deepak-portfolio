import React, { useState, useRef } from 'react';
import './Certifications.css';

const certificates = [
  { id: 1, name: 'AI Fusion 1.0', src: '/certifications/Ai-fusion-1.0.jpeg', type: 'img' },
  { id: 2, name: 'Bit by Bit', src: '/certifications/bit-by-bit.jpeg', type: 'img' },
  { id: 3, name: 'Cloud Kickstart', src: '/certifications/cloud-kickstart.jpeg', type: 'img' },
  { id: 4, name: 'Deepak Kathiravan (1)', src: '/certifications/DEEPAK KATHIRAVAN (1)-1.png', type: 'img' },
  { id: 5, name: 'Certificate of Completion', src: '/certifications/Deepak kathiravan s Certificate of Completion-1.png', type: 'img' },
  { id: 6, name: 'Innovit St Joseph', src: '/certifications/innovit-st-joseph.jpeg', type: 'img' },
  { id: 7, name: 'Internship Completion', src: '/certifications/internship completion certificate deepak-1.png', type: 'img' },
  { id: 8, name: 'Visit to CEGC', src: '/certifications/visit-to-cegc.jpeg', type: 'img' }
];

const Certifications = () => {
  const [activeItem, setActiveItem] = useState(null);
  
  // Drag scrolling logic
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragThreshold = useRef(false); // To distinguish drag vs click
  const isHovered = useRef(false);
  const position = useRef(0); // Tracks precise float for autoScroll

  // Auto-scroll loop
  React.useEffect(() => {
    let animationFrameId;
    if (trackRef.current) position.current = trackRef.current.scrollLeft;

    const autoScroll = () => {
      if (trackRef.current && !isDragging.current && !isHovered.current) {
        position.current += 1.5; // Auto-scroll speed
        // Seamless loop reset roughly when halfway passed
        if (position.current >= trackRef.current.scrollWidth / 2) {
          position.current = 1;
        }
        trackRef.current.scrollLeft = position.current;
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const onMouseDown = (e) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    dragThreshold.current = false;
    const pageX = e.pageX || (e.touches && e.touches[0].pageX);
    startX.current = pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) {
      position.current = trackRef.current.scrollLeft; // Sync auto scroll to drag end
    }
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    isHovered.current = false;
    if (trackRef.current) {
      position.current = trackRef.current.scrollLeft;
    }
  };

  const onMouseEnter = () => {
    isHovered.current = true;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !trackRef.current) return;
    const pageX = e.pageX || (e.touches && e.touches[0].pageX);
    if (!pageX) return;
    
    const x = pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    
    if (Math.abs(walk) > 5) {
      dragThreshold.current = true; // Mark as dragged so click doesn't trigger 
      e.preventDefault();
    }
    
    trackRef.current.scrollLeft = scrollLeft.current - walk;
    position.current = trackRef.current.scrollLeft; // Update precise position
  };


  const handleClick = (cert, e) => {
    if (dragThreshold.current) {
      e.preventDefault();
      return; // Do not open lightbox if dragged
    }
    if (cert.type === 'pdf') {
      window.open(cert.src, '_blank');
      return;
    }
    setActiveItem(cert);
  };

  const handleClose = () => {
    setActiveItem(null);
  };

  return (
    <div className="certifications-section">
      <h3 className="certifications-subtitle"><span className="th-text">Certifications</span><span className="th-dot">.</span></h3>
      
      <div 
        className="certifications-track-container"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onTouchMove={onMouseMove}
        style={{ 
          overflowX: 'auto', 
          cursor: 'grab', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        <div className="certifications-track" style={{ display: 'flex', width: 'max-content', padding: '0 20px' }}>
          {/* Multiply duplicates to ensure safe infinite scroll distance */}
          {[...certificates, ...certificates, ...certificates, ...certificates].map((cert, index) => (
            <div 
              key={`${cert.id}-${index}`} 
              className="cert-card"
              onClick={(e) => handleClick(cert, e)}
            >
              <div className="cert-thumbnail-wrapper">
                {cert.type === 'img' ? (
                  <img src={cert.src} alt={cert.name} className="cert-thumbnail" loading="lazy" />
                ) : (
                  <div className="pdf-thumbnail">
                    {/* Visual iframe placeholder */}
                    <iframe 
                      src={`${cert.src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
                      className="pdf-preview" 
                      tabIndex="-1"
                      title={cert.name}
                    />
                    <div className="pdf-overlay-block"></div>
                    <span className="pdf-badge">PDF</span>
                  </div>
                )}
              </div>
              <p className="cert-name">{cert.name}</p>
            </div>
          ))}
        </div>
      </div>

      {activeItem && (
        <div className="cert-lightbox" onClick={handleClose}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-lightbox" onClick={handleClose}>&times;</button>
            {activeItem.type === 'img' ? (
              <img src={activeItem.src} alt={activeItem.name} className="lightbox-img" />
            ) : (
              <iframe src={`${activeItem.src}#toolbar=0&navpanes=0&scrollbar=0`} title={activeItem.name} className="lightbox-pdf" />
            )}
            <h4 className="lightbox-title">{activeItem.name}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
