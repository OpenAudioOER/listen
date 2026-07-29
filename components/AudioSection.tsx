import React, { useState, useEffect } from 'react';
import { PlayCircle, Mic, Video, Podcast, Headphones, Play, Clock } from 'lucide-react';
import { Timestamp, ResourceLink } from '../types';

interface AudioSectionProps {
  embedUrl: string;
  links: ResourceLink[];
  timestamps: Timestamp[];
}

export const AudioSection: React.FC<AudioSectionProps> = ({ embedUrl, links, timestamps }) => {
  const [currentEmbedUrl, setCurrentEmbedUrl] = useState(embedUrl);
  const [activeTimestampIndex, setActiveTimestampIndex] = useState<number | null>(null);

  useEffect(() => {
    setCurrentEmbedUrl(embedUrl);
    setActiveTimestampIndex(null);
  }, [embedUrl]);

  const parseTimeToSeconds = (timeStr: string): number => {
    const parts = timeStr.trim().split(':').map(Number);
    if (parts.some(isNaN)) return 0;
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  const handleTimestampClick = (timeStr: string, idx: number) => {
    const seconds = parseTimeToSeconds(timeStr);
    setActiveTimestampIndex(idx);

    let cleanUrl = embedUrl.replace(/([?&])t=\d+/, '');
    const separator = cleanUrl.includes('?') ? '&' : '?';
    const updatedUrl = `${cleanUrl}${separator}t=${seconds}`;
    setCurrentEmbedUrl(updatedUrl);
  };

  const getIconForPlatform = (platform: string) => {
    switch (platform) {
      case 'Spotify': return <Podcast size={20} className="text-green-500" />;
      case 'YouTube': return <Video size={20} className="text-red-500" />;
      case 'Apple Podcasts': return <Mic size={20} className="text-purple-500" />;
      default: return <PlayCircle size={20} />;
    }
  };

  const formatSpotifyEmbedUrl = (url: string) => {
    if (!url || !url.includes('spotify.com/embed')) return url;
    if (url.includes('theme=0')) return url;
    if (url.includes('theme=')) return url.replace(/theme=\d/, 'theme=0');
    return url.includes('?') ? `${url}&theme=0` : `${url}?theme=0`;
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">Audio Resources</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Player (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-1 shadow-lg overflow-hidden relative">
             {/* Spotify Embed */}
             <iframe 
                style={{ borderRadius: '12px' }} 
                src={formatSpotifyEmbedUrl(currentEmbedUrl)} 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen={false} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Audiobook Player"
              ></iframe>
          </div>
        </div>

        {/* Right Column: Links & Metadata (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Platform Links */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Listen on Platforms</h3>
            <div className="space-y-3">
              {links.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                >
                  <div className="flex items-center gap-3 font-medium text-slate-700">
                    <div className="p-2 bg-slate-50 rounded-full group-hover:bg-white transition-colors">
                      {getIconForPlatform(link.platform)}
                    </div>
                    {link.platform}
                  </div>
                  <span className="text-slate-400 group-hover:text-brand-600 transition-colors">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Full Width: Timestamps */}
        <div className="col-span-1 lg:col-span-12">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Headphones size={16} className="text-slate-500" />
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Audio Timestamps</h3>
                    </div>
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
                      Click any timestamp to jump to that section
                    </span>
                </div>
                <div className="divide-y divide-slate-100">
                    {timestamps.map((ts, idx) => {
                        const isActive = activeTimestampIndex === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleTimestampClick(ts.time, idx)}
                                className={`w-full text-left flex items-center justify-between px-6 py-3.5 transition-all group cursor-pointer ${
                                  isActive 
                                    ? 'bg-brand-50/80 border-l-4 border-l-brand-600' 
                                    : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                                      isActive
                                        ? 'bg-brand-600 text-white border-brand-600 font-bold'
                                        : 'bg-brand-50 text-brand-700 border-brand-100 group-hover:bg-brand-100'
                                    }`}>
                                        {ts.time}
                                    </span>
                                    <span className={`text-sm sm:text-base transition-colors ${
                                      isActive
                                        ? 'text-brand-900 font-bold'
                                        : 'text-slate-700 font-medium group-hover:text-brand-700'
                                    }`}>
                                        {ts.label}
                                    </span>
                                </div>
                                
                                <div className={`flex items-center gap-1.5 text-xs font-semibold rounded-full px-2.5 py-1 transition-all ${
                                  isActive
                                    ? 'bg-brand-600 text-white opacity-100'
                                    : 'text-brand-600 bg-brand-50 opacity-0 group-hover:opacity-100'
                                }`}>
                                    {isActive ? <Clock size={12} /> : <Play size={12} className="fill-current" />}
                                    <span>{isActive ? `Cued at ${ts.time}` : 'Jump to'}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};