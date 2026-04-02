import React, { useEffect, useRef } from 'react';
import './WallOfFame.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WallOfFame = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll('.fame-item, .fame-header');
    
    gsap.fromTo(elements,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        scrollTrigger: {
          trigger: sectionRef.current, 
          start: 'top 80%', 
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="wall-of-fame" ref={sectionRef} className="wall-of-fame-section">
      <div className="fame-header">
        <h2>Wall <span>Of</span> Fame</h2>
        <p className="fame-subtitle">Deepak Kathiravan &mdash; Excellence in Esports &amp; Technology</p>
      </div>
      
      <div className="fame-container">
        
        {/* Card 1: Major Championships */}
        <div className="fame-item major-card">
          <div className="card-inner">
            <div className="card-glow"></div>
            <h3>Major Championships</h3>
            <ul className="fame-list">
              <li>
                <strong>Chennai Esports Global Championship 2026</strong>
                <span>Represented Autobotz Esports as Operations Executive</span>
              </li>
              <li>
                <strong>Sky Esports Championship 2023</strong>
                <span>Represented AeroBotz Esports as Operations Executive</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Impact & Scale */}
        <div className="fame-item highlight-card">
          <div className="card-inner">
            <div className="card-glow"></div>
            <h3>Impact &amp; Scale</h3>
            <div className="highlight-stats">
              <div className="stat-box">
                <h4>50+</h4>
                <p>Events Executed</p>
              </div>
              <div className="stat-box">
                <h4>10K.+</h4>
                <p>Students Engaged</p>
              </div>
            </div>
            <p className="highlight-footer">
              Recognized as a <strong>Certified Speaker</strong> and <strong>Esports Influencer</strong>
            </p>
          </div>
        </div>

        {/* Card 3: Key Contributions */}
        <div className="fame-item details-card">
          <div className="card-inner">
            <div className="card-glow"></div>
            <h3>Key Contributions</h3>
            <ul className="fame-list">
              <li><strong>Esports Operations</strong> &mdash; Led end-to-end event execution from planning to production.</li>
              <li><strong>Team Leadership</strong> &mdash; Managed competitive teams, tournament operations, and broadcast setups.</li>
              <li><strong>Performance Analysis</strong> &mdash; Acted as a game analyst contributing to competitive insights.</li>
              <li><strong>Innovation</strong> &mdash; Played a key role in building campus-level esports infrastructure.</li>
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default WallOfFame;