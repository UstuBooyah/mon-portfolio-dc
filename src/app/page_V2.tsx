"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react'; 
import { ParticleTrail } from './ParticleTrail';

// --- CONFIGURATION DES PROJETS ---
const PROJECTS_BASE = [
  { 
    id: 1, 
    title: "Paris is Louboutining", 
    category: "Projection Mapping", 
    image: "/Selected Works/2024-louboutin_01.jpg", 
    layout: "md:col-span-6 md:mt-0", 
    speed: -100 
  },
  { id: 2, title: "Motion Experience", category: "Direction Artistique", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-5 md:mt-64 md:ml-12", speed: 120 },
  { id: 3, title: "Interactive Flow", category: "Installation", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-5 md:mt-20", speed: -150 },
  { id: 4, title: "Visual Narrative", category: "Digital Design", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-6 md:ml-24 md:mt-40", speed: 80 },
  { id: 5, title: "Abstract Core", category: "Generative Art", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-7 md:mt-20", speed: -120 },
  { id: 6, title: "Neon Pulse", category: "Light Installation", image: "https://images.unsplash.com/photo-1543965170-4c012556e2eb?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-4 md:mt-0 md:ml-auto", speed: 150 },
  { id: 7, title: "Cyber Landscape", category: "3D Environment", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-5 md:mt-40", speed: -90 },
  { id: 8, title: "Liquid Metal", category: "CGI Animation", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-6 md:ml-20 md:mt-10", speed: 110 },
  { id: 9, title: "Echo Chamber", category: "Audio-Visual", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-10 md:mt-32 mx-auto", speed: -60 },
];

const INTRO_TEXT = "Je suis un créatif passionné basé à Paris, spécialisé en motion design & expériences immersives pour les marques. Mon travail fusionne art, technologie et narration pour créer des moments inoubliables.";

const BackgroundLines = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const yFast = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const ySuperFast = useTransform(scrollYProgress, [0, 1], [-700, 700]);

  const lines = useRef(
    Array.from({ length: 60 }).map((_, i) => {
      const top = 5 + (i * 1.5);
      const left = (i * 7.3) % 100;
      const height = 15 + ((i * 13) % 35);
      const isFast = i % 2 === 0;
      const opacity = 0.02 + ((i * 3) % 8) / 100;
      const isDesktopOnly = i % 3 === 0;
      return { top: `${top}%`, left: `${left}%`, height: `${height}vh`, isFast, opacity, isDesktopOnly };
    })
  );

  const dots = useRef(
    Array.from({ length: 35 }).map((_, i) => {
      const top = 8 + (i * 2.5);
      const left = (i * 19.3) % 100; 
      const opacity = 0.15 + ((i * 7) % 25) / 100; 
      const sizeIndex = i % 4;
      const sizeClass = sizeIndex === 0 ? "w-[1px] h-[1px]" 
                      : sizeIndex === 1 ? "w-[2px] h-[2px]" 
                      : sizeIndex === 2 ? "w-[3px] h-[3px]" 
                      : "w-[4px] h-[4px]";
      const isDesktopOnly = i % 3 === 0;
      return { top: `${top}%`, left: `${left}%`, opacity, sizeClass, isDesktopOnly };
    })
  );

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      <div className="relative w-full h-full">
        {lines.current.map((line, idx) => (
          <motion.div
            key={`line-${idx}`}
            style={{ 
              y: line.isFast ? yFast : ySlow,
              top: line.top,
              left: line.left,
              height: line.height,
              opacity: line.opacity
            }}
            className={`absolute w-[2px] bg-gradient-to-b from-transparent via-white to-transparent ${
              line.isDesktopOnly ? "hidden md:block" : ""
            }`}
          />
        ))}
        {dots.current.map((dot, idx) => (
          <motion.div
            key={`dot-${idx}`}
            style={{ 
              y: ySuperFast,
              top: dot.top,
              left: dot.left,
              opacity: dot.opacity
            }}
            className={`absolute bg-white rounded-full ${dot.sizeClass} ${
              dot.isDesktopOnly ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ParallaxProject = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, project.speed]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y }} 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ duration: 1 }} 
      className={`group relative ${project.layout} z-10`}
    >
      <div className="relative aspect-[4/5] md:aspect-[16/11] bg-neutral-900 border border-white/5 overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          whileHover={{ scale: 1.05 }} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      <div className="mt-6 flex justify-between items-start px-1">
          <div className="flex flex-col space-y-1">
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/50">
                {project.category}
              </span>
              <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-white">
                {project.title}
              </span>
          </div>
          <span className="text-[10px] text-white/20 font-mono mt-0.5">0{index + 1}</span>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDemoreelOpen, setIsDemoreelOpen] = useState(false);
  const lenis = useLenis();

  const handleScrollTo = (target: string | number) => {
    if (lenis) lenis.scrollTo(target, { duration: 2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  };

  const { scrollYProgress: globalScroll } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const textY = useTransform(globalScroll, [0, 0.2], [0, -150]);
  const videoY = useTransform(globalScroll, [0, 0.2], [0, 100]);
  const opacityFade = useTransform(globalScroll, [0, 0.15], [1, 0]);
  const nameLeft = useTransform(globalScroll, [0, 0.1], ["2.5rem", "50%"]);
  const nameX = useTransform(globalScroll, [0, 0.1], ["0%", "-50%"]);
  const nameScale = useTransform(globalScroll, [0, 0.1], [1, 0.85]);

  const { scrollYProgress: introScrollYProgress } = useScroll({ target: introRef, offset: ["start end", "end start"] });
  const introBgY = useTransform(introScrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.style.display = 'flex';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.group')) setIsHovered(true);
      else setIsHovered(false);
    };
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <main ref={containerRef} id="hero-top" className="relative w-full bg-black font-sans text-white cursor-none overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* NOM FIXE */}
      <motion.div 
        style={{ left: nameLeft, x: nameX, scale: nameScale }} 
        className="fixed top-8 md:top-10 z-[100] pointer-events-none"
      >
        <span className="text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold whitespace-nowrap">
          Jean-Pierre Sastre
        </span>
      </motion.div>

      {/* 1. HERO */}
      <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-between">
        
        {/* ARRIÈRE-PLAN VIDÉO CLIQUABLE AVEC LES EFFETS FONCTIONNELS */}
        <div className="absolute inset-0 z-0">
          <ParticleTrail />
          <motion.div 
            style={{ y: videoY }} 
            onClick={() => setIsDemoreelOpen(true)}
            className="h-full w-full cursor-pointer group/video relative z-10"
          >
            <video 
              src="Demoreel_2026_V1_15s.mp4"
              autoPlay loop muted playsInline 
              className="w-full h-full object-cover opacity-60 group-hover/video:scale-105 transition-transform duration-1000 ease-out z-10"
            />
            <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/0 transition-colors duration-700 z-20" />
          </motion.div>
        </div>

        {/* CONTENEUR TEXTES (On force tout le bloc à laisser passer les clics) */}
<motion.div style={{ y: textY, opacity: opacityFade }} className="relative z-10 w-full p-8 md:p-14 pointer-events-none">
  <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full items-start pointer-events-none">
    
    <div className="flex flex-col items-start space-y-0 mt-16 md:mt-20 pointer-events-none">
      {["Creative", "Artistic", "Director"].map((text) => (
        <div key={text} className="relative group h-[10vh] md:h-[12vh] flex items-center w-full pointer-events-none">
          <div className="absolute left-0 h-[10%] w-[120px] sm:w-[350px] bg-white/10 backdrop-blur-2xl border-y border-white/5 transition-all duration-1000 ease-in-out group-hover:w-[92vw] z-0 pointer-events-none" />
          <h1 className="relative z-10 text-[8vw] md:text-[6vw] font-bold uppercase leading-none px-4 md:px-6 pointer-events-none">{text}</h1>
        </div>
      ))}
    </div>
    
    <div className="hidden md:block pointer-events-none" />

    {/* NAVIGATION (Ici on RE-AUTORISE les clics avec pointer-events-auto pour pouvoir cliquer sur les menus) */}
    <nav className="flex flex-col items-end gap-1 md:gap-2 text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium absolute top-0 right-0 p-8 md:p-14 pointer-events-auto">
      <button onClick={() => handleScrollTo('#projects-section')} className="hover:opacity-50 transition-opacity whitespace-nowrap">
        Selected Works
      </button>
      <button onClick={() => handleScrollTo('#contact-section')} className="hover:opacity-50 transition-opacity whitespace-nowrap">
        Contact
      </button>
    </nav>
  </div>
</motion.div>

        {/* BOUTON WATCH DEMOREEL NETTOYÉ ET RE-CLIQUABLE */}
        <motion.button
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation(); // Évite de double-cliquer la vidéo en dessous
            setIsDemoreelOpen(true);
          }}
          className="text-[9px] tracking-[0.4em] uppercase font-medium text-white/40 hover:text-white transition-colors duration-300 relative z-40 translate-x-100 translate-y-0 lg:translate-x-[-465px] lg:translate-y-[-45px] pointer-events-auto mx-auto lg:mx-0"
        >
          WATCH DEMOREEL
        </motion.button>

        {/* SECTION SCROLL BAS DE PAGE */}
        <motion.div style={{ opacity: opacityFade }} className="relative z-10 w-full px-8 md:px-14 pb-20 md:pb-14 flex justify-between items-end pointer-events-none">
             <span className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40 block max-w-[65vw] md:max-w-none leading-relaxed md:whitespace-nowrap">
                Digital / Motion Design / Immersive Installations / Video Projection
             </span>
             <button onClick={() => handleScrollTo('#projects-section')} className="group flex flex-col items-center shrink-0 pointer-events-auto">
                <p className="mb-2 text-[8px] md:text-[10px] uppercase tracking-widest group-hover:text-white/60">Scroll</p>
                <div className="h-[30px] md:h-[50px] w-[1px] bg-white animate-scroll-line" />
             </button>
        </motion.div>

        {/* MODAL MODAL PLEIN ÉCRAN */}
        {isDemoreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 md:p-12 pointer-events-auto"
          >
            <button 
              onClick={() => setIsDemoreelOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white text-[10px] tracking-[0.3em] uppercase z-[60] transition-colors duration-300"
            >
              [ X ]
            </button>
            <div className="w-full max-w-5xl aspect-video bg-neutral-950 shadow-2xl relative z-10">
              <video 
                src="Demoreel_2026_V1_low2.mp4" 
                autoPlay 
                controls 
                className="w-full h-full object-contain"
              />
            </div>
            <div 
              className="absolute inset-0 bg-transparent z-0"