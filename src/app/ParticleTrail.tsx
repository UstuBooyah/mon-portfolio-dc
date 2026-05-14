"use client";
import React, { useEffect, useRef } from 'react';

export const ParticleTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let mouse = { x: 0, y: 0 };

   

    const createParticle = (x: number, y: number) => {
      return {
        x, y,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        life: 0.25, // Opacité de départ
        decay: Math.random() * 0.02 + 0.015 // Vitesse de disparition
      };
    };
const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
const animate = () => {
  // 1. On vide COMPLÈTEMENT le canvas (plus de résidus gris)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // On réinitialise les effets de flou pour ne pas impacter tout le canvas
  ctx.shadowBlur = 0;

  // 2. On génère les particules au mouvement
  // (Astuce : n'en génère que si la souris a bougé pour économiser de la batterie)
  particles.push({
    x: mouse.x,
    y: mouse.y,
    size: Math.random() * 2 + 2,
    speedX: (Math.random() - 0.5) * 0.8,
    speedY: (Math.random() - 0.5) * 0.8,
    life: 1,
    decay: 0.012 // Ajuste ici la longueur de la traînée (plus grand = plus court)
  });

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.life -= p.decay;
    p.size += 0.2; // La particule s'étend

    if (p.life <= 0) {
      particles.splice(i, 1);
      i--;
    } else {
      ctx.beginPath();
      
      // Gradient radial pour l'aspect vaporeux
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${p.life * 0.2})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  requestAnimationFrame(animate);
};

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998] mix-blend-screen"
    />
  );
};