
import React, { useState, useEffect } from 'react';
import MatrixVideoBackground from './components/MatrixVideoBackground';
import SectionMatrixBackground from './components/SectionMatrixBackground';
import { Target, ShieldCheck, Award, Lock } from 'lucide-react';

// Lazy-load below-fold and heavy components
const MatrixGlitterBackground = React.lazy(() => import('./components/MatrixGlitterBackground'));
const WhatsAppTestimonialsSection = React.lazy(() => import('./components/WhatsAppTestimonialsSection'));
const MentoriaSection = React.lazy(() => import('./components/MentoriaSection'));
const StickyMobileCTA = React.lazy(() => import('./components/StickyMobileCTA'));
const OportunidadeSection = React.lazy(() => import('./components/OportunidadeSection'));
const DepoimentosSection = React.lazy(() => import('./components/DepoimentosSection'));
const OfertaSection = React.lazy(() => import('./components/OfertaSection'));
const FAQSection = React.lazy(() => import('./components/FAQSection'));
const AutoridadeSection = React.lazy(() => import('./components/AutoridadeSection'));
const ParaQuemESection = React.lazy(() => import('./components/ParaQuemESection'));
const CurriculoSection = React.lazy(() => import('./components/CurriculoSection'));
const ResultadosReaisSection = React.lazy(() => import('./components/ResultadosReaisSection'));
const GarantiaSection = React.lazy(() => import('./components/GarantiaSection'));
const UrgenciaSection = React.lazy(() => import('./components/UrgenciaSection'));

function App() {
  const [currentPersonaIndex, setCurrentPersonaIndex] = useState(0);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const checkoutUrl = "https://loja.infinitepay.io/gsancho/xal5576-sprint-corretor-haih";

  const personas = [
    "Quem quer apenas 'dar uma olhada' na IA — sem compromisso de transformar sua operação",
    "Quem busca atalho mágico e não está disposto a construir um método real por 12 meses",
    "Quem acredita que a IA faz tudo sozinha — sem o diferencial humano, sem estratégia, sem resultado real",
    "Quem quer uma ferramenta isolada, sem método, sem contexto e sem impacto no resultado",
    "Quem começa com entusiasmo mas abandona no primeiro obstáculo"
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

  return (
    <div className="relative bg-black min-h-screen text-white overflow-x-hidden font-body selection:bg-brand-green selection:text-black">
      {/* Global Background — deferred */}
      <React.Suspense fallback={null}>
        <MatrixGlitterBackground />
      </React.Suspense>

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
                    Você sabe que a IA pode mudar seu jogo.<br/>Mas ainda não saiu do lugar.
                  </h2>
                  <p className="text-base md:text-xl text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
                    Em 12 meses, domine IA do zero ao avançado — com 8 imersões práticas, lives mensais ao vivo e <strong className="text-brand-green">1 hora de mentoria individual</strong> com Gustavo para tirar seu projeto do papel.
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
                    src="/hero.webp"
                    alt="Gustavo Sancho IA Specialist"
                    className="h-full w-auto max-w-none object-contain block hero-float origin-bottom"
                    style={{ marginBottom: '-1px' }}
                    fetchPriority="high"
                    loading="eager"
                    width={800}
                    height={1000}
                   />
                </div>
              </div>

              {/* Hero Stats — 3rd grid child: mobile: below image; desktop: col1/row2 */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-sm mx-auto lg:mx-0 lg:col-start-1">
                <div className="text-center">
                  <div className="text-2xl font-black text-brand-green stat-glow">8</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Imersões</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-2xl font-black text-brand-green stat-glow">1h</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Mentoria 1:1</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-brand-green stat-glow">12</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Meses Acesso</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-4 bg-brand-green w-full relative z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"></div>
        </section>

        {/* WhatsApp Testimonials — Prova Social Imediata */}
        <React.Suspense fallback={<div className="min-h-[200px] bg-black" />}>
          <WhatsAppTestimonialsSection />
        </React.Suspense>

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

        <React.Suspense fallback={<div className="min-h-[200px] bg-black" />}>
        {/* Oportunidade — extracted lazy component */}
        <OportunidadeSection />

        {/* Mentoria 1:1 — Killer Promise */}
        <MentoriaSection onCheckout={handleCheckout} />

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

        {/* Depoimentos — extracted lazy component */}
        <DepoimentosSection />

        {/* Oferta — extracted lazy component */}
        <OfertaSection onCheckout={handleCheckout} />

        {/* Garantia */}
        <GarantiaSection onCheckout={handleCheckout} />

        {/* Urgência — Countdown */}
        <UrgenciaSection onCheckout={handleCheckout} />

        {/* FAQ Section */}
        <FAQSection />
        </React.Suspense>
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
      <React.Suspense fallback={null}>
        <StickyMobileCTA onCheckout={handleCheckout} />
      </React.Suspense>
    </div>
  );
}

export default App;
