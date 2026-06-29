// src/data/projects.ts

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  slug: string; // Pour l'URL de la page du projet (ex: /projects/paris-is-louboutining)
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    title: "Paris is Louboutining",
    category: "Video projection / Motion Design",
    year: "2024",
    image: "/SelectedWorks/2024-louboutin-04_Thb.webp",
    slug: "paris-is-louboutining"
  },
  {
    id: "2",
    title: "REopening Notre-Dame.",
    category: "Video projection",
    year: "2024",
    image: "/SelectedWorks/NOTRE-DAME-Thb.webp",
    slug: "autre-projet"
  },

  {
    id: "3",
    title: "Autre Projet3",
    category: "Immersive Installation",
    year: "2024",
    image: "/autre-projet.webp",
    slug: "autre-projet"
  },

  {
    id: "4",
    title: "Autre Projet4",
    category: "Immersive Installation",
    year: "2024",
    image: "/autre-projet.webp",
    slug: "autre-projet"
  },

  {
    id: "5",
    title: "Autre Projet5",
    category: "Immersive Installation",
    year: "2024",
    image: "/autre-projet.webp",
    slug: "autre-projet"
  },

  {
    id: "6",
    title: "Autre Projet6",
    category: "Immersive Installation",
    year: "2024",
    image: "/autre-projet.webp",
    slug: "autre-projet"
  },

  {
    id: "7",
    title: "Autre Projet",
    category: "Immersive Installation",
    year: "2024",
    image: "/autre-projet.webp",
    slug: "autre-projet"
  },

  {
    id: "8",
    title: "Autre Projet8",
    category: "Immersive Installation",
    year: "2024",
    image: "/autre-projet.webp",
    slug: "autre-projet"
  },
  {
    id: "9",
    title: "Autre Projet9",
    category: "Immersive Installation",
    year: "2024",
    image: "/autre-projet.webp",
    slug: "autre-projet"
  },
  {
    id: "10",
    title: "Autre Projet10",
    category: "Immersive Installation",
    year: "2024",
    image: "/autre-projet.webp",
    slug: "autre-projet"
  },
  // Tu pourras ajouter tous tes futurs projets ici...
];