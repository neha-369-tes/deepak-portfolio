import { useState, useEffect, useRef } from 'react';
import { IconCode, IconVideo, IconDeviceDesktop, IconHeadset, IconServer } from '@tabler/icons-react';
import './About.css';

const PAGES = [
  {
    id: 'intro',
    eyebrow: 'Background',
    title: 'Who I Am',
    accent: 'var(--primary-red)',
    bg: 'bg-bg1',
    content: (
      <>
        <p>
          I am Deepak Kathiravan, Executive Engineer at Autobotz Esports IT Private Limited, with a strong passion for technology, esports ecosystems, and digital innovation. I specialize in building and executing scalable esports operations while developing modern digital solutions across web, applications, and AI-driven systems.
        </p>
        <p>
          With over six years of experience in esports operations, I have led tournaments, managed teams, executed large-scale events, and handled production broadcasting with precision. In parallel, I bring two years of experience in business and IT operations, contributing to structured execution, system design, and operational efficiency.
        </p>
      </>
    )
  },
  {
    id: 'expertise',
    eyebrow: 'Expertise',
    title: 'What I Do',
    accent: '#7F77DD',
    bg: 'bg-bg2',
    content: (
      <div className="expertise-content">
        <ul className="gc-content-list">
          <li>Design and execute end-to-end esports tournaments and events</li>
          <li>Lead team management, coordination, and competitive operations</li>
          <li>Manage production workflows and live broadcast execution</li>
          <li>Analyze gameplay and strategies to improve performance</li>
          <li>Contribute to business operations and IT system management</li>
        </ul>
        <div className="expertise-tools-title">Tools & Infrastructure</div>
        <div className="expertise-tools-grid">
          <div className="tool-bag"><IconVideo size={20} /> <span>OBS / vMix</span></div>
          <div className="tool-bag"><IconHeadset size={20} /> <span>Discord</span></div>
          <div className="tool-bag"><IconDeviceDesktop size={20} /> <span>IT Ops</span></div>
          <div className="tool-bag"><IconServer size={20} /> <span>AWS</span></div>
          <div className="tool-bag"><IconCode size={20} /> <span>VS Code</span></div>
        </div>
      </div>
    )
  },
  {
    id: 'college',
    eyebrow: 'Initiatives',
    title: 'College Operations',
    accent: '#1D9E75',
    bg: 'bg-bg3',
    content: (
      <p>
        I have successfully led competitive gaming platforms across institutions, acting as a Guest Speaker and Strategy Lead for college events. By organizing structured inter-college tournaments and guiding students in game optimization and esports pipelines, I continuously drive localized esports growth.
      </p>
    )
  },
  {
    id: 'vision',
    eyebrow: 'Future',
    title: 'Vision',
    accent: '#D85A30',
    bg: 'bg-bg1',
    content: (
      <p>
        My goal is to build a strong bridge between technology and esports, creating scalable ecosystems that empower talent, enable innovation, and drive long-term impact. I aim to evolve as a technology-driven esports leader, delivering value across both digital and competitive landscapes.
      </p>
    )
  }
];

const miniDefs = [
  { w: 130, h: 90, top: '10%', left: '3%', rot: '-7deg' },
  { w: 100, h: 68, top: '62%', left: '2%', rot: '6deg' },
  { w: 118, h: 82, top: '72%', left: '68%', rot: '5deg' },
  { w: 105, h: 72, top: '6%', left: '72%', rot: '9deg' },
  { w: 88, h: 60, top: '40%', left: '82%', rot: '-4deg' },
];

const About = () => {
  const N = PAGES.length;
  const [order, setOrder] = useState(PAGES.map((_, i) => i));
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextMobile = () => {
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder.push(newOrder.shift());
      return newOrder;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || window.innerWidth <= 768) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      let scrolled = -rect.top;
      
      // Calculate what card should be active (0 to N-1)
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      let currentIndex = Math.min(N - 1, Math.floor(progress * N));
      
      setOrder((prev) => {
        if (prev[0] === currentIndex) return prev;
        
        let newOrder = Array.from({ length: N }, (_, i) => i);
        for(let i=0; i<currentIndex; i++) {
           newOrder.push(newOrder.shift());
        }
        return newOrder;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger on mount
    handleScroll();

    return () => {
       window.removeEventListener('scroll', handleScroll);
    };
  }, [N]);

  const getFanTransform = (pos) => {
    if (pos === 0) {
      return {
        transform: `translate(0px, 0px) scale(1) rotate(0deg)`,
        opacity: 1,
        zIndex: 40,
        boxShadow: 'none',
      };
    }
    const tx = pos * 22;
    const ty = pos * 18;
    const sc = 1 - pos * 0.065;
    const rot = pos * 3.5;
    const op = Math.max(0, 1 - pos * 0.22);
    return {
      transform: `translate(${tx}px, ${ty}px) scale(${sc}) rotate(${rot}deg)`,
      opacity: op,
      zIndex: 40 - pos * 10,
    };
  };

  const curId = order[0];
  const curPage = PAGES[curId];

  return (
    <div ref={wrapperRef} style={{ height: isMobile ? '100vh' : `${(N + 1) * 70}vh`, position: 'relative' }}>
      <section id="about" className="about-stack-section" style={{ position: isMobile ? 'relative' : 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div id="marker-about" className="scroll-marker" style={{ top: '50%', left: '10%' }}></div>

        {/* Backgrounds */}
        {['bg-bg1', 'bg-bg2', 'bg-bg3'].map((bgId, index) => (
          <div key={bgId} className={`bg-stack ${curPage.bg === bgId ? 'active' : ''}`} id={bgId}>
            <div className="stack-orb"></div>
          </div>
        ))}

        {/* Mini screens */}
        <div className="mini-screens">
          {miniDefs.map((m, i) => {
            const pg = PAGES[(curId + i + 1) % N];
            return (
              <div
                key={i}
                className="mini-screen"
                style={{
                  width: `${m.w}px`,
                  height: `${m.h}px`,
                  top: m.top,
                  left: m.left,
                  transform: `rotate(${m.rot})`,
                }}
              >
                <div className="ms-bar" style={{ background: pg.accent, width: `${Math.round(m.w * 0.55)}px` }}></div>
                <div className="ms-title">{pg.title}</div>
                <div className="ms-sub">{pg.eyebrow}</div>
                <div className="ms-line" style={{ width: `${Math.round(m.w * 0.7)}px` }}></div>
                <div className="ms-line" style={{ width: `${Math.round(m.w * 0.5)}px` }}></div>
                <div className="ms-line" style={{ width: `${Math.round(m.w * 0.6)}px` }}></div>
              </div>
            );
          })}
        </div>

        {/* Stack */}
        <div className="card-stack-container">
          {PAGES.map((p, idx) => {
            const pos = order.indexOf(idx);
            const style = getFanTransform(pos);

            return (
              <div
                key={p.id}
                className={`glass-card ${pos === 0 ? 'is-active' : ''}`}
                style={{
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
              >
                <div className="gc-eyebrow">{p.eyebrow}</div>
                <div className="gc-accent" style={{ background: p.accent }}></div>
                <div className="gc-title">{p.title}</div>
                <div className="gc-content">
                  {p.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Next Button */}
        {isMobile && (
          <div 
            onClick={handleNextMobile}
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              background: 'rgba(30, 30, 30, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '12px 24px',
              borderRadius: '30px',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              userSelect: 'none',
              animation: 'pulseHint 2s infinite'
            }}
          >
            <span>Touch to Swipe Card</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        )}

        {/* UI Controls */}
        <div id="stack-page-name">{curPage.title}</div>

        <div id="stack-dots">
          {PAGES.map((p, idx) => (
            <div
              key={idx}
              className={`stack-dot ${idx === curId ? 'active' : ''}`}
            ></div>
          ))}
        </div>

        <div id="stack-counter">
          {String(curId + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </div>
      </section>
    </div>
  );
};

export default About;