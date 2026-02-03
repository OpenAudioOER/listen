import React from 'react';
import { Info } from 'lucide-react';

interface OverviewProps {
  description: string;
}

export const Overview: React.FC<OverviewProps> = ({ description }) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-12">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-600 mt-1">
            <Info size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Chapter Overview</h2>
            <p className="text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};