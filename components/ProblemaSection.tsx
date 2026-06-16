import React from 'react';

const SectionMatrixBackground = React.lazy(() => import('./SectionMatrixBackground'));

const ProblemaSection = () => (
  <section id="problema" className="relative z-10 py-20 md:py-32 bg-brand-green overflow-hidden">
    <React.Suspense fallback={null}>
      <SectionMatrixBackground />
    </React.Suspense>
    <div className="container mx-auto max-w-6xl px-4">
      {/* Title — full width, centered */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-black select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
          Para quem é a<br/>
          <span className="inline-block bg-black text-brand-green px-6 py-2 transform -rotate-2 mt-4 shadow-[0_0_30px_rgba(0,0,0,0.3)] font-black">JORNADA SPRINT</span>
        </h2>
      </div>

      {/* Cards — stacked below */}
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        <div className="reveal reveal-delay-1 card-3d-hover card-highlight bg-black/90 p-8 rounded-2xl text-white shadow-xl border border-white/10 hover:border-brand-green/50 transition-colors duration-300 group">
          <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-brand-green transition-colors leading-tight">Você ainda responde cada mensagem <span className="text-brand-green underline decoration-brand-green/30">no braço</span> — quando poderia ter um assistente que atende, qualifica e responde por você.</h3>
          <p className="text-slate-400 leading-relaxed text-base md:text-lg">Você vai criar seu próprio GPT customizado ou Gem no Gemini — treinado com o seu contexto, atendendo, qualificando e respondendo por você. Enquanto você dorme, ele trabalha. Não é ficção. É a Jornada 01 do Sprint.</p>
        </div>
        <div className="reveal reveal-delay-2 card-3d-hover card-highlight bg-black/90 p-8 rounded-2xl text-white shadow-xl border border-white/10 hover:border-brand-green/50 transition-colors duration-300 group">
          <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-brand-green transition-colors leading-tight">Sua <span className="text-brand-green underline decoration-brand-green/30">imagem digital</span> decide se confiam em você antes do primeiro contato — e hoje ela está te deixando na média.</h3>
          <p className="text-slate-400 leading-relaxed text-base md:text-lg">Vídeos profissionais, imagens que constroem autoridade, conteúdo que posiciona. Tudo com IA, sem fotógrafo, sem editor, sem custo. Você cria em minutos o que levaria dias — e sua presença digital passa a trabalhar por você 24h.</p>
        </div>
        <div className="reveal reveal-delay-3 card-3d-hover card-highlight bg-black/90 p-8 rounded-2xl text-white shadow-xl border border-white/10 hover:border-brand-green/50 transition-colors duration-300 group">
          <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-brand-green transition-colors leading-tight">Você depende de <span className="text-brand-green underline decoration-brand-green/30">agência, editor e dev</span> pra tudo — paga caro, espera demais e fica refém de prazo dos outros.</h3>
          <p className="text-slate-400 leading-relaxed text-base md:text-lg">Site de alta conversão no ar em 2 horas. Sistemas criados com IA que geram resultado real. Campanhas, automações, ferramentas — tudo nas suas mãos. Sem agência, sem desenvolvedor, sem esperar. Você assume o controle.</p>
        </div>
      </div>
    </div>
  </section>
);

export default ProblemaSection;
