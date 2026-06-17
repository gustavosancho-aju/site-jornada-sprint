import React from 'react';
import { Gift, Download, MessageCircle, CheckCircle } from 'lucide-react';

// WhatsApp para captura do lead (formato internacional, só dígitos): 55 + DDD + número
const WHATSAPP_NUMBER = '5511952138817';
const WHATSAPP_MSG = encodeURIComponent('Quero o Guia Claude no Chrome 🎁');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const LeadMagnetSection: React.FC = () => {
  return (
    <section id="brinde" className="relative py-16 md:py-24 bg-black border-t border-brand-green/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-green/[0.06] to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-4xl px-4 relative z-10">
        <div className="reveal bg-black/80 border-2 border-brand-green/30 rounded-[40px] p-8 md:p-14 text-center shadow-[0_0_60px_rgba(34,197,94,0.1)]">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-black uppercase tracking-widest text-xs mb-6">
            <Gift className="w-4 h-4" />
            Brinde grátis
          </div>

          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-5">
            Ainda na dúvida?<br />
            <span className="text-brand-green">Comece de graça.</span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Baixe o <strong className="text-white">Guia Claude no Chrome</strong> e coloque a IA pra trabalhar no seu navegador hoje — passo a passo, sem gastar nada e sem precisar programar.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 mb-10">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-green" /> 100% gratuito</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-green" /> Aplicável hoje</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-green" /> Direto ao ponto</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/guia-claude-no-chrome.pdf"
              download
              className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-green text-black font-black text-lg px-8 py-5 rounded-2xl hover:bg-brand-green/90 hover:-translate-y-1 transition-all shadow-[0_0_40px_rgba(34,197,94,0.4)] active:scale-95 group"
            >
              <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
              Baixar o guia grátis
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 border border-brand-green/30 text-white font-black text-lg px-8 py-5 rounded-2xl hover:bg-white/10 hover:border-brand-green/60 transition-all active:scale-95 group"
            >
              <MessageCircle className="w-6 h-6 text-brand-green" />
              Receber no WhatsApp
            </a>
          </div>

          <p className="text-slate-600 text-xs uppercase tracking-widest font-bold mt-8">
            Sem spam. É só o guia — e o convite pra entrar na comunidade.
          </p>

        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
