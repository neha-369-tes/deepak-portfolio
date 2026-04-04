import React, { useRef, useState, useEffect } from 'react';
import MagneticBg from './MagneticBg';
import './Skills.css';

const skillData = {
  technical: [
    { category: 'Tech', name: 'Web Development', desc: 'Building responsive, performant web apps from scratch using modern stacks.' },
    { category: 'Tech', name: 'AI Automation', desc: 'Designing intelligent workflows, bots, and automation pipelines with AI tools.' },
    { category: 'Tech', name: 'Chatbot Development', desc: 'Building conversational AI systems for support, engagement, and automation.' },
    { category: 'Tech', name: 'System Design', desc: 'Architecting scalable, reliable systems and API integrations end-to-end.' },
    { category: 'Tech', name: 'Node.js', desc: 'Server-side JavaScript for APIs, real-time apps, and backend services.' },
    { category: 'Tech', name: 'Python', desc: 'Scripting, automation, data processing, and AI/ML integrations.' },
    { category: 'Tech', name: 'IAM & Security', desc: 'Identity & access management, authentication flows, and secure systems.' },
    { category: 'Tech', name: 'JavaScript', desc: 'Modern ES6+ development, DOM manipulation, and interactive web interfaces.' }
  ],
  esports: [
    { category: 'Esport', name: 'Tournament Management', desc: 'End-to-end planning, bracket design, and execution of national-level tournaments.' },
    { category: 'Esport', name: 'Event Leadership', desc: 'Leading teams, managing logistics, and delivering seamless live esports events.' },
    { category: 'Esport', name: 'Production & Broadcasting', desc: 'Live stream production, commentary coordination, and broadcast management.' },
    { category: 'Esport', name: 'Team Management', desc: 'Building, coaching, and coordinating competitive esports rosters and operations.' },
    { category: 'Esport', name: 'Game Analysis & Strategy', desc: 'Breaking down gameplay meta, coaching players, and building competitive strategies.' },
    { category: 'Esport', name: 'College Activations', desc: 'Driving student engagement across campuses through structured esports programs.' },
    { category: 'Esport', name: 'Operations & Logistics', desc: 'Managing end-to-end event operations, vendor coordination, and player management.' }
  ],
  soft: [
    { category: 'Soft', name: 'Public Speaking', desc: 'Guest speaker at colleges, summits, and industry events across Tamil Nadu.' },
    { category: 'Soft', name: 'UI/UX Thinking', desc: 'Designing intuitive user experiences with a sharp eye for visual detail.' },
    { category: 'Soft', name: 'Brand-Oriented Design', desc: 'Creating cohesive visual identities and digital content that builds brand equity.' },
    { category: 'Soft', name: 'Project Planning', desc: 'Structuring timelines, resources, and deliverables for complex multi-team projects.' },
    { category: 'Soft', name: 'Collaboration', desc: 'Cross-functional teamwork across orgs, colleges, and industry partners.' },
    { category: 'Soft', name: 'Strategic Thinking', desc: 'Translating vision into actionable plans — from zero to execution at scale.' },
    { category: 'Soft', name: 'Visual Content Creation', desc: 'Producing compelling digital content that tells stories and drives engagement.' }
  ]
};

const SkillCard = ({ item }) => {
  let catClass = 'cat-tech';
  if (item.category === 'Esport') catClass = 'cat-esp';
  if (item.category === 'Soft') catClass = 'cat-soft';
  
  return (
    <div className="sk" style={{ userSelect: 'none' }}>
      <span className={`sk-cat ${catClass}`}>{item.category}</span>
      <div className="sk-name">{item.name}</div>
      <div className="sk-desc">{item.desc}</div>
    </div>
  );
};

const MarqueeRow = ({ title, items }) => {
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    const startAutoScroll = () => {
      if (!scrollRef.current) return;

      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current && isAutoScrolling) {
          scrollRef.current.scrollLeft += 1;
        }
      }, 30);
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isAutoScrolling]);

  const handleUserInteraction = () => {
    setIsAutoScrolling(false);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);
  };

  const handleMouseDown = () => {
    handleUserInteraction();
  };

  const handleTouchStart = () => {
    handleUserInteraction();
  };

  const handleScroll = () => {
    handleUserInteraction();
  };

  return (
    <div className="skill-row-container">
      <div className="row-label">{title}</div>
      <div
        className="marquee-wrapper"
        ref={scrollRef}
        style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onScroll={handleScroll}
      >
        <div className="marquee-content">
          {[...items, ...items].map((item, index) => (
            <SkillCard key={`skills-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="ex">
      {/* Marker: Zag Left, Vertically Centered */}
      <div id="marker-skills" className="scroll-marker" style={{ top: '50%', right: '10%' }}></div>
      {/* Magnetic Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <MagneticBg />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        <div className="ex-head">
          <h2 className="ex-title">Expert<span>.</span>ise</h2>
        </div>

        <MarqueeRow title="Technical Skills" items={skillData.technical} speed={1} />
        <MarqueeRow title="Esports Expertise" items={skillData.esports} speed={1} />
        <MarqueeRow title="Other Competencies" items={skillData.soft} speed={1} />
      </div>
    </section>
  );
};

export default Skills;
