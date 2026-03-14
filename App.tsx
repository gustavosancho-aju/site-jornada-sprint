import './index.css'; // Loaded here (not index.tsx) so CSS is non-render-blocking — hero paints first

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Linkedin, Instagram } from 'lucide-react';

// ALL heavy components are lazy-loaded — nothing eager except tiny icons
const MatrixVideoBackground = React.lazy(() => import('./components/MatrixVideoBackground'));
const MatrixGlitterBackground = React.lazy(() => import('./components/MatrixGlitterBackground'));
const WhatsAppTestimonialsSection = React.lazy(() => import('./components/WhatsAppTestimonialsSection'));
const ProblemaSection = React.lazy(() => import('./components/ProblemaSection'));
const NaoEParaSection = React.lazy(() => import('./components/NaoEParaSection'));
const MentoriaSection = React.lazy(() => import('./components/MentoriaSection'));
const StickyMobileCTA = React.lazy(() => import('./components/StickyMobileCTA'));
const OportunidadeSection = React.lazy(() => import('./components/OportunidadeSection'));
const OfertaSection = React.lazy(() => import('./components/OfertaSection'));
const FAQSection = React.lazy(() => import('./components/FAQSection'));
const AutoridadeSection = React.lazy(() => import('./components/AutoridadeSection'));
const ParaQuemESection = React.lazy(() => import('./components/ParaQuemESection'));
const CurriculoSection = React.lazy(() => import('./components/CurriculoSection'));
const ResultadosReaisSection = React.lazy(() => import('./components/ResultadosReaisSection'));
const GarantiaSection = React.lazy(() => import('./components/GarantiaSection'));
const UrgenciaSection = React.lazy(() => import('./components/UrgenciaSection'));

function App() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [showMatrixBg, setShowMatrixBg] = useState(false);

  const checkoutUrl = "https://loja.infinitepay.io/gsancho/xal5576-sprint-corretor-haih";

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Delay MatrixVideoBackground portal to prevent hero re-paint from hijacking LCP.
  // LCP is finalized on first user interaction (scroll/click/keypress).
  // Mount matrix bg ONLY after first scroll or 12s timeout for passive viewers.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const enable = () => {
      setShowMatrixBg(true);
      window.removeEventListener('scroll', enable);
      clearTimeout(timer);
    };
    window.addEventListener('scroll', enable, { once: true, passive: true });
    timer = setTimeout(enable, 12000);
    return () => {
      window.removeEventListener('scroll', enable);
      clearTimeout(timer);
    };
  }, []);

  const handleCheckout = () => {
    // Meta Pixel — InitiateCheckout event
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Jornada Sprint IA',
        content_category: 'Course',
        currency: 'BRL',
        value: 297.00,
      });
    }
    // Small delay to ensure pixel fires before navigation
    setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 150);
  };

  // Portal target for MatrixVideoBackground inside the permanent HTML hero
  const matrixPortal = document.getElementById('matrix-bg-portal');

  return (
    <div className="relative bg-black min-h-screen text-white overflow-x-hidden font-body selection:bg-brand-green selection:text-black">
      {/* Global Background — deferred */}
      <React.Suspense fallback={null}>
        <MatrixGlitterBackground />
      </React.Suspense>

      {/* Matrix rain portaled into permanent HTML hero — delayed until first scroll
          to prevent the portal re-paint from becoming the LCP (7s → 0.8s fix) */}
      {showMatrixBg && matrixPortal && createPortal(
        <React.Suspense fallback={null}>
          <MatrixVideoBackground />
        </React.Suspense>,
        matrixPortal
      )}

      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform ${isHeaderSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-black/80 backdrop-blur-xl border-b border-white/10 py-4 px-6">
          <div className="container mx-auto max-w-6xl flex items-center justify-between">
            <div className="font-black text-brand-green tracking-tighter text-2xl flex items-center gap-2">
              SPRINT <span className="text-white">IA</span>
            </div>

            <nav className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#hero" className="hover:text-brand-green transition-colors">Início</a>
              <a href="#para-quem-e" className="hover:text-brand-green transition-colors">Para Quem?</a>
              <a href="#curriculo" className="hover:text-brand-green transition-colors">Jornadas</a>
              <a href="#resultados" className="hover:text-brand-green transition-colors">Resultados</a>
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
        {/* ============================================================
            HERO is permanent HTML in index.html — React does NOT render it.
            MatrixVideoBackground is portaled into #matrix-bg-portal above.
            ============================================================ */}

        {/* Problema — Identifica a dor */}
        <React.Suspense fallback={<div className="min-h-[300px] bg-brand-green" />}>
          <ProblemaSection />
        </React.Suspense>

        <React.Suspense fallback={<div className="min-h-[200px] bg-black" />}>
          {/* Para Quem É — Qualifica o público */}
          <ParaQuemESection />

          {/* Oportunidade — Storytelling do mentor */}
          <OportunidadeSection />

          {/* Currículo — O que vai aprender */}
          <CurriculoSection />

          {/* Mentoria 1:1 — Killer Promise */}
          <MentoriaSection onCheckout={handleCheckout} />

          {/* Autoridade — Credibilidade */}
          <AutoridadeSection />

          {/* WhatsApp Testimonials — Prova Social */}
          <WhatsAppTestimonialsSection />

          {/* Resultados Reais — Screenshots */}
          <ResultadosReaisSection />

          {/* Este Caminho NÃO é para... — Filtro */}
          <NaoEParaSection />

          {/* Oferta — Pricing */}
          <OfertaSection onCheckout={handleCheckout} />

          {/* FAQ Section */}
          <FAQSection />

          {/* Garantia — Remove risco */}
          <GarantiaSection onCheckout={handleCheckout} />

          {/* Urgência — CTA final */}
          <UrgenciaSection onCheckout={handleCheckout} />
        </React.Suspense>
      </main>

      <footer className="relative z-10 bg-black/90 py-12 border-t border-brand-green/10 text-center px-4 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <p className="text-slate-600 font-black uppercase tracking-[0.5em] text-xs">Jornada Sprint © 2026 • Todos os direitos reservados</p>
          <div className="mt-6 flex justify-center gap-6 text-slate-500">
            <a href="https://www.linkedin.com/in/gustavo-sancho-97b26b259/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 opacity-30 hover:opacity-100 transition-opacity cursor-pointer hover:text-brand-green" />
            </a>
            <a href="https://www.instagram.com/gustavosancho.ia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-6 h-6 opacity-30 hover:opacity-100 transition-opacity cursor-pointer hover:text-brand-green" />
            </a>
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
