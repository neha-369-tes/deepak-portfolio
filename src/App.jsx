import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollingText from './components/ScrollingText'
import WallOfFame from './components/WallOfFame'
import Testimonial from './components/Testimonial'
import AnimatedBg from './components/AnimatedBg'
import ScrollOverlay from './components/ScrollOverlay'
import ScrollFloat from './components/ScrollFloat' // Import the ScrollFloat component
import { SparklesIntro } from './components/SparklesIntro' // Import the new Sparkles Intro
import NotFound from './components/NotFound'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import './App.css'

const CardReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-10%" }}
      className="card-reveal-wrapper"
    >
      {children}
    </motion.div>
  )
}

function MainContent() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <AnimatedBg />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <Navbar scrollProgress={scrollProgress} />
      {/* Moving element that follows the scroll */}
      <ScrollFloat />
      <main>
        <SparklesIntro />
        <Hero />
        <ScrollOverlay />
        
        <CardReveal><About /></CardReveal>
        <CardReveal><Skills /></CardReveal>
        <CardReveal><ScrollingText /></CardReveal>
        <CardReveal><Experience /></CardReveal>
        <CardReveal><Achievements /></CardReveal>
        <CardReveal><WallOfFame /></CardReveal>
        <CardReveal><Testimonial /></CardReveal>
        <CardReveal><Contact /></CardReveal>
      </main>
      <footer className="footer">
        <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <img src="/logos/Abz-Logo-Red-1.png" alt="Autobotz" style={{ height: '40px', opacity: 0.8 }} />
          <p>All rights reserved</p>
          <p className="neon-text-footer">DEVELOPED BY Neha Sathish</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
