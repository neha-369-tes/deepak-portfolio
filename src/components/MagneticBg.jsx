import { useEffect, useRef } from 'react';

const MagneticBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let mx = -9999, my = -9999;
    let filings = [];

    // Configuration
    const SPACING = 40; // Space between filings
    const LEN = 14; // Length of each line

    // Mouse tracker
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize filings grid
    const init = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      filings = [];

      const cols = Math.floor(width / SPACING);
      const rows = Math.floor(height / SPACING);
      
      const gX = width / (cols + 1);
      const gY = height / (rows + 1);

      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
            filings.push({
                x: gX * c,
                y: gY * r,
                angle: 0
            });
        }
      }
    };

    // Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';

      for (const f of filings) {
        // Calculate angle towards mouse
        const targetAngle = Math.atan2(my - f.y, mx - f.x);
        
        // Smooth rotation (Linear Interpolation for angle)
        let diff = targetAngle - f.angle;
        // Normalize angle difference to be between -PI and PI
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        
        // Ease factor (0.12 from snippet)
        f.angle += diff * 0.12;

        // Brightness/Opacity based on distance
        const dist = Math.hypot(mx - f.x, my - f.y);
        // User snippet logic: Math.max(0.25, 1 - dist / 600)
        // Since we are on light bg, we use opacity for darkness.
        // Close = Darker/Opaque. Far = Lighter/Transparent.
        const opacity = Math.max(0.1, 1 - dist / 600); 

        const hx = Math.cos(f.angle) * LEN / 2;
        const hy = Math.sin(f.angle) * LEN / 2;

        ctx.beginPath();
        ctx.moveTo(f.x - hx, f.y - hy);
        ctx.lineTo(f.x + hx, f.y + hy);
        
        // Using Dark Gray/Black for visibility on light theme
        // To make it look like the red brand theme, let's use a very dark red/gray mix
        // Or just pure black with opacity as per "iron filings"
        ctx.strokeStyle = `rgba(50, 50, 50, ${opacity})`; 
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Handle resize
    const handleResize = () => {
        init();
        // Force a draw immediately after init to prevent flash
    };

    window.addEventListener('resize', handleResize);
    
    // Start
    init();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none', // Let clicks pass through
        opacity: 0.6 // Subtle background
      }}
    />
  );
};

export default MagneticBg;