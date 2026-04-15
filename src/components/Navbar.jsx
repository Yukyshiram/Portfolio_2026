import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiLinkedin, FiInstagram, FiGithub } from 'react-icons/fi';
import Magnetic from './Magnetic';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    // Definimos la animación de revelación y la dejamos completada (para que empiece visible)
    const showAnim = gsap.from(navRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: 'power2.out'
    }).progress(1);

    // Reaccionamos intuitivamente a la dirección de avance
    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        // self.direction: 1 (hacia abajo), -1 (hacia arriba)
        if (self.direction === 1) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
      }
    });
  }, []);

  return (
    <header className="navbar" ref={navRef}>
      <Magnetic>
        <div className="navbar-logo">
          Im_JVallejo<span style={{color: "var(--accent)"}}>.</span>
        </div>
      </Magnetic>
      
      <nav className="navbar-links">
        {/* Usamos target=_blank para redes sociales externas */}
        <Magnetic>
          <a href="https://www.linkedin.com/in/im-jvallejo/" target="_blank" rel="noopener noreferrer" className="nav-icon hover-target" aria-label="LinkedIn">
            <FiLinkedin strokeWidth={1.5} />
          </a>
        </Magnetic>
        
        <Magnetic>
          <a href="https://www.instagram.com/im_jvallejo/" target="_blank" rel="noopener noreferrer" className="nav-icon hover-target" aria-label="Instagram">
            <FiInstagram strokeWidth={1.5} />
          </a>
        </Magnetic>
        
        <Magnetic>
          <a href="https://github.com/Yukyshiram" target="_blank" rel="noopener noreferrer" className="nav-icon hover-target" aria-label="GitHub">
            <FiGithub strokeWidth={1.5} />
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}
