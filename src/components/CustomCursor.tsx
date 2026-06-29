"use client";

import React, { useState, useEffect } from "react";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-300 ease-out pointer-coarse:hidden"
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        width: isHovered ? "24px" : "8px",
        height: isHovered ? "24px" : "8px",
      }}
    />
  );
}