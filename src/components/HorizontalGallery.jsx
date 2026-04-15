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
    { title: "Project Alpha", desc: "Digital Experience", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { title: "Project Beta", desc: "E-Commerce Plataform", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { title: "Project Gamma", desc: "Premium Brand Identity", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800" },
    { title: "Project Delta", desc: "Mobile Application", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section ref={containerRef} className="gallery-section">
      <div className="gallery-header" ref={headerRef}>
        <h2>Selected Works</h2>
      </div>
      <div className="gallery-wrapper" ref={scrollWrapperRef}>
        {projects.map((proj, idx) => (
          <div className="gallery-item" key={idx}>
            <div className="gallery-img-container">
              <img src={proj.img} alt={proj.title} />
            </div>
            <div className="gallery-info">
              <h3>{proj.title}</h3>
              <span>{proj.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
