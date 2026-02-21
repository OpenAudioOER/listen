import React, { useState, useEffect, useRef } from 'react';

interface LandingPageProps {
  onNavigateLibrary: () => void;
  onNavigateBook: (bookId: string) => void;
}

function Counter({ target, duration = 2000, suffix = "" }: { target: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
}

export function LandingPage({ onNavigateLibrary, onNavigateBook }: LandingPageProps) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root bg-background-light text-slate-800 antialiased overflow-x-hidden">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-blue-100 bg-white/95 backdrop-blur-md px-6 py-4 lg:px-20 shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-primary/10 rounded-full text-primary">
              <span className="material-symbols-outlined text-2xl">headphones</span>
            </div>
            <h2 className="text-slate-900 text-xl font-bold hero-title leading-tight tracking-[-0.015em] font-serif">OpenAudio</h2>
          </div>
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-9">
              <button
                onClick={onNavigateLibrary}
                className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
              >
                Listen
              </button>
              <a className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#instructors">Instructor Resources</a>
              <a className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Recognition</a>
              <a className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">About</a>
            </nav>
          </div>
          <button className="lg:hidden text-slate-700 p-2 hover:bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>
      <main className="flex-grow">
        <section className="relative px-6 py-16 lg:px-20 lg:py-28 max-w-[1440px] mx-auto w-full overflow-hidden bg-pattern-dots">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl -z-10"></div>
          <div className="flex flex-col gap-12 relative z-10">
            <div className="flex flex-col gap-6 text-center max-w-4xl mx-auto">
              <div className="inline-flex mx-auto items-center gap-2 rounded-full bg-white/80 border border-blue-100 px-3 py-1 text-sm font-medium text-primary shadow-sm mb-2">
                <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                Enhance your learning with audio
              </div>
              <h1 className="text-slate-900 text-5xl lg:text-7xl font-black hero-title leading-[1.1] tracking-[-0.02em] font-serif">
                Textbooks that <span className="text-primary italic relative inline-block">speak<svg className="absolute -bottom-2 left-0 w-full text-yellow-300 -z-10 h-3" preserveAspectRatio="none" viewBox="0 0 100 20"><path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="8" /></svg></span> to you
              </h1>
              <p className="text-slate-600 text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                Free, high-quality audio resources for students and educators. Making education accessible, free, and engaging one chapter at a time.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-6">
                <button
                  onClick={onNavigateLibrary}
                  className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary hover:bg-primary-dark transition-all transform hover:-translate-y-0.5 text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30"
                >
                  Start Listening
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 pt-12">
              {[
                { id: 'am-gov-4e', title: 'American Government', edition: 'OpenStax 4e', isNew: true, img: '/cover.png', color: 'text-blue-100' },
                { id: 'intro-soc-3e', title: 'Introduction to Sociology', edition: 'OpenStax 3e', isNew: false, img: '/cover_soc.png', color: 'text-emerald-50' },
                { id: 'us-history', title: 'US History', edition: 'OpenStax', isNew: false, img: '/cover_us_history.png', color: 'text-fuchsia-50' },
                { id: 'world-hist-v1', title: 'World History: To 1500', edition: 'OpenStax Vol. 1', isNew: false, img: '/cover_world_hist.png', color: 'text-amber-50' },
                { id: 'am-gov-3e', title: 'American Government', edition: 'OpenStax 3e', isNew: false, img: '/cover_am_gov_3e.png', color: 'text-rose-50' },
              ].map((book, idx) => (
                <div key={idx} onClick={() => onNavigateBook(book.id)} className="group cursor-pointer flex flex-col gap-4 transition-transform hover:-translate-y-2">
                  <div className="w-full aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden shadow-soft group-hover:shadow-hover transition-all relative border border-slate-200">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${book.img}')` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                      {book.isNew && (
                        <div className="z-10 bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-auto self-start">New</div>
                      )}
                      <div className="z-10">
                        <h3 className="font-serif-polished text-2xl font-bold leading-tight mb-1 text-white">{book.title}</h3>
                        <p className={`${book.color} text-sm font-medium`}>{book.edition}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white border-y border-slate-100 relative overflow-hidden">
          <div className="px-6 py-20 lg:px-20 max-w-[1440px] mx-auto w-full relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
              <div className="flex flex-col gap-6 max-w-md">
                <h2 className="text-slate-900 tracking-tight text-3xl md:text-5xl font-bold font-serif-polished leading-[1.15]">
                  Listen on your <br /><span className="text-primary">favorite platforms</span>
                </h2>
                <p className="text-slate-600 text-lg font-normal leading-relaxed">
                  Available wherever you get your podcasts. We ensure accessibility across all major streaming services with full chapter support.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 w-full">
                {[
                  { name: 'Spotify', sub: 'Stream for free', color: 'green', path: 'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm31.07-46.26a8,8,0,0,1-10.81,3.33,42.79,42.79,0,0,0-40.52,0,8,8,0,0,1-7.48-14.14,59.33,59.33,0,0,1,55.48,0A8,8,0,0,1,159.07,169.74Zm32-56a8,8,0,0,1-10.83,3.29,110.62,110.62,0,0,0-104.46,0,8,8,0,0,1-7.54-14.12,126.67,126.67,0,0,1,119.54,0A8,8,0,0,1,191.06,113.76Zm-16,28a8,8,0,0,1-10.82,3.3,77,77,0,0,0-72.48,0,8,8,0,0,1-7.52-14.12,93,93,0,0,1,87.52,0A8,8,0,0,1,175.06,141.76Z' },
                  { name: 'YouTube', sub: 'Listen any time', color: 'red', path: 'M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z' },
                  { name: 'Apple Podcasts', sub: 'Learn on the go', color: 'purple', path: 'M154.2,138.33a32,32,0,1,0-52.4,0,24.27,24.27,0,0,0-8.76,7,23.68,23.68,0,0,0-4.3,20.49l12.18,48A24.18,24.18,0,0,0,124.44,232h7.12a24.18,24.18,0,0,0,23.52-18.15l12.18-48a23.68,23.68,0,0,0-4.3-20.49A24.27,24.27,0,0,0,154.2,138.33ZM128,104a16,16,0,1,1-16,16A16,16,0,0,1,128,104Zm23.75,57.91-12.18,48a8.18,8.18,0,0,1-8,6.09h-7.12a8.18,8.18,0,0,1-8-6.09l-12.18-48a7.71,7.71,0,0,1,1.42-6.73,8.26,8.26,0,0,1,6.58-3.18h31.5a8.26,8.26,0,0,1,6.58,3.18A7.71,7.71,0,0,1,151.75,161.91ZM72,128a56.27,56.27,0,0,0,1.76,14,8,8,0,1,1-15.49,4,72,72,0,1,1,139.46,0,8,8,0,0,1-7.74,6,8.12,8.12,0,0,1-2-.25,8,8,0,0,1-5.75-9.74A56,56,0,1,0,72,128Zm160,0a103.86,103.86,0,0,1-46.49,86.66,8,8,0,0,1-8.86-13.32,88,88,0,1,0-97.31,0A8,8,0,0,1,74.91,216a7.92,7.92,0,0,1-4.42-1.34A104,104,0,1,1,232,128Z' }
                ].map((item, idx) => {
                  const bdColor = `hover:border-${item.color}-200`;
                  const shColor = `hover:shadow-${item.color}-500/10`;
                  const bgColor = `bg-${item.color}-50`;
                  const hoverBg = `group-hover:bg-${item.color}-100`;
                  const textColor = `text-${item.color}-600`;

                  return (
                    <div key={idx} className={`flex gap-4 rounded-2xl border border-slate-100 bg-surface-white p-6 hover:shadow-xl transition-all items-center sm:flex-col sm:items-start sm:gap-6 group ${bdColor} ${shColor}`}>
                      <div className={`text-slate-900 ${bgColor} ${hoverBg} p-4 rounded-xl transition-colors`}>
                        <svg className={textColor} fill="currentColor" height="32px" viewBox="0 0 256 256" width="32px" xmlns="http://www.w3.org/2000/svg">
                          <path d={item.path}></path>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-slate-900 text-lg font-bold font-serif-polished">{item.name}</h3>
                        <p className="text-slate-500 text-sm">{item.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background-tint-cream">
          <div className="px-6 py-20 lg:px-20 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center gap-4 rounded-3xl p-10 bg-white shadow-sm border border-orange-100 text-center md:text-left relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-orange-200 group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-100 rounded-full opacity-50 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2 relative z-10">
                  <span className="material-symbols-outlined text-orange-500 text-3xl">play_circle</span>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Total Streams</p>
                </div>
                <p className="text-slate-900 tracking-tight text-6xl lg:text-7xl font-bold font-serif-polished leading-tight relative z-10">
                  <Counter target={680000} suffix="+" />
                </p>
                <p className="text-slate-600 text-lg relative z-10">Downloads and Streams as of February 2026</p>
              </div>
              <div className="flex flex-col justify-center gap-4 rounded-3xl p-10 bg-white shadow-sm border border-blue-100 text-center md:text-left relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2 relative z-10">
                  <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Streaming Time</p>
                </div>
                <p className="text-slate-900 tracking-tight text-6xl lg:text-7xl font-bold font-serif-polished leading-tight relative z-10">
                  <Counter target={22} suffix="+" /> Years
                </p>
                <p className="text-slate-600 text-lg relative z-10">Of cumulative listening across platforms</p>
              </div>
            </div>
          </div>
        </section>
        <section id="instructors" className="bg-background-tint-purple py-24 border-t border-purple-100">
          <div className="px-6 lg:px-20 max-w-[1440px] mx-auto w-full">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 flex flex-col gap-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-purple-100">
                  <span className="material-symbols-outlined text-purple-600 text-lg">school</span>
                  <span className="text-xs font-bold uppercase text-purple-700 tracking-wide">For Educators</span>
                </div>
                <h2 className="text-slate-900 text-4xl lg:text-5xl font-bold font-serif-polished leading-tight tracking-[-0.02em]">
                  Seamless Integration with Canvas LMS
                </h2>
                <p className="text-slate-700 text-xl leading-relaxed">
                  Our audiobooks integrate directly with your existing LMS. Embed audio players, provide full textbook chapters, and assign learning tasks without leaving your course environment.
                </p>
                <ul className="flex flex-col gap-4 mt-2">
                  <li className="flex items-center gap-4">
                    <div className="bg-purple-100 p-1 rounded-full text-purple-600">
                      <span className="material-symbols-outlined text-xl">check</span>
                    </div>
                    <span className="text-slate-800 font-medium text-lg">Easy Canvas integration</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-purple-100 p-1 rounded-full text-purple-600">
                      <span className="material-symbols-outlined text-xl">check</span>
                    </div>
                    <span className="text-slate-800 font-medium text-lg">Enhance your course shell</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-purple-100 p-1 rounded-full text-purple-600">
                      <span className="material-symbols-outlined text-xl">check</span>
                    </div>
                    <span className="text-slate-800 font-medium text-lg">Free forever for all instructors</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="w-full aspect-[1814/1080] rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 bg-slate-900 relative group border-4 border-white">
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/canvas.mp4"
                    title="Canvas LMS interface with OpenAudio player embedded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-24 lg:px-20 max-w-[1440px] mx-auto w-full bg-white relative">
          <div className="absolute left-10 top-10 text-slate-50 text-[200px] font-serif-polished leading-none select-none -z-10 font-black opacity-60">"</div>
          <div className="flex flex-col gap-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-slate-900 text-4xl font-bold font-serif-polished leading-tight mb-4">What students are saying</h2>
              <p className="text-slate-600 text-lg">Join thousands of students who are improving their grades and saving time with our accessible audio resources.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-6 p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 group">
                <div className="flex gap-1 text-yellow-400">
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-lg font-serif-polished italic">
                  "Thanks for developing this resource! I was happy to have this alternative format to provide my students. Many have shared that they are using it regularly either while reading along in the text or to re-review material that they have read."
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-50">
                  <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white shadow-sm">
                    <div className="w-full h-full bg-center bg-cover" data-alt="Avatar of Professor" style={{ backgroundImage: "url('/avatar1.png')" }}></div>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Sociology Professor</p>
                    <p className="text-primary text-xs font-bold uppercase tracking-wide">Introduction to Sociology</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 transform md:-translate-y-6 md:scale-105 z-10 relative overflow-hidden transition-all duration-300 hover:-translate-y-8">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full"></div>
                <div className="flex gap-1 text-yellow-300 relative z-10">
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                </div>
                <p className="text-white/95 leading-relaxed text-lg font-serif-polished italic relative z-10">
                  "I am so grateful I found this. Working full time, in school full time, and having other extracurricular activities I have committed to, this makes it so much easier for me to stay on top of it all. Thank you, thank you, thank you! I have zero doubts I will pass all of my classes."
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/20 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-white/20 overflow-hidden ring-2 ring-white/30 shadow-sm">
                    <div className="w-full h-full bg-center bg-cover" data-alt="Avatar of student 1" style={{ backgroundImage: "url('/avatar3.png')" }}></div>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Sociology Student</p>
                    <p className="text-blue-100 text-xs font-bold uppercase tracking-wide">Introduction to Sociology</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 group">
                <div className="flex gap-1 text-yellow-400">
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                  <span className="material-symbols-outlined text-xl fill-current">star</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-lg font-serif-polished italic">
                  "This audiobook was so helpful! I have a learning disability and learn better when I read the text while also listening to it. I hate having to use text-to-speech software because of how it sounds. However, this was amazing. Thank you!"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-50">
                  <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white shadow-sm">
                    <div className="w-full h-full bg-center bg-cover" data-alt="Avatar of student 2" style={{ backgroundImage: "url('/avatar2.png')" }}></div>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Political Science Student</p>
                    <p className="text-primary text-xs font-bold uppercase tracking-wide">American Government 3e</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-50 border-t border-slate-200 py-16 px-6 lg:px-20">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full text-primary">
              <span className="material-symbols-outlined text-2xl">headphones</span>
            </div>
            <span className="text-slate-800 font-bold font-serif-polished text-xl">OpenAudio</span>
          </div>
          <div className="text-slate-500 text-sm font-medium">
            © 2026 OpenAudio. Creative Commons CC-BY-SA.
          </div>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors bg-white p-2 rounded-full shadow-sm hover:shadow-md border border-slate-100" href="#">
              <span className="sr-only">Twitter</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a className="text-slate-400 hover:text-primary transition-colors bg-white p-2 rounded-full shadow-sm hover:shadow-md border border-slate-100" href="#">
              <span className="sr-only">Github</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
