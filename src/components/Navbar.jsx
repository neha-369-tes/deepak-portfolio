import { motion } from 'framer-motion'
import './Navbar.css'
import { useState } from 'react'

const Navbar = ({ scrollProgress }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Expertise', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Contact', id: 'contact' }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <motion.nav className="navbar" variants={containerVariants} initial="hidden" animate="visible">
      <div className="nav-container">
        <motion.div className="logo" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <h1>Deepak<span>.</span></h1>
        </motion.div>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {navItems.map((item, i) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ color: 'var(--primary-red)', scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
  )
}

export default Navbar
