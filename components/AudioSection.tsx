import React from 'react';
import { PlayCircle, Mic, Video, Podcast, Headphones } from 'lucide-react';
import { Timestamp, ResourceLink } from '../types';

interface AudioSectionProps {
  embedUrl: string;
  links: ResourceLink[];
  timestamps: Timestamp[];
}

export const AudioSection: React.FC<AudioSectionProps> = ({ embedUrl, links, timestamps }) => {
  
  const getIconForPlatform = (platform: string) => {
    switch (platform) {
      case 'Spotify': return <Podcast size={20} className="text-green-500" />;
      case 'YouTube': return <Video size={20} className="text-red-500" />;
      case 'Apple Podcasts': return <Mic size={20} className="text-purple-500" />;
      default: return <PlayCircle size={20} />;
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">Audio Resources</h2>
        <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 tracking-wide">NEW</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Player (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-1 shadow-lg overflow-hidden h-[352px]">
             {/* Spotify Embed */}
             <iframe 
                style={{ borderRadius: '12px' }} 
                src={embedUrl} 
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
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                    <Headphones size={16} className="text-slate-500" />
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Audio Timestamps</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {timestamps.map((ts, idx) => (
                        <div key={idx} className="flex items-start sm:items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
                            <span className="flex-shrink-0 px-2 py-1 bg-brand-50 text-brand-700 text-xs font-mono rounded border border-brand-100">
                                {ts.time}
                            </span>
                            <span className="text-slate-700 font-medium text-sm sm:text-base">
                                {ts.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};