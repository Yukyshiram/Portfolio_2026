import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export default function Preloader({ onStartReveal, onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Bloquear el scroll del body mientras carga
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete(); // Desmonta el preloader del DOM al final
      }
    });

    // 1. Escritura secuencial de las letras (Stagger)
    // 12 caracteres * 0.08s stagger + 0.15s duration = ~1.1 segundos de escritura
    tl.to('.preloader-char', {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.15,
      ease: 'power1.out'
    })
    // 2. Breve pausa con el nombre completo en pantalla
    .to({}, { duration: 0.25 })
    // 3. Desvanecimiento y subida del texto
    .to('.preloader-char', {
      y: -20,
      opacity: 0,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power3.in'
    })
    // 4. Pausa ultra corta de pantalla negra (0.2s de suspenso)
    .to({}, { duration: 0.2 })
    // 5. Difuminado de la cortina de fondo para revelar el sitio
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onStart: () => {
        if (onStartReveal) onStartReveal(); // Dispara la revelación de Hero en cuanto inicia la salida
      }
    });

    return () => {
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const name = "Im_JVallejo.";

  return (
    <div className="preloader" ref={containerRef}>
      <div className="preloader-content">
        <h1 className="preloader-title">
          {name.split('').map((char, index) => (
            <span key={index} className="preloader-char">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}