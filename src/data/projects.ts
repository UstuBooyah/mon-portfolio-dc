// 1. On déclare d'abord l'interface (le modèle) tout en haut
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  speed: number;
  image: string;
  videoUrl: string;
  videoCredits: string;
  description: string;
  gallery: {
    src: string;
    credits: string;
  }[];
}

// 2. Ensuite, on crée le tableau de données en dessous
export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Paris is Louboutining",
    category: "Fashion Show / Immersive",
    client: "Christian Louboutin",
    year: "2024",
    speed: 0.25,
    image: "/SelectedWorks/2024-louboutin_01.webp",
    videoUrl: "/SelectedWorks/LOUBOUTIN_15S_low.mp4",
    videoCredits: "[©Superbien Studio / ©Christian Louboutin / ©David Lachapelle]",
    description: "To mark Fashion Week, Louboutin is presenting its new Spring/Summer 2025 collection. Working closely with David Lachapelle, who was given 'carte blanche' over the overall artistic direction, I worked on producing a 13-minute show, screened at the Molitor swimming pool in Paris. An impressive show, enhanced by a performance from Olympic swimmers.",
    gallery: [
      { src: "/SelectedWorks/2024-louboutin_01.webp", credits: "© [Superbien Studio]" },
      { src: "/SelectedWorks/2024-louboutin_02_Thb.webp", credits: "© [ChristianLouboutin]" },
      { src: "/SelectedWorks/2024-louboutin-03_Thb.webp", credits: "© [Superbien Studio]" },
      { src: "/SelectedWorks/2024-louboutin_06.webp", credits: "© [ChristianLouboutin]" }
    ]
  },
  {
    id: 2,
    title: "ReOpening of Notre-Dame",
    category: "VideoProjection / Mapping",
    year: "2024",
    speed: 0.25,
    image: "/SelectedWorks/NOTRE-DAME-Thb.webp",
    videoUrl: "/SelectedWorks/NOTREDAME_25S.mp4",
    videoCredits: "[©Superbien Studio]",
    description: "In 2019, Notre-Dame Cathedral went up in flames and the hearts of people all over the world were set alight. Five years later, the building has risen from the ashes. To mark the occasion, I worked on the artistic direction and motion design for the formal part of the ceremony, from the official reopening of the doors for the first time to the message of universal gratitude.  A celebration marked by humility, seeking above all to pay tribute to the monument.",
    gallery: [  
      
      { type: "video", src: "/SelectedWorks/2024-notre-dame-2-1(1).mp4", credits: "© [Superbien Studio]" }, // 🟢 Tout en minuscule + "type: video"

  { type: "image", src: "/SelectedWorks/NotreDame_Colors.png", credits: "© [Superbien Studio]" },
  { type: "image", src: "/SelectedWorks/NotreDame_Merci.webp", credits: "© [Superbien Studio]" },
  { type: "video", src: "/SelectedWorks/NotreDame_Merci.mp4", credits: "© [Superbien Studio]" }     // 🟢 Tout en minuscule + "type: video"
]
  }
];