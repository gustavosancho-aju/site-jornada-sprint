
import React, { useState } from 'react';
import { X, Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const StudentAccessModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accessCode === 'Sprint45') {
      window.location.href = 'https://mentoriasprint-fvc7g2ec.manus.space/';
    } else {
      setError('Código de acesso inválido. Tente novamente.');
      setAccessCode(''); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value);
    if (error) setError(''); 
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-4 bg-slate-800 rounded-full mb-4 border border-slate-700">
             <Lock className="w-8 h-8 text-brand-green" />
          </div>
          <h2 className="text-2xl font-bold text-white">Área do Aluno</h2>
          <p className="text-slate-400 text-sm mt-2">
            Insira seu código de confirmação para acessar a plataforma exclusiva.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
             <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block text-left">
               Código de Acesso
             </label>
             <input 
               type="text" 
               value={accessCode}
               onChange={handleInputChange}
               placeholder="Digite o código aqui..." 
               className={`w-full bg-black border rounded-lg p-4 text-white text-lg text-center tracking-widest outline-none transition-all duration-300 placeholder-slate-600 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] ${
                 error 
                   ? 'border-red-500 focus:border-red-500' 
                   : 'border-slate-700 focus:border-brand-green'
               }`}
             />
             {error && (
               <div className="flex items-center gap-2 text-red-500 text-sm mt-2 animate-bounce">
                 <AlertCircle className="w-4 h-4" />
                 <span>{error}</span>
               </div>
             )}
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-green text-slate-950 font-bold py-4 rounded-lg hover:opacity-90 transition transform hover:scale-[1.02] flex items-center justify-center gap-2 group"
          >
            Acessar Plataforma
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <p className="text-slate-600 text-xs">
                Não tem o código? Verifique seu e-mail de boas-vindas.
            </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAccessModal;