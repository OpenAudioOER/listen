import React from 'react';
import { Book as BookIcon, Headphones, ArrowRight } from 'lucide-react';
import { Book } from '../types';

interface LibraryProps {
  books: Book[];
  onSelectBook: (bookId: string) => void;
}

export const Library: React.FC<LibraryProps> = ({ books, onSelectBook }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="bg-brand-600 p-1.5 rounded-lg text-white">
            <Headphones size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">OpenAudio Library</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
            Audio-Enabled Textbooks
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Free, open-source textbooks enhanced with professional audio narration and curated study resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <button
              key={book.id}
              onClick={() => onSelectBook(book.id)}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 text-left h-full"
            >
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img 
                  src={book.coverImageWide} 
                  alt={book.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     // Check if we're already trying the fallback to avoid infinite loop
                     if (!target.src.endsWith(book.coverImage)) {
                        target.src = book.coverImage;
                     } else {
                        // Fallback if both missing
                        target.style.display = 'none';
                        target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-200');
                        target.parentElement!.innerHTML = `<span class="text-slate-400 font-serif text-lg font-bold p-8 text-center">${book.title}</span>`;
                     }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-semibold flex items-center gap-2">
                    Open Book <ArrowRight size={18} />
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100">
                    OpenStax
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    {book.chapters.length} Chapters
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors font-serif">
                  {book.title}
                </h2>
                
                <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">
                   {book.description}
                </p>

                <div className="flex items-center text-brand-600 font-semibold text-sm mt-4">
                  <BookIcon size={16} className="mr-2" />
                  <span>View Content</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};