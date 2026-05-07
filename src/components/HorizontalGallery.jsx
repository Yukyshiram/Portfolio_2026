import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalGallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Calculate total scrolling distance for horizontal shift
      // It's the wrapper's total width minus the viewport width
      const distance = scrollWrapperRef.current.scrollWidth - window.innerWidth;
      
      // Pin horizontal gallery
      gsap.to(scrollWrapperRef.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${distance}`,
          pin: true,
          scrub: 1,
        }
      });
      
      // Fade in sticky title
      gsap.from(headerRef.current, {
        autoAlpha: 0,
        y: 50,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    { title: "Colibrí IDE Beta", desc: "Entorno de Desarrollo Integrado", img: "/projects/ide_mockup.png", link: "https://github.com/Yukyshiram/Colibri_IDE_Beta" },
    { title: "SKL API Base TS", desc: "API Modular en TypeScript", img: "/projects/api_concept.png", link: "https://github.com/Yukyshiram/SKL_api_base_ts" },
    { title: "Damas Estructuradas", desc: "Juego de Damas C++20 y Qt6", img: "/projects/checkers_game.png", link: "https://github.com/Yukyshiram/Damas_estructuradas" },
    { title: "Portfolio 2026", desc: "Portafolio Creativo Interactivo", img: "/projects/portfolio_real.png", link: "https://github.com/Yukyshiram/Portfolio_2026" },
  ];

  return (
    <section ref={containerRef} className="gallery-section">
      <div className="gallery-header" ref={headerRef}>
        <h2>Selected Works</h2>
      </div>
      <div className="gallery-wrapper" ref={scrollWrapperRef}>
        {projects.map((proj, idx) => (
          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="gallery-item" key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="gallery-img-container">
              <img src={proj.img} alt={proj.title} />
            </div>
            <div className="gallery-info">
              <h3>{proj.title}</h3>
              <span>{proj.desc}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
