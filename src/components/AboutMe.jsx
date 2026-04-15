import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutMe.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const textRef = useRef(null);

  const manifestoText = "Crear experiencias que combinan diseño minimalista e interacciones dinámicas. No construyo simples sitios web, desarrollo identidades digitales que dejan marcas en cada pixel y destilan sofisticación en cada scroll.";

  useEffect(() => {
    // Collect all the span elements inside our text reference
    const words = textRef.current.querySelectorAll('.word');

    let ctx = gsap.context(() => {
      gsap.fromTo(words, 
        { opacity: 0.15 }, 
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1, // Stagger gives the sweeping, reading effect rather than lighting all up at once
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%', // Start animating when the top of the text hits 80% of window height
            end: 'center 40%', // Finish the transition a bit before it reaches the top
            scrub: 0.5, // 0.5 smoothing on the scrub for a buttery trailing effect
          }
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  // Utility to split the text into words wrapped in span tags, joined by valid React spaces
  const splitText = (text) => {
    return text.split(' ').map((word, index) => (
      <React.Fragment key={index}>
        <span className="word">{word}</span>{' '}
      </React.Fragment>
    ));
  };

  return (
    <section className="about-section">
      <div className="about-container">
        <h2>Mi Enfoque</h2>
        <p className="manifesto" ref={textRef}>
          {splitText(manifestoText)}
        </p>
      </div>
    </section>
  );
}
