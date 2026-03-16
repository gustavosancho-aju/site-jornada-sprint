import React, { useEffect, useRef } from 'react';
import { BrainCircuit, CheckCircle, CircuitBoard, Radio, UserCheck, Zap } from 'lucide-react';
import FuturisticIcon from './FuturisticIcon';

const SectionMatrixBackground = React.lazy(() => import('./SectionMatrixBackground'));

interface OfertaSectionProps {
  onCheckout: () => void;
}

const OfertaSection = ({ onCheckout }: OfertaSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Meta Pixel — ViewContent event when oferta section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (typeof window.fbq === 'function') {
            window.fbq('track', 'ViewContent', {
              content_name: 'Jornada Sprint IA — Oferta',
              content_category: 'Course',
              currency: 'BRL',
              value: 297.00,
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
  <section ref={sectionRef} id="oferta" className="relative py-12 md:py-16 overflow-hidden bg-brand-green">
    <React.Suspense fallback={null}>
      <SectionMatrixBackground />
    </React.Suspense>
    <div className="container mx-auto max-w-6xl px-4 relative z-10">
      <div className="text-center mb-20">
        <div aria-hidden="true" className="font-heading text-5xl md:text-7xl lg:text-9xl font-black text-black uppercase tracking-tighter mb-4 opacity-10 absolute -top-10 left-1/2 -translate-x-1/2 w-full select-none">
          OFERTA ÚNICA
        </div>
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tighter relative z-10 drop-shadow-sm">
          JORNADA <span className="text-white bg-black px-4 py-1 transform -skew-x-12 inline-block">SPRINT</span>
        </h2>
        <p className="text-black/80 text-lg md:text-xl font-bold uppercase tracking-[0.2em] mt-6 drop-shadow-sm">O que você está recebendo</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-20 pt-6">
        <div className="reveal reveal-delay-1 card-3d-hover card-highlight bg-black/90 backdrop-blur-md border border-white/10 p-10 rounded-[40px] flex flex-col hover:border-brand-green/40 transition-colors group shadow-2xl">
          <div className="bg-black w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand-green/20 group-hover:text-brand-green transition-all duration-500">
            <FuturisticIcon>
              <BrainCircuit className="w-8 h-8" />
            </FuturisticIcon>
          </div>
          <h3 className="text-2xl font-black text-brand-green uppercase tracking-tight mb-4 leading-tight">
            IMERSÕES SPRINT
          </h3>
          <div className="text-slate-400 text-base leading-relaxed mb-10 flex-1 space-y-4 font-medium">
            <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-green" /> Jornada IA do Zero <span className="text-xs bg-brand-green/20 text-brand-green px-2 py-0.5 rounded-full font-black ml-1">NOVO</span></p>
            <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-green" /> Jornada Assistentes de IA <span className="text-xs text-slate-600">(Gems & GPTs)</span></p>
            <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-green" /> Jornada Navegadores de IA</p>
            <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-green" /> Jornada Criando Vídeos com IA</p>
            <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-green" /> Jornada Especialistas de IA</p>
            <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-green" /> Jornada Criando Sites com IA</p>
            <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-green" /> Jornada Imagens com IA</p>
            <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-green" /> Jornada Criando Sistemas com IA <span className="text-xs bg-brand-green/20 text-brand-green px-2 py-0.5 rounded-full font-black ml-1">NOVO</span></p>
          </div>
          <div className="pt-8 border-t border-white/10">
            <span className="text-xs font-black text-slate-600 uppercase tracking-widest block mb-2">Valor Individual</span>
            <span className="text-4xl font-black text-white">R$ 1.497,00</span>
          </div>
        </div>

        <div className="reveal reveal-delay-2 card-3d-hover card-highlight bg-black/90 backdrop-blur-md border-2 border-brand-green p-10 rounded-[40px] flex flex-col hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all group relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-black text-sm font-black px-6 py-2 rounded-full z-10 shadow-lg uppercase">HUB PREMIUM</div>
          <div className="bg-brand-green/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-brand-green group-hover:scale-110 transition-transform duration-500 border border-brand-green/20">
            <FuturisticIcon>
              <CircuitBoard className="w-8 h-8" />
            </FuturisticIcon>
          </div>
          <h3 className="text-2xl font-black text-brand-green uppercase tracking-tight mb-4 leading-tight">
            HUB de Soluções com IA
          </h3>
          <div className="text-slate-400 text-sm leading-tight mb-10 flex-1 space-y-3 font-semibold">
            <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-green/60 shrink-0 mt-0.5" /> Especialista em tráfego pago (Google ADS)</p>
            <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-green/60 shrink-0 mt-0.5" /> Especialista em Instagram para experts</p>
            <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-green/60 shrink-0 mt-0.5" /> Especialista em vendas H2H</p>
            <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-green/60 shrink-0 mt-0.5" /> Especialista em vídeos cinematográficos</p>
            <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-green/60 shrink-0 mt-0.5" /> Especialista em autoridade no Linkedin</p>
            <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-green/60 shrink-0 mt-0.5" /> Especialista em imagens com IA</p>
          </div>
          <div className="pt-8 border-t border-white/10">
            <span className="text-xs font-black text-slate-600 uppercase tracking-widest block mb-2">Valor Individual</span>
            <span className="text-4xl font-black text-white">R$ 997,00</span>
          </div>
        </div>

        <div className="reveal reveal-delay-3 card-3d-hover card-highlight bg-black/90 backdrop-blur-md border border-white/10 p-10 rounded-[40px] flex flex-col hover:border-brand-green/40 transition-colors group shadow-2xl">
          <div className="bg-black w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand-green/20 group-hover:text-brand-green transition-all duration-500">
            <FuturisticIcon>
              <Radio className="w-8 h-8" />
            </FuturisticIcon>
          </div>
          <h3 className="text-2xl font-black text-brand-green uppercase tracking-tight mb-4 leading-tight">
            Grupo Exclusivo
          </h3>
          <p className="text-slate-400 text-base leading-relaxed mb-10 flex-1 font-medium">
            Comunidade de profissionais que já entenderam que IA é vantagem competitiva. Tire dúvidas, compartilhe resultados e evolua junto com quem está na mesma jornada — sem julgamento, com estratégia.
          </p>
          <div className="pt-8 border-t border-white/10">
            <span className="text-xs font-black text-slate-600 uppercase tracking-widest block mb-2">Acesso Especial</span>
            <span className="text-3xl font-black text-white">Networking Elite</span>
          </div>
        </div>
      </div>

      {/* Mentoria 1:1 Bonus Card — full-width */}
      <div className="reveal reveal-delay-4 card-3d-hover card-highlight bg-black/90 backdrop-blur-md border-2 border-brand-green/50 p-10 rounded-[40px] flex flex-col hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all group relative shadow-2xl mb-20">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-black text-sm font-black px-6 py-2 rounded-full z-10 shadow-lg uppercase">
          🎁 Bônus Exclusivo
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-3xl bg-brand-green/10 border-2 border-brand-green/30 flex items-center justify-center">
              <UserCheck className="w-10 h-10 text-brand-green" />
            </div>
          </div>
          <div className="flex-1 min-w-0 text-center md:text-left">
            <h3 className="text-2xl font-black text-brand-green uppercase tracking-tight mb-2">
              Mentoria Individual 1:1
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Sessão individual gravada para tirar seu projeto de IA do papel.
              Direcionamento personalizado, no seu contexto, no seu ritmo.
            </p>
          </div>
          <div className="flex-shrink-0 text-center">
            <p className="text-slate-600 text-xs font-black uppercase tracking-widest mb-1">Valor separado</p>
            <p className="text-slate-500 text-xl font-black line-through">R$ 497</p>
            <p className="text-brand-green font-black text-lg">GRÁTIS</p>
          </div>
        </div>
      </div>

      {/* Lives Mensais — Destaque */}
      <div className="max-w-4xl mx-auto mb-16 bg-black/80 border-2 border-brand-green/40 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.1)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent" />
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-brand-green rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <Radio className="w-10 h-10 text-black" />
            </div>
            <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full" />
              AO VIVO
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              Lives Mensais de Atualização
            </h3>
            <p className="text-slate-400 leading-relaxed text-base md:text-lg">
              A IA evolui todo mês — e nossas lives acompanham. Todo mês, um encontro ao vivo com conteúdo novo, ferramentas atualizadas e estratégias que estão funcionando agora. Você nunca fica para trás.
            </p>
            <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
              <span className="flex items-center gap-2 text-brand-green text-sm font-bold"><CheckCircle className="w-4 h-4" /> Conteúdo sempre atualizado</span>
              <span className="flex items-center gap-2 text-brand-green text-sm font-bold"><CheckCircle className="w-4 h-4" /> Acesso ao replay</span>
              <span className="flex items-center gap-2 text-brand-green text-sm font-bold"><CheckCircle className="w-4 h-4" /> Q&A ao vivo com Gustavo</span>
            </div>
          </div>
          <div className="flex-shrink-0 text-center">
            <p className="text-slate-600 text-xs font-black uppercase tracking-widest mb-1">Incluído no plano</p>
            <p className="text-brand-green text-3xl font-black">✦</p>
            <p className="text-white font-black text-lg">12 meses</p>
          </div>
        </div>
      </div>

      <div id="investimento" className="reveal max-w-3xl mx-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-[40px] p-6 md:p-20 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 left-0 w-full h-3 bg-brand-green shadow-[0_0_20px_rgba(34,197,94,0.6)]"></div>
        <div className="mb-10">
          <p className="text-slate-500 uppercase tracking-[0.4em] text-sm mb-6 font-black">12 Meses de Transformação Real</p>
          <div className="relative inline-block">
            <span className="text-5xl md:text-7xl font-black text-slate-700 opacity-40 italic tracking-tighter">R$ 997,00</span>
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-red-600/80 -rotate-6 shadow-lg"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 mb-12">
          <p className="text-brand-green font-black text-xl uppercase tracking-widest mb-4 drop-shadow-md">Investimento de Lançamento</p>
          <div className="flex flex-col items-center justify-center gap-0">
            <span className="text-xl md:text-3xl font-black text-white/40 uppercase italic tracking-widest">12x de</span>
            <div className="text-7xl md:text-[10rem] font-black text-brand-green tracking-tighter leading-none flex items-baseline drop-shadow-xl">
              <span className="text-4xl md:text-6xl mr-2">R$</span>29,70
            </div>
          </div>
          <p className="mt-4 text-slate-500 text-sm md:text-base font-bold">ou R$ 297,00 à vista</p>
          <p className="text-brand-green/50 text-xs mt-1 uppercase tracking-[0.3em] font-black">Um ano inteiro de acesso, evolução e resultados reais</p>
        </div>

        <button onClick={onCheckout} className="btn-shine w-full bg-brand-green text-black font-black text-lg md:text-xl py-6 md:py-8 px-8 md:px-12 rounded-3xl hover:bg-brand-green/90 hover:scale-[1.03] transition-all shadow-[0_0_50px_rgba(34,197,94,0.5)] flex items-center justify-center gap-4 mx-auto group active:scale-95 duration-200 glow-pulse">
          <Zap className="w-8 h-8 md:w-10 md:h-10 fill-black group-hover:scale-125 transition-transform" />
          Garantir Minha Vaga
        </button>
        <p className="mt-10 text-xs text-slate-600 uppercase tracking-[0.4em] font-black">Garantia de 7 dias. Pagamento seguro via InfinitePay.</p>
      </div>
    </div>
  </section>
  );
};

export default OfertaSection;
