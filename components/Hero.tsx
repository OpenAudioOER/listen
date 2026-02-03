import React from 'react';

interface HeroProps {
  courseTitle: string;
  title: string;
  subtitle: string;
  isEmbed?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ courseTitle, title, subtitle, isEmbed = false }) => {
  return (
    <header className={`${isEmbed ? 'pt-4 pb-4' : 'pt-10 pb-8'} px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto`}>
      <span className="inline-block text-brand-600 font-bold text-xs tracking-wider uppercase mb-3">
        {courseTitle}
      </span>
      <h1 className={`${isEmbed ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl'} font-serif font-bold text-slate-900 leading-[1.15] mb-4`}>
        {title}
      </h1>
      {!isEmbed && (
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light max-w-3xl">
          {subtitle}
        </p>
      )}
    </header>
  );
};