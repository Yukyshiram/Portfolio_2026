import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  const jobs = [
    {
      id: 1,
      role: "DISEÑADOR WEB",
      company: "MandalaGroup",
      years: "2024 — 2026",
      desc: "Me encargué de la generación y mantenimiento de plataformas digitales, las cuales utilizaban soluciones tecnológicas orientadas a mejorar la experiencia de un usuario. Trabajé conjuntamente con los equipos de marketing y operaciones para lograr resultados de calidad. Aporté soluciones con creatividad, capacidad técnica y resolución de problemas."
    },
    {
      id: 2,
      role: "SUPPORT & WEB DEVELOPER",
      company: "Boxmine World Host",
      years: "2022 — 2024",
      desc: "Brindé soporte técnico y desarrollé mejoras en plataformas internas del host. Atendí incidencias, optimicé servicios y colaboré en la evolución constante del panel."
    },
    {
      id: 3,
      role: "P-TECH",
      company: "IBM",
      years: "2019 — 2024",
      desc: "Participé en un programa formativo de largo plazo donde trabajé en proyectos tecnológicos reales, reforcé habilidades prácticas y completé cursos técnicos. P-TECH me dio una base sólida de trabajo colaborativo, diseño de soluciones y pensamiento computacional."
    },
    {
      id: 4,
      role: "PRACTICAS PROFESIONALES - Software Developer",
      company: "IBM (CIO)",
      years: "2023",
      desc: "Trabajé en el desarrollo de componentes web usando React, participé en mejoras de interfaz y colaboré con el equipo en tareas de integración, pruebas y ajuste de funcionalidades."
    },
    {
      id: 5,
      role: "Software Developer - Pricing Systems",
      company: "IBM (CIO)",
      years: "2023",
      desc: "Me integré al equipo de Pricing Systems para desarrollar interfaces con Angular y Carbon Design System. Participé en refactorización, consumo de APIs y mejoras visuales integradas al flujo del producto."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Configuramos el ScrollTrigger principal para que ilumine la tarjeta según la posición en pantalla
      const jobBoxes = gsap.utils.toArray('.job-box');
      
      jobBoxes.forEach(job => {
        gsap.to(job, {
          scrollTrigger: {
            trigger: job,
            start: "top 60%",    // Cuando el top de la tarjeta toca el 60% de la pantalla
            end: "bottom 40%",   // Cuando el bottom de la tarjeta toca el 40%
            toggleClass: "active",// Asigna la clase ACTIVA (cambia la opacidad en CSS nativo)
            // markers: false // Puedes encender markers para depurar visualmente
          }
        });
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="exp-section" ref={sectionRef}>
      <div className="exp-container">
        
        {/* Lado izquierdo que se queda fijo (Sticky) */}
        <div className="exp-left">
          <h2 className="exp-sticky-title">Experiencia</h2>
        </div>

        {/* Lado derecho que fluye */}
        <div className="exp-right">
          {jobs.map(job => (
            <div className="job-box" key={job.id}>
              <div className="job-header">
                <div>
                  <h3 className="job-role">{job.role}</h3>
                  <h4 className="job-company">{job.company}</h4>
                </div>
                <div className="job-years">{job.years}</div>
              </div>
              <p className="job-desc">{job.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
