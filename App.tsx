import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { ReadingSection } from './components/ReadingSection';
import { AudioSection } from './components/AudioSection';
import { Footer } from './components/Footer';
import { library } from './data/chapters';
import { BookOpen, PlayCircle, ChevronRight } from 'lucide-react';

function App() {
  // Helper to get parameters from URL
  const getParamsFromUrl = () => {
    if (typeof window === 'undefined') return { bookId: 'am-gov-4e', chapterId: null };
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('book') || 'am-gov-4e';
    const chapterParam = params.get('chapter');
    let chapterId = null;
    if (chapterParam) chapterId = parseInt(chapterParam, 10);
    return { bookId, chapterId };
  };

  const initialParams = getParamsFromUrl();
  const [bookId, setBookId] = useState<string>(initialParams.bookId);
  const [chapterId, setChapterId] = useState<number | null>(initialParams.chapterId);

  // Derive active data
  const activeBook = library[bookId] || library['am-gov-4e'];
  const activeChapter = activeBook.chapters.find(c => c.chapterNumber === chapterId);

  // Listen for browser "Back" and "Forward" button clicks
  useEffect(() => {
    const handlePopState = () => {
      const { bookId: b, chapterId: c } = getParamsFromUrl();
      setBookId(b);
      setChapterId(c);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handlers
  const goHome = () => {
    setChapterId(null);
    // Go to the book landing page
    const newUrl = `${window.location.pathname}?book=${activeBook.id}`;
    window.history.pushState({}, '', newUrl);
    window.scrollTo(0, 0);
  };

  const selectChapter = (id: number) => {
    setChapterId(id);
    const newUrl = `${window.location.pathname}?book=${activeBook.id}&chapter=${id}`;
    window.history.pushState({}, '', newUrl);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        bookTitle={activeBook.title}
        currentChapter={activeChapter?.chapterNumber} 
        onGoHome={goHome}
      />
      
      <main className="flex-grow">
        {/* VIEW: BOOK OVERVIEW (List of Chapters) */}
        {!activeChapter && (
          <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-12">
             <header className="text-center mb-16">
               <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100">
                 Audiobook & Companion
               </span>
               <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-6">
                 {activeBook.title}
               </h1>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                 {activeBook.description}
               </p>
             </header>

             <div className="grid gap-6 pb-20">
               {activeBook.chapters.map((chapter) => (
                 <button 
                   key={chapter.chapterNumber}
                   onClick={() => selectChapter(chapter.chapterNumber)}
                   className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 text-left w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                 >
                   <div className="flex-grow space-y-3">
                     <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-white bg-slate-900 px-2 py-1 rounded">
                          CH {chapter.chapterNumber}
                        </span>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                          {chapter.title}
                        </h2>
                     </div>
                     <p className="text-slate-600 line-clamp-2 leading-relaxed pr-0 sm:pr-8">
                       {chapter.subtitle}
                     </p>
                     
                     <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                          <BookOpen size={16} />
                          <span>Text</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                          <PlayCircle size={16} />
                          <span>Audio</span>
                        </div>
                     </div>
                   </div>

                   <div className="flex-shrink-0 self-start sm:self-center">
                      <div className="h-12 w-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all transform group-hover:scale-110">
                        <ChevronRight size={24} />
                      </div>
                   </div>
                 </button>
               ))}
             </div>
          </div>
        )}

        {/* VIEW: CHAPTER DETAIL */}
        {activeChapter && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <Hero 
              courseTitle={activeChapter.courseTitle}
              title={activeChapter.title}
              subtitle={activeChapter.subtitle}
            />
            
            <Overview 
              description={activeChapter.description}
            />
            
            <ReadingSection 
              textbookUrl={activeChapter.textbookUrl}
            />
            
            <AudioSection 
              embedUrl={activeChapter.audioEmbedUrl}
              links={activeChapter.resourceLinks}
              timestamps={activeChapter.timestamps}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;