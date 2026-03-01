import React, { useState, useEffect } from 'react';
import SectionMatrixBackground from './SectionMatrixBackground';
import { Zap, Users, ArrowRight, Clock } from 'lucide-react';

interface UrgenciaSectionProps {
  onCheckout: () => void;
}

const STORAGE_KEY = 'sprint_launch_deadline';
const DAYS_UNTIL_DEADLINE = 7;

function getDeadline(): Date {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const date = new Date(stored);
      if (date > new Date()) return date;
    }
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + DAYS_UNTIL_DEADLINE);
    deadline.setHours(23, 59, 59, 999);
    localStorage.setItem(STORAGE_KEY, deadline.toISOString());
    return deadline;
  }
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + DAYS_UNTIL_DEADLINE);
  return deadline;
}

const UrgenciaSection: React.FC<UrgenciaSectionProps> = ({ onCheckout }) => {
  const [deadline] = useState<Date>(getDeadline);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setExpired(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const units = [
    { value: timeLeft.days, label: 'dias' },
    { value: timeLeft.hours, label: 'horas' },
    { value: timeLeft.minutes, label: 'min' },
    { value: timeLeft.seconds, label: 'seg' },
  ];

  return (
    <section id="urgencia" className="relative py-24 md:py-32 bg-brand-green overflow-hidden">
      <SectionMatrixBackground />
      <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-black/30 text-black font-bold uppercase tracking-widest text-xs mb-8">
          <Zap className="w-4 h-4 fill-black" />
          Sprint 003 — Preço de Lançamento
        </div>

        <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-tight mb-4">
          {expired ? 'Última Chance' : 'Este preço encerra em:'}
        </h2>

        {!expired && (
          <p className="text-black/60 text-lg font-medium mb-10">
            Após o encerramento, o valor volta para <strong>R$ 597,00</strong>
          </p>
        )}

        {/* Countdown — premium 3D blocks */}
        <div className="reveal flex items-end justify-center gap-2 md:gap-3 mb-12">
          {units.map((unit, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className="countdown-3d glow-pulse bg-black text-brand-green font-black text-3xl md:text-6xl w-16 md:w-24 h-16 md:h-24 rounded-2xl flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(34,197,94,0.15)] tabular-nums tracking-tighter counter-glow">
                  {pad(unit.value)}
                </div>
                <span className="text-black/50 text-xs font-black uppercase tracking-widest mt-2">{unit.label}</span>
              </div>
              {i < 3 && (
                <span className="text-black/50 font-black text-3xl md:text-5xl mb-8 leading-none">:</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Price block — with animated border */}
        <div className="reveal animated-border bg-black/20 rounded-3xl p-6 md:p-8 mb-10 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-black/60 font-bold">Preço normal:</span>
            <span className="text-black/40 font-black text-xl line-through">R$ 597,00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black font-black text-lg">Agora:</span>
            <div className="text-right">
              <div className="text-black font-black text-3xl md:text-4xl">R$ 297,00</div>
              <div className="text-black/50 text-sm font-bold">ou 12x de R$ 29,70</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onCheckout}
          className="btn-shine inline-flex items-center gap-3 bg-black text-brand-green font-black text-xl px-12 py-6 rounded-2xl hover:bg-black/80 transition-all shadow-[0_0_40px_rgba(0,0,0,0.4),0_0_20px_rgba(34,197,94,0.15)] hover:-translate-y-1 active:scale-95 group mb-6"
        >
          <Zap className="w-7 h-7 fill-brand-green group-hover:scale-125 transition-transform" />
          Garantir Minha Vaga
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-center gap-2 text-black/50">
          <Users className="w-4 h-4" />
          <p className="text-sm font-bold">
            Mais de 200 profissionais já garantiram a vaga. Vagas limitadas por turma.
          </p>
        </div>

      </div>
    </section>
  );
};

export default UrgenciaSection;
