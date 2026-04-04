import React from 'react';
import './GlassSurface.css';

const GlassSurface = ({
  width = '100%',
  height = '100%',
  borderRadius = 0,
  displace = 0.5,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  brightness = 50,
  opacity = 0.93,
  mixBlendMode = 'screen',
  className = '',
  children
}) => {
  return (
    <div 
      className={`glass-surface-container ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <div className="glass-surface-content" style={{ zIndex: 2 }}>
        {children}
      </div>
      <div 
        className="glass-surface-effect"
        style={{
          borderRadius: `${borderRadius}px`,
          mixBlendMode,
          opacity,
          filter: `url(#glass-distortion) brightness(${brightness}%)`
        }}
      />
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="glass-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={displace}
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={distortionScale}
            result="displacement"
          />
          <feColorMatrix
            type="matrix"
            values={`
              1 0 0 0 ${redOffset / 255} 
              0 1 0 0 ${greenOffset / 255} 
              0 0 1 0 ${blueOffset / 255} 
              0 0 0 1 0
            `}
          />
        </filter>
      </svg>
    </div>
  );
};

export default GlassSurface;
