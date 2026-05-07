import React, { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    // Añade Lenis al ticker principal de GSAP para sincronización perfecta
    gsap.ticker.add(update)

    // Desactivamos el lagSmoothing de GSAP para evitar conflictos con el scroll
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.05, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
