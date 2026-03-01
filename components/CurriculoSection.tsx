import React, { useState } from 'react';
import MatrixVideoBackground from './MatrixVideoBackground';
import { Bot, Navigation, Video, BrainCircuit, Globe, ImageIcon, ChevronDown, Rocket, Code2 } from 'lucide-react';

const jornadas = [
  {
    number: '00',
    Icon: Rocket,
    title: 'IA do Zero',
    destaque: 'Para quem nunca acessou uma ferramenta de IA',
    antes: 'Sem saber por onde começar. Ouvindo falar de IA em todo lugar, mas sem coragem de abrir o primeiro prompt.',
    depois: 'Do zero absoluto ao uso fluente das principais ferramentas de IA — ChatGPT, Gemini, Claude e mais — com confiança total.',
  },
  {
    number: '01',
    Icon: Bot,
    title: 'Assistentes de IA',
    destaque: 'Crie seu Gem ou GPT personalizado',
    antes: 'Perde tempo em tarefas repetitivas. Sem assistente especializado no próprio negócio.',
    depois: 'Seu próprio Gem no Gemini ou GPT customizado no ChatGPT — treinado com o seu contexto, trabalhando por você enquanto você foca nos resultados.',
  },
  {
    number: '02',
    Icon: Navigation,
    title: 'Navegadores de IA',
    destaque: 'Inteligência de mercado em tempo real',
    antes: 'Horas pesquisando imóveis sem dados reais, tomando decisão no escuro, sem vantagem competitiva.',
    depois: 'IA varre o mercado em minutos, entrega dados ocultos da concorrência, você decide com informação real.',
  },
  {
    number: '03',
    Icon: Video,
    title: 'Criando Vídeos com IA',
    destaque: 'Produção visual profissional sem custo',
    antes: 'Sem verba para fotógrafo ou editor. Fotos amadoras que fazem o imóvel parecer menor do que é.',
    depois: 'Vídeos cinematográficos e imagens que fazem o lead sentir o apartamento antes de entrar — em minutos.',
  },
  {
    number: '04',
    Icon: BrainCircuit,
    title: 'Especialistas de IA',
    destaque: 'Produtividade 10x — prompts que convertem',
    antes: 'Usando IA de forma superficial, sem prompts certos, sem consistência, sem resultado profissional.',
    depois: 'Domínio avançado de prompts e workflows de IA que multiplicam sua produtividade 10x.',
  },
  {
    number: '05',
    Icon: Globe,
    title: 'Criando Sites com IA',
    destaque: 'Do zero ao online em menos de 2 horas',
    antes: 'Sem presença digital própria. Dependendo de agência, pagando caro, esperando semanas para qualquer mudança.',
    depois: 'Site profissional de alta conversão no ar em 2 horas, totalmente seu, sem custo mensal.',
  },
  {
    number: '06',
    Icon: ImageIcon,
    title: 'Imagens com IA',
    destaque: 'Identidade visual única que vende',
    antes: 'Imagens genéricas sem identidade. Perdendo para concorrentes com material visual profissional.',
    depois: 'Imagens únicas que constroem sua marca, diferenciam seu trabalho e aumentam percepção de valor imediatamente.',
  },
  {
    number: '07',
    Icon: Code2,
    title: 'Criando Sistemas com IA',
    destaque: 'Nível avançado — sistemas reais com Claude Code',
    antes: 'Dependendo de desenvolvedores para tudo. Pagando caro por automações simples. Sem autonomia para criar.',
    depois: 'Criando sistemas funcionais com o Claude Code — automações, ferramentas e soluções que geram valor real. Aula avançada para quem quer ir além.',
  },
];

const CurriculoSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="curriculo" className="relative py-24 md:py-32 overflow-hidden border-t border-brand-green/10">
      <MatrixVideoBackground />
      <div className="container mx-auto max-w-4xl px-4 relative z-10">

        <div className="reveal text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs mb-6 badge-pulse">
            O que você vai dominar
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
            8 Jornadas.<br />
            <span className="text-brand-green">8 Transformações.</span>
          </h2>
          <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
            Cada jornada entrega um resultado concreto. Você não sai com teoria — sai com algo funcionando.
          </p>
        </div>

        <div className="space-y-3">
          {jornadas.map((jornada, i) => {
            const isOpen = openIndex === i;
            const delayClass = i < 6 ? `reveal-delay-${i + 1}` : '';
            return (
              <div
                key={i}
                className={`reveal ${delayClass} border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen
                    ? 'bg-white/5 border-brand-green/40 shadow-[0_0_24px_rgba(34,197,94,0.1)]'
                    : 'bg-black/40 border-white/10 hover:border-brand-green/25'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left focus:outline-none"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-brand-green text-black' : 'bg-black/60 border border-white/10 text-brand-green'}`}>
                    <jornada.Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-slate-600 text-xs font-black tracking-widest">JORNADA {jornada.number}</span>
                      <span className={`font-black text-lg transition-colors ${isOpen ? 'text-brand-green' : 'text-white'}`}>
                        {jornada.title}
                      </span>
                    </div>
                    {!isOpen && (
                      <p className="text-slate-500 text-sm mt-0.5 truncate">{jornada.destaque}</p>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-brand-green' : ''}`} />
                </button>

                <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 grid md:grid-cols-2 gap-4">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-2">❌ Antes</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{jornada.antes}</p>
                    </div>
                    <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4">
                      <p className="text-brand-green text-xs font-black uppercase tracking-widest mb-2">✓ Depois</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{jornada.depois}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-slate-600 font-bold text-sm uppercase tracking-widest mt-10">
          Tudo em 12 meses de acesso total — no seu ritmo, quando quiser
        </p>

      </div>
    </section>
  );
};

export default CurriculoSection;
