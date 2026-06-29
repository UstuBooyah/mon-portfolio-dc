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
        <div className="w-full aspect-[21/9] overflow-hidden relative border border-white/[0.05] mt-8">
          <video 
            src="/Demoreel_2026_V1_15s.mp4" 
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </section>

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
            {/* Project description here */}
            To mark Fashion Week, Louboutin is presenting its new Spring/Summer 2025 collection. Working closely with David Lachapelle, who was given "carte blanche" over the overall artistic direction, I worked on producing a 13-minute show, screened at the Molitor swimming pool in Paris.
An impressive show, enhanced by a performance from Olympic swimmers.
          </p>
        </div>
      </section>

<section className="w-full px-8 md:px-14 pb-32">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-40 items-start">
    
    {/* 1. Image Gauche - Lente */}
    <div className="w-full">
      <ScrollParallax speed={-30}>
        <div className="w-full bg-neutral-900 border border-white/[0.05] relative group/img overflow-hidden">
          <img 
            src="/SelectedWorks/2024-louboutin_01.webp" // 💡 Image 1
            alt={`${project.title} - Vue 1`}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
        </div>
        <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
      ©[Superbien Studio]
    </p>
      </ScrollParallax>
    </div>

    {/* 2. Image Droite - Rapide + Décalée vers le bas */}
    <div className="w-full md:pt-32">
      <ScrollParallax speed={-70}>
        <div className="w-full bg-neutral-900 border border-white/[0.05] relative group/img overflow-hidden">
          <img 
            src="/SelectedWorks/2024-louboutin_02_Thb.webp" // 💡 Image 2
            alt={`${project.title} - Vue 2`}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
        </div>
        <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
      ©[ChristianLouboutin]
    </p>
      </ScrollParallax>
    </div>

    {/* 3. Image Gauche 2 - Rapide */}
    <div className="w-full md:-mt-[300px]">
      <ScrollParallax speed={-60}>
        <div className="w-full bg-neutral-900 border border-white/[0.05] relative group/img overflow-hidden">
          <img 
            src="/SelectedWorks/2024-louboutin-03_Thb.webp" // 💡 Image 3
            alt={`${project.title} - Vue 3`}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
        </div>
        <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
      ©[Superbien Studio]
    </p>
      </ScrollParallax>
    </div>

    {/* 4. Image Droite 2 - Lente (Pas de pt-32 ici pour casser le motif précédent) */}
    <div className="w-full">
      <ScrollParallax speed={-20}>
        <div className="w-full bg-neutral-900 border border-white/[0.05] relative group/img overflow-hidden">
          <img 
            src="/SelectedWorks/2024-louboutin_06.webp" // 💡 Image 4
            alt={`${project.title} - Vue 4`}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
        </div>
         <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
      ©[ChristianLouboutin]
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