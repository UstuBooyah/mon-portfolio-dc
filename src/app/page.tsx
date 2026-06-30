"use client";

import { PROJECTS_DATA } from "../data/projects";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';

const INTRO_TEXT = "Creative and Artistic Director based in Paris, spécialisé en motion design & expériences immersives pour les marques. Mon travail fusionne art, technologie et narration pour créer des moments inoubliables.";

// --- LINES PARALLAX UNIQUEMENT DANS LA SECTION SELECTED WORKS ---
const BackgroundLines = ({ isMounted }: { isMounted: boolean }) => {
  const ref = useRef(null);
  
  // On ne passe le target que si le composant est monté
  const { scrollYProgress } = useScroll({ 
    target: isMounted ? ref : undefined 
  });

  const yFast = useTransform(scrollYProgress, [0, 2], [-300, 300]);
  const ySlow = useTransform(scrollYProgress, [0, 3], [50, -50]);
  const ySuperFast = useTransform(scrollYProgress, [0, 4], [-700, 700]);

  const lines = useRef(
    Array.from({ length: 100 }).map((_, i) => {
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
      const sizeClass = i % 4 === 0 ? "w-[1px] h-[1px]" : i % 4 === 1 ? "w-[2px] h-[2px]" : i % 4 === 2 ? "w-[3px] h-[3px]" : "w-[4px] h-[4px]";
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
            style={{ y: line.isFast ? yFast : ySlow, top: line.top, left: line.left, height: line.height, opacity: line.opacity }}
            className={`absolute w-[2px] bg-gradient-to-b from-transparent via-white to-transparent ${line.isDesktopOnly ? "hidden md:block" : ""}`}
          />
        ))}
        {dots.current.map((dot, idx) => (
          <motion.div
            key={`dot-${idx}`}
            style={{ y: ySuperFast, top: dot.top, left: dot.left, opacity: dot.opacity }}
            className={`absolute bg-white rounded-full ${dot.sizeClass} ${dot.isDesktopOnly ? "hidden md:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- COMPOSANT PARALLAX ELEMENT ---
const ParallaxElement = ({ children, speed = 0.1, isMounted }: { children: React.ReactNode; speed?: number; isMounted: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: isMounted ? ref : undefined,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 500]);

  return (
    <motion.div ref={ref} style={{ y }} className="w-full">
      {children}
    </motion.div>
  );
};

// --- CONTENU HYDRATÉ SÉCURISÉ ---
const MainHydratedContent = ({ isMounted }: { isMounted: boolean }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDemoreelOpen, setIsDemoreelOpen] = useState(false);
  const [, setIsHovered] = useState(false); // préfixé par un underscore si inutilisé pour éviter les warnings
  
  const popupRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isDemoreelOpen && popupRef.current) popupRef.current.focus();
  }, [isDemoreelOpen]);

  const handleScrollTo = (target: any) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  };

  // Sécurisation des scrolls globaux
  const { scrollYProgress: globalScroll } = useScroll({ 
    target: isMounted ? containerRef : undefined, 
    offset: ["start start", "end end"] 
  });

  const introRef = useRef(null);
  const { scrollYProgress: introScroll } = useScroll({ 
    target: isMounted ? introRef : undefined, 
    offset: ["start end", "end start"] 
  });
  
  const introBgY = useTransform(introScroll, [0, 1], [-200, 200]);

  const textY = useTransform(globalScroll, [0, 0.2], [0, -150]);
  const videoY = useTransform(globalScroll, [0, 0.2], [0, 100]);
  const opacityFade = useTransform(globalScroll, [0, 0.15], [1, 0]);
  const nameLeft = useTransform(globalScroll, [0, 0.1], ["2.5rem", "50%"]);
  const nameX = useTransform(globalScroll, [0, 0.1], ["0%", "-50%"]);
  const nameScale = useTransform(globalScroll, [0, 0.1], [1, 0.85]);

  useEffect(() => {
    const handleGlobalKey = (e: any) => {
      if (e.key === 'Escape' || e.keyCode === 27) setIsDemoreelOpen(false);
    };
    document.addEventListener('keydown', handleGlobalKey, true);
    return () => document.removeEventListener('keydown', handleGlobalKey, true);
  }, []);

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
   
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.display = 'flex';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
   
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.group') || target.closest('.clickable')) {
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
    <div ref={containerRef} className="relative w-full bg-black font-sans text-white cursor-none overflow-x-hidden selection:bg-white selection:text-black">
      
      <style jsx global>{`
        body, a, button, [role="button"], .group, .clickable {
          cursor: none !important;
        }
        #custom-cursor {
          cursor: none !important;
        }
      `}</style>

      {/* NOM FIXE AVEC PARALLAX */}
      <motion.div
        style={{ left: nameLeft, x: nameX, scale: nameScale }}
        className="fixed top-8 md:top-10 z-[100] pointer-events-none"
      >
        <span className="text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold whitespace-nowrap">
          Jean-Pierre Sastre
        </span>
      </motion.div>

      {/* 1. HERO SECTION */}
      <section id="hero-top" className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ y: videoY }}
            onClick={() => setIsDemoreelOpen(true)}
            className="h-full w-full relative z-10 group/video"
          >
            <video
              src="Demoreel_2026_V1_15s.mp4"
              autoPlay loop muted playsInline
              className="w-full h-full object-cover opacity-60 group-hover/video:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/0 transition-colors duration-700" />
          </motion.div>
        </div>

        <motion.div style={{ y: textY, opacity: opacityFade }} className="relative z-10 w-full p-8 md:p-14 pointer-events-none">
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full items-start">
            <div className="flex flex-col items-start space-y-0 mt-16 md:mt-20 pointer-events-auto">
              {["Creative", "Artistic", "Director"].map((text) => (
                <div key={text} className="relative group h-[10vh] md:h-[12vh] flex items-center w-full clickable">
                  <div className="absolute left-0 h-[10%] w-[120px] sm:w-[350px] bg-white/10 backdrop-blur-2xl border-y border-white/5 transition-all duration-1000 ease-in-out group-hover:w-[92vw] z-0" />
                  <h1 className="relative z-10 text-[8vw] md:text-[6vw] font-bold uppercase leading-none px-4 md:px-6 tracking-tight text-white/90 group-hover:text-white group-hover:scale-[1.01] transition-all duration-700">
                    {text}
                  </h1>
                </div>
              ))}
            </div>
            <div className="hidden md:block" />
            <nav className="flex flex-col items-end gap-1 md:gap-2 text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium absolute top-0 right-0 p-8 md:p-14 pointer-events-auto">
              <button onClick={() => handleScrollTo('#projects-section')} className="group relative pb-1 hover:opacity-100 transition-opacity whitespace-nowrap">
                Selected Works
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2" />
              </button>
              <button onClick={() => handleScrollTo('#contact-section')} className="group relative pb-1 hover:opacity-100 transition-opacity whitespace-nowrap">
                Contact
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2" />
              </button>
              <Link href="/about" className="group relative pb-1 hover:opacity-100 transition-opacity whitespace-nowrap normal-case font-medium clickable">
                About
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2" />
              </Link>
            </nav>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsDemoreelOpen(true);
          }}
          className="text-[9px] tracking-[0.4em] uppercase font-medium text-white hover:text-white transition-colors duration-300 relative z-40 lg:absolute lg:bottom-40 lg:left-21.5 pointer-events-auto mx-auto lg:mx-0 group pb-1 w-max block"
        >
          Watch Showreel
          <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2" />
        </motion.button>

        <motion.div className="relative z-10 w-full px-8 md:px-14 pb-20 md:pb-14 flex justify-between items-end">
          <span className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40 block max-w-[65vw] md:max-w-none leading-relaxed md:whitespace-nowrap">
            Digital / Motion Design / Immersive Installations / Video Projection
          </span>
          <button onClick={() => handleScrollTo(introRef.current)} className="group flex flex-col items-center shrink-0 pointer-events-auto">
            <p className="mb-2 text-[8px] md:text-[10px] uppercase tracking-widest group-hover:text-white/60">Scroll</p>
            <div className="h-[30px] md:h-[50px] w-[1px] bg-white animate-scroll-line" />
          </button>
        </motion.div>
      </section>

      {/* 2. ABOUT SECTION */}
<section 
  ref={introRef} 
  className="relative min-h-[30vh] md:min-h-[150vh] w-full flex items-center justify-center bg-black px-8 md:px-14 pt-12 pb-12 md:pt-48 md:pb-32" 
  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
>        <motion.div style={{ y: introBgY }} className="absolute inset-0 z-0 h-full w-full">
          <img src="/Portrait2.webp" className="h-full w-full object-cover grayscale opacity-40" alt="Portrait background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>

<div className="relative md:sticky md:top-0 h-auto md:h-screen w-full flex items-center justify-center z-20 pointer-events-none">          <div className="w-[85vw] md:w-[55vw] aspect-square bg-black border border-white/5 flex flex-col items-center justify-center p-8 md:p-12 pointer-events-auto shadow-2xl">
            <p className="text-[4.5vw] md:text-[2vw] font-bold uppercase leading-light text-white text-center">
              {INTRO_TEXT.split(" ").map((word, i) => {
                const cleanWord = word.replace(/[,.&]/g, "").toLowerCase();
                const keywords = ["creative", "artistic", "director", "paris", "motion", "design", "expériences", "immersives", "marques", "narration"];
                const isImportant = keywords.includes(cleanWord);
                return (
                  <motion.span key={i} className="inline-block mr-2" initial={{ opacity: 0 }} whileInView={{ opacity: isImportant ? 1 : 0.3 }} viewport={{ once: false }} transition={{ delay: i * 0.02 }}>
                    {word}
                  </motion.span>
                );
              })}
            </p>
            <div className="mt-8 md:mt-12 flex justify-center w-full">
              <Link href="/about" className="group relative py-2 text-[10px] tracking-[0.3em] text-white/50 hover:text-white uppercase transition-colors duration-300 clickable outline-none">
                Learn More
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION SELECTED WORKS */}
      <section id="projects-section" className="relative w-full px-8 md:px-14 py-20 z-10 bg-black">
        <BackgroundLines isMounted={isMounted} />

<div className="relative w-full mb-16 md:mb-40 overflow-hidden px-4 z-10">
            <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 0.15, x: 0 }} transition={{ duration: 1.5 }} className="text-[14vw] md:text-[20vw] font-bold uppercase tracking-lighter leading-none text-white text-center">
            Selected Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-24 md:gap-y-48 items-center w-full">
          {PROJECTS_DATA.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const colSpan = isEven ? "md:col-span-7" : "md:col-span-5";
            const projectSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const speed = isMobile ? project.speed * 0.3 : project.speed;

            return (
              <Link
                href={`/projects/${projectSlug}`}
                key={project.id}
                className={`relative group cursor-pointer w-full flex flex-col ${colSpan} ${isEven ? 'md:items-start md:pr-4' : 'md:items-end md:pl-4 md:mt-32'}`}
              >
                <ParallaxElement speed={speed} isMounted={isMounted}>
                  <div className="aspect-[21/9] bg-neutral-950 overflow-hidden relative w-full border border-white/[0.03]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out group-hover:scale-103" />
                  </div>
                  <div className={`mt-4 flex flex-col w-full text-[11px] tracking-widest uppercase ${isEven ? 'items-start' : 'items-end'}`}>
                    <span className="font-semibold text-white tracking-[0.2em]">{idx + 1}. {project.title}</span>
                    <span className="text-white/40 mt-1 text-[10px]">{project.year} — {project.category}</span>
                  </div>
                </ParallaxElement>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. SECTION CONTACT */}
      <section id="contact-section" className="relative h-screen w-full flex flex-col items-center justify-center border-t border-white/5 bg-black">
        <div className="flex flex-col items-center px-10 text-center">
          <h2 className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.5em]">Contact</h2>
          <div className="h-[1px] w-8 bg-white/20 my-6" />
          <a href="mailto:sastrejp@gmail.com" className="text-[10px] md:text-[12px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors mb-20">
            sastrejp@gmail.com
          </a>
        </div>
        <button onClick={() => handleScrollTo(0)} className="group flex flex-col items-center gap-4 transition-opacity hover:opacity-60">
          <div className="h-10 w-[1px] bg-white/20 group-hover:bg-white group-hover:h-14 transition-all duration-500" />
          <span className="text-[9px] tracking-[0.4em] uppercase font-bold">Back to Top</span>
        </button>
      </section>

      {/* MODAL VIDÉO */}
      {isDemoreelOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12 pointer-events-auto bg-transparent">
          <button ref={popupRef} onClick={() => setIsDemoreelOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white text-[10px] tracking-[0.3em] uppercase z-[60] transition-colors duration-300 clickable outline-none focus:outline-none">
            [ CLOSE ]
          </button>
          <div className="w-full max-w-5xl aspect-video bg-neutral-950 shadow-2xl relative z-10">
            <video src="Demoreel_2026_V1_low2.mp4" autoPlay controls className="w-full h-full object-contain" />
          </div>
          <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[30px] z-0 cursor-pointer" onClick={() => setIsDemoreelOpen(false)} />
        </motion.div>
      )}
    </div>
  );
};

// --- COMPOSANT RACINE ---
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-screen bg-black" />;
  }

  return <MainHydratedContent isMounted={isMounted} />;
}