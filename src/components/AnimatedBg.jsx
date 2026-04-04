import { useEffect, useRef } from 'react'
import './AnimatedBg.css'

const AnimatedBg = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Floating orb particles system - minimalistic
    const particles = []
    const particleCount = 12 // Reduced for cleaner look

    class FloatingParticle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 40 + 20 // Larger, more subtle particles
        this.speedX = (Math.random() - 0.5) * 0.3 // Very slow, gentle movement
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.08 + 0.02 // Very subtle opacity
        this.targetOpacity = Math.random() * 0.1 + 0.02
        this.floatAmplitude = Math.random() * 0.5 + 0.3
        this.floatFrequency = Math.random() * 0.005 + 0.002
        this.floatPhase = Math.random() * Math.PI * 2
      }

      update(time) {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.x < -this.size) this.x = canvas.width + this.size
        if (this.y > canvas.height + this.size) this.y = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size

        // Smooth opacity breathing
        this.targetOpacity = Math.sin(time * this.floatFrequency + this.floatPhase) * 0.06 + 0.04
        this.opacity += (this.targetOpacity - this.opacity) * 0.02
      }

      draw(isDarkMode) {
        // Soft glowing orbs
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        
        if (isDarkMode) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.6})`)
          gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.1})`)
        } else {
          gradient.addColorStop(0, `rgba(220, 20, 60, ${this.opacity * 0.4})`)
          gradient.addColorStop(1, `rgba(220, 20, 60, ${this.opacity * 0.05})`)
        }
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new FloatingParticle())
    }

    let startTime = Date.now()

    // Animation loop
    const animate = () => {
      const isDarkMode = document.body.classList.contains('dark-mode')
      const elapsed = Date.now() - startTime

      // Clean, subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      if (isDarkMode) {
        gradient.addColorStop(0, '#0f0f0f')
        gradient.addColorStop(0.5, '#1a1a1a')
        gradient.addColorStop(1, '#0f0f0f')
      } else {
        gradient.addColorStop(0, '#ffffff')
        gradient.addColorStop(0.5, '#fafafa')
        gradient.addColorStop(1, '#ffffff')
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(elapsed)
        particle.draw(isDarkMode)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="animated-bg"></canvas>
}

export default AnimatedBg
