import React, { useState } from 'react';
import { ChapterData } from '../types';
import { PlayCircle, ChevronDown, ChevronUp, Podcast, Video, Mic, Clock, ExternalLink, Headphones, Share2, Check } from 'lucide-react';

interface AudioCollectionProps {
  chapters: ChapterData[];
  bookTitle: string;
}

export const AudioCollection: React.FC<AudioCollectionProps> = ({ chapters, bookTitle }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleChapter = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.warn("Clipboard API not available in this context");
      }
    } catch (err) {
      console.warn("Failed to copy URL to clipboard:", err);
    }
  };

  const getIconForPlatform = (platform: string) => {
    switch (platform) {
      case 'Spotify': return <Podcast size={18} className="text-green-500" />;
      case 'YouTube': return <Video size={18} className="text-red-500" />;
      case 'Apple Podcasts': return <Mic size={18} className="text-purple-500" />;
      default: return <ExternalLink size={18} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
         <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-100">
              Complete Archive
            </span>
         </div>
         
         <div className="flex flex-col items-center justify-center relative">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight">
              {bookTitle}:<br />Audio Resources
            </h1>
            
            <button 
              onClick={handleShare}
              className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all"
              title="Copy link to this collection"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
              <span className="font-medium">{copied ? 'Copied!' : 'Share Collection'}</span>
            </button>
         </div>

         <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
           Access the full collection of audio narrations, timestamps, and external platform links for every chapter.
         </p>
      </div>
      
      <div className="space-y-4">
        {chapters.map((chapter) => {
          const isExpanded = expandedId === chapter.chapterNumber;
          
          return (
            <div 
              key={chapter.chapterNumber} 
              className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-brand-200 shadow-lg ring-1 ring-brand-100' : 'border-slate-200 shadow-sm hover:border-brand-200'}`}
            >
              <button 
                onClick={() => toggleChapter(chapter.chapterNumber)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {isExpanded ? <PlayCircle size={20} /> : <span className="font-bold text-sm">{chapter.chapterNumber}</span>}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold transition-colors ${isExpanded ? 'text-brand-700' : 'text-slate-900'}`}>
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-slate-500 hidden sm:block">
                      {chapter.subtitle}
                    </p>
                  </div>
                </div>
                <div className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-6 space-y-6">
                  
                  {/* Embedded Player */}
                  <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md">
                    <iframe 
                        style={{ borderRadius: '12px' }} 
                        src={chapter.audioEmbedUrl} 
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allowFullScreen={false} 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        title={`Chapter ${chapter.chapterNumber} Audio`}
                    ></iframe>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Platform Links */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Listen on Platforms</h4>
                      <div className="space-y-2">
                        {chapter.resourceLinks.map((link, idx) => (
                          <a 
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all text-sm group"
                          >
                            <div className="flex items-center gap-2.5">
                              {getIconForPlatform(link.platform)}
                              <span className="font-medium text-slate-700">{link.platform}</span>
                            </div>
                            <ExternalLink size={14} className="text-slate-300 group-hover:text-brand-500" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Timestamps */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-slate-400">
                         <Headphones size={16} />
                         <h4 className="text-xs font-bold uppercase tracking-wider">Audio Timestamps</h4>
                      </div>
                      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="divide-y divide-slate-100">
                          {chapter.timestamps.map((ts, idx) => (
                            <div key={idx} className="flex items-start gap-3 px-3 py-2 text-sm hover:bg-slate-50">
                                <div className="flex items-center gap-1.5 flex-shrink-0 text-brand-600 font-mono text-xs bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 mt-0.5">
                                    <Clock size={10} />
                                    <span>{ts.time}</span>
                                </div>
                                <span className="text-slate-600 leading-snug">{ts.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};