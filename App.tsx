import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { ReadingSection } from './components/ReadingSection';
import { AudioSection } from './components/AudioSection';
import { AudioCollection } from './components/AudioCollection';
import { Footer } from './components/Footer';
import { library } from './data/chapters';
import { BookOpen, PlayCircle, ChevronRight, Headphones } from 'lucide-react';

type ViewMode = 'home' | 'chapter' | 'audio-collection';

function App() {
  // Helper to get parameters from URL
  const getParamsFromUrl = () => {
    if (typeof window === 'undefined') return { bookId: 'am-gov-4e', chapterId: null, isEmbed: false, view: 'home' as ViewMode };
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('book') || 'am-gov-4e';
    const chapterParam = params.get('chapter');
    const modeParam = params.get('mode');
    const viewParam = params.get('view');
    
    let chapterId = null;
    if (chapterParam) chapterId = parseInt(chapterParam, 10);
    
    let view: ViewMode = 'home';
    if (chapterId) view = 'chapter';
    else if (viewParam === 'audio') view = 'audio-collection';
    
    return { 
      bookId, 
      chapterId,
      isEmbed: modeParam === 'embed',
      view
    };
  };

  const initialParams = getParamsFromUrl();
  const [bookId, setBookId] = useState<string>(initialParams.bookId);
  const [chapterId, setChapterId] = useState<number | null>(initialParams.chapterId);
  const [view, setView] = useState<ViewMode>(initialParams.view);
  // We use state for isEmbed to ensure it persists during navigation
  const [isEmbed, setIsEmbed] = useState<boolean>(initialParams.isEmbed);

  // Derive active data
  const activeBook = library[bookId] || library['am-gov-4e'];
  const activeChapter = activeBook.chapters.find(c => c.chapterNumber === chapterId);

  // Listen for browser "Back" and "Forward" button clicks
  useEffect(() => {
    const handlePopState = () => {
      const { bookId: b, chapterId: c, isEmbed: e, view: v } = getParamsFromUrl();
      setBookId(b);
      setChapterId(c);
      setIsEmbed(e);
      setView(v);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // UPDATE TITLE: Update the browser tab title based on navigation
  useEffect(() => {
    if (view === 'chapter' && activeChapter) {
      document.title = `${activeChapter.courseTitle}: ${activeChapter.title} | ${activeBook.title}`;
    } else if (view === 'audio-collection') {
      document.title = `Audio Archive | ${activeBook.title}`;
    } else {
      document.title = activeBook.title;
    }
  }, [view, activeChapter, activeBook]);

  // Handlers
  const goHome = () => {
    setChapterId(null);
    setView('home');
    window.scrollTo(0, 0);

    // CRITICAL FIX: Do not update URL history if we are in an iframe/embed mode.
    if (!isEmbed) {
      const params = new URLSearchParams(window.location.search);
      params.delete('chapter');
      params.delete('view');
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const selectChapter = (id: number) => {
    setChapterId(id);
    setView('chapter');
    window.scrollTo(0, 0);

    if (!isEmbed) {
      const params = new URLSearchParams(window.location.search);
      params.set('chapter', id.toString());
      params.delete('view');
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const goToAudioCollection = () => {
    setChapterId(null);
    setView('audio-collection');
    window.scrollTo(0, 0);

    if (!isEmbed) {
      const params = new URLSearchParams(window.location.search);
      params.delete('chapter');
      params.set('view', 'audio');
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${isEmbed ? 'bg-transparent' : ''}`}>
      {!isEmbed && (
        <Navbar 
          bookTitle={activeBook.title}
          currentChapter={view === 'chapter' ? activeChapter?.chapterNumber : undefined} 
          customPageTitle={view === 'audio-collection' ? 'Audio Archive' : undefined}
          onGoHome={goHome}
        />
      )}
      
      <main className="flex-grow">
        {/* VIEW: BOOK OVERVIEW (List of Chapters) */}
        {view === 'home' && (
          <div className={`px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${isEmbed ? 'pt-4' : 'pt-12'}`}>
             <header className="text-center mb-12">
               <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100">
                 Audiobook & Companion
               </span>
               <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-6">
                 {activeBook.title}
               </h1>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                 {activeBook.description}
               </p>

               {/* New CTA for Audio Archive */}
               <button 
                 onClick={goToAudioCollection}
                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
               >
                 <Headphones size={18} />
                 Browse Audio Archive
                 <ChevronRight size={16} />
               </button>
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
        {view === 'chapter' && activeChapter && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <Hero 
              courseTitle={activeChapter.courseTitle}
              title={activeChapter.title}
              subtitle={activeChapter.subtitle}
              isEmbed={isEmbed}
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

        {/* VIEW: AUDIO COLLECTION */}
        {view === 'audio-collection' && (
           <AudioCollection 
              chapters={activeBook.chapters} 
              bookTitle={activeBook.title}
           />
        )}

      </main>

      {!isEmbed && <Footer />}
    </div>
  );
}

export default App;