"use client";

import React from 'react';

export default function Home() {
  return (
    <main className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden font-sans text-white">
      
      {/* 1. LA VIDÉO PLEIN ÉCRAN */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/projet1.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="h-full w-full object-cover opacity-70" 
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 2. L'INTERFACE (OVERLAY) */}
      <div className="relative z-10 h-full w-full flex flex-col p-6 md:p-10">
        
        {/* Structure Responsive : Empilé sur mobile, Grille sur Desktop */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full">
          
          {/* COLONNE GAUCHE : Bloc Identité Rigide */}
<div className="flex flex-col items-start text-left">
  
  {/* Nom/Logo - Aligné sur la ligne de fer gauche */}
  <span className="text-[10px] md:text-[12px] tracking-[0.5em] uppercase font-bold mb-6 md:mb-10 block">
    JEAN-PIERRE SASTRE
  </span>

  {/* Titre avec alignement forcé */}
  <h1 className="flex flex-col text-[12vw] md:text-[5.5vw] font-bold uppercase leading-[0.85] tracking-lighter">
    <span className="block">Creative</span>
    <span className="block">Artistic</span>
    <span className="block">Director</span>
  </h1>
            
                      </div>
          
          {/* COLONNE CENTRE : Vide (pour l'espace) */}
          <div className="hidden md:block order-2"></div>
          
          {/* BLOC DROITE : Menu (Reste bien à droite) */}
          <nav className="flex flex-col items-end gap-2 text-[10px] md:text-[12px] tracking-[0.3em] uppercase font-medium order-1 md:order-3 mb-8 md:mb-0">
            <a href="#" className="hover:opacity-50 transition-opacity border-b border-transparent hover:border-white">Selected Works</a>
            <a href="#" className="hover:opacity-50 transition-opacity border-b border-transparent hover:border-white">Studio</a>
            <a href="#" className="hover:opacity-50 transition-opacity border-b border-transparent hover:border-white">Contact</a>
          </nav>
        </div>

        {/* BAS DE PAGE : Responsive */}
<div className="mt-auto flex justify-between items-end w-full  pt-6">
  
  {/* Suppression du max-w et ajout de whitespace-nowrap */}
  <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase leading-relaxed whitespace-nowrap flex gap-4">
    <span>Digital</span>
    <span className="opacity-30">/</span>
    <span>Motion Design</span>
    <span className="opacity-30">/</span>
    <span>Projection Mapping</span>
    <span className="opacity-30">/</span>
    <span>Immersive Installations</span>
  </div>

  <div className="flex flex-col items-center ml-4">
    <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-2">Scroll</p>
    <div className="h-[30px] md:h-[50px] w-[1px] bg-white origin-top animate-scroll-line"></div>
  </div>
</div>

      </div>

      <style jsx global>{`
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .animate-scroll-line {
          animation: scroll-line 2.5s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}