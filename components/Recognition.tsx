import React, { useState, useEffect } from 'react';
import { EmailLink } from './EmailLink';

interface RecognitionProps {
    onNavigateHome: () => void;
    onNavigateLibrary: () => void;
    onNavigateAbout: () => void;
}

export const Recognition: React.FC<RecognitionProps> = ({ onNavigateHome, onNavigateLibrary, onNavigateAbout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const handleNavClick = (e: React.MouseEvent, type: 'home' | 'library' | 'instructors' | 'about') => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        setIsMenuOpen(false);
        if (type === 'home') onNavigateHome();
        else if (type === 'library') onNavigateLibrary();
        else if (type === 'about') onNavigateAbout();
        else if (type === 'instructors') {
            onNavigateHome();
            setTimeout(() => {
                document.getElementById('instructors')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root bg-background-light text-slate-800 antialiased overflow-x-hidden">
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
                        href="/#instructors"
                        onClick={(e) => handleNavClick(e, 'instructors')}
                        className="text-2xl font-serif text-slate-900 hover:text-primary transition-colors"
                    >
                        Instructor Resources
                    </a>
                    <a
                        href="/recognition"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-serif text-primary font-bold underline"
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
                            onClick={(e) => handleNavClick(e, 'home')} // Corrected: use handleNavClick for home too
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
                                href="/#instructors"
                                onClick={(e) => handleNavClick(e, 'instructors')}
                                className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
                            >
                                Instructor Resources
                            </a>
                            <a
                                href="/recognition"
                                className="text-primary transition-colors text-sm font-bold leading-normal underline"
                                onClick={(e) => e.preventDefault()}
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
                <section className="px-6 py-16 lg:px-20 max-w-[1440px] mx-auto w-full">
                    <div className="max-w-3xl">
                        <h1 className="text-slate-900 text-4xl lg:text-5xl font-black hero-title leading-tight mb-4 font-serif">
                            Recognition & Awards
                        </h1>
                        <p className="text-slate-600 text-lg lg:text-xl font-light leading-relaxed">
                            Highlighting our impact in innovation, accessibility, and open education.
                        </p>
                    </div>
                </section>

                <section className="bg-background-tint-blue/30 border-t border-slate-100 relative overflow-hidden">
                    <div className="px-6 py-16 lg:px-20 max-w-[1440px] mx-auto w-full relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* OE Global Winner 2024 */}
                            <div className="group flex flex-col gap-6 p-8 rounded-3xl bg-surface-white border border-slate-100 shadow-soft hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-9xl text-primary">trophy</span>
                                </div>
                                <div className="size-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-2 shadow-sm border border-blue-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">trophy</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-primary text-sm font-bold uppercase tracking-wider">Winner • 2024</p>
                                    <h3 className="text-slate-900 text-2xl font-bold font-serif leading-tight">Open Education Award for Excellence</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Recipient of the 2024 international award recognizing pioneering use of artificial intelligence in producing open educational audiobooks, advancing scalable innovation, accessibility, and learner engagement.
                                </p>
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">OE</div>
                                    <span className="text-sm font-medium text-slate-500">Open Education Global</span>
                                </div>
                            </div>

                            {/* OE Global Finalist 2023 */}
                            <div className="group flex flex-col gap-6 p-8 rounded-3xl bg-surface-white border border-slate-100 shadow-soft hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-9xl text-amber-500">school</span>
                                </div>
                                <div className="size-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 shadow-sm border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">school</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-amber-600 text-sm font-bold uppercase tracking-wider">Finalist • 2023</p>
                                    <h3 className="text-slate-900 text-2xl font-bold font-serif leading-tight">Significant Impact OER</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Named a finalist by OE Global for openly shared educational resources that demonstrate measurable impact on accessibility, innovation, and learning outcomes through high-quality, openly licensed materials.
                                </p>
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">OE</div>
                                    <span className="text-sm font-medium text-slate-500">Open Education Global</span>
                                </div>
                            </div>

                            {/* Cramer Endowment Grant */}
                            <div className="group flex flex-col gap-6 p-8 rounded-3xl bg-surface-white border border-slate-100 shadow-soft hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-9xl text-emerald-500">volunteer_activism</span>
                                </div>
                                <div className="size-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-sm border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider">Grant • 2023</p>
                                    <h3 className="text-slate-900 text-2xl font-bold font-serif leading-tight">Cramer Endowment Grant</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Selected for competitive funding from the Los Angeles Harbor College Foundation to develop two audiobook initiatives designed to strengthen instructional effectiveness and directly support student success.
                                </p>
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">LA</div>
                                    <span className="text-sm font-medium text-slate-500">Los Angeles Harbor College Foundation</span>
                                </div>
                            </div>

                            {/* CC-ECHO Grant */}
                            <div className="group flex flex-col gap-6 p-8 rounded-3xl bg-surface-white border border-slate-100 shadow-soft hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-9xl text-purple-500">local_library</span>
                                </div>
                                <div className="size-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 shadow-sm border border-purple-100 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">local_library</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-purple-600 text-sm font-bold uppercase tracking-wider">Grant • 2022 & 2024</p>
                                    <h3 className="text-slate-900 text-2xl font-bold font-serif leading-tight">CC-ECHO, US Department of Education</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Awarded funding through the CC-ECHO (California Consortium for Equitable and Inclusive Open Educational Resources) Grant, a program supported by the US Department of Education, recognizing leadership in expanding equitable access to high-quality open learning materials and lowering student costs.
                                </p>
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">US</div>
                                    <span className="text-sm font-medium text-slate-500">US Department of Education</span>
                                </div>
                            </div>

                            {/* Open Education Week Speaker */}
                            <div className="group flex flex-col gap-6 p-8 rounded-3xl bg-surface-white border border-slate-100 shadow-soft hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-9xl text-pink-500">mic</span>
                                </div>
                                <div className="size-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-2 shadow-sm border border-pink-100 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">mic</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-pink-600 text-sm font-bold uppercase tracking-wider">Speaker • 2026</p>
                                    <h3 className="text-slate-900 text-2xl font-bold font-serif leading-tight">Open Education Week</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Invited as a featured presenter for Nanyang Technological University's Open Education Week 2026 to discuss how artificial intelligence is reshaping OER creation, sharing insights with faculty, librarians, and partner institutions including the ASEAN University Network.
                                </p>
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">NT</div>
                                    <span className="text-sm font-medium text-slate-500">Nanyang Technological University</span>
                                </div>
                            </div>

                            {/* Incarcerated Student Program */}
                            <div className="group flex flex-col gap-6 p-8 rounded-3xl bg-surface-white border border-slate-100 shadow-soft hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-9xl text-slate-500">balance</span>
                                </div>
                                <div className="size-14 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center mb-2 shadow-sm border border-slate-200 group-hover:bg-slate-700 group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">balance</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-slate-600 text-sm font-bold uppercase tracking-wider">Adoption • 2026</p>
                                    <h3 className="text-slate-900 text-2xl font-bold font-serif leading-tight">Incarcerated Students Program</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    OpenAudio resources are utilized by Feather River College’s Incarcerated Student Program. Because students within California's correctional facilities cannot access internet or streaming platforms, our downloadable chapter audio files provide a crucial, California Department of Corrections and Rehabilitation-approved offline learning tool for students pursuing higher education while incarcerated.
                                </p>
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">FR</div>
                                    <span className="text-sm font-medium text-slate-500">Feather River College</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-background-tint-cream py-24">
                    <div className="px-6 lg:px-20 max-w-[1440px] mx-auto w-full">
                        <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                            <div className="max-w-2xl">
                                <h2 className="text-slate-900 text-3xl lg:text-4xl font-bold font-serif leading-tight mb-4">
                                    Our Impact in Numbers
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Beyond the awards, our greatest achievement is the community of learners we serve. Every month, thousands of students access free, high-quality educational content.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-32 md:w-40 transition-transform hover:-translate-y-1">
                                    <span className="text-4xl font-bold text-primary font-serif mb-1">5</span>
                                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider text-center">Free OER Audiobooks</span>
                                </div>
                                <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-32 md:w-40 transition-transform hover:-translate-y-1">
                                    <span className="text-4xl font-bold text-primary font-serif mb-1">160+</span>
                                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider text-center">Hours of Audio</span>
                                </div>
                                <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-32 md:w-40 transition-transform hover:-translate-y-1">
                                    <span className="text-4xl font-bold text-primary font-serif mb-1">896K</span>
                                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider text-center">Streams & Downloads</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-50 border-t border-slate-200 py-16 px-6 lg:px-20">
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
                        © 2026 OpenAudio. Creative Commons CC-BY-SA.
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
