import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }) {
  const magneticRef = useRef(null);

  useEffect(() => {
    // Uso de quickTo para saltarse el ciclo de renderizado de React
    // logrando que la interpolación física corra a verdaderos 60 FPS
    const xTo = gsap.quickTo(magneticRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magneticRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
      
      // Calculamos cuánto tirar el elemento hacia el cursor relativo a su centro
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.35); // Potencia magnética del 35% del camino hacia el cursos
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      // Regreso hiper-elástico (como resorte)
      xTo(0);
      yTo(0);
    };

    const el = magneticRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={magneticRef} style={{ display: 'inline-flex' }}>
      {children}
    </div>
  );
}
