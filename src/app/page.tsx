export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col justify-between p-6 md:p-12">
      {/* Navigation discrète en haut */}
      <nav className="flex justify-between w-full uppercase text-xs tracking-widest font-medium">
        <span>Portfolio 2026</span>
        <div className="space-x-8">
          <a href="#" className="hover:opacity-50 transition-opacity">Projets</a>
          <a href="#" className="hover:opacity-50 transition-opacity">À propos</a>
        </div>
      </nav>

      {/* Titre Central Inspiré de T11 */}
      <div className="w-full">
        <h1 className="text-[15vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase mb-4">
          Creative<br />Director
        </h1>
      </div>

      {/* Footer minimaliste */}
      <div className="flex justify-between items-end w-full">
        <p className="max-w-[300px] text-sm leading-relaxed text-gray-500">
          Basé à Paris. Spécialisé dans l'identité visuelle et les expériences numériques.
        </p>
        <div className="text-right">
          <span className="block text-xs uppercase tracking-widest text-gray-400">Scroll pour explorer</span>
          <div className="h-12 w-[1px] bg-black dark:bg-white inline-block mt-2"></div>
        </div>
      </div>
    </main>
  );
}