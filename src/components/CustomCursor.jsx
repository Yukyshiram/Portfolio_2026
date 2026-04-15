import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Si el usuario usa un dispositivo táctil (teléfono/tablet), no activamos el cursor especial
    const isTouch = matchMedia('(hover: none)').matches;
    if (isTouch) return;

    // quickTo está optimizado severamente por GSAP para inyectar X/Y directo en el DOM saltándose el ciclo de render de React (60fps garantizados).
    // El 'dot' tiene menos duración (más veloz) y el 'ring' tiene más duración (laggeado)
    const xMoveDot = gsap.quickTo(dotRef.current, "x", {duration: 0.1, ease: "power3"});
    const yMoveDot = gsap.quickTo(dotRef.current, "y", {duration: 0.1, ease: "power3"});
    
    // Anillo con inercia elástica (power3.out es el estándar de oro)
    const xMoveRing = gsap.quickTo(ringRef.current, "x", {duration: 0.5, ease: "power3.out"});
    const yMoveRing = gsap.quickTo(ringRef.current, "y", {duration: 0.5, ease: "power3.out"});

    const onMouseMove = (e) => {
      // Offset compensado por los radios CSS (4px dot, 16px ring) para que centren perfecto
      xMoveDot(e.clientX - 4);
      yMoveDot(e.clientY - 4);
      xMoveRing(e.clientX - 16);
      yMoveRing(e.clientY - 16);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Sistema de Lupa: Escuchar hovers sobre elementos interactivos para expandir el anillo
    const handleMouseOver = (e) => {
      // Expandir en enlaces, botones o las imágenes de la galería
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.gallery-img-container') || e.target.closest('.hover-target')) {
        gsap.to(ringRef.current, { scale: 1.8, backgroundColor: "rgba(255, 255, 255, 0.1)", duration: 0.3 });
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.gallery-img-container') || e.target.closest('.hover-target')) {
         gsap.to(ringRef.current, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
