import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number; // 1 = vitesse normale, <1 = plus lent, >1 = plus vite
}

export const ParallaxElement = ({ children, speed = 0.1 }: ParallaxElementProps) => {
  const ref = useRef(null);

  // 1. On détecte le scroll spécifique à CE composant quand il entre dans l'écran
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // Déclenche quand le bas de l'élément touche le haut de l'écran (et inversement)
  });

  // 2. On transforme ce progrès (0 à 1) en un mouvement vertical (y)
  // On multiplie par 'speed * 100' pour définir l'amplitude du décalage (en pixels)
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  return (
    <motion.div ref={ref} style={{ y }} className="w-full">
      {children}
    </motion.div>
  );
};