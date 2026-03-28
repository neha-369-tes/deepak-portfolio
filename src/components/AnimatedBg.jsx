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

    // Particle system
    const particles = []
    const particleCount = 50

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 1
        this.speedY = (Math.random() - 0.5) * 1
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        this.opacity += (Math.random() - 0.5) * 0.02
        this.opacity = Math.max(0.1, Math.min(0.6, this.opacity))
      }

      draw(isDarkMode) {
        // Red particles normally, white particles in dark mode for contrast if preferred
        // Or keep red particles and adjust opacity. Let's keep them Red/White dynamic
        ctx.fillStyle = isDarkMode 
          ? `rgba(255, 255, 255, ${this.opacity * 0.8})` 
          : `rgba(255, 0, 0, ${this.opacity})`;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      const isDarkMode = document.body.classList.contains('dark-mode');
      
      // Dynamic gradient background based on theme
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      if (isDarkMode) {
        gradient.addColorStop(0, '#0a0505')
        gradient.addColorStop(0.5, '#120505')
        gradient.addColorStop(1, '#0a0505')
      } else {
        gradient.addColorStop(0, '#ffffff')
        gradient.addColorStop(0.5, '#fff5f5')
        gradient.addColorStop(1, '#ffffff')
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gridSize = 50;
      // Dynamic grid pattern based on theme
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 0, 0, 0.03)'

      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
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
