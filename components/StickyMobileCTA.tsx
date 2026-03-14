import React, { useState, useEffect } from 'react';
import { Zap, Shield } from 'lucide-react';

interface StickyMobileCTAProps {
  onCheckout: () => void;
}

const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onCheckout }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollY / docHeight : 0;
      setVisible(pct > 0.10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-[200] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-green to-transparent" />

      <div className="bg-black/95 backdrop-blur-md px-4 py-3 flex items-center gap-3 shadow-[0_-8px_32px_rgba(0,0,0,0.6)]">
        {/* Price info */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-black text-sm leading-tight truncate">
            <span className="text-brand-green">⚡</span> Vagas Limitadas
          </p>
          <p className="text-brand-green text-xs font-bold">
            12x de R$29,70 <span className="text-slate-400 font-black">✓ 7 dias</span>
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onCheckout}
          className="flex items-center gap-2 bg-brand-green text-black font-black text-sm px-6 py-3.5 rounded-xl shrink-0 active:scale-95 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]"
        >
          <Zap className="w-4 h-4 fill-black" />
          GARANTIR MINHA VAGA
        </button>
      </div>

      {/* Safe area for phones with home indicator */}
      <div className="bg-black/95 h-safe-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </div>
  );
};

export default StickyMobileCTA;
