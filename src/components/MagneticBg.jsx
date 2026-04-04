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

    // Mouse & Touch tracker
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      if (clientX !== undefined && clientY !== undefined) {
        mx = clientX - rect.left;
        my = clientY - rect.top;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleMouseMove, { passive: true });

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
        const isDarkMode = document.body.classList.contains('dark-mode');       
        const dist = Math.hypot(mx - f.x, my - f.y);
        
        // Increase base opacity and interaction radius in dark mode to make it more visible
        const opacity = isDarkMode
            ? Math.max(0.4, 1 - dist / 500)
            : Math.max(0.2, 1 - dist / 700);

        const hx = Math.cos(f.angle) * LEN / 2;
        const hy = Math.sin(f.angle) * LEN / 2;

        ctx.beginPath();
        ctx.moveTo(f.x - hx, f.y - hy);
        ctx.lineTo(f.x + hx, f.y + hy);

        ctx.lineWidth = isDarkMode ? 1.5 : 2;
        ctx.strokeStyle = isDarkMode
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(10, 10, 10, ${opacity})`;
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
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
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
        pointerEvents: 'none' // Let clicks pass through
      }}
    />
  );
};

export default MagneticBg;