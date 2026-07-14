import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaPhp, FaReact, FaNodeJs, FaAngular, FaLaravel, FaWordpress, FaAws, FaLinux, FaGithub, FaDatabase } from 'react-icons/fa6';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiDocker, SiVite } from 'react-icons/si';
import './TechnicalSkills.css';

gsap.registerPlugin(ScrollTrigger);

export default function TechnicalSkills() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const skillCategories = [
    { num: "01", title: "Fundamentos", skills: ["HTML5", "CSS3", "DOM", "Responsive Design", "Accesibilidad Web"] },
    { num: "02", title: "Lenguajes", skills: ["JavaScript (ES5+)", "TypeScript", "PHP", "C", "C++", "Python", "Java", "Assembler x86", "Scala"] },
    { num: "03", title: "Bases de datos", skills: ["MySQL", "MongoDB", "PostgreSQL", "Prisma"] },
    { num: "04", title: "Frameworks", skills: ["React", "Next.js", "Node.js", "Express", "Laravel", "Angular", "Vite"] },
    { num: "05", title: "CSS / UI", skills: ["Tailwind CSS", "Bootstrap", "shadcn/ui"] },
    { num: "06", title: "Constructores / CMS", skills: ["WordPress", "Elementor", "Divi Builder"] },
    { num: "07", title: "DevOps / Infra", skills: ["Docker", "Docker Compose", "Nginx", "Apache", "PM2", "Certbot/SSL", "Linux", "GitHub Actions", "VPS"] },
    { num: "08", title: "Metodologías", skills: ["Scrum", "Kanban", "Agile", "Code Review", "Documentación"] }
  ];

  const iconMap = {
    "HTML5": <FaHtml5 />,
    "CSS3": <FaCss3Alt />,
    "JavaScript (ES5+)": <FaJs />,
    "TypeScript": <SiTypescript />,
    "Python": <FaPython />,
    "Java": <FaJava />,
    "PHP": <FaPhp />,
    "React": <FaReact />,
    "Next.js": <SiNextdotjs />,
    "Node.js": <FaNodeJs />,
    "Angular": <FaAngular />,
    "Laravel": <FaLaravel />,
    "Vite": <SiVite />,
    "Tailwind CSS": <SiTailwindcss />,
    "WordPress": <FaWordpress />,
    "Docker": <SiDocker />,
    "VPS": <FaAws />,
    "Linux": <FaLinux />,
    "GitHub Actions": <FaGithub />,
    "MongoDB": <SiMongodb />,
    "PostgreSQL": <SiPostgresql />,
    "MySQL": <FaDatabase />
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.vision-card');
      
      // La altura de navegación completa para las 8 tarjetas 
      // 1000px por tarjeta asegura un scroll jugoso y ultra suave
      const scrollDistance = cards.length * 1000;

      const isMobile = window.innerWidth <= 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: true,    // Vincula la animación de forma instantánea al scroll para evitar desfases al subir/bajar
          pin: true,      // Congela la pantalla literalmente
          anticipatePin: 1
        }
      });

      // Inicialización Faux-3D
      // Colocamos la tarjeta 0 enfrente a tamaño completo, 
      // las demás se encogen al fondo progresivamente.
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { scale: 1, opacity: 1, zIndex: 100 });
        } else {
          gsap.set(card, { scale: 0.1, opacity: 0, zIndex: 100 - i });
        }
      });

      // Animación para que el título de sección desaparezca al bajar
      tl.to('.vision-section-title', {
        y: -40,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 1.5
      }, 0);

      // Core Loop: Apple-like overlapping timeline
      // Cada iteración 'muere' escalando gigante, y la posterior entra escalando al 1.
      cards.forEach((card, i) => {
        const startTime = i * 2; // Time index unit
        
        if (i === 0) {
           // La tarjeta madre inicial solo vuela hacia nosotros
           tl.to(card, {
             scale: 4, 
             opacity: 0, 
             filter: isMobile ? "none" : "blur(20px)", 
             ease: "power2.in", 
             duration: 2
           }, startTime);
        } else {
           // Las siguientes entran volando desde lo profundo...
           tl.fromTo(card,
             { scale: 0.1, opacity: 0, filter: isMobile ? "none" : "blur(10px)" },
             { scale: 1, opacity: 1, filter: isMobile ? "none" : "blur(0px)", ease: "power2.out", duration: 2 },
             startTime - 2 // Justo en el mismo segundo que la anterior explota
           );
           
           // ...y luego vuelan hacia la cámara cruzándonos si no es la última.
           // Si ES la última, la dejamos en scale 1 para que sirva de puente a la próxima sección.
           if (i !== cards.length - 1) {
             tl.to(card, {
               scale: 4, 
               opacity: 0, 
               filter: isMobile ? "none" : "blur(20px)",
               ease: "power2.in", 
               duration: 2
             }, startTime);
           }
        }
      });

    }, sectionRef);

    // Forzamos recalcular las posiciones de la página ya con el spacer inyectado
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section className="vision-section" ref={sectionRef}>
      <div className="vision-container" ref={containerRef}>
        
        {/* Título de sección que fluye y desaparece con el scroll */}
        <h2 className="vision-section-title">Habilidades técnicas</h2>

        {skillCategories.map((cat, i) => (
          <div className="vision-card" key={i}>
            <div className="card-header">
              <span className="card-num">{cat.num}</span>
              <h3>{cat.title}</h3>
            </div>
            <div className="card-body">
              {cat.skills.map((skill, sIdx) => (
                <span className="vision-pill hover-target" key={sIdx}>
                  {iconMap[skill] && <span className="skill-icon">{iconMap[skill]}</span>}
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
