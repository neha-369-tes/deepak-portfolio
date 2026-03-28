import { motion } from 'framer-motion';
import ImageTrail from './ImageTrail';
import './Experience.css';

const trailImages = [
  '/achievements/50+events/1.jpeg',
  '/achievements/champioship/1.jpg',
  '/achievements/hindustan/1.jpg',
  '/achievements/mentorship/IMG-20250731-WA0015.jpg',
  '/achievements/gojans/1.jpg',
  '/achievements/cit/1.jpg'
];

const experiences = [
  {
    year: '2026 - Present',
    role: 'Executive Engineer',
    company: 'Autobotz Esports Pvt. Ltd.',
    desc: 'Manage tournament operations and execution. Drive strategic planning and esports initiatives. Create high-impact digital content. Coordinate teams, players, and event logistics.',
    icon: 'fa-rocket',
    logo: '/logos/Abz-Logo-Red-1.png'
  },
  {
    year: '2022 - 2023',
    role: 'Organization Head',
    company: 'MG Esports – MeesaiGaming',
    desc: 'Led end-to-end esports operations. Managed teams, partnerships, and events. Executed online tournaments. Improved workflows and brand growth.',
    icon: 'fa-briefcase'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section" style={{ padding: "100px 0", background: "var(--off-white)", position: 'relative', borderTop: "1px solid var(--light-gray)" }}>
      {/* Marker: Zag Right, Vertically Centered */}
      <div id="marker-experience" className="scroll-marker" style={{ top: '50%', left: '10%' }}></div>

      <ImageTrail items={trailImages}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <div className="section-header-centered" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="experience-title" style={{ fontSize: '5rem', fontWeight: 700, color: 'var(--black)', margin: 0, lineHeight: 1.1, letterSpacing: '-2px', textTransform: 'none' }}>
            Work<span>.</span>Experience
          </h2>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="main-timeline5">
              {experiences.map((exp, index) => (
                <motion.div 
                  className="timeline" 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="timeline-icon">
                    <i className={`fa ${exp.icon}`}></i>
                    <span className="year">{exp.year}</span>
                  </div>
                  <div className="timeline-content">
                    <h3 className="title">{exp.role}</h3>
                    <span className="company">
                      {exp.company}
                    </span>
                    {exp.logo && <img src={exp.logo} alt={exp.company} className="company-logo" />}
                    <p className="description">
                      {exp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </ImageTrail>
    </section>
  );
};

export default Experience;
