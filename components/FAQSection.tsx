
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, CheckCircle } from 'lucide-react';
import MatrixVideoBackground from './MatrixVideoBackground';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Tenho garantia se eu não gostar?",
      answer: "Sim. 7 dias de garantia incondicional, protegida por lei. Se em qualquer momento da primeira semana você sentir que a Jornada Sprint não é para você — sem julgamento, sem perguntas — devolvemos 100% do seu investimento. Ponto."
    },
    {
      question: "Como funciona o suporte às aulas?",
      answer: "Você não vai estar sozinho nessa jornada. Há suporte direto na plataforma e acesso ao grupo exclusivo de corretores onde você tira dúvidas, compartilha resultados e aprende com quem está na mesma caminhada. Nossa equipe acompanha o seu progresso do começo ao fim."
    },
    {
      question: "O conteúdo é atualizado?",
      answer: "Sempre. A IA evolui todo mês — e nós também. Toda vez que surgir uma nova ferramenta, estratégia ou prompt relevante para o mercado imobiliário, o conteúdo é atualizado e você é avisado na hora. Você não vai ficar para trás."
    },
    {
      question: "Por quanto tempo tenho acesso ao curso?",
      answer: "12 meses de acesso total — aulas, bônus e todas as atualizações. No seu ritmo, quando quiser, quantas vezes precisar. Pelo computador ou pelo celular, sem restrições. O conteúdo é seu por um ano inteiro."
    },
    {
      question: "Preciso saber programação ou tecnologia avançada?",
      answer: "Não. Zero. Se você sabe usar o WhatsApp, você está pronto para começar. O método Sprint foi criado justamente para quem nunca tocou em IA antes — e quer ir do zero ao avançado sem complicação. A complexidade fica com a gente. Você foca nos resultados."
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "Cartão de crédito em até 12x de R$ 29,70, PIX à vista por R$ 297,00 ou boleto bancário. Tudo processado com segurança total pela InfinitePay. Você escolhe a forma que faz mais sentido pra você."
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
            As dúvidas que você tem agora — respondidas com honestidade, sem enrolação.
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
