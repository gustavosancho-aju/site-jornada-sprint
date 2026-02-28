
import React from 'react';
import { X, Lock, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const CheckoutModal: React.FC<Props> = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-4 animate-fade-in">
      <div className="bg-slate-900 w-full h-full md:h-[90vh] md:max-w-4xl md:rounded-2xl relative shadow-2xl flex flex-col overflow-hidden border border-slate-800">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900 z-10 shrink-0">
           <div className="flex items-center gap-2">
             <Lock className="w-5 h-5 text-brand-green" />
             <span className="text-white font-bold text-lg">Pagamento Seguro</span>
           </div>
           <div className="flex items-center gap-3">
             <a 
               href={url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-slate-800 py-1.5 px-3 rounded-lg hover:bg-slate-700"
             >
               <ExternalLink className="w-3.5 h-3.5" />
               Abrir em nova aba
             </a>
             <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-full hover:bg-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
           </div>
        </div>
        
        {/* Iframe Container */}
        <div className="flex-1 w-full bg-white relative">
            {/* Loading State */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-500 z-0 bg-slate-50">
                <div className="flex flex-col items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Carregando ambiente seguro...</span>
                </div>
            </div>
           
           <iframe 
             src={url} 
             className="w-full h-full border-0 relative z-10"
             title="Checkout InfinitePay"
             allow="payment; camera; microphone; geolocation; clipboard-read; clipboard-write"
             sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads"
           />
        </div>
        
        {/* Mobile Footer for external link */}
        <div className="md:hidden p-3 bg-slate-900 border-t border-slate-800 text-center">
          <a 
             href={url} 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-xs text-brand-green/80 hover:text-brand-green hover:underline flex items-center justify-center gap-2 py-2"
           >
             Não carregou? Clique aqui para abrir em nova aba <ExternalLink className="w-3 h-3" />
           </a>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;