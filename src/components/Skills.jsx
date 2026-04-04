import React from 'react';
import MagneticBg from './MagneticBg';
import BubbleMenu from './BubbleMenu';
import ResumeCard from './ResumeCard';

const techItems = [
  { label: 'Technical Expertise', rotation: 0, hoverStyles: { bgColor: '#fff', textColor: '#000' } },
  { label: 'Web & App Dev', rotation: -5, hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } },
  { label: 'System Design & Integration', rotation: 4, hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
  { label: 'Chatbot & AI Automations', rotation: -3, hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' } },
  { label: 'C++, Java, JS, Node.js', rotation: 6, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
  { label: 'DBMS', rotation: -4, hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' } },
  { label: 'Agile Software Dev', rotation: 5, hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' } },
  { label: 'IAM & API Integrations', rotation: -6, hoverStyles: { bgColor: '#0ea5e9', textColor: '#ffffff' } },
  { label: 'UI/UX Thinking', rotation: 7, hoverStyles: { bgColor: '#f97316', textColor: '#ffffff' } },
  { label: 'Graphic & Visual Design', rotation: -5, hoverStyles: { bgColor: '#14b8a6', textColor: '#ffffff' } },
  { label: 'Brand-Oriented Design', rotation: 4, hoverStyles: { bgColor: '#6366f1', textColor: '#ffffff' } }
];

const esportsItems = [
  { label: 'Esports Domain', rotation: 0, hoverStyles: { bgColor: '#fff', textColor: '#000' } },
  { label: 'Tournament Management', rotation: -8, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
  { label: 'Event Leadership', rotation: 8, hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' } },
  { label: 'Production & Broadcasting', rotation: -5, hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } },
  { label: 'Team Management', rotation: 6, hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
  { label: 'Game Analysis & Strategy', rotation: -6, hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' } }
];

const softItems = [
  { label: 'Public Presence & Leadership', rotation: 0, hoverStyles: { bgColor: '#fff', textColor: '#000' } },
  { label: 'Esports Awareness Sessions', rotation: -5, hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' } },
  { label: 'Student Communities', rotation: 4, hoverStyles: { bgColor: '#14b8a6', textColor: '#ffffff' } },
  { label: 'Academic Representation', rotation: -6, hoverStyles: { bgColor: '#f97316', textColor: '#ffffff' } },
  { label: 'Ecosystem Growth', rotation: 5, hoverStyles: { bgColor: '#0ea5e9', textColor: '#ffffff' } },
  { label: 'Communication & Speaking', rotation: -4, hoverStyles: { bgColor: '#6366f1', textColor: '#ffffff' } },
  { label: 'Team Management & Leadership', rotation: 6, hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' } },
  { label: 'Project Planning & Execution', rotation: -5, hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
  { label: 'Collaboration & Coordination', rotation: 7, hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } }
];

const Skills = () => {
  return (
    <section id="skills" style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      minHeight: '120vh', 
      padding: '120px 0',
      background: 'transparent',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div id="marker-skills" className="scroll-marker" style={{ top: '50%', right: '10%' }}></div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.5, zIndex: 0 }}>
        <MagneticBg />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="skills-main-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 500, margin: 0, letterSpacing: '-2px', display: 'inline-flex', alignItems: 'flex-start' }}>
            <span className="skill-text">SKILL</span> <span className="set-text" style={{ marginLeft: '15px' }}>{'{'}SET{'}'}</span> <sup className="set-text" style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)', fontWeight: 400, marginLeft: '10px', marginTop: '10px' }}>(3)</sup>
          </h2>
          <p style={{ color: '#aaa', fontSize: 'clamp(1rem, 2vw, 1.8rem)', marginTop: '-5px', fontWeight: 300 }}>& interests</p>
        </div>

        {/* Responsive layout wrapper for the groups */}
        <div className="skills-groups-container">
          
          {/* Top Row: Tech (Left) & Esports (Right) */}
          <div className="top-row-groups">
            {/* 1. Tech Group */}
            <div className="skill-group-container tech-group">
              <BubbleMenu
                items={techItems}
                menuBg="#111"
                menuContentColor="#fff"
                animationEase="back.out(1.5)"
                animationDuration={0.6}
                staggerDelay={0.06}
              />
            </div>

            {/* 2. Esports Group (Right Space of Tech) */}
            <div className="skill-group-container esports-group">
              <BubbleMenu
                items={esportsItems}
                menuBg="#111"
                menuContentColor="#fff"
                animationEase="back.out(1.5)"
                animationDuration={0.6}
                staggerDelay={0.06}
              />
            </div>
          </div>

          {/* Bottom Row: Soft Skills Group & Resume */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
            <div className="skill-group-container soft-group">
              <BubbleMenu
                items={softItems}
                menuBg="#111"
                menuContentColor="#fff"
                animationEase="back.out(1.5)"
                animationDuration={0.6}
                staggerDelay={0.06}
              />
            </div>

            <ResumeCard />
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `          .skills-main-title .skill-text {
            color: #ffffff !important;
          }
          body:not(.dark-mode) .skills-main-title .skill-text {
            color: #111111 !important;
          }
          .skills-main-title .set-text {
            color: #dc143c !important; /* var(--primary-red) */
          }
        .skills-groups-container {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 70px;
          padding: 0 40px;
        }

        .top-row-groups {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          gap: 40px;
        }

        .skill-group-container {
          width: 100%;
          max-width: 800px;
          display: flex;
        }

        .tech-group {
          flex: 1.1;
          justify-content: center;
        }
        
        .esports-group {
          flex: 0.9;
          display: flex;
          justify-content: center;
        }

        .soft-group {
          align-self: center;
          margin-top: 40px;
          justify-content: center;
        }

        /* Group Heading Bubble */
        .bubble-menu-items .pill-list .pill-col:first-child .pill-link {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #000000 !important;
          border: 1px solid rgba(255, 255, 255, 1);
          z-index: 5;
          font-weight: 700;
          font-size: clamp(1.1rem, 2vw, 1.6rem);
          padding: 1rem 1.8rem;
          transform: rotate(0deg) !important;
          margin-bottom: 2px;
          box-shadow: 0 4px 20px rgba(255,255,255,0.4), 0 0 15px rgba(255,255,255,0.2) !important;
        }
        
        /* Light Mode Headers */
        body:not(.dark-mode) .bubble-menu-items .pill-list .pill-col:first-child .pill-link {
          background: rgba(0, 0, 0, 0.85) !important;
          color: #fff !important;
          border: 1px solid #000;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 15px rgba(0,0,0,0.15) !important;
        }

        /* Light Mode Texts */
        body:not(.dark-mode) h2, body:not(.dark-mode) h2 sup, body:not(.dark-mode) p {
          color: #111 !important;
        }

        .bubble-menu-items .pill-list .pill-col:first-child .pill-link:hover {
          transform: scale(1.05) !important;
        }

        /* Rest of the Bubbles Alignment */
        .bubble-menu-items .pill-list {
          justify-content: center;
        }

        .soft-group .pill-list {
          justify-content: center;
        }

        .esports-group .pill-list {
          justify-content: center;
        }

        @media (max-width: 1000px) {
          .top-row-groups {
            flex-direction: column;
            align-items: center;
            gap: 60px;
          }
          .skill-group-container {
            align-self: center !important;
            max-width: 100%;
          }
          .esports-group {
            justify-content: center;
          }
          .skills-groups-container {
            flex-direction: column;
            gap: 40px;
            padding: 0 20px;
          }
          .bubble-menu-items .pill-list {
            justify-content: center !important;
          }
        }
      `}} />
    </section>
  );
};

export default Skills;
