import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import ScrollingText from './components/ScrollingText'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import AnimatedBg from './components/AnimatedBg'
import ScrollOverlay from './components/ScrollOverlay'
import ScrollFloat from './components/ScrollFloat' // Import the ScrollFloat component
import './App.css'

function App() {
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
        <Hero />
        <ScrollOverlay />
        <About />
        <Skills />
        <ScrollingText />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <footer className="footer">
        <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <img src="/logos/Abz-Logo-Red-1.png" alt="Autobotz" style={{ height: '40px', opacity: 0.8 }} />
          <p>&copy; 2025 All rights reserved @abz.dpakkk.gg & @Autobotz Pvt Ltd India | Designed with React & Framer Motion</p>
        </div>
      </footer>
    </div>
  )
}

export default App
