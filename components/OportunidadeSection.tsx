import React from 'react';
import { ArrowDown } from 'lucide-react';

const MatrixVideoBackground = React.lazy(() => import('./MatrixVideoBackground'));

const OportunidadeSection = () => (
  <section id="oportunidade" className="relative py-12 md:py-16 overflow-hidden border-t border-brand-green/10">
    <React.Suspense fallback={null}>
      <MatrixVideoBackground />
    </React.Suspense>
    <div className="container mx-auto max-w-4xl px-4 relative z-10">
      <div className="reveal space-y-8 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
          Eu também estava <span className="text-brand-green">no seu lugar.</span>
        </h2>

        <div className="space-y-6 text-slate-300 text-lg md:text-xl leading-relaxed text-left">
          <p>
            Há 3 anos, eu era apenas um vendedor comum. Sem equipe técnica, sem conhecimento de programação, sem ideia de como a Inteligência Artificial poderia mudar alguma coisa na minha vida.
          </p>
          <p>
            Até que eu decidi parar de assistir e <span className="text-white font-bold">começar a testar.</span>
          </p>
          <p>
            Comecei criando assistentes simples para automatizar meu atendimento. Depois aprendi a fazer sites. Depois vídeos. Depois sistemas inteiros. Tudo com IA.
          </p>
          <p className="text-white font-bold text-xl md:text-2xl text-center py-4">
            Em menos de 2 anos, construí mais de <span className="text-brand-green">R$ 1 milhão em sistemas e soluções com IA</span> — para mim e para clientes.
          </p>
          <p>
            Não porque eu sou gênio. Mas porque eu entendi que quem domina IA agora vai ter uma vantagem que ninguém consegue copiar depois.
          </p>
          <p>
            A Jornada Sprint é o caminho que eu queria ter tido quando comecei. Tudo o que aprendi, estruturado, prático e direto ao ponto.
          </p>
        </div>

        <div className="pt-4">
          <a
            href="#curriculo"
            className="inline-flex items-center gap-3 bg-brand-green/10 border border-brand-green/30 text-brand-green font-black text-lg px-8 py-4 rounded-2xl hover:bg-brand-green/20 transition-all group"
          >
            Ver o que você vai aprender
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default OportunidadeSection;
