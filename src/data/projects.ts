// 1. On déclare d'abord l'interface (le modèle) tout en haut
export interface Project {
  id: number;
  title: string;
  category: string;
  client?: string;
  year: string;
  speed: number;
  image: string;
  videoUrl: string;
  videoCredits: string;
  description: string;
  gallery: {
    type: "image" | "video";
    src: string;
    credits: string;
  }[];
}

// 2. Ensuite, on crée le tableau de données en dessous
export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Paris is Louboutining",
    category: "Fashion Show / Projection Mapping",
    client: "Christian Louboutin",
    year: "2024",
    speed: 0.25,
    image: "/SelectedWorks/2024-louboutin_01.webp",
    videoUrl: "/SelectedWorks/LOUBOUTIN_15S_low.mp4",
    videoCredits: "[©Superbien Studio / ©Christian Louboutin / ©David Lachapelle]",
    description: "To mark Fashion Week, Louboutin is presenting its new Spring/Summer 2025 collection. Working closely with David Lachapelle, who was given 'carte blanche' over the overall artistic direction, I worked on producing a 13-minute show, screened at the Molitor swimming pool in Paris. An impressive show, enhanced by a performance from Olympic swimmers.",
    gallery: [
       { type: "image", src: "/SelectedWorks/2024-louboutin_01.webp", credits: "© [Superbien Studio]" },
       { type: "image", src: "/SelectedWorks/2024-louboutin_02_Thb.webp", credits: "© [ChristianLouboutin]" },
       { type: "image", src: "/SelectedWorks/2024-louboutin-03_Thb.webp", credits: "© [Superbien Studio]" },
       { type: "image", src: "/SelectedWorks/2024-louboutin_06.webp", credits: "© [ChristianLouboutin]" }
    ]
  },
  {
    id: 2,
    title: "ReOpening of Notre-Dame",
    category: "VideoProjection / Mapping",
    year: "2024",
    speed: 0.35,
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
  },
   {
    id: 3,
    title: "OLYMPICS - PARIS 2024",
    category: "VideoProjection / Mapping",
    year: "2024",
    speed: 0.25,
    client: "Paris 2024",
    image: "/SelectedWorks/JO_2024_01.webp",
    videoUrl: "/SelectedWorks/JO_25S2.mp4",
    videoCredits: "[©Superbien Studio]",
    description: "During the Paris 2024 Olympic Games, I was in charge of the creative direction for five video-mappings projected onto the competition venues before the events. Working closely with the Paris 2024 teams, as well as teams of talented art directors and motion designers, we overcame the technical challenges posed by the bright colours of the fields of play and offered the audience a vibrant tribute to the art, sport and history of this extraordinary sporting event.",
    gallery: [  
      
      { type: "video", src: "/SelectedWorks/JO_2024_AbstractLines_01(1).mp4" }, 
      { type: "image", src: "/SelectedWorks/JO_2024_02.jpg.webp", credits: "© [Superbien Studio]" },
      { type: "image", src: "/SelectedWorks/JO_2024_03.jpg.webp", credits: "© [Superbien Studio]" },
      { type: "video", src: "/SelectedWorks/JO_2024_AbstractMovements_01(1).mp4" },
      { type: "image", src: "/SelectedWorks/JO_2024_06.webp" },
      { type: "image", src: "/SelectedWorks/JO_2024_12.webp" },
]
  },
  {
    id: 4,
    title: "LE FIGARO 200th ANNIVERSARY",
    category: "VideoProjection / Mapping",
    year: "2026",
    speed: 0.25,
    client: "Le Figaro",
    image: "/SelectedWorks/Grand_Palais.webp",
    videoUrl: "/SelectedWorks/FIGARO_20s.mp4",
    videoCredits: "[©Superbien Studio]",
    description: "1826–2026: 200 years of shared history between *Le Figaro* and France, celebrated at the Grand Palais in Paris, featuring two large-scale video-mapping displays on either side of the central nave. Two bespoke films, making the most of the venue’s incredible architecture, recounting on one side the production of the newspaper, and on the other the leading figures who have built Le Figaro’s reputation. I was in charge of artistic direction and creative direction, storyboarding, and overseeing the teams of motion designers.",
    gallery: [  

      { type: "video", src: "/SelectedWorks/FIGARO_COLETTE.mp4" }, 
      { type: "video", src: "/SelectedWorks/Figaro_Insitu_1.mp4", credits: "© [Jean-Pierre Sastre]" },
      { type: "image", src: "/SelectedWorks/FIGARO_01.webp", credits: "© [Jean-Pierre Sastre]" },
      { type: "image", src: "/SelectedWorks/FIGARO_03.webp", credits: "© [Superbien Studio]" },
      { type: "image", src: "/SelectedWorks/FIGARO_04.webp", credits: "© [Superbien Studio]" },
      { type: "image", src: "/SelectedWorks/FIGARO_05.webp", credits: "© [Superbien Studio]" },
      { type: "image", src: "/SelectedWorks/FIGARO_Storyboard.webp" },
      { type: "video", src: "/SelectedWorks/FIGARO_BALZAC.mp4" }

]
  }
];