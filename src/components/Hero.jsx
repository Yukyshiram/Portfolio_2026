import React, { useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMapPin, FiAtSign } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';
const ThreeScene = lazy(() => import('./ThreeScene'));
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ startAnimation }) {
  const containerRef = useRef(null);

  useGSAP(() => {
      if (!startAnimation) {
        // Mientras carga el preloader, ocultamos absolutamente todo (incluidos foto y canvas)
        gsap.set(['canvas', '.hero-avatar', '.hero-char', '.hero-badges', '.hero-roles', '.scroll-indicator'], { autoAlpha: 0 });
        return;
      }

      // Los hacemos visibles para iniciar su revelación coordinada
      gsap.set(['canvas', '.hero-avatar', '.hero-char', '.hero-badges', '.hero-roles', '.scroll-indicator'], { autoAlpha: 1 });

      // 1. Entrada suave del fondo 3D (canvas)
      gsap.from('canvas', {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      });

      // 2. Entrada de la foto de perfil (deslizamiento y desvanecimiento)
      gsap.from('.hero-avatar', {
        y: 40,
        autoAlpha: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.1
      });

      // 3. Entrada de insignias y roles
      gsap.from(['.hero-badges', '.hero-roles'], {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.2
      });

      // 4. Animación 3D para cada letra de tu nombre
      gsap.from('.hero-char', {
        y: 50,
        rotationX: -90,
        opacity: 0,
        stagger: 0.04,
        duration: 0.9,
        ease: 'back.out(2)',
        delay: 0.35,
        transformOrigin: "0% 50% -50"
      });

      // 5. Entrada suave del indicador de scroll
      gsap.from('.scroll-indicator', {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        delay: 0.6
      });

      // 5. Fade-out scrub sequence when scrolling down
      gsap.to(['.hero-content', '.scroll-indicator'], {
        autoAlpha: 0,
        y: -100,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
  }, { scope: containerRef, dependencies: [startAnimation] });

  return (
    <section className="hero-section" ref={containerRef}>
      <Suspense fallback={<div style={{ position: 'absolute', inset: 0, zIndex: -1 }} />}>
        {(window.innerWidth > 768 || startAnimation) && <ThreeScene />}
      </Suspense>
      
      <div className="hero-content">
        
        <div className="hero-avatar">
          {/* Tu fotografía de perfil circular de manera nativa */}
          <img 
            src={profileImg} 
            alt="Jesús Vallejo - Im_JVallejo - Full Stack Developer & UI/UX Designer" 
          />
          {/* Anillo decorativo premium */}
          <div className="avatar-ring"></div>
        </div>

        <h1 className="hero-name">
          {"Jesús Vallejo".split('').map((char, index) => (
            <span key={index} className="hero-char" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <div className="hero-badges">
          <span className="hero-tag hover-target"><FiAtSign /> Im_JVallejo</span>
          <span className="hero-tag hover-target"><FiMapPin /> GDL, MX</span>
        </div>

        <div className="hero-roles">
          <p>
            <span className="role-primary">Full Stack Developer</span>
            <span className="separator">|</span>
            <span className="role-secondary">UI/UX Designer</span>
            <span className="separator">|</span>
            <span className="role-secondary">Project Manager</span>
          </p>
        </div>

      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text">SCROLL</span>
      </div>
    </section>
  );
}
