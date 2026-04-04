import { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import './App.css'

const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Achievements = lazy(() => import('./components/Achievements'))
const Contact = lazy(() => import('./components/Contact'))

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
        <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>}>
          <About />
          <Skills />
          <ScrollingText />
          <Experience />
          <Achievements />
          <WallOfFame />
          <Testimonial />
          <Contact />
        </Suspense>
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
