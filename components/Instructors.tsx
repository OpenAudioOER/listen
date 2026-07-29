import React, { useState, useEffect } from 'react';
import { EmailLink } from './EmailLink';
import { library } from '../data/chapters';
import { Download } from 'lucide-react';

const imsccFilenameMap: Record<string, string> = {
    'business-2e': 'Business2e-Audiobook.imscc',
    'am-gov-4e': 'AmerGov4e-Audiobook.imscc',
    'intro-soc-3e': 'Sociology3e-Audiobook.imscc',
    'sociology-3e': 'Sociology3e-Audiobook.imscc',
    'us-history': 'USHistory-Audiobook.imscc',
    'world-hist-v1': 'WorldHistoryVol1-Audiobook.imscc',
    'world-history': 'WorldHistoryVol1-Audiobook.imscc',
    'am-gov-3e': 'AmerGov3e-Audiobook.imscc',
};

interface InstructorsProps {
    onNavigateHome: () => void;
    onNavigateLibrary: () => void;
    onNavigateRecognition: () => void;
    onNavigateAbout: () => void;
}

export const Instructors: React.FC<InstructorsProps> = ({ onNavigateHome, onNavigateLibrary, onNavigateRecognition, onNavigateAbout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const handleNavClick = (e: React.MouseEvent, type: 'home' | 'library' | 'recognition' | 'about') => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        setIsMenuOpen(false);
        if (type === 'home') onNavigateHome();
        else if (type === 'library') onNavigateLibrary();
        else if (type === 'recognition') onNavigateRecognition();
        else if (type === 'about') onNavigateAbout();
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root bg-surface-white text-slate-800 antialiased overflow-x-hidden">
            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[45] bg-white/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    <a
                        href="/library"
                        onClick={(e) => handleNavClick(e, 'library')}
                        className="text-2xl font-serif text-slate-900 hover:text-primary transition-colors"
                    >
                        Listen
                    </a>
                    <a
                        href="/instructors"
                        onClick={(e) => e.preventDefault()}
                        className="text-2xl font-serif text-primary font-bold underline transition-colors"
                    >
                        Instructor Resources
                    </a>
                    <a
                        href="/recognition"
                        onClick={(e) => handleNavClick(e, 'recognition')}
                        className="text-2xl font-serif text-slate-900 hover:text-primary transition-colors"
                    >
                        Recognition
                    </a>
                    <a
                        href="/about"
                        onClick={(e) => handleNavClick(e, 'about')}
                        className="text-2xl font-serif text-slate-900 hover:text-primary transition-colors"
                    >
                        About
                    </a>

                    <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                        <p className="text-slate-400 text-sm">Get in touch</p>
                        <EmailLink
                            className="text-slate-400 hover:text-primary transition-colors bg-white h-12 w-12 rounded-full shadow-sm hover:shadow-md border border-slate-100 flex items-center justify-center"
                            title="Email us"
                        >
                            <span className="material-symbols-outlined text-2xl">mail</span>
                        </EmailLink>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-blue-100 bg-white/95 backdrop-blur-md px-6 py-4 lg:px-20 shadow-sm">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            onClick={(e) => handleNavClick(e, 'home')}
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                            <div className="flex h-10 w-10 items-center justify-center bg-primary/10 rounded-full text-primary">
                                <span className="material-symbols-outlined text-2xl">headphones</span>
                            </div>
                            <h2 className="text-slate-900 text-xl font-bold hero-title leading-tight tracking-[-0.015em] font-serif">OpenAudio</h2>
                        </a>
                    </div>
                    <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
                        <nav className="flex items-center gap-9">
                            <a
                                href="/library"
                                onClick={(e) => handleNavClick(e, 'library')}
                                className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
                            >
                                Listen
                            </a>
                            <a
                                href="/instructors"
                                className="text-primary transition-colors text-sm font-bold leading-normal underline"
                                onClick={(e) => e.preventDefault()}
                            >
                                Instructor Resources
                            </a>
                            <a
                                href="/recognition"
                                onClick={(e) => handleNavClick(e, 'recognition')}
                                className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
                            >
                                Recognition
                            </a>
                            <a
                                href="/about"
                                onClick={(e) => handleNavClick(e, 'about')}
                                className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
                            >
                                About
                            </a>
                        </nav>
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-slate-700 p-2 hover:bg-slate-50 rounded-lg z-50 relative"
                    >
                        <span className="material-symbols-outlined">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </header>

            <main className="flex-grow">
                <article className="max-w-7xl mx-auto w-full px-6 py-16 lg:px-20 lg:py-24">
                    
                    {/* Hero Section */}
                    <div className="mb-16 text-center max-w-4xl mx-auto">
                        <h1 className="text-slate-900 text-4xl lg:text-6xl font-bold font-serif leading-tight tracking-tight mb-6">
                            Zero Friction <span className="text-primary relative inline-block">Adoption</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light leading-relaxed">
                            Easily integrate OpenAudio into your learning management system. We provide full Canvas export packages containing chapter modules, embedded audio players, and textbook links—ready to import in minutes.
                        </p>
                    </div>

                    {/* Adoption Guide */}
                    <div className="mb-20 bg-slate-50 rounded-2xl p-8 lg:p-12 border border-slate-200">
                        <h2 className="text-3xl font-bold font-serif text-slate-900 mb-8 text-center">How to import into Canvas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-primary font-bold text-2xl mb-4">1</div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Download Package</h3>
                                <p className="text-slate-600 text-sm">Download the .imscc course export package for your textbook from the library below.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-primary font-bold text-2xl mb-4">2</div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Canvas Settings</h3>
                                <p className="text-slate-600 text-sm">Navigate to your Canvas course, click <strong>Settings</strong>, then select <strong>Import Course Content</strong>.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-primary font-bold text-2xl mb-4">3</div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Import Canvas Export</h3>
                                <p className="text-slate-600 text-sm">Select "Canvas Course Export Package", upload the downloaded file, and click <strong>Import</strong>.</p>
                            </div>
                        </div>
                    </div>

                    {/* Download Center */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold font-serif text-slate-900 mb-8">Download Course Shells</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Object.values(library).map((book) => {
                                const filename = imsccFilenameMap[book.id];
                                const downloadUrl = filename 
                                    ? `https://github.com/OpenAudioOER/listen/releases/download/v1.0.0/${filename}` 
                                    : '#';

                                return (
                                    <div key={book.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col group">
                                        <div className="aspect-[4/3] rounded-lg bg-slate-100 overflow-hidden mb-6 relative border border-slate-200/50">
                                            <img src={book.coverImageWide} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{book.title}</h3>
                                        <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-grow">{book.description}</p>
                                        
                                        <a 
                                            href={downloadUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors focus:ring-4 focus:ring-primary/20 outline-none cursor-pointer"
                                        >
                                            <Download size={18} />
                                            Download .imscc
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </article>
            </main>

            <footer className="bg-slate-50 border-t border-slate-200 py-16 px-6 lg:px-20 mt-auto">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            onClick={(e) => handleNavClick(e, 'home')}
                            className="bg-primary/10 p-2 rounded-full text-primary hover:opacity-80 transition-opacity"
                        >
                            <span className="material-symbols-outlined text-2xl">headphones</span>
                        </a>
                        <span className="text-slate-800 font-bold font-serif-polished text-xl">OpenAudio</span>
                    </div>
                    <div className="text-slate-500 text-sm font-medium">
                        © {new Date().getFullYear()} OpenAudio. Creative Commons CC-BY-SA.
                    </div>
                    <div className="flex gap-6">
                        <EmailLink
                            className="text-slate-400 hover:text-primary transition-colors bg-white h-10 w-10 rounded-full shadow-sm hover:shadow-md border border-slate-100 flex items-center justify-center"
                            title="Email us"
                        >
                            <span className="material-symbols-outlined text-xl">mail</span>
                        </EmailLink>
                    </div>
                </div>
            </footer>
        </div>
    );
};
