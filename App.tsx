import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { ReadingSection } from './components/ReadingSection';
import { AudioSection } from './components/AudioSection';
import { AudioCollection } from './components/AudioCollection';
import { Library } from './components/Library';
import { LandingPage } from './components/LandingPage';
import { Recognition } from './components/Recognition';
import { About } from './components/About';
import { Instructors } from './components/Instructors';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { library } from './data/chapters';
import { BookOpen, PlayCircle, ChevronRight, Headphones } from 'lucide-react';

type ViewMode = 'landing' | 'library' | 'home' | 'chapter' | 'audio-collection' | 'recognition' | 'about' | 'instructors';

// Legacy default for backward compatibility with ?chapter=X links
const DEFAULT_LEGACY_BOOK = 'am-gov-4e';

function App() {
  // Helper to get parameters from URL (Supports both Path and Query params)
  const getParamsFromUrl = () => {
    if (typeof window === 'undefined') return { bookId: null, chapterId: null, isEmbed: false, view: 'library' as ViewMode };
    try {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const modeParam = searchParams.get('mode');
      const isEmbed = modeParam === 'embed';

      const qBook = searchParams.get('book');
      const qChapter = searchParams.get('chapter');
      const qView = searchParams.get('view');

      // PRIORITY 1: Explicit Query Parameters (Legacy & Direct Links)
      // If 'chapter', 'view' or 'book' is present in the query string, we use Query Mode.
      if (qChapter || qView === 'audio' || qBook) {
        let bookId = qBook || DEFAULT_LEGACY_BOOK;
        let chapterId = qChapter ? parseInt(qChapter, 10) : null;
        let view: ViewMode = 'home';

        if (chapterId) view = 'chapter';
        else if (qView === 'audio') view = 'audio-collection';
        else if (qView === 'recognition') view = 'recognition';

        return { bookId, chapterId, isEmbed, view };
      }

      // PRIORITY 2: Path-based Routing
      const segments = path.replace(/\/$/, '').split('/').filter(p => p.length > 0 && p !== 'index.html');

      // If no path segments and no query params, we are at Root -> Show Landing
      if (segments.length === 0) {
        return { bookId: null, chapterId: null, isEmbed, view: 'landing' };
      }

      let bookId = segments[0]; // First segment is Book ID

      if (bookId === 'library') {
        return { bookId: null, chapterId: null, isEmbed, view: 'library' };
      }

      if (bookId === 'recognition') {
        return { bookId: null, chapterId: null, isEmbed, view: 'recognition' };
      }

      if (bookId === 'about') {
        return { bookId: null, chapterId: null, isEmbed, view: 'about' };
      }

      if (bookId === 'instructors') {
        return { bookId: null, chapterId: null, isEmbed, view: 'instructors' };
      }

      let chapterId: number | string | null = null;
      let view: ViewMode = 'home';

      if (segments.length > 0) {
        const secondSegment = segments[1];
        if (secondSegment) {
          if (secondSegment === 'archive') {
            view = 'audio-collection';
          } else {
            const parsed = parseInt(secondSegment, 10);
            chapterId = !isNaN(parsed) ? parsed : decodeURIComponent(secondSegment);
            view = 'chapter';
          }
        }
      }

      return {
        bookId,
        chapterId,
        isEmbed,
        view
      };
    } catch (e) {
      console.warn('Error reading URL parameters:', e);
      return { bookId: null, chapterId: null, isEmbed: false, view: 'library' as ViewMode };
    }
  };

  const initialParams = getParamsFromUrl();
  const [bookId, setBookId] = useState<string | null>(initialParams.bookId);
  const [chapterId, setChapterId] = useState<number | string | null>(initialParams.chapterId);
  const [view, setView] = useState<ViewMode>(initialParams.view);
  const [isEmbed, setIsEmbed] = useState<boolean>(initialParams.isEmbed);

  // Derive active data
  const activeBook = bookId && library[bookId] ? library[bookId] : null;
  const activeChapter = activeBook 
    ? activeBook.chapters.find(c => 
        String(c.chapterNumber).toLowerCase() === String(chapterId).toLowerCase() ||
        String(c.chapterNumber).toLowerCase().replace(/\s+/g, '-') === String(chapterId).toLowerCase()
      ) 
    : null;

  // DYNAMIC THEMING EFFECT
  useEffect(() => {
    if (activeBook && activeBook.theme) {
      const root = document.documentElement;
      const t = activeBook.theme;

      // Update CSS Variables efficiently
      root.style.setProperty('--brand-50', t.brand50);
      root.style.setProperty('--brand-100', t.brand100);
      root.style.setProperty('--brand-500', t.brand500);
      root.style.setProperty('--brand-600', t.brand600);
      root.style.setProperty('--brand-700', t.brand700);
      root.style.setProperty('--brand-900', t.brand900);
      root.style.setProperty('--accent-500', t.accent500);
      root.style.setProperty('--accent-600', t.accent600);
      root.style.setProperty('--accent-700', t.accent700);
    }
  }, [activeBook]);

  // Image resolution for current book
  const coverImageSrc = activeBook ? activeBook.coverImage : '';

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

  // Determine SEO Metadata
  const getSEO = () => {
    const baseUrl = 'https://www.openaudio.us';
    let path = '/';
    const breadcrumbs = [
      { name: 'Home', item: baseUrl }
    ];

    if (view === 'landing') {
      return {
        title: 'OpenAudio | Textbooks that speak to you',
        description: 'Free, high-quality audio resources for students and educators. Making education accessible, free, and engaging one chapter at a time.',
        canonicalUrl: baseUrl,
        schemaData: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "OpenAudio",
          "url": baseUrl,
          "description": "Free, high-quality audio resources for students and educators."
        }
      };
    }

    if (view === 'library') {
      path = '/library';
      breadcrumbs.push({ name: 'Library', item: `${baseUrl}${path}` });
      return {
        title: 'OpenAudio Library | Free Audio Textbooks',
        description: 'Access free, open-source textbooks enhanced with professional audio narration, timestamps, and study resources. Subjects include American Government, Sociology, and History.',
        canonicalUrl: `${baseUrl}${path}`,
        schemaData: {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": b.name,
            "item": b.item
          }))
        }
      };
    }

    if (view === 'recognition') {
      path = '/recognition';
      breadcrumbs.push({ name: 'Recognition', item: `${baseUrl}${path}` });
      return {
        title: 'Recognition & Awards | OpenAudio',
        description: 'Highlighting our impact in innovation, accessibility, and open education through awards and grants.',
        canonicalUrl: `${baseUrl}${path}`,
        schemaData: {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": b.name,
            "item": b.item
          }))
        }
      };
    }

    if (view === 'about') {
      path = '/about';
      breadcrumbs.push({ name: 'About', item: `${baseUrl}${path}` });
      return {
        title: 'About OpenAudio | Our Mission & Story',
        description: 'Learn about OpenAudio, our mission to make education accessible through free, high-quality audio textbooks, and the team behind the project.',
        canonicalUrl: `${baseUrl}${path}`,
        schemaData: {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": b.name,
            "item": b.item
          }))
        }
      };
    }

    if (activeBook) {
      path = `/${activeBook.id}`;
      breadcrumbs.push({ name: 'Library', item: `${baseUrl}/library` });
      breadcrumbs.push({ name: activeBook.title, item: `${baseUrl}${path}` });

      const bookSchema = {
        "@context": "https://schema.org",
        "@type": ["Book", "Audiobook"],
        "name": activeBook.title,
        "author": {
          "@type": "Person",
          "name": activeBook.author
        },
        "description": activeBook.description,
        "image": `${baseUrl}${activeBook.coverImage}`,
        "url": `${baseUrl}${path}`
      };

      if (view === 'chapter' && activeChapter) {
        const chapterPath = `${path}/${activeChapter.chapterNumber}`;
        const chapterLabel = typeof activeChapter.chapterNumber === 'number' ? `Chapter ${activeChapter.chapterNumber}` : activeChapter.chapterNumber;
        breadcrumbs.push({ name: chapterLabel, item: `${baseUrl}${chapterPath}` });

        return {
          title: `${activeChapter.courseTitle}: ${activeChapter.title} | ${activeBook.title}`,
          description: activeChapter.description.substring(0, 160),
          canonicalUrl: `${baseUrl}${chapterPath}`,
          schemaData: {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((b, i) => ({
                  "@type": "ListItem",
                  "position": i + 1,
                  "name": b.name,
                  "item": b.item
                }))
              },
              {
                ...bookSchema,
                "@type": "Audiobook",
                "name": `${activeBook.title} - ${activeChapter.title}`,
                "description": activeChapter.description
              }
            ]
          }
        };
      }

      if (view === 'audio-collection') {
        return {
          title: `Audio Archive | ${activeBook.title}`,
          description: `Complete audio collection for ${activeBook.title}. Access narrations, timestamps, and external platform links for all chapters.`,
          canonicalUrl: `${baseUrl}${path}/archive`,
          schemaData: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((b, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": b.name,
              "item": b.item
            }))
          }
        };
      }

      // Book Home
      return {
        title: `${activeBook.title} | Free Audio Textbook`,
        description: activeBook.description,
        canonicalUrl: `${baseUrl}${path}`,
        schemaData: {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              "itemListElement": breadcrumbs.map((b, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": b.name,
                "item": b.item
              }))
            },
            bookSchema
          ]
        }
      };
    }

    // Fallback
    return {
      title: 'OpenAudio - Accessible Textbook Audio',
      description: 'Free, open-source textbooks enhanced with professional audio narration.',
      canonicalUrl: baseUrl
    };
  };

  const seoData = getSEO();

  // Unified Navigation Handler
  const navigate = (newBookId: string | null, newChapterId: number | string | null, newView: ViewMode) => {
    // Update State
    setBookId(newBookId);
    setChapterId(newChapterId);
    setView(newView);
    window.scrollTo(0, 0);

    // Update URL (History)
    if (!isEmbed) {
      try {
        let path = '/';
        if (newView === 'landing') {
          path = '/';
        } else if (newView === 'library') {
          path = '/library';
        } else if (newView === 'recognition') {
          path = '/recognition';
        } else if (newView === 'about') {
          path = '/about';
        } else if (newView === 'instructors') {
          path = '/instructors';
        } else if (newBookId) {
          path = `/${newBookId}`;
          if (newView === 'audio-collection') {
            path += '/archive';
          } else if (newView === 'chapter' && newChapterId) {
            path += `/${newChapterId}`;
          }
        }

        // Preserve essential query params (e.g., mode)
        const currentSearchParams = new URLSearchParams(window.location.search);
        const newSearchParams = new URLSearchParams();
        if (currentSearchParams.has('mode')) {
          newSearchParams.set('mode', currentSearchParams.get('mode')!);
        }

        const queryString = newSearchParams.toString();
        const finalUrl = queryString ? `${path}?${queryString}` : path;

        window.history.pushState({}, '', finalUrl);
      } catch (e) {
        console.warn('Unable to update history state:', e);
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent, newBookId: string | null, newChapterId: number | string | null, newView: ViewMode) => {
    if (e.metaKey || e.ctrlKey) return; // Allow opening in new tab
    e.preventDefault();
    navigate(newBookId, newChapterId, newView);
  };

  const goHome = () => {
    if (activeBook) {
      navigate(activeBook.id, null, 'home');
    } else {
      navigate(null, null, 'library');
    }
  };

  const goLibrary = () => {
    navigate(null, null, 'library');
  };

  const goLanding = () => {
    navigate(null, null, 'landing');
  };

  const goRecognition = () => {
    navigate(null, null, 'recognition');
  };

  const goAbout = () => {
    navigate(null, null, 'about');
  };

  const goInstructors = () => {
    navigate(null, null, 'instructors');
  };

  const selectChapter = (id: number) => {
    if (activeBook) {
      navigate(activeBook.id, id, 'chapter');
    }
  };

  const selectBook = (id: string) => {
    navigate(id, null, 'home');
  };

  const goToAudioCollection = () => {
    if (activeBook) {
      navigate(activeBook.id, null, 'audio-collection');
    }
  };

  // RENDER LOGIC

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${isEmbed ? 'bg-transparent' : ''}`}>
      <SEO
        title={seoData.title}
        description={seoData.description}
        canonicalUrl={seoData.canonicalUrl}
        schemaData={seoData.schemaData}
      />

      {view === 'landing' ? (
        <LandingPage onNavigateLibrary={goLibrary} onNavigateBook={selectBook} onNavigateRecognition={goRecognition} onNavigateAbout={goAbout} onNavigateInstructors={goInstructors} />
      ) : view === 'recognition' ? (
        <Recognition onNavigateHome={goLanding} onNavigateLibrary={goLibrary} onNavigateAbout={goAbout} onNavigateInstructors={goInstructors} />
      ) : view === 'about' ? (
        <About onNavigateHome={goLanding} onNavigateLibrary={goLibrary} onNavigateRecognition={goRecognition} onNavigateInstructors={goInstructors} />
      ) : view === 'instructors' ? (
        <Instructors onNavigateHome={goLanding} onNavigateLibrary={goLibrary} onNavigateRecognition={goRecognition} onNavigateAbout={goAbout} />
      ) : view === 'library' || !activeBook ? (
        <Library books={Object.values(library)} onSelectBook={selectBook} onNavigateHome={goLanding} />
      ) : (
        <>
          {!isEmbed && (
            <Navbar
              bookTitle={activeBook.title}
              bookId={activeBook.id}
              currentChapter={view === 'chapter' ? activeChapter?.chapterNumber : undefined}
              customPageTitle={view === 'audio-collection' ? 'Audio Archive' : undefined}
              onGoHome={goHome}
            />
          )}

          {!isEmbed && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
              <a
                href="/library"
                onClick={(e) => handleNavClick(e, null, null, 'library')}
                className="text-xs font-bold text-slate-600 hover:text-brand-700 flex items-center gap-1"
              >
                <ChevronRight size={12} className="rotate-180" /> Back to Library
              </a>
            </div>
          )}

          <main className="flex-grow">
            {/* VIEW: BOOK OVERVIEW (List of Chapters) */}
            {view === 'home' && (
              <div className={`px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${isEmbed ? 'pt-2' : 'pt-6'}`}>

                <header className="mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex-1 text-center md:text-left order-2 md:order-1">
                    <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100">
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
                        alt={`${activeBook.title} Cover`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const absoluteUrl = `https://raw.githubusercontent.com/OpenAudioOER/listen/main/${activeBook.coverImage}`;

                          if (!target.src.includes('raw.githubusercontent.com')) {
                            console.warn(`Failed to load local image: ${target.src}. Trying absolute URL: ${absoluteUrl}`);
                            target.src = absoluteUrl;
                          } else {
                            console.warn("Cover image failed to load:", coverImageSrc);
                            target.onerror = null;
                            target.src = "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000";
                          }
                        }}
                      />
                    </div>
                  </div>
                </header>

                <div className="grid gap-6 pb-20">
                  {activeBook.chapters.map((chapter) => (
                    <a
                      key={chapter.chapterNumber}
                      href={`/${activeBook.id}/${chapter.chapterNumber}`}
                      onClick={(e) => handleNavClick(e, activeBook.id, chapter.chapterNumber, 'chapter')}
                      className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 text-left w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                      <div className="flex-grow space-y-3">
                        <div className="flex items-start gap-4">
                          <span className="flex-shrink-0 flex items-center justify-center min-w-12 px-2.5 h-7 text-xs font-bold text-white bg-accent-600 rounded shadow-sm whitespace-nowrap">
                            {typeof chapter.chapterNumber === 'number' ? `CH ${chapter.chapterNumber}` : chapter.chapterNumber}
                          </span>
                          <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-7">
                            {chapter.title}
                          </h2>
                        </div>

                        <p className="text-slate-600 line-clamp-2 leading-relaxed pr-0 sm:pr-8">
                          {chapter.subtitle}
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                            <BookOpen size={16} />
                            <span>Text</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
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
                    </a>
                  ))}

                  {/* Audio Archive Tile */}
                  <a
                    href={`/${activeBook.id}/archive`}
                    onClick={(e) => handleNavClick(e, activeBook.id, null, 'audio-collection')}
                    className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 text-left w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    <div className="flex-grow space-y-3">
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 h-7 flex items-center justify-center px-3 text-xs font-bold text-white bg-accent-600 rounded shadow-sm uppercase tracking-wider">
                          Archive
                        </span>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-7">
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
                  </a>
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
        </>
      )}
    </div>
  );
}

export default App;
