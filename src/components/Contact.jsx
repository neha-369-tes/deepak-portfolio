import { motion } from 'framer-motion'
import { useState } from 'react'
import SocialFab from './SocialFab'
import GridMotion from './GridMotion'
import './Contact.css'

// Standard brand logos to feed into the GridMotion
const socialLogos = [
  '/social/DISCORD.png',
  '/social/FACEBOOK.avif',
  '/social/instagram-new.jpg',
  '/social/LINKEDIN.png',
  '/social/MESSENGER.jpg',
  '/social/PINTEREST.png',
  '/social/SKYPE.png',
  '/social/SNAPCHAT.jpg',
  '/social/TELEGRAM.jpg',
  '/social/TWITCH.png',
  '/social/X.webp',
  '/social/YOUTUBE.webp'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="contact" className="contact" style={{ position: 'relative', overflow: 'hidden' }}> 
      
      {/* Background GridMotion Effect */}
      <GridMotion items={socialLogos} />

      {/* Marker: Zag Left, Vertically Centered */}
      <div id="marker-contact" className="scroll-marker" style={{ top: '50%', left: '10%' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.h2
          className="section-title experience-title"
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, color: 'var(--dark-gray)', margin: 0, lineHeight: 1.1, letterSpacing: '-2px', textTransform: 'none', textAlign: 'center', marginBottom: '60px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Connect<span>.</span>Me
        </motion.h2>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Column: Contact Form */}
          <motion.form
            variants={itemVariants}
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <h3 className="contact-subtitle" style={{ marginBottom: '20px' }}>Send a Message</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="6"
                whileFocus={{ scale: 1.02 }}
              ></motion.textarea>
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(255, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>

            {submitted && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ✓ Message sent successfully!
              </motion.div>
            )}
          </motion.form>

          {/* Right Column: Info Box & FAB Menu */}
          <motion.div variants={itemVariants} className="contact-info-column" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
             <div className="collaboration-areas">
              <h4>How We Can Connect:</h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Esports Events & Collaborations</li>
                <li>College Activations & Student Engagement</li>
                <li>IT Services & AI-based Projects</li>
                <li>Speaking Engagements & Workshops</li>
                <li>Other Professional Opportunities</li>
              </ul>
            </div>

            {/* Social FAB Dock Container - Bottom Right of this column */}
              <div className="fab-dock-container">
                 {/* Wrapper for both FAB and Marker to ensure perfect alignment */}
                 <div style={{ position: 'relative', width: '72px', height: '72px' }}>
                    {/* The Marker for the Ball - absolute to wrapper */}
                    <div id="marker-fab-dock" className="scroll-marker" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', borderRadius: '50%' }}></div>
                    {/* The FAB itself - relative to wrapper */}
                    <SocialFab />
                 </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default Contact
