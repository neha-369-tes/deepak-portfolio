import React from 'react';
import { motion } from 'framer-motion';
import './Testimonial.css';

const Testimonial = () => {
  return (
    <section id="testimonials" className="testimonial-section" style={{ position: 'relative' }}>
      <div id="marker-testimonial" className="scroll-marker" style={{ top: '50%', right: '10%' }}></div>
      <motion.div
        className="testimonial-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title experience-title" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, color: 'var(--dark-gray)', margin: 0, lineHeight: 1.1, letterSpacing: '-2px', textTransform: 'none' }}>
            <span className="th-text">What</span><span className="th-dot">.</span><span className="th-text">People</span><span className="th-dot">.</span><span className="th-red">Say</span>

        <div className="testimonial-card">
          <div className="testimonial-content">
            <span className="quote-mark left">"</span>
            <p>
              Deepak has always been more than just a team member to us at ABZ — he is a true asset to the organization. His energy, ability to multitask under pressure, and deep technical understanding consistently set him apart.
            </p>
            <p>
              What stands out most is his trustworthiness and loyalty. He takes ownership of every responsibility with commitment and integrity, making him someone we can rely on for both execution and leadership. His mindset, adaptability, and dedication to the work reflect the values we stand for at ABZ, and his contributions continue to drive our growth and vision forward.
            </p>
            <span className="quote-mark right">"</span>
          </div>
          
          <div className="testimonial-author">
            <img src="/prof-pics/abzchief.png" alt="Mr. Moorthy Ramasamy" className="author-img" />
            <div className="author-info">
              <h3 className="author-name">Mr. Moorthy Ramasamy</h3>
              <p className="author-title">Founder of Autobotz groups of companies</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonial;
