import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { ReadingSection } from './components/ReadingSection';
import { AudioSection } from './components/AudioSection';
import { AudioCollection } from './components/AudioCollection';
import { Footer } from './components/Footer';
import { library } from './data/chapters';
import { BookOpen, PlayCircle, ChevronRight, Headphones, Library } from 'lucide-react';

type ViewMode = 'home' | 'chapter' | 'audio-collection';

function App() {
  // Helper to get parameters from URL
  const getParamsFromUrl = () => {
    if (typeof window === 'undefined') return { bookId: 'am-gov-4e', chapterId: null, isEmbed: false, view: 'home' as ViewMode };
    try {
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
    } catch (e) {
      console.warn('Error reading URL parameters:', e);
      return { bookId: 'am-gov-4e', chapterId: null, isEmbed: false, view: 'home' as ViewMode };
    }
  };

  const initialParams = getParamsFromUrl();
  const [bookId, setBookId] = useState<string>(initialParams.bookId);
  const [chapterId, setChapterId] = useState<number | null>(initialParams.chapterId);
  const [view, setView] = useState<ViewMode>(initialParams.view);
  const [isEmbed, setIsEmbed] = useState<boolean>(initialParams.isEmbed);

  // Derive active data
  const activeBook = library[bookId] || library['am-gov-4e'];
  const activeChapter = activeBook.chapters.find(c => c.chapterNumber === chapterId);

  // Attempt to resolve the image URL.
  // We use a direct path relative to the public root. 
  // This avoids runtime errors if 'import.meta.url' is undefined in specific environments.
  const coverImageSrc = '/cover.png';

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
  const safeUpdateHistory = (url: string) => {
    try {
      window.history.pushState({}, '', url);
    } catch (e) {
      console.warn('Unable to update history state (likely in a restricted iframe):', e);
    }
  };

  const goHome = () => {
    setChapterId(null);
    setView('home');
    window.scrollTo(0, 0);

    if (!isEmbed) {
      try {
        const params = new URLSearchParams(window.location.search);
        params.delete('chapter');
        params.delete('view');
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        safeUpdateHistory(newUrl);
      } catch (e) {
        console.warn('Error constructing URL:', e);
      }
    }
  };

  const selectChapter = (id: number) => {
    setChapterId(id);
    setView('chapter');
    window.scrollTo(0, 0);

    if (!isEmbed) {
      try {
        const params = new URLSearchParams(window.location.search);
        params.set('chapter', id.toString());
        params.delete('view');
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        safeUpdateHistory(newUrl);
      } catch (e) {
         console.warn('Error constructing URL:', e);
      }
    }
  };

  const goToAudioCollection = () => {
    setChapterId(null);
    setView('audio-collection');
    window.scrollTo(0, 0);

    if (!isEmbed) {
      try {
        const params = new URLSearchParams(window.location.search);
        params.delete('chapter');
        params.set('view', 'audio');
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        safeUpdateHistory(newUrl);
      } catch (e) {
        console.warn('Error constructing URL:', e);
      }
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
             
             {/* Updated Split Header with Image */}
             <header className="mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <div className="flex-1 text-center md:text-left order-2 md:order-1">
                 <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100">
                   Textbook & Audiobook
                 </span>
                 <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                   {activeBook.title}
                 </h1>
                 <p className="text-lg text-slate-600 leading-relaxed mb-8">
                   {activeBook.description}
                 </p>
               </div>
               
               <div className="w-48 sm:w-64 md:w-72 flex-shrink-0 order-1 md:order-2">
                 <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
                   <img 
                     src={coverImageSrc} 
                     alt="American Government Textbook Cover" 
                     className="w-full h-full object-cover"
                     onError={(e) => {
                       console.warn("Cover image failed to load from:", coverImageSrc);
                       console.info("Tip: Ensure 'cover.png' is placed in the 'public' folder of your project.");
                       
                       const target = e.target as HTMLImageElement;
                       target.onerror = null; // Prevent infinite loop
                       // Fallback to high-quality Unsplash image to keep layout intact during preview
                       target.src = "https://images.unsplash.com/photo-1540910419868-4749459ca6c8?auto=format&fit=crop&q=80&w=1000"; 
                     }}
                   />
                   {/* Background placeholder if image fails to load entirely */}
                   <div className="w-full h-full bg-brand-600 flex items-center justify-center text-white p-6 text-center -z-10 absolute inset-0">
                      <span className="font-serif font-bold text-xl">American Government 4e</span>
                   </div>
                 </div>
               </div>
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
                        <span className="text-xs font-bold text-white bg-accent-600 px-2 py-1 rounded shadow-sm">
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
                      <div className="h-12 w-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all transform group-hover:scale-110">
                        <ChevronRight size={24} />
                      </div>
                   </div>
                 </button>
               ))}

               {/* Audio Archive Tile */}
               <button 
                 onClick={goToAudioCollection}
                 className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 text-left w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
               >
                 <div className="flex-grow space-y-3">
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white bg-accent-600 px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                        Archive
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                        All Audio Resources
                      </h2>
                   </div>
                   <p className="text-slate-600 line-clamp-2 leading-relaxed pr-0 sm:pr-8">
                     Access the complete collection of audio narrations, timestamps, and external platform links for every chapter in one place.
                   </p>
                   
                   <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                        <Headphones size={16} />
                        <span>Complete Collection</span>
                      </div>
                   </div>
                 </div>

                 <div className="flex-shrink-0 self-start sm:self-center">
                    <div className="h-12 w-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all transform group-hover:scale-110">
                      <ChevronRight size={24} />
                    </div>
                 </div>
               </button>
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