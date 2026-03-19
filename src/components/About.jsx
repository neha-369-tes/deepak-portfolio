import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="about" className="about">
      {/* Marker: Zig Right, Vertically Centered */}
      <div id="marker-about" className="scroll-marker" style={{ top: '50%', left: '10%' }}></div>
      <div className="about-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About
        </motion.h2>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="about-section">
            <h3>Background</h3>
            <p>
              I am Deepak Kathiravan, Executive Engineer at Autobotz Esports IT Private Limited, with a strong passion for technology, esports ecosystems, and digital innovation. I specialize in building and executing scalable esports operations while developing modern digital solutions across web, applications, and AI-driven systems.
            </p>
            <p>
              With over six years of experience in esports operations, I have led tournaments, managed teams, executed large-scale events, and handled production broadcasting with precision. In parallel, I bring two years of experience in business and IT operations, contributing to structured execution, system design, and operational efficiency.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="about-section">
            <h3>What I Do</h3>
            <ul className="expertise-list">
              <li>Design and execute end-to-end esports tournaments and events</li>
              <li>Lead team management, coordination, and competitive operations</li>
              <li>Manage production workflows and live broadcast execution</li>
              <li>Analyze gameplay and strategies to improve performance</li>
              <li>Contribute to business operations and IT system management</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="about-section">
            <h3>Vision</h3>
            <p>
              My goal is to build a strong bridge between technology and esports, creating scalable ecosystems that empower talent, enable innovation, and drive long-term impact. I aim to evolve as a technology-driven esports leader, delivering value across both digital and competitive landscapes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
