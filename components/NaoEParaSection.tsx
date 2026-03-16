import React, { useState, useEffect } from 'react';

const SectionMatrixBackground = React.lazy(() => import('./SectionMatrixBackground'));

const personas = [
  "Quem quer apenas 'dar uma olhada' na IA — sem compromisso de transformar sua operação",
  "Quem busca atalho mágico e não está disposto a construir um método real por 12 meses",
  "Quem acredita que a IA faz tudo sozinha — sem o diferencial humano, sem estratégia, sem resultado real",
  "Quem quer uma ferramenta isolada, sem método, sem contexto e sem impacto no resultado",
  "Quem começa com entusiasmo mas abandona no primeiro obstáculo"
];

const NaoEParaSection = () => {
  const [currentPersonaIndex, setCurrentPersonaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPersonaIndex((prev) => (prev + 1) % personas.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="naoepara" className="relative py-12 md:py-16 bg-brand-green overflow-hidden">
      <React.Suspense fallback={null}>
        <SectionMatrixBackground />
      </React.Suspense>
      <div className="container mx-auto max-w-4xl text-center px-4 relative z-10">
        <div className="relative inline-block mb-8">
           <h2 className="relative z-10 font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter text-black drop-shadow-sm">
             Este Caminho <br className="md:hidden" />
             <span className="relative inline-block mx-3">
               <span className="absolute inset-0 bg-black transform -skew-x-12 shadow-[0_0_20px_rgba(0,0,0,0.3)]"></span>
               <span className="relative text-brand-green px-4 py-1">NÃO</span>
             </span> <br className="md:hidden" />
             é para...
           </h2>
        </div>
        <div className="bg-black/90 backdrop-blur-md p-10 md:p-16 rounded-[40px] border border-white/10 min-h-[220px] flex items-center justify-center relative shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/[0.1] to-transparent pointer-events-none"></div>
          <p key={currentPersonaIndex} className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-200 animate-fade-in leading-snug tracking-tight italic drop-shadow-lg">
            "{personas[currentPersonaIndex]}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default NaoEParaSection;
