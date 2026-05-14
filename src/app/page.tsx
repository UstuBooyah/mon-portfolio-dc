"use client";

import React, { useState, useEffect } from 'react';
import { ParticleTrail } from './ParticleTrail';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

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

    // Ce return doit être AVANT la fermeture du useEffect (ligne 42-ish)
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []); // <-- Fermeture du useEffect ici

  return (
    
    <main className="relative h-screen w-full bg-black overflow-hidden font-sans text-white cursor-none">
      <ParticleTrail />
          {/* 1. LA VIDÉO */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/projet1.mp4" 
          autoPlay loop muted playsInline
          className="h-full w-full object-cover opacity-80" 
        />
      </div>

      {/* 2. L'INTERFACE */}
      <div className="relative z-10 h-full w-full flex flex-col p-6 md:p-10">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-start space-y-0">
            <span className="text-[12px] tracking-[0.5em] uppercase font-bold mb-8">
              Jean-Pierre Sastre
            </span>

           {["Creative", "Artistic", "Director"].map((text) => (
  <div 
    key={text} 
    className="relative group transition-all duration-700 ease-out w-[400px] hover:w-[66vw] overflow-hidden flex items-center justify-start -space-y-4 md:-space-y-16 h-[10vh] md:h-[12vh]"
  >
    {/* LE RECTANGLE (Background) : On réduit h-full à h-[10%] pour faire 1/3 environ */}
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/18 h-[10%] backdrop-blur-2xl bg-white/10 border-t border-b border-white/5"></div>
    
    {/* LE TEXTE : On s'assure qu'il reste au-dessus */}
    <h1 className="relative text-[12vw] md:text-[5.5vw] font-bold uppercase leading-none tracking-lighter py-4 px-6 text-white/70 select-none pointer-events-none">
      {text}
    </h1>
              </div>
            ))}
          </div>

          <div className="hidden md:block"></div>

          <nav className="flex flex-col items-end gap-2 text-[10px] md:text-[12px] tracking-[0.3em] uppercase font-medium">
            <a href="#" className="hover:opacity-50 transition-opacity">Selected Works</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Studio</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
          </nav>
        </div>

        {/* BAS DE PAGE */}
        <div className="mt-auto flex justify-between items-end w-full pt-6">
          <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase flex gap-4">
            <span>Digital / Motion Design / Projection Mapping</span>
          </div>
          <div className="flex flex-col items-center ml-4">
            <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-2">Scroll</p>
            <div className="h-[50px] w-[1px] bg-white animate-scroll-line"></div>
          </div>
        </div>
      </div>

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