import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Cinematic Background Color Flip
      gsap.to(".app-container", {
        backgroundColor: "#E2E2DC",   // Bone white
        color: "#050505", // Deep black
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%', // Empieza justo cuando asoma por abajo
          end: 'top 30%',   // Termina cuando ya hemos revelado bastante
          scrub: true,
        }
      });

      // 2. Slide-in Directional Entrance
      // Agrupamos refs para hacer un stagger de entrada magistral
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 35%', // Se activa más tarde (cuando el pie de página ocupa más espacio en pantalla)
          toggleActions: 'play none none reverse'
        }
      });

      tl.from([titleRef.current, emailRef.current, bottomRef.current], {
        y: 100,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });

    }, footerRef);

    return () => {
      gsap.to(".app-container", { backgroundColor: "transparent", color: "#ffffff", duration: 0.1 });
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer-section">
      <div className="footer-content">
        <h2 ref={titleRef}>¿Listo para empezar?</h2>
        <Magnetic>
          <a href="mailto:im_jvallejo@sklconnect.com" className="email-link hover-target" ref={emailRef}>
            im_jvallejo@sklconnect.com
          </a>
        </Magnetic>
      </div>
      <div className="footer-bottom" ref={bottomRef}>
        <p>© 2026 Im_JVallejo.</p>
        <p>Motion & Minimal</p>
      </div>
    </footer>
  );
}
