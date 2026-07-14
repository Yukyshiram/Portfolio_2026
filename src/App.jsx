import React, { useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import HorizontalGallery from './components/HorizontalGallery';
import TechnicalSkills from './components/TechnicalSkills';
import Experience from './components/Experience';
import AboutMe from './components/AboutMe';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  // Ensure Lenis starts correctly and doesn't get stuck on reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <div className="app-container">
        <Hero />
        <HorizontalGallery />
        <TechnicalSkills />
        <Experience />
        <AboutMe />
        <Footer />
      </div>
    </SmoothScroll>
    </>
  );
}

export default App;
