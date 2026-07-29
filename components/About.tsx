import React, { useState, useEffect } from 'react';
import { EmailLink } from './EmailLink';

interface AboutProps {
    onNavigateHome: () => void;
    onNavigateLibrary: () => void;
    onNavigateRecognition: () => void;
    onNavigateInstructors?: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateHome, onNavigateLibrary, onNavigateRecognition, onNavigateInstructors }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const handleNavClick = (e: React.MouseEvent, type: 'home' | 'library' | 'instructors' | 'recognition') => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        setIsMenuOpen(false);
        if (type === 'home') onNavigateHome();
        else if (type === 'library') onNavigateLibrary();
        else if (type === 'recognition') onNavigateRecognition();
        else if (type === 'instructors') {
            if (onNavigateInstructors) onNavigateInstructors();
        }
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
                        onClick={(e) => handleNavClick(e, 'instructors')}
                        className="text-2xl font-serif text-slate-900 hover:text-primary transition-colors"
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
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-serif text-primary font-bold underline transition-colors"
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
                                onClick={(e) => handleNavClick(e, 'instructors')}
                                className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
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
                                className="text-primary transition-colors text-sm font-bold leading-normal underline"
                                onClick={(e) => e.preventDefault()}
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
                {/* Unified Reading View */}
                <article className="max-w-[1000px] mx-auto w-full px-6 py-16 lg:px-20 lg:py-24">
                    
                    {/* Header Banner area (subtle) */}
                    <div className="mb-8 relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
                        <h1 className="text-slate-900 text-5xl lg:text-7xl font-bold font-serif leading-tight tracking-tight mb-8">
                            About <span className="text-primary relative inline-block">OpenAudio</span>
                        </h1>
                        <p className="text-2xl text-slate-700 font-light leading-snug max-w-4xl">
                            We turn popular open-access textbooks into professionally narrated audiobooks, then give them away for <span className="font-semibold text-slate-900">free</span>. Every title is available on Spotify, Apple Podcasts, YouTube, and right here on our website.
                        </p>
                    </div>

                    <div className="max-w-3xl text-lg lg:text-xl text-slate-700 leading-relaxed font-light">
                        <p className="mb-8 font-medium text-slate-800 text-xl lg:text-2xl leading-relaxed">
                            No subscriptions, no paywalls, no catch.
                        </p>
                        
                        <p className="mb-8">
                            We work primarily with OpenStax textbooks, the most widely used open educational resources in higher education. By producing high-quality audio versions of these texts, we give students one more way to connect with the material that matters to their education.
                        </p>

                        <div className="my-16 pl-6 border-l-2 border-slate-200">
                            <h2 className="text-3xl font-bold font-serif text-slate-900 mb-6 mt-0 flex items-center gap-3">
                                Why Audio?
                                <span className="material-symbols-outlined text-primary text-3xl hidden sm:inline-block">books_movies_and_music</span>
                            </h2>
                            <p className="mb-6">
                                A student with dyslexia shouldn't have to fight through a chapter that a classmate breezes through in an hour. A working parent driving to a night class shouldn't have to choose between the road and the reading. An English-language learner encountering unfamiliar terminology deserves to hear those words spoken clearly, not guess at pronunciation in silence.
                            </p>
                            <p className="mb-0">
                                Audio doesn't replace the textbook. It unlocks it. Many students listen while they read, using the narration to guide their pace, reinforce comprehension, and stay focused through dense material. Others listen on the go — during a commute, a workout, or a break between shifts — turning downtime into study time. When education meets students where they are, everyone benefits.
                            </p>
                        </div>

                        <div className="my-16 pl-6 border-l-2 border-slate-200">
                            <h2 className="text-3xl font-bold font-serif text-slate-900 mb-6 mt-0">How It Started</h2>
                            
                            <p className="mb-6">
                                Brian Barrick is an Associate Professor of Political Science at Los Angeles Harbor College. He's also someone who has always enjoyed learning through listening. Podcasts, audiobooks, lectures on long drives: that was how the material stuck. So when he looked at the OpenStax textbook he assigned to his own students, a thought took shape. <em className="text-slate-900 font-medium">What if they could listen to this, too?</em>
                            </p>

                            <p className="mb-6">
                                In Fall 2022, a grant from CC-ECHO (a U.S. Department of Education Open Textbooks Pilot program) made it possible to find out. Brian partnered with a student, Sarah Arya, and together they narrated all 17 chapters of the OpenStax American Government 3e textbook. The response was immediate. Students and instructors across the country started using it.
                            </p>

                            <p className="mb-0">
                                Additional grants from CC-ECHO and the Los Angeles Harbor College Foundation allowed the project to grow. Brian began producing new titles using advanced AI voice technology, making it possible to narrate entire textbooks that would have taken months to record by traditional methods. The library now spans multiple disciplines, including Political Science, Sociology, and History.
                            </p>
                        </div>

                        <div className="my-16 pl-6 border-l-2 border-slate-200">
                             <h2 className="text-3xl font-bold font-serif text-slate-900 mb-6 mt-0">What That Work Has Added Up To</h2>
                             <p className="mb-8 text-2xl lg:text-3xl font-serif text-primary leading-relaxed">
                                 Six free audiobooks. More than 190 hours of narrated content. Hundreds of thousands of streams and downloads worldwide.
                             </p>
                             <p className="mb-0">
                                OpenAudio received the 2024 Open Education Award for Excellence in the "Open with AI" category and was named a finalist for the 2023 Significant Impact OER award by Open Education Global. Our audiobooks have also been approved as an offline learning tool for incarcerated students pursuing higher education without internet access, a use case that reminds us every day why this work matters.
                             </p>
                        </div>

                        <div className="my-16 pl-6 border-l-2 border-slate-200">
                            <h2 className="text-3xl font-bold font-serif text-slate-900 mb-6 mt-0">Built for Instructors</h2>
                            <p className="mb-0">
                                Accessible materials only matter if they're easy to bring into the classroom. That's why we also publish free Canvas course shells to Canvas Commons, ready for instructors to import directly into their LMS. Each shell comes with embedded audio players and links to the full textbook, so integrating OpenAudio into an existing course takes minutes, not hours.
                            </p>
                        </div>

                        <div className="my-16 pl-6 border-l-2 border-slate-200">
                            <h2 className="text-3xl font-bold font-serif text-slate-900 mb-6 mt-0">Looking Ahead</h2>
                            <p className="mb-6">
                                New titles are already planned across additional disciplines, and we're exploring ways to make the listening experience even more useful for students who learn best with audio. We're always looking for educators, institutions, and organizations who believe that the best learning resources should be open, accessible, and free.
                            </p>
                            <p className="mb-0 font-medium text-slate-800">
                                If that sounds like you, get in touch. We'd love to work together.
                            </p>
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
