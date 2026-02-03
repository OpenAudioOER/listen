import React from 'react';
import { ChevronRight, Headphones } from 'lucide-react';

interface NavbarProps {
  bookTitle?: string;
  currentChapter?: number;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ bookTitle, currentChapter, onGoHome }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button 
          onClick={onGoHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
          disabled={!onGoHome}
        >
          <div className="bg-brand-600 p-1.5 rounded-lg text-white">
            <Headphones size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">OpenAudio</span>
        </button>

        <div className="hidden md:flex items-center text-sm text-slate-500 font-medium">
          <span>Library</span>
          <ChevronRight size={14} className="mx-2" />
          <button 
            onClick={onGoHome}
            className={`hover:text-brand-600 transition-colors ${!currentChapter ? 'font-bold text-slate-900 cursor-default' : 'cursor-pointer'}`}
            disabled={!currentChapter}
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
        </div>
      </div>
    </nav>
  );
};