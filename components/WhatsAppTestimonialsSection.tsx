import React from 'react';
import { MessageCircle } from 'lucide-react';

const testimonials = [
  {
    image: '/testimonials/depo-2.webp',
    name: 'Rodrigo Costa',
    role: 'VP — Sprint 001',
    label: 'Criou produto digital com IA',
  },
  {
    image: '/testimonials/depo-3.webp',
    name: 'Kiraz',
    role: 'Consultora Imobiliária',
    label: 'Montou CRM para vendas',
  },
  {
    image: '/testimonials/depo-4.webp',
    name: 'Tamiles Bortoletto',
    role: 'Sprint 002',
    label: 'Calendário editorial em 1 noite',
  },
  {
    image: '/testimonials/depo-1.webp',
    name: 'Mentorada',
    role: 'Sprint 001',
    label: 'Maravilhada com a imersão',
  },
];

const WhatsAppTestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-black border-t border-brand-green/10 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs mb-6">
            <MessageCircle className="w-4 h-4" />
            Direto do WhatsApp
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
            Não acredite em mim.<br />
            <span className="text-brand-green">Acredite neles.</span>
          </h2>
        </div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-black/60 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-green/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              {/* WhatsApp Screenshot */}
              <div className="aspect-[3/4] overflow-hidden bg-black/30">
                <img
                  src={t.image}
                  alt={`Depoimento de ${t.name}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Label overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pt-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-black font-black text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 bg-brand-green/10 border border-brand-green/20 rounded-lg px-3 py-2">
                  <p className="text-brand-green text-xs font-black uppercase tracking-wider">{t.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatsAppTestimonialsSection;
