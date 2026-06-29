"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { PROJECTS_DATA } from "@/data/projects";

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8); // Le "8" contrôle la vitesse. Plus il est grand, plus c'est lent.
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const currentProjectIndex = PROJECTS_DATA.findIndex(
    (p) => p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  );

  const project = PROJECTS_DATA[currentProjectIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
        <h1 className="text-xl font-semibold uppercase tracking-widest mb-4">Project not found</h1>
        <button 
          onClick={() => router.push("/")} 
          className="text-[11px] uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const nextProjectIndex = (currentProjectIndex + 1) % PROJECTS_DATA.length;
  const nextProject = PROJECTS_DATA[nextProjectIndex];
  const nextProjectSlug = nextProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen bg-black text-white font-sans overflow-hidden cursor-none"
    >
      {/* Back Button */}
      <div className="absolute top-8 left-8 md:left-14 z-50">
        <button 
          onClick={() => router.back()} 
          className="relative text-[11px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity pb-1 group/btn"
        >
          <span>← Back</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover/btn:w-full" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-20 px-8 md:px-14 flex flex-col justify-end min-h-[70vh]">
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-tight leading-none mb-12">
            {project.title}
          </h1>
        </div>
        
        {/* 🎥 CONTENEUR DE LA VIDÉO PRINCIPALE LOUBOUTIN */}
        <div className="w-full relative group/video">
                    
          {/* Ta vidéo principale */}
          <div className="w-full bg-neutral-900 border border-white/[0.05] relative overflow-hidden aspect-video">
            <video 
              src="/SelectedWorks/LOUBOUTIN_15S_low.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/video:scale-[1.02]"
            />
          </div>

          {/* 🟢 BLOC CRÉDITS VIDÉO */}
          <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
            Video Credits: [©Superbien Studio / ©Christian Louboutin / ©David Lachapelle]
          </p>
        </div>
      </section> {/* 🟢 FIXE: Fermeture propre de la section Hero ici */}

      {/* Info Section */}
      <section className="relative w-full px-8 md:px-14 py-20 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/[0.05]">
        <div className="md:col-span-4 flex flex-col gap-6 text-[11px] uppercase tracking-widest text-white/50">
          <div>
            <span className="block text-white/30 mb-1">Client</span>
            <span className="text-white font-medium">{project.title}</span>
          </div>
          <div>
            <span className="block text-white/30 mb-1">Category</span>
            <span className="text-white font-medium">{project.category}</span>
          </div>
          <div>
            <span className="block text-white/30 mb-1">Year</span>
            <span className="text-white font-medium">2024</span>
          </div>
        </div>
        <div className="md:col-span-8 max-w-2xl">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
            To mark Fashion Week, Louboutin is presenting its new Spring/Summer 2025 collection. Working closely with David Lachapelle, who was given "carte blanche" over the overall artistic direction, I worked on producing a 13-minute show, screened at the Molitor swimming pool in Paris.
            An impressive show, enhanced by a performance from Olympic swimmers.
          </p>
        </div>
      </section>

      {/* 🟢 GALLERY SECTION WITH INTEGRATED HOME BACKGROUND LINES & DOTS */}
      <section className="w-full px-8 md:px-14 pb-32 relative bg-black overflow-hidden">
        
        {/* REPRODUCTION IDÉALE DU COMPOSANT BACKGROUND LINES */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="relative w-full h-full">
            
            {/* 1. Lignes verticales courtes aléatoires */}
            {Array.from({ length: 45 }).map((_, i) => {
              const top = 5 + ((i * 17) % 85);
              const left = (i * 13.7) % 100;
              const height = 5 + ((i * 23) % 50); 
              const opacity = 0.08 + ((i * 7) % 22) / 100;
              
              return (
                <div
                  key={`grid-line-${i}`}
                  style={{ 
                    top: `${top}%`, 
                    left: `${left}%`, 
                    height: `${height}vh`, 
                    opacity: opacity 
                  }}
                  className={`absolute w-[2px] bg-gradient-to-b from-transparent via-white/80 to-transparent ${i % 3 === 0 ? "hidden md:block" : ""}`}
                />
              );
            })}

            {/* 2. Petits disques blancs */}
            {Array.from({ length: 25 }).map((_, i) => {
              const top = 5 + (i * 3.5);
              const left = (i * 17.1) % 100;
              const opacity = 0.15 + ((i * 5) % 20) / 100;
              const sizeClass = i % 4 === 0 ? "w-[1px] h-[1px]" : i % 4 === 1 ? "w-[2px] h-[2px]" : i % 4 === 2 ? "w-[3px] h-[3px]" : "w-[4px] h-[4px]";
              
              return (
                <div
                  key={`grid-dot-${i}`}
                  style={{ 
                    top: `${top}%`, 
                    left: `${left}%`, 
                    opacity: opacity 
                  }}
                  className={`absolute bg-white rounded-full ${sizeClass} ${i % 3 === 0 ? "hidden md:block" : ""}`}
                />
              );
            })}
          </div>
        </div>

        {/* CONTENEUR DES IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-40 items-start pt-20 relative z-20">
          
          {/* 🖼️ IMAGE 1 */}
          <div className="w-full relative group/item">
            <div className="absolute top-0 left-0 w-[4px] h-[4px] bg-white rounded-full -translate-x-1/2 -translate-y-6 z-30 opacity-30 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-500" />
            <ScrollParallax speed={-30}>
              <div className="w-full bg-neutral-900 border border-white/[0.05] relative group/img overflow-hidden">
                <img 
                  src="/SelectedWorks/2024-louboutin_01.webp" 
                  alt="View 1"
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
              </div>
              <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
                © [Superbien Studio]
              </p>
            </ScrollParallax>
          </div>

          {/* 🖼️ IMAGE 2 */}
          <div className="w-full md:pt-32 relative group/item">
            <div className="absolute top-0 right-0 w-[4px] h-[4px] bg-white rounded-full translate-x-1/2 -translate-y-6 z-30 opacity-30 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-500" />
            <ScrollParallax speed={-70}>
              <div className="w-full bg-neutral-900 border border-white/[0.05] relative group/img overflow-hidden">
                <img 
                  src="/SelectedWorks/2024-louboutin_02_Thb.webp" 
                  alt="Vue 2"
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
              </div>
              <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
                © [ChristianLouboutin]
              </p>
            </ScrollParallax>
          </div>

          {/* 🖼️ IMAGE 3 */}
          <div className="w-full md:-mt-[160px] relative group/item">
            <div className="absolute top-0 left-0 w-[4px] h-[4px] bg-white rounded-full -translate-x-1/2 -translate-y-6 z-30 opacity-30 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-500" />
            <ScrollParallax speed={-60}>
              <div className="w-full bg-neutral-900 border border-white/[0.05] relative group/img overflow-hidden">
                <img 
                  src="/SelectedWorks/2024-louboutin-03_Thb.webp" 
                  alt="Vue 3"
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
              </div>
              <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
                © [Superbien Studio]
              </p>
            </ScrollParallax>
          </div>

          {/* 🖼️ IMAGE 4 */}
          <div className="w-full relative group/item">
            <div className="absolute top-0 right-0 w-[4px] h-[4px] bg-white rounded-full translate-x-1/2 -translate-y-6 z-30 opacity-30 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-500" />
            <ScrollParallax speed={-20}>
              <div className="w-full bg-neutral-900 border border-white/[0.05] relative group/img overflow-hidden">
                <img 
                  src="/SelectedWorks/2024-louboutin_06.webp" 
                  alt="Vue 4"
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
              </div>
              <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
                © [ChristianLouboutin]
              </p>
            </ScrollParallax>
          </div>

        </div>
      </section>

      {/* Next Project */}
      <section className="w-full border-t border-white/[0.05] py-32 flex flex-col items-center justify-center">
        <button
          onClick={() => router.push(`/projects/${nextProjectSlug}`)}
          className="group/next cursor-pointer flex flex-col items-center outline-none"
        >
          <span className="text-[11px] uppercase tracking-[0.4em] text-white/40 block mb-6 transition-transform duration-500 group-hover/next:-translate-y-2">
            Next Project
          </span>
          <h2 className="text-2xl md:text-2xl font-light uppercase tracking-tight opacity-70 group-hover/next:opacity-100 transition-opacity duration-500 relative pb-4">
            {nextProject.title}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-700 ease-out group-hover/next:w-32" />
          </h2>
        </button>
      </section>

      {/* Back to Top */}
      <div className="w-full flex justify-center pb-20">
        <button
          onClick={scrollToTop}
          className="text-[11px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-500 group relative pb-2"
        >
          Back to top
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white transition-colors duration-500" />
        </button>
      </div>

    </motion.main>
  );
}

function ScrollParallax({ children, speed = -50 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  return <motion.div ref={ref} style={{ y }}>{children}</motion.div>;
}