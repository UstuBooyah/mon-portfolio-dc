"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Si tu utilises Lenis, on lui dit de scroller tout en haut instantanément
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Solution de secours native si Lenis n'est pas encore prêt
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}