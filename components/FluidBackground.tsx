"use client"

import { useRef, useEffect } from "react"

const WIDTH = 220
const HEIGHT = 120

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let viewW = window.innerWidth
    let viewH = window.innerHeight
    let scale = Math.max(viewW / WIDTH, viewH / HEIGHT)
    let offsetX = (viewW - WIDTH * scale) / 2
    let offsetY = (viewH - HEIGHT * scale) / 2

    // Water simulation state
    let curr = new Float32Array(WIDTH * HEIGHT)
    let prev = new Float32Array(WIDTH * HEIGHT)
    let damping = 0.985

    // Draw the "R" into a mask
    const rMask = new Uint8Array(WIDTH * HEIGHT)
    function drawRMask() {
      rMask.fill(0)
      const off = document.createElement("canvas")
      off.width = WIDTH
      off.height = HEIGHT
      const octx = off.getContext("2d")
      if (!octx) return
      octx.fillStyle = "#fff"
      octx.font = "bold 80px serif"
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.fillText("R", WIDTH / 2, HEIGHT / 2)
      const img = octx.getImageData(0, 0, WIDTH, HEIGHT)
      for (let i = 0; i < WIDTH * HEIGHT; ++i) {
        if (img.data[i * 4 + 3] > 128) rMask[i] = 1
      }
    }
    drawRMask()

    function disturb(x: number, y: number, radius = 4, strength = 9) {
      x = Math.floor((x - offsetX) / scale)
      y = Math.floor((y - offsetY) / scale)
      for (let dy = -radius; dy <= radius; ++dy) {
        for (let dx = -radius; dx <= radius; ++dx) {
          const nx = x + dx
          const ny = y + dy
          if (
            nx >= 0 && nx < WIDTH &&
            ny >= 0 && ny < HEIGHT &&
            dx * dx + dy * dy < radius * radius
          ) {
            curr[ny * WIDTH + nx] -= strength * Math.cos((dx * dx + dy * dy) / (radius * radius) * Math.PI / 2)
          }
        }
      }
    }

    function applyRMask() {
      for (let i = 0; i < WIDTH * HEIGHT; ++i) {
        if (rMask[i]) curr[i] = -25 // lower water for "R"
      }
    }

    function handleResize() {
      viewW = window.innerWidth
      viewH = window.innerHeight
      scale = Math.max(viewW / WIDTH, viewH / HEIGHT)
      offsetX = (viewW - WIDTH * scale) / 2
      offsetY = (viewH - HEIGHT * scale) / 2
      if (canvas) {
        canvas.width = viewW
        canvas.height = viewH
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    function onPointer(e: MouseEvent | TouchEvent) {
      let x = 0, y = 0
      if ("touches" in e) {
        if (e.touches.length === 0) return
        x = e.touches[0].clientX
        y = e.touches[0].clientY
      } else {
        x = e.clientX
        y = e.clientY
      }
      disturb(x, y)
    }
    window.addEventListener("mousemove", onPointer)
    window.addEventListener("touchmove", onPointer)

    let animationFrameId: number

    function animate() {
      // Water simulation: simple 2D wave equation
      for (let y = 1; y < HEIGHT - 1; ++y) {
        for (let x = 1; x < WIDTH - 1; ++x) {
          const i = y * WIDTH + x
          curr[i] =
            (
              prev[i - 1] +
              prev[i + 1] +
              prev[i - WIDTH] +
              prev[i + WIDTH]
            ) / 2 -
            curr[i]
          curr[i] *= damping
        }
      }
      applyRMask()

      // Draw water (deep teal shades)
      if (ctx && canvas) {
        const img = ctx.getImageData(0, 0, viewW, viewH)
        const data = img.data
        for (let y = 0; y < viewH; ++y) {
          for (let x = 0; x < viewW; ++x) {
            // Map to sim grid
            const fx = (x - offsetX) / scale
            const fy = (y - offsetY) / scale
            if (fx < 0 || fx >= WIDTH - 1 || fy < 0 || fy >= HEIGHT - 1) {
              // Out of bounds: transparent
              const idx = (y * viewW + x) * 4
              data[idx + 3] = 0
              continue
            }
            // Bilinear sample
            const ix = Math.floor(fx)
            const iy = Math.floor(fy)
            const tx = fx - ix
            const ty = fy - iy
            const i00 = curr[iy * WIDTH + ix]
            const i10 = curr[iy * WIDTH + ix + 1]
            const i01 = curr[(iy + 1) * WIDTH + ix]
            const i11 = curr[(iy + 1) * WIDTH + ix + 1]
            const h =
              (1 - tx) * (1 - ty) * i00 +
              tx * (1 - ty) * i10 +
              (1 - tx) * ty * i01 +
              tx * ty * i11

            // Subtle, deep teal color mapping
            // teal-900: #134e4a, teal-800: #115e59, teal-700: #0f766e, teal-400: #2dd4bf
            let c = [19, 78, 74] // base: #134e4a (teal-900)
            if (h < -20) c = [45, 212, 191] // highlight for "R": #2dd4bf (teal-400)
            else if (h < -5) c = [17, 94, 89] // #115e59 (teal-800)
            else if (h < 5) c = [15, 118, 110] // #0f766e (teal-700)
            else if (h < 20) c = [19, 78, 74] // #134e4a (teal-900)
            else c = [0, 0, 0]

            // Lighten edges (simulate subtle reflection)
            if (h > 8) {
              c = [
                Math.min(255, c[0] + 20),
                Math.min(255, c[1] + 20),
                Math.min(255, c[2] + 30),
              ]
            }
            // Alpha
            let a = 255
            if (h < -15) a = 220 // "R" slightly more transparent

            const idx = (y * viewW + x) * 4
            data[idx] = c[0]
            data[idx + 1] = c[1]
            data[idx + 2] = c[2]
            data[idx + 3] = a
          }
        }
        ctx.putImageData(img, 0, 0)
      }

      // Swap
      const tmp = prev
      prev = curr
      curr = tmp

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", onPointer)
      window.removeEventListener("touchmove", onPointer)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "soft-light" }}
    />
  )
}
