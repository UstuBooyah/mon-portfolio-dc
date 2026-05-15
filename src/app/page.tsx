"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react'; 
import { ParticleTrail } from './ParticleTrail';

// --- CONFIGURATION DES PROJETS ---
const PROJECTS_BASE = [
  { id: 1, title: "Digital Immersive", category: "Projection Mapping", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", layout: "md:col-span-6 md:mt-0", speed: -100 },
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

const ParallaxProject = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, project.speed]);

  return (
    <motion.div ref={ref} style={{ y }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className={`group relative ${project.layout} z-10`}>
      <div className="relative aspect-[4/5] md:aspect-[16/11] bg-neutral-900 border border-white/5 overflow-hidden">
        <motion.img src={project.image} alt={project.title} whileHover={{ scale: 1.05 }} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/60 mb-2">{project.category}</p>
          <h3 className="text-2xl font-bold uppercase tracking-tight">{project.title}</h3>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-start px-1">
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/70">{project.title}</span>
          <span className="text-[10px] text-white/20 font-mono">0{index + 1}</span>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const lenis = useLenis();

  const handleScrollTo = (target: string) => {
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
    <main ref={containerRef} className="relative w-full bg-black font-sans text-white cursor-none overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* NOM FIXE */}
      <motion.div 
        style={{ left: nameLeft, x: nameX, scale: nameScale }} 
        className="fixed top-6 md:top-10 z-[100] pointer-events-none"
      >
        <span className="text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold whitespace-nowrap">
          Jean-Pierre Sastre
        </span>
      </motion.div>

      {/* 1. HERO */}
      <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 z-0">
          <ParticleTrail />
          <motion.div style={{ y: videoY }} className="h-full w-full">
            <video 
              src="/projet1.mp4" 
              autoPlay loop muted playsInline 
              className="h-full w-full object-cover opacity-80" 
            />
          </motion.div>
        </div>

        {/* HAUT DU HERO */}
        <motion.div style={{ y: textY, opacity: opacityFade }} className="relative z-10 w-full p-8 md:p-14">
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full items-start">
            <div className="flex flex-col items-start space-y-0 mt-16 md:mt-20">
              {["Creative", "Artistic", "Director"].map((text) => (
                <div key={text} className="relative group h-[10vh] md:h-[12vh] flex items-center w-full">
                  <div className="absolute left-0 h-[10%] w-[120px] sm:w-[350px] bg-white/10 backdrop-blur-2xl border-y border-white/5 transition-all duration-1000 ease-in-out group-hover:w-[92vw] z-0" />
                  <h1 className="relative z-10 text-[8vw] md:text-[6vw] font-bold uppercase leading-none px-4 md:px-6 pointer-events-none">{text}</h1>
                </div>
              ))}
            </div>
            
            <div className="hidden md:block" />

            <nav className="flex flex-col items-end gap-1 md:gap-2 text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium absolute top-0 right-0 p-8 md:p-14">
              <button onClick={() => handleScrollTo('#projects-section')} className="hover:opacity-50 transition-opacity whitespace-nowrap">
                Selected Works
              </button>
              <button onClick={() => handleScrollTo('#contact-section')} className="hover:opacity-50 transition-opacity whitespace-nowrap">
                Contact
              </button>
            </nav>
          </div>
        </motion.div>

        {/* BAS DU HERO - FIXÉ POUR ÊTRE TOUJOURS VISIBLE */}
        <motion.div style={{ opacity: opacityFade }} className="relative z-10 w-full p-8 md:p-14 flex justify-between items-end pb-12 md:pb-14">
             <span className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40 whitespace-nowrap max-w-none">
                Digital / Motion Design / Immersive Installations / Video Projection
             </span>
             <button onClick={() => handleScrollTo('#projects-section')} className="group flex flex-col items-center">
                <p className="mb-2 text-[8px] md:text-[10px] uppercase tracking-widest group-hover:text-white/60">Scroll</p>
                <div className="h-[30px] md:h-[50px] w-[1px] bg-white animate-scroll-line" />
             </button>
        </motion.div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section ref={introRef} className="relative min-h-[150vh] w-full flex items-center justify-center">
        <motion.div style={{ y: introBgY }} className="absolute inset-0 z-0 h-full w-full">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600" className="h-full w-full object-cover grayscale opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>
        <div className="sticky top-0 h-screen w-full flex items-center justify-center z-20 pointer-events-none">
            <div className="w-[85vw] md:w-[55vw] aspect-square bg-black border border-white/5 flex items-center justify-center p-8 md:p-12 pointer-events-auto shadow-2xl">
                <p className="text-[4.5vw] md:text-[2vw] font-bold uppercase leading-tight text-white text-center">
                    {INTRO_TEXT.split(" ").map((word, i) => (
                        <motion.span key={i} className="inline-block mr-2" initial={{ opacity: 0 }} whileInView={{ opacity: i % 3 === 0 ? 0.3 : 1 }} transition={{ delay: i * 0.02 }}>
                          {word}
                        </motion.span>
                    ))}
                </p>
            </div>
        </div>
      </section>

      {/* 3. GALERIE */}
      <section id="projects-section" className="relative bg-[#050505] py-40 z-30">
        <div className="relative w-screen left-1/2 -translate-x-1/2 mb-40 overflow-hidden">
          <motion.h2 
            initial={{ opacity: 0, x: -100 }} 
            whileInView={{ opacity: 0.15, x: 0 }} 
            transition={{ duration: 1.5 }}
            className="text-[20vw] font-bold uppercase tracking-tighter leading-none text-white whitespace-nowrap text-center"
          >
            Selected Works
          </motion.h2>
        </div>
        <div className="px-10 md:px-32 grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-y-64 max-w-[1500px] mx-auto">
          {PROJECTS_BASE.map((p, i) => <ParallaxProject key={p.id} project={p} index={i} />)}
        </div>
      </section>

      {/* FOOTER */}
      <section id="contact-section" className="relative h-screen w-full flex items-center justify-center border-t border-white/5 bg-black">
          <div className="flex flex-col items-center px-10 text-center">
              <h2 className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.5em]">Contact</h2>
              <div className="h-[1px] w-8 bg-white/20 my-6" />
              <a href="mailto:hello@jpsastre.com" className="text-[10px] md:text-[12px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">hello@jpsastre.com</a>
          </div>
      </section>

      {/* CURSEUR */}
      <div id="custom-cursor" className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white transition-[width,height] duration-300 ease-out ${isHovered ? 'w-6 h-6' : 'w-2 h-2'}`} style={{ transform: 'translate(-50%, -50%)', display: 'none' }} />

      <style jsx global>{`
        body { background: black; margin: 0; overflow-x: hidden; }
        ::-webkit-scrollbar { display: none; }
        @keyframes scroll-line { 0%, 100% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } }
        .animate-scroll-line { animation: scroll-line 2.5s infinite ease-in-out; }
      `}</style>
    </main>
  );
}