import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    gsap.set(grid, { rotationZ: -20, rotationX: 20, scale: 1.2 });

    const xTo = gsap.quickTo(grid, 'x', { duration: 0.8, ease: 'power2.out' });
    const yTo = gsap.quickTo(grid, 'y', { duration: 0.8, ease: 'power2.out' });
    const rotXTo = gsap.quickTo(grid, 'rotationX', { duration: 0.8, ease: 'power2.out' });
    const rotYTo = gsap.quickTo(grid, 'rotationY', { duration: 0.8, ease: 'power2.out' });

    const rowXTo = rowRefs.current.map(row => {
        if(!row) return null;
        return gsap.quickTo(row, 'x', { duration: 0.8, ease: 'power2.out' });
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const centerX = width / 2;
      const centerY = height / 2;

      const xPos = (clientX - centerX) / width;
      const yPos = (clientY - centerY) / height;

      xTo(xPos * 50);
      yTo(yPos * 50);
      rotXTo(20 + yPos * -15);
      rotYTo(xPos * 15);

      rowXTo.forEach((setTo, i) => {
          if(!setTo) return;
          const speed = (i % 2 === 0) ? 1 : -1;
          setTo(xPos * 150 * speed);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const rows = [];
  const chunkSize = Math.max(1, Math.ceil(items.length / 4));
  
  for (let i = 0; i < 6; i++) {
    // Grab a chunk of the icons for this row
    let rowStart = (i * chunkSize) % items.length;
    let rowEnd = rowStart + chunkSize;
    
    let baseChunk = items.slice(rowStart, rowEnd);
    if(baseChunk.length < chunkSize) {
        baseChunk = [...baseChunk, ...items.slice(0, chunkSize - baseChunk.length)];
    }
    
    // Repeat twice
    const repeatedRow = [...baseChunk, ...baseChunk, ...baseChunk, ...baseChunk]; // Repeat 4 times to overflow edges but perform better
    rows.push(repeatedRow);
  }

  return (
    <div className="grid-motion-container" ref={containerRef} style={{ '--gradient-color': gradientColor }}>
      <div className="grid-motion-wrapper" ref={gridRef}>
        {rows.map((rowItems, rowIndex) => (
          <div 
            className={`grid-motion-row ${rowIndex % 2 === 0 ? 'move-left' : 'move-right'}`} 
            key={`row-${rowIndex}`}
            ref={el => rowRefs.current[rowIndex] = el}
          >
            {rowItems.map((item, colIndex) => (
              <div className="grid-motion-item" key={`item-${rowIndex}-${colIndex}`}>
                {typeof item === 'string' ? (
                  <img src={item} alt={`Social ${colIndex}`} className="grid-item-img" />
                ) : (
                  <div className="grid-item-content">{item}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="grid-motion-overlay"></div>
    </div>
  );
};

export default GridMotion;