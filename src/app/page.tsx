"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react'; // Moteur de scroll
import { ParticleTrail } from './ParticleTrail';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const lenis = useLenis();

  // 1. Configuration du Scroll (Global)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 2. Transformations de l'interface Hero (Section 1)
  const textY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // 3. Mouvement du NOM (Translation horizontale vers le centre)
  const nameX = useTransform(scrollYProgress, [0, 0.3], ["0vw", "42vw"]);
  const nameScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  // 4. Fonction de Scroll Automatique
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo('#projects-section', { 
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
  };

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        window.requestAnimationFrame(() => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        });
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('.group')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen w-full bg-black font-sans text-white cursor-none">
      
      {/* LE NOM : Fixé en haut, glisse horizontalement au scroll */}
      <motion.div 
        style={{ x: nameX, scale: nameScale }}
        className="fixed top-6 md:top-10 left-6 md:left-10 z-[100] pointer-events-none"
      >
        <span className="text-[12px] tracking-[0.5em] uppercase font-bold whitespace-nowrap">
          Jean-Pierre Sastre
        </span>
      </motion.div>

      {/* SECTION 1 : HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <ParticleTrail />
        
        {/* FOND VIDÉO (Parallaxe léger) */}
        <motion.div style={{ y: videoY }} className="absolute inset-0 z-0">
          <video 
            src="/projet1.mp4" 
            autoPlay loop muted playsInline
            className="h-full w-full object-cover opacity-80" 
          />
        </motion.div>

        {/* CONTENU TEXTUEL HERO */}
        <motion.div 
          style={{ y: textY, opacity: opacityFade }}
          className="relative z-10 h-full w-full flex flex-col p-6 md:p-10"
        >
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full">
            <div className="flex flex-col items-start space-y-0">
              {/* Espace pour le nom fixe */}
              <div className="h-8 mb-8"></div>

              {["Creative", "Artistic", "Director"].map((text) => (
                <div 
                  key={text} 
                  className="relative group transition-all duration-700 ease-out w-[400px] hover:w-[93vw] overflow-hidden flex items-center justify-start -space-y-4 md:-space-y-16 h-[10vh] md:h-[12vh]"
                >
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[10%] backdrop-blur-2xl bg-white/10 border-t border-b border-white/5"></div>
                  <h1 className="relative text-[12vw] md:text-[5.5vw] font-bold uppercase leading-none tracking-lighter py-4 px-6 text-white/70 select-none">
                    {text}
                  </h1>
                </div>
              ))}
            </div>

            <div className="hidden md:block"></div>

            {/* NAVIGATION */}
            <nav className="flex flex-col items-end gap-3 text-[10px] md:text-[12px] tracking-[0.3em] uppercase font-medium">
              <a 
                href="#projects-section" 
                onClick={scrollToProjects}
                className="hover:opacity-50 transition-opacity"
              >
                Selected Works
              </a>
              <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
            </nav>
          </div>

          <div className="mt-auto flex justify-between items-end w-full pt-6">
            <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase flex gap-4">
              <span>Digital / Motion Design / Projection Mapping / Immersive Installations</span>
            </div>
            <div className="flex flex-col items-center ml-4">
              <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-2">Scroll</p>
              <div className="h-[50px] w-[1px] bg-white animate-scroll-line"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 : SELECTED WORKS (Cible du scroll automatique) */}
      <section 
        id="projects-section" 
        className="relative min-h-screen w-full bg-[#0a0a0a] z-20 border-t border-white/10 flex flex-col items-center justify-center p-10"
      >
          <h2 className="text-[10vw] font-bold uppercase tracking-tighter text-white/20">
            Selected Works
          </h2>
          <div className="w-full h-[400px] mt-10 border border-white/5 bg-white/5 rounded-lg flex items-center justify-center">
            <p className="text-white/30 tracking-widest uppercase text-xs">Horizontal Gallery Coming Soon</p>
          </div>
      </section>

      {/* CURSEUR DYNAMIQUE */}
      <div 
        id="custom-cursor"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center 
                   transition-all duration-300 ease-out mix-blend-difference
                   ${isHovered ? 'w-7 h-7' : 'w-4 h-4'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
          {!isHovered && <div className="w-[2px] h-[2px] bg-black rounded-full"></div>}
        </div>
      </div>

      <style jsx global>{`
        a, .group { cursor: none !important; }
        @keyframes scroll-line {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
        }
        .animate-scroll-line { animation: scroll-line 2.5s infinite ease-in-out; }
      `}</style>
    </main>
  );
}