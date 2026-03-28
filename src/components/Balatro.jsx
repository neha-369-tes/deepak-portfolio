import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useEffect, useRef, useMemo } from 'react';

import './Balatro.css';

function hexToVec4(hex) {
  let hexStr = hex.replace('#', '');
  let r = 0,
    g = 0,
    b = 0,
    a = 1;
  if (hexStr.length === 6) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255;
    g = parseInt(hexStr.slice(2, 4), 16) / 255;
    b = parseInt(hexStr.slice(4, 6), 16) / 255;
  } else if (hexStr.length === 8) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255;
    g = parseInt(hexStr.slice(2, 4), 16) / 255;
    b = parseInt(hexStr.slice(4, 6), 16) / 255;
    a = parseInt(hexStr.slice(6, 8), 16) / 255;
  }
  return [r, g, b, a];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);

    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
       speed = iTime * speed;
    }
    speed += 302.2;

    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;

    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);

    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;

    vec2 uv2 = vec2(uv.x + uv.y);

    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }

    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));    
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);

    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`;

export default function Balatro({
  spinRotation = -2.0,
  spinSpeed = 7.0,
  offset = [0.0, 0.0],
  color1 = '#DE443B',
  color2 = '#006BB4',
  color3 = '#162325',
  contrast = 3.5,
  lighting = 0.4,
  spinAmount = 0.25,
  pixelFilter = 745.0,
  spinEase = 1.0,
  isRotate = false,
  mouseInteraction = true
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Preserve canvas if it already exists and is healthy
    let existingCanvas = container.querySelector('canvas');
    let renderer = null;
    let gl = null;
    
    if (existingCanvas && existingCanvas.getContext) {
      try {
        gl = existingCanvas.getContext('webgl2') || existingCanvas.getContext('webgl');
        if (gl && gl.getParameter(gl.CONTEXT_LOST_WEBGL) === false) {
          console.log("[v0] Reusing existing canvas");
          renderer = { gl, setSize: (w, h) => {
            existingCanvas.width = w;
            existingCanvas.height = h;
          }};
        }
      } catch(e) {
        console.log("[v0] Canvas context lost, recreating");
      }
    }
    
    // Create new renderer if needed
    if (!renderer) {
      renderer = new Renderer({ antialias: false, alpha: false, preserveDrawingBuffer: true });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 1);
    }

    let program;
    let animationFrameId;
    let isCanvasHealthy = true;

    function resize() {
      if (!container || !container.offsetWidth || !container.offsetHeight) return;
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program && gl) {
        try {
          program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
        } catch (e) {
          console.log("[v0] Error updating resolution:", e.message);
        }
      }
    }
    
    // Use ResizeObserver to handle container resizing
    const resizeObserver = new ResizeObserver(() => {
      if (isCanvasHealthy) {
        resize();
      }
    });
    resizeObserver.observe(container);

    try {
      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]
          },
          uSpinRotation: { value: spinRotation },
          uSpinSpeed: { value: spinSpeed },
          uOffset: { value: offset },
          uColor1: { value: hexToVec4(color1) },
          uColor2: { value: hexToVec4(color2) },
          uColor3: { value: hexToVec4(color3) },
          uContrast: { value: contrast },
          uLighting: { value: lighting },
          uSpinAmount: { value: spinAmount },
          uPixelFilter: { value: pixelFilter },
          uSpinEase: { value: spinEase },
          uIsRotate: { value: isRotate },
          uMouse: { value: [0.5, 0.5] }
        }
      });

      const mesh = new Mesh(gl, { geometry, program });

      function update(time) {
        try {
          // Check if WebGL context is still valid
          if (gl.isContextLost()) {
            console.log("[v0] WebGL context lost, stopping render loop");
            isCanvasHealthy = false;
            return;
          }
          
          program.uniforms.iTime.value = time * 0.001;
          renderer.render({ scene: mesh });
        } catch (error) {
          console.log("[v0] Render error:", error.message);
          isCanvasHealthy = false;
          return;
        }
        
        if (isCanvasHealthy) {
          animationFrameId = requestAnimationFrame(update);
        }
      }

      // Only append canvas if it's not already there
      if (!container.contains(gl.canvas)) {
        container.appendChild(gl.canvas);
      }
      
      animationFrameId = requestAnimationFrame(update);
      resize();
    } catch (error) {
      console.log("[v0] Setup error:", error.message);
      isCanvasHealthy = false;
    }

    function handleMouseMove(e) {
      if (!mouseInteraction || !program || !isCanvasHealthy) return;
      try {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        program.uniforms.uMouse.value = [x, y];
      } catch (e) {
        // Silent fail for mouse interaction
      }
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      try {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        container.removeEventListener('mousemove', handleMouseMove);
        
        // Don't destroy the canvas - just stop rendering to preserve it
        if (!gl.isContextLost && gl.canvas) {
          gl.canvas.style.opacity = '1';
        }
      } catch (e) {
        console.log("[v0] Cleanup error:", e.message);
      }
    };
  }, [
    spinRotation,
    spinSpeed,
    offset,
    color1,
    color2,
    color3,
    contrast,
    lighting,
    spinAmount,
    pixelFilter,
    spinEase,
    isRotate,
    mouseInteraction
  ]);

  return <div ref={containerRef} className="balatro-container" />;
}
