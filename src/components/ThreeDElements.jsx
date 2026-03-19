import { useRef, useEffect } from 'react'
import './ThreeDElements.css'

const ThreeDElements = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let rotation = 0
    let mouseX = 0
    let mouseY = 0

    // Canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    })

    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })

    // 3D Cube projection
    class Vertex {
      constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
      }

      project() {
        const scale = 250 / (250 + this.z)
        return {
          x: this.x * scale + canvas.width / 2,
          y: this.y * scale + canvas.height / 2,
          z: this.z,
          scale: scale
        }
      }

      rotateX(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const y = this.y * cos - this.z * sin
        const z = this.y * sin + this.z * cos
        this.y = y
        this.z = z
      }

      rotateY(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const x = this.x * cos + this.z * sin
        const z = -this.x * sin + this.z * cos
        this.x = x
        this.z = z
      }

      rotateZ(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const x = this.x * cos - this.y * sin
        const y = this.x * sin + this.y * cos
        this.x = x
        this.y = y
      }
    }

    // Create cube vertices
    const vertices = [
      new Vertex(-50, -50, -50),
      new Vertex(50, -50, -50),
      new Vertex(50, 50, -50),
      new Vertex(-50, 50, -50),
      new Vertex(-50, -50, 50),
      new Vertex(50, -50, 50),
      new Vertex(50, 50, 50),
      new Vertex(-50, 50, 50)
    ]

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ]

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(250, 250, 250, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update rotation
      const angleX = (mouseY - 0.5) * 2
      const angleY = (mouseX - 0.5) * 4

      // Reset vertices
      const currentVertices = vertices.map(v => 
        new Vertex(v.x, v.y, v.z)
      )

      // Apply rotations
      currentVertices.forEach(vertex => {
        vertex.rotateX(angleX)
        vertex.rotateY(angleY - rotation)
      })

      rotation += 0.002

      // Sort and project vertices
      const projected = currentVertices
        .map((v, i) => ({ ...v.project(), i }))
        .sort((a, b) => a.z - b.z)

      // Draw edges
      edges.forEach(([start, end]) => {
        const p1 = projected.find(p => p.i === start)
        const p2 = projected.find(p => p.i === end)

        if (p1 && p2) {
          ctx.strokeStyle = `rgba(220, 20, 60, ${0.3 + p1.scale * 0.4})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      })

      // Draw vertices
      projected.forEach(p => {
        ctx.fillStyle = `rgba(220, 20, 60, ${0.4 + p.scale * 0.5})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', () => {})
    }
  }, [])

  return <canvas ref={canvasRef} className="three-d-canvas"></canvas>
}

export default ThreeDElements
