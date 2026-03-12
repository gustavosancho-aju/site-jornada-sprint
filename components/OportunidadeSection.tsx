import React from 'react';
import { Cpu, Compass, Bitcoin } from 'lucide-react';
import FuturisticIcon from './FuturisticIcon';

const MatrixVideoBackground = React.lazy(() => import('./MatrixVideoBackground'));

const OportunidadeSection = () => (
  <section id="oportunidade" className="relative py-20 md:py-32 overflow-hidden border-t border-brand-green/10">
    <React.Suspense fallback={null}>
      <MatrixVideoBackground />
    </React.Suspense>
    <div className="container mx-auto max-w-6xl px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

        <div className="reveal reveal-delay-1 card-3d-hover card-highlight glass-card rounded-3xl overflow-hidden border border-white/10 group hover:border-brand-green/50 transition-colors duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] flex flex-col scanline-premium relative">
          <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-black/20">
            <FuturisticIcon>
              <Cpu className="w-24 h-24 text-brand-green animate-glitch" />
            </FuturisticIcon>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              Se eu tivesse comprado <span className="text-brand-green">ações da Apple</span> em 1976...
            </h3>
          </div>
        </div>

        <div className="reveal reveal-delay-2 card-3d-hover card-highlight glass-card rounded-3xl overflow-hidden border border-white/10 group hover:border-brand-green/50 transition-colors duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] flex flex-col scanline-premium relative">
          <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-black/20">
            <FuturisticIcon>
              <Compass className="w-24 h-24 text-brand-green animate-flicker" />
            </FuturisticIcon>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              Se eu tivesse comprado <span className="text-brand-green">aquele terreno</span> em 2005...
            </h3>
          </div>
        </div>

        <div className="reveal reveal-delay-3 card-3d-hover card-highlight glass-card rounded-3xl overflow-hidden border border-white/10 group hover:border-brand-green/50 transition-colors duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] flex flex-col scanline-premium relative">
          <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-black/20">
            <FuturisticIcon>
              <Bitcoin className="w-24 h-24 text-brand-green animate-glitch" />
            </FuturisticIcon>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              Se eu tivesse comprado <span className="text-brand-green">Bitcoin</span> há 10 anos...
            </h3>
          </div>
        </div>

      </div>

      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-xl">
          Cada uma dessas oportunidades foi visível — <span className="text-brand-green">para quem estava presente</span> no momento certo. <br/>
          A IA está acontecendo agora. E você está aqui.
        </h2>
      </div>
    </div>
  </section>
);

export default OportunidadeSection;
