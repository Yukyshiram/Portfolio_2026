import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Bloquear el scroll del body mientra carga (Lenis ya controla el overflow, pero reforzamos)
    document.body.style.overflow = 'hidden';

    // Falso progreso jugoso
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Incrementos aleatorios para que se sienta real
        const inc = Math.floor(Math.random() * 15) + 1; 
        return Math.min(p + inc, 100);
      });
    }, 150);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Secuencia de salida cinemática
      const tl = gsap.timeline();
      
      tl.to('.preloader-text', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      })
      .to('.preloader', {
        yPercent: -100, // La cortina se levanta hacia arriba
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          document.body.style.overflow = ''; // Libera el scroll al terminar
        }
      });
    }
  }, [progress]);

  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-name">IM_JVALLEJO</div>
        <div className="preloader-text">{progress}%</div>
      </div>
    </div>
  );
}
