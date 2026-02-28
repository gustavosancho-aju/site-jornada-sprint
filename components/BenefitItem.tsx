
import React from 'react';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-brand-green/50 transition-all duration-300 group hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]">
      <div className="text-brand-green mb-4 p-3 bg-brand-green/10 rounded-lg inline-block group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
};

export default BenefitItem;