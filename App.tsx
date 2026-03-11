
import React, { useState, useEffect, useRef } from 'react';
import MatrixGlitterBackground from './components/MatrixGlitterBackground';
import SectionMatrixBackground from './components/SectionMatrixBackground';
import MatrixVideoBackground from './components/MatrixVideoBackground';
import FAQSection from './components/FAQSection';
import BenefitItem from './components/BenefitItem';
import SocialProofBar from './components/SocialProofBar';
import AutoridadeSection from './components/AutoridadeSection';
import ParaQuemESection from './components/ParaQuemESection';
import CurriculoSection from './components/CurriculoSection';
import ResultadosReaisSection from './components/ResultadosReaisSection';
import GarantiaSection from './components/GarantiaSection';
import UrgenciaSection from './components/UrgenciaSection';
import StickyMobileCTA from './components/StickyMobileCTA';
import { MessageCircle, CheckCircle, Lock, Award, TrendingUp, Menu, X, Bot, Users, Zap, Quote, Calendar, Target, ShieldCheck, Video, Layout, Sparkles, ArrowRight, Bitcoin, Pause, Play, ChevronLeft, ChevronRight, Cpu, Compass, BrainCircuit, CircuitBoard, Radio } from 'lucide-react';

const FuturisticIcon = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-brand-green/20 blur-xl rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 animate-flicker matrix-glow">
      {children}
    </div>
  </div>
);

function App() {
  const [currentPersonaIndex, setCurrentPersonaIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const checkoutUrl = "https://loja.infinitepay.io/gsancho/xal5576-sprint-corretor-haih";

  const personas = [
    "Quem quer apenas 'dar uma olhada' na IA — sem compromisso de transformar sua operação",
    "Quem busca atalho mágico e não está disposto a construir um método real por 12 meses",
    "Quem acredita que a IA faz tudo sozinha — sem o diferencial humano, sem estratégia, sem resultado real",
    "Quem quer uma ferramenta isolada, sem método, sem contexto e sem impacto no resultado",
    "Quem começa com entusiasmo mas abandona no primeiro obstáculo"
  ];

  const testimonials = [
    {
      name: "Marinilza Palhares",
      role: "Mentorada Sprint 001",
      text: "Primeiro quero agradecer a aula maravilhosa que tive hj, realmente não estava esperando tanto, não só tirei dúvidas como aprendi muito. Valeu demais a mentoria 🙏"
    },
    {
      name: "Kiraz Consultora",
      role: "Mentorada Sprint 001",
      text: "Ah eu também quero agradecer. Muitas anotações, muito aprendizado e já vou colocar tudo em prática. Foi ótimo Gustavo! ☺️ 👏"
    },
    {
      name: "Fernanda Albuquerque",
      role: "Mentorada Sprint 001",
      text: "Gente, encontro riquíssimo de conteúdo. Parabéns @Gustavo Sancho por ser esse profissional incrível e por dividir seu conteúdo conosco. 👊"
    },
    {
      name: "Raphael Calabria",
      role: "Mentorado Sprint 001",
      text: "Craque! Agradeço a Gustavo pela mentoria e por abrir minha mente para outros projetos! Obrigado!! Em frente. Parabéns! 👏"
    },
    {
      name: "Luiz",
      role: "Mentorado Sprint 002",
      text: "Hoje realmente foi um divisor de águas. E olhe que já trabalho com IA ein?! Parabéns Sancho! 🙏"
    },
     {
      name: "Tamiles Bortoletto",
      role: "Mentorada Sprint 002",
      text: "Feedback: SURREALLLLLLLL 🚀🚀🚀🚀🚀🚀🚀🚀 Dediquei alguns minutos para interagir com os assistentes e é surreal demais demais demais !!!! Com tudo que vc já ensinou eu fiquei procrastinando em como iniciar meu assistente de Linkedin ! Esse é pronto, rápido, em minutos falei de mim e ele ajustou a linguagem ! Sensacional demais !!!!!"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPersonaIndex((prev) => (prev + 1) % personas.length);
    }, 3500);
    
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > window.innerHeight * 0.8);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const singleSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = singleSetWidth;
    }
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    const INTERVAL_MS = 30;

    const tick = (now: number) => {
      if (now - lastTime >= INTERVAL_MS) {
        if (scrollRef.current && !isPausedRef.current) {
          scrollRef.current.scrollLeft += 1;
          const singleSetWidth = scrollRef.current.scrollWidth / 3;
          if (scrollRef.current.scrollLeft >= singleSetWidth * 2) {
            scrollRef.current.scrollLeft = singleSetWidth;
          }
        }
        lastTime = now;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleCheckout = () => {
    const width = 500;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(checkoutUrl, 'PagamentoSprintIA', `width=${width},height=${height},left=${left},top=${top},toolbar=0,scrollbars=1,status=0,resizable=1,location=1,menubar=0`);
    if (!popup) window.location.href = checkoutUrl;
  };

  const handleStartJourney = () => {
    const investmentSection = document.getElementById('investimento');
    if (investmentSection) {
      investmentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const manualScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    setIsPaused(true);
    const container = scrollRef.current;
    const cardWidth = 482; 
    const singleSetWidth = container.scrollWidth / 3;

    if (direction === 'left') {
      if (container.scrollLeft <= 50) {
        container.scrollLeft = singleSetWidth * 2;
      }
      container.scrollTo({
        left: container.scrollLeft - cardWidth,
        behavior: 'smooth'
      });
    } else {
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 50)) {
        container.scrollLeft = singleSetWidth;
      }
      container.scrollTo({
        left: container.scrollLeft + cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-black min-h-screen text-white overflow-x-hidden font-body selection:bg-brand-green selection:text-black">
      {/* Global Background */}
      <MatrixGlitterBackground />
      
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform ${isHeaderSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-black/80 backdrop-blur-xl border-b border-white/10 py-4 px-6">
          <div className="container mx-auto max-w-7xl flex items-center justify-between">
            <div className="font-black text-brand-green tracking-tighter text-2xl flex items-center gap-2">
              SPRINT <span className="text-white">IA</span>
            </div>
            
            <nav className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#hero" className="hover:text-brand-green transition-colors">Início</a>
              <a href="#para-quem-e" className="hover:text-brand-green transition-colors">Para Quem?</a>
              <a href="#curriculo" className="hover:text-brand-green transition-colors">Jornadas</a>
              <a href="#depoimentos" className="hover:text-brand-green transition-colors">Depoimentos</a>
              <a href="#oferta" className="hover:text-brand-green transition-colors">Oferta</a>
              <a href="#faq" className="hover:text-brand-green transition-colors">Dúvidas</a>
            </nav>

            <button onClick={handleCheckout} className="bg-brand-green text-black text-xs font-black uppercase px-6 py-2.5 rounded-full hover:bg-brand-green/80 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              Garantir Minha Vaga
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <MatrixVideoBackground />
          
          <div className="flex-1 container mx-auto max-w-7xl px-4 relative z-20 flex items-start pt-4 md:pt-8">
            <div className="grid lg:grid-cols-2 gap-12 w-full items-start">
              
              <div className="flex flex-col justify-center space-y-6 sm:space-y-8 text-center lg:text-left py-6 sm:py-12 lg:py-0">
                {/* Badge premium */}
                <div className="flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green font-black uppercase tracking-widest text-xs badge-pulse">
                    <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                    Sprint 003 — Vagas Abertas
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] uppercase tracking-tight">
                    JORNADA
                  </h1>
                  <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] uppercase tracking-tight text-shimmer drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                    SPRINT
                  </h1>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl md:text-4xl text-slate-100 font-bold leading-tight max-w-2xl mx-auto lg:mx-0 drop-shadow-lg">
                    Do zero ao domínio da IA — o método que transforma profissionais em geradores de resultado real
                  </h2>
                  <p className="text-base md:text-xl text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
                    A IA não vai substituir profissionais. Mas vai substituir profissionais que não sabem usá-la. Em 12 meses, você vai ter a ferramenta mais poderosa do mundo trabalhando por você.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start items-center">
                  <button onClick={handleStartJourney} className="btn-shine bg-brand-green text-black font-black py-5 px-10 rounded-xl hover:bg-brand-green/90 transition w-full sm:w-auto flex items-center justify-center gap-3 text-xl shadow-[0_0_40px_rgba(34,197,94,0.45)] transform hover:-translate-y-1 active:scale-95 duration-200 uppercase tracking-wider group glow-pulse">
                    <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center group-hover:rotate-90 transition-transform">
                       <Target className="w-5 h-5" />
                    </div>
                    Iniciar minha jornada
                  </button>
                </div>

              </div>

              <div className="relative flex justify-center lg:justify-end items-end self-stretch h-full min-h-[35vh] sm:min-h-[50vh] lg:min-h-auto lg:row-span-2 overflow-hidden">
                {/* Ambient orbs */}
                <div className="orb-green absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[70%] pointer-events-none" style={{background: 'radial-gradient(ellipse, rgba(34,197,94,0.18) 0%, transparent 70%)', filter: 'blur(50px)'}}></div>
                <div className="orb-green absolute top-1/4 right-0 w-48 h-48 pointer-events-none float-slow" style={{background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)', filter: 'blur(40px)', opacity: 0.25}}></div>
                <div className="orb-green absolute top-1/2 left-0 w-32 h-32 pointer-events-none float-slow-d2" style={{background: 'radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)', filter: 'blur(30px)', opacity: 0.2}}></div>

                <div className="absolute inset-0 flex items-end justify-center z-40">
                   <img
                    src="https://res.cloudinary.com/dbbpxrebg/image/upload/e_background_removal/e_background_removal/f_webp/cs_srgb/q_auto:best/dpr_1/Generated_Image_March_01_2026_-_4_00PM_kydwnk"
                    alt="Gustavo Sancho IA Specialist"
                    className="h-full w-auto max-w-none object-contain block hero-float origin-bottom"
                    style={{ marginBottom: '-1px' }}
                    fetchPriority="high"
                    loading="eager"
                   />
                </div>
              </div>

              {/* Hero Stats — 3rd grid child: mobile: below image; desktop: col1/row2 */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-sm mx-auto lg:mx-0 lg:col-start-1">
                <div className="text-center">
                  <div className="text-2xl font-black text-brand-green stat-glow">+200</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Profissionais</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-2xl font-black text-brand-green stat-glow">12</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Meses Acesso</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-brand-green stat-glow">7 dias</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Garantia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-4 bg-brand-green w-full relative z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"></div>
        </section>

        {/* Social Proof Bar */}
        <SocialProofBar />

        <section id="problema" className="relative z-10 py-20 md:py-32 bg-brand-green overflow-hidden">
          <SectionMatrixBackground />
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 order-2 lg:order-1 relative z-10">
                <div className="reveal reveal-delay-1 card-3d-hover card-highlight bg-black/90 p-8 rounded-2xl text-white shadow-xl border border-white/10 hover:border-brand-green/50 transition-colors duration-300 group">
                  <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-brand-green transition-colors leading-tight">Para quem quer um <span className="text-brand-green underline decoration-brand-green/30">assistente personalizado</span> que trabalha por você — dentro do ChatGPT ou Gemini.</h3>
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg">Você vai criar seu próprio GPT customizado ou Gem no Gemini — treinado com o seu contexto, atendendo, qualificando e respondendo por você. Enquanto você dorme, ele trabalha. Não é ficção. É a Jornada 01 do Sprint.</p>
                </div>
                <div className="reveal reveal-delay-2 card-3d-hover card-highlight bg-black/90 p-8 rounded-2xl text-white shadow-xl border border-white/10 hover:border-brand-green/50 transition-colors duration-300 group">
                  <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-brand-green transition-colors leading-tight">Para quem sabe que sua <span className="text-brand-green underline decoration-brand-green/30">imagem digital</span> define sua credibilidade — antes mesmo do primeiro contato.</h3>
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg">Vídeos profissionais, imagens que constroem autoridade, conteúdo que posiciona. Tudo com IA, sem fotógrafo, sem editor, sem custo. Você cria em minutos o que levaria dias — e sua presença digital passa a trabalhar por você 24h.</p>
                </div>
                <div className="reveal reveal-delay-3 card-3d-hover card-highlight bg-black/90 p-8 rounded-2xl text-white shadow-xl border border-white/10 hover:border-brand-green/50 transition-colors duration-300 group">
                  <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-brand-green transition-colors leading-tight">Para quem quer <span className="text-brand-green underline decoration-brand-green/30">autonomia total</span> — criar sistemas, sites e ferramentas sem depender de ninguém.</h3>
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg">Site de alta conversão no ar em 2 horas. Sistemas criados com IA que geram resultado real. Campanhas, automações, ferramentas — tudo nas suas mãos. Sem agência, sem desenvolvedor, sem esperar. Você assume o controle.</p>
                </div>
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-right relative z-10">
                <h2 className="font-heading text-4xl md:text-6xl lg:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                  Para<br/>
                  QUEM<br/>
                  é a<br/>
                  <span className="inline-block bg-black text-brand-green px-6 py-2 transform -rotate-2 mt-4 shadow-[0_0_30px_rgba(0,0,0,0.3)] font-black">JORNADA</span><br/>
                  <span className="inline-block bg-black text-brand-green px-6 py-2 transform -rotate-2 mt-4 shadow-[0_0_30px_rgba(0,0,0,0.3)] font-black">SPRINT</span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section id="oportunidade" className="relative py-20 md:py-32 overflow-hidden border-t border-brand-green/10">
          <MatrixVideoBackground />
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

        {/* Autoridade */}
        <AutoridadeSection />

        {/* Para Quem É */}
        <ParaQuemESection />

        {/* Currículo — 6 Jornadas */}
        <CurriculoSection />

        <section id="para-quem" className="relative py-12 md:py-16 bg-brand-green overflow-hidden">
          <SectionMatrixBackground />
          <div className="container mx-auto max-w-4xl text-center px-4 relative z-10">
            <div className="relative inline-block mb-8">
               <h2 className="relative z-10 font-heading text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter text-black drop-shadow-sm">
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

        {/* Resultados Reais */}
        <ResultadosReaisSection />

        <section id="depoimentos" className="relative border-t border-brand-green/10 py-24 md:py-32 overflow-hidden overflow-x-hidden">
             <MatrixVideoBackground />
             <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black/90 to-transparent z-20 pointer-events-none"></div>
             <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black/90 to-transparent z-20 pointer-events-none"></div>

             <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                 <div className="reveal inline-block relative">
                    <div className="absolute inset-0 bg-brand-green/10 blur-[40px] rounded-full"></div>
                    <h2 className="relative z-10 font-heading text-4xl md:text-6xl font-black text-white px-8 py-2 uppercase tracking-tighter">
                       Quando a IA vira <span className="text-brand-green">resultado real</span>
                    </h2>
                 </div>
                 <p className="reveal text-slate-400 mt-6 text-xl max-w-2xl mx-auto font-medium">Essas pessoas chegaram com as mesmas dúvidas que você tem agora. Leia o que mudou.</p>
                 
                 <div className="flex items-center justify-center gap-4 mt-8">
                    <button 
                      onClick={() => manualScroll('left')}
                      className="p-4 bg-black/60 border border-white/10 rounded-full text-brand-green hover:bg-brand-green hover:text-black transition-all shadow-xl active:scale-90"
                      title="Anterior"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => setIsPaused(!isPaused)}
                      className="flex items-center gap-3 px-8 py-4 bg-brand-green/5 border border-brand-green/30 rounded-full text-brand-green font-black hover:bg-brand-green/20 transition-all uppercase text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(34,197,94,0.1)] active:scale-95"
                    >
                      {isPaused ? <><Play className="w-5 h-5 fill-current" /> Retomar</> : <><Pause className="w-5 h-5 fill-current" /> Pausar leitura</>}
                    </button>
                    <button 
                      onClick={() => manualScroll('right')}
                      className="p-4 bg-black/60 border border-white/10 rounded-full text-brand-green hover:bg-brand-green hover:text-black transition-all shadow-xl active:scale-90"
                      title="Próximo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                 </div>
             </div>

             <div
               ref={scrollRef}
               className="flex w-full py-10 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing relative z-20"
               style={{ touchAction: 'pan-x' }}
               onMouseEnter={() => setIsPaused(true)}
               onMouseLeave={() => setIsPaused(false)}
             >
                <div className="flex gap-8 px-4 w-max">
                  {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                    <div key={i} className="flex-shrink-0 w-[320px] md:w-[450px] bg-black/50 border border-white/10 p-8 rounded-[32px] backdrop-blur-md hover:border-brand-green/40 transition-all duration-500 hover:-translate-y-2 group shadow-xl">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">{t.name.charAt(0)}</div>
                        <div>
                           <p className="font-bold text-white text-lg group-hover:text-brand-green transition-colors">{t.name}</p>
                           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t.role}</p>
                        </div>
                        <Quote className="w-8 h-8 text-slate-700 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-slate-300 text-lg leading-relaxed font-medium italic">"{t.text}"</p>
                    </div>
                  ))}
                </div>
             </div>
        </section>

        <section id="oferta" className="relative py-24 md:py-32 px-4 overflow-hidden bg-brand-green">
             <SectionMatrixBackground />
             <div className="container mx-auto max-w-6xl relative z-10">
                  <div className="text-center mb-20">
                      <h2 className="font-heading text-5xl md:text-7xl lg:text-9xl font-black text-black uppercase tracking-tighter mb-4 opacity-10 absolute -top-10 left-1/2 -translate-x-1/2 w-full select-none">
                        OFERTA ÚNICA
                      </h2>
                      <h2 className="font-heading text-3xl md:text-6xl font-black text-black uppercase tracking-tighter relative z-10 drop-shadow-sm">
                        JORNADA <span className="text-white bg-black px-4 py-1 transform -skew-x-12 inline-block">SPRINT</span>
                      </h2>
                      <p className="text-black/80 text-xl font-bold uppercase tracking-[0.2em] mt-6 drop-shadow-sm">O que você está recebendo</p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8 mb-20">
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
                             <span className="text-4xl font-black text-white">R$ 3.997,00</span>
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

                  {/* ⭐ Lives Mensais — Destaque */}
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

                  <div id="investimento" className="reveal max-w-3xl mx-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-[50px] p-6 md:p-20 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
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
                          <div className="flex flex-col md:flex-row items-baseline justify-center gap-x-3">
                             <span className="text-2xl md:text-5xl font-black text-white/50 uppercase italic">12x de</span>
                             <div className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none flex items-baseline drop-shadow-xl">
                                <span className="text-4xl md:text-5xl mr-2">R$</span>29,70
                             </div>
                          </div>
                          <div className="mt-8 p-6 bg-black/40 rounded-3xl border border-white/5 shadow-inner w-full">
                            <p className="text-slate-300 text-2xl md:text-3xl font-black">
                              ou R$ 297,00 à vista
                            </p>
                            <p className="text-brand-green/60 text-sm mt-2 uppercase tracking-[0.3em] font-black">Um ano inteiro de acesso, evolução e resultados reais</p>
                          </div>
                      </div>

                      <button onClick={handleCheckout} className="btn-shine w-full bg-brand-green text-black font-black text-lg md:text-3xl py-6 md:py-8 px-8 md:px-12 rounded-3xl hover:bg-brand-green/90 hover:scale-[1.03] transition-all shadow-[0_0_50px_rgba(34,197,94,0.5)] flex items-center justify-center gap-4 mx-auto group active:scale-95 duration-200 glow-pulse">
                         <Zap className="w-8 h-8 md:w-10 md:h-10 fill-black group-hover:scale-125 transition-transform" />
                         Começar minha JORNADA
                      </button>
                      <p className="mt-10 text-xs text-slate-600 uppercase tracking-[0.4em] font-black">Garantia de 7 dias. Pagamento seguro via InfinitePay.</p>
                  </div>
             </div>
        </section>

        {/* Garantia */}
        <GarantiaSection onCheckout={handleCheckout} />

        {/* Urgência — Countdown */}
        <UrgenciaSection onCheckout={handleCheckout} />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <footer className="relative z-10 bg-black/90 py-12 border-t border-brand-green/10 text-center px-4 backdrop-blur-sm">
        <div className="container mx-auto">
          <p className="text-slate-600 font-black uppercase tracking-[0.5em] text-xs">Jornada Sprint © 2026 • Todos os direitos reservados</p>
          <div className="mt-6 flex justify-center gap-6 text-slate-500">
            <ShieldCheck className="w-6 h-6 opacity-30 hover:opacity-100 transition-opacity cursor-pointer hover:text-brand-green" />
            <Award className="w-6 h-6 opacity-30 hover:opacity-100 transition-opacity cursor-pointer hover:text-brand-green" />
            <Lock className="w-6 h-6 opacity-30 hover:opacity-100 transition-opacity cursor-pointer hover:text-brand-green" />
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA — fixed bottom bar */}
      <StickyMobileCTA onCheckout={handleCheckout} />
    </div>
  );
}

export default App;
