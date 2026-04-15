import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMapPin, FiAtSign } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';
import ThreeScene from './ThreeScene';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Three.js canvas no necesita parallax GSAP (reactivo nativamente)

      // 2. Initial Theatrical Entrance (Sub-elementos)
      gsap.from(['.hero-avatar', '.hero-badges', '.hero-roles', '.scroll-indicator'], {
        y: 60,
        autoAlpha: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
        delay: 2.2 
      });

      // Animación 3D para cada letra de tu nombre
      gsap.from('.hero-char', {
        y: 50,
        rotationX: -90,
        opacity: 0,
        stagger: 0.04,
        duration: 0.9,
        ease: 'back.out(2)',
        delay: 2.4, // Arranca milisegundos después de que entra la foto
        transformOrigin: "0% 50% -50"
      });

      // 3. Fade-out scrub sequence when scrolling down
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <ThreeScene />
      
      <div className="hero-content">
        
        <div className="hero-avatar">
          {/* Tu fotografía de perfil circular de manera nativa */}
          <img 
            src={profileImg} 
            alt="Jesús Vallejo" 
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
            Full Stack Developer <span className="separator">|</span> UI/UX Designer <span className="separator">|</span> Project Manager
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
