import React from 'react';
import { ChevronRight, Headphones } from 'lucide-react';

interface NavbarProps {
  bookTitle?: string;
  currentChapter?: number;
  customPageTitle?: string;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ bookTitle, currentChapter, customPageTitle, onGoHome }) => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-blue-100 bg-white/95 backdrop-blur-md px-6 py-4 lg:px-20 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
            disabled={!onGoHome}
          >
            <div className="flex h-10 w-10 items-center justify-center bg-primary/10 rounded-full text-primary">
              <span className="material-symbols-outlined text-2xl">headphones</span>
            </div>
            <span className="text-slate-900 text-xl font-bold hero-title leading-tight tracking-[-0.015em] font-serif">OpenAudio</span>
          </button>
        </div>

        <div className="hidden md:flex items-center text-sm text-slate-500 font-medium">
          <span>Library</span>
          <ChevronRight size={14} className="mx-2" />
          <button
            onClick={onGoHome}
            className={`hover:text-brand-600 transition-colors ${!currentChapter && !customPageTitle ? 'font-bold text-slate-900 cursor-default' : 'cursor-pointer'}`}
            disabled={(!currentChapter && !customPageTitle)}
          >
            {bookTitle || 'Textbook'}
          </button>

          {currentChapter && (
            <>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                Chapter {currentChapter}
              </span>
            </>
          )}

          {customPageTitle && (
            <>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                {customPageTitle}
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};