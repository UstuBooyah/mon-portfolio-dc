export default function Home() {
  // 1. On définit la liste de vos projets
  const projects = [
    { 
      id: 1, 
      title: "Identity Design", 
      category: "Branding", 
      video: "/projet1.mp4" // Le nom de votre fichier dans le dossier public
    },
    { 
      id: 2, 
      title: "Digital Experience", 
      category: "Web/UI", 
      video: "/projet1.mp4" 
    },
  ];

  return (
    <main className="min-h-screen bg-white p-8">
      {/* Votre Header (Titre du site) */}
      <header className="mb-24">
        <h1 className="text-6xl font-bold tracking-tighter uppercase">Portfolio</h1>
      </header>

      {/* C'EST ÇA LE "BLOC PROJETS" : LA GRILLE CI-DESSOUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <div key={project.id} className="group cursor-pointer">
            
            {/* Conteneur de la vidéo */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
              <video 
                src={project.video} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
              />
            </div>

            {/* Infos du projet */}
            <div className="flex justify-between items-baseline">
              <h3 className="text-2xl font-medium tracking-tight uppercase italic group-hover:not-italic transition-all">
                {project.title}
              </h3>
              <span className="text-xs uppercase tracking-widest text-gray-400">
                {project.category}
              </span>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}