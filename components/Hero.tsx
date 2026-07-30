import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface HeroProps {
  courseTitle: string;
  title: string;
  subtitle: string;
  isEmbed?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ courseTitle, title, subtitle, isEmbed = false }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      } else {
          console.warn("Clipboard API not available in this context");
      }
    } catch (err) {
      console.warn("Failed to copy URL to clipboard:", err);
    }
  };

  return (
    <header className={`${isEmbed ? 'pt-4 pb-4' : 'pt-10 pb-8'} px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="inline-block text-brand-700 font-bold text-xs tracking-wider uppercase mb-3">
            {courseTitle}
          </span>
          <h1 className={`${isEmbed ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl'} font-serif font-bold text-slate-900 leading-[1.15] mb-4`}>
            {title}
          </h1>
        </div>
        
        {!isEmbed && (
          <button 
            onClick={handleShare}
            className="flex-shrink-0 ml-4 p-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all flex items-center gap-2 group"
            title="Copy link to chapter"
            aria-label="Copy link to chapter"
          >
            {copied ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
          </button>
        )}
      </div>

      {!isEmbed && (
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light max-w-3xl">
          {subtitle}
        </p>
      )}
    </header>
  );
};