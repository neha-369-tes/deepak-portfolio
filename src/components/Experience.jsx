import { motion } from 'framer-motion';
import './Experience.css';

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
    <section id="experience" className="experience-section" style={{ padding: "60px 0", position: 'relative' }}>
      {/* Marker: Zag Right, Vertically Centered */}
      <div id="marker-experience" className="scroll-marker" style={{ top: '50%', left: '10%' }}></div>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        <h1 className="main-heading" style={{ textAlign: 'center', marginBottom: '50px', fontWeight: 'bold', fontSize: '40px', textTransform: 'uppercase', fontFamily: "'Oswald', sans-serif", letterSpacing: '2px' }}>
          Works & Experience
        </h1>
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
    </section>
  );
};

export default Experience;
