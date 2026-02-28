
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, CheckCircle } from 'lucide-react';
import MatrixVideoBackground from './MatrixVideoBackground';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Tenho garantia se eu não gostar?",
      answer: "Sim! Você tem 7 dias de garantia incondicional protegida por lei. Se por qualquer motivo você sentir que a Jornada Sprint não é para você, basta solicitar o reembolso e devolvemos 100% do seu investimento, sem perguntas e sem letras miúdas."
    },
    {
      question: "Como funciona o suporte às aulas?",
      answer: "Você não estará sozinho. Oferecemos suporte personalizado para tirar todas as suas dúvidas diretamente na plataforma ou no grupo exclusivo. Nossa equipe acompanha seu progresso para garantir que você consiga aplicar o que aprendeu na prática."
    },
    {
      question: "O conteúdo é atualizado?",
      answer: "Constantemente. A Inteligência Artificial evolui rápido, e nós também. Sempre que surgirem novas ferramentas, prompts ou estratégias relevantes para o mercado imobiliário, as aulas serão atualizadas e você será notificado imediatamente para não ficar para trás."
    },
    {
      question: "Por quanto tempo tenho acesso ao curso?",
      answer: "Você terá acesso total e irrestrito a todo o conteúdo, bônus e atualizações por 12 meses (1 ano). Você pode assistir às aulas quantas vezes quiser, no seu próprio ritmo, pelo computador ou celular."
    },
    {
      question: "Preciso saber programação ou tecnologia avançada?",
      answer: "Absolutamente não. O método Sprint foi desenhado para levar você do zero ao avançado. Se você sabe usar o WhatsApp ou enviar um e-mail, você está apto a dominar as ferramentas de IA que ensinamos."
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "Você pode realizar o pagamento via cartão de crédito em até 12x, PIX à vista ou boleto bancário. Todo o processo é processado com segurança total pela InfinitePay."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative border-t border-brand-green/10 py-24 px-4 overflow-hidden">
      <MatrixVideoBackground />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs">
            <HelpCircle className="w-4 h-4" />
            Tire suas Dúvidas
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Perguntas <span className="text-brand-green">Frequentes</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tudo o que você precisa saber para entrar na Jornada Sprint com segurança total.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white/5 border-brand-green/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-black/40 hover:bg-white/5'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg md:text-xl pr-8 ${openIndex === index ? 'text-brand-green' : 'text-slate-200'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-colors duration-300 flex-shrink-0 ${openIndex === index ? 'bg-brand-green text-black' : 'bg-white/10 text-slate-400'}`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                  <div className="flex gap-3 items-start">
                     <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-1" />
                     <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
