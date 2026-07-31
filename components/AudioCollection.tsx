import React, { useState, useEffect } from 'react';
import { ChapterData } from '../types';
import { PlayCircle, ChevronDown, Podcast, Video, Mic, Clock, ExternalLink, Headphones, Share2, Check, Play } from 'lucide-react';

interface AudioCollectionProps {
  chapters: ChapterData[];
  bookTitle: string;
}

const formatSpotifyEmbedUrl = (url: string) => {
  if (!url || !url.includes('spotify.com/embed')) return url;
  if (url.includes('theme=0')) return url;
  if (url.includes('theme=')) return url.replace(/theme=\d/, 'theme=0');
  return url.includes('?') ? `${url}&theme=0` : `${url}?theme=0`;
};

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

interface ArchiveChapterCardProps {
  chapter: ChapterData;
  isExpanded: boolean;
  onToggle: () => void;
  getIconForPlatform: (platform: string) => React.ReactNode;
}

const ArchiveChapterCard: React.FC<ArchiveChapterCardProps> = ({
  chapter,
  isExpanded,
  onToggle,
  getIconForPlatform,
}) => {
  const [currentEmbedUrl, setCurrentEmbedUrl] = useState(chapter.audioEmbedUrl);
  const [activeTimestampIndex, setActiveTimestampIndex] = useState<number | null>(null);

  useEffect(() => {
    setCurrentEmbedUrl(chapter.audioEmbedUrl);
    setActiveTimestampIndex(null);
  }, [chapter.audioEmbedUrl]);

  const handleTimestampClick = (timeStr: string, idx: number) => {
    const seconds = parseTimeToSeconds(timeStr);
    setActiveTimestampIndex(idx);

    let cleanUrl = chapter.audioEmbedUrl.replace(/([?&])t=\d+/, '');
    const separator = cleanUrl.includes('?') ? '&' : '?';
    const updatedUrl = `${cleanUrl}${separator}t=${seconds}`;
    setCurrentEmbedUrl(updatedUrl);
  };

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
        isExpanded ? 'border-brand-200 shadow-lg ring-1 ring-brand-100' : 'border-slate-200 shadow-sm hover:border-brand-200'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between bg-white text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isExpanded ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {isExpanded ? (
              <PlayCircle size={20} />
            ) : (
              <span className="font-bold text-sm">
                {typeof chapter.chapterNumber === 'string'
                  ? chapter.chapterNumber.replace(/^Appendix\s*/i, '')
                  : chapter.chapterNumber}
              </span>
            )}
          </div>
          <div>
            <h2 className={`text-lg font-bold transition-colors ${isExpanded ? 'text-brand-700' : 'text-slate-900'}`}>
              {chapter.title}
            </h2>
            <p className="text-sm text-slate-600 hidden sm:block">{chapter.subtitle}</p>
          </div>
        </div>
        <div className={`text-slate-700 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-6 space-y-6">
          {/* Embedded Player */}
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md">
            <iframe
              style={{ borderRadius: '12px' }}
              src={formatSpotifyEmbedUrl(currentEmbedUrl)}
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
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Listen on Platforms</h3>
              <div className="space-y-2">
                {chapter.resourceLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all text-sm group"
                  >
                    <div className="flex items-center gap-2.5 font-medium text-slate-800">
                      {getIconForPlatform(link.platform)}
                      {link.platform}
                    </div>
                    <span className="text-slate-700 group-hover:text-brand-700 transition-colors">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Timestamps */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 text-slate-700">
                <div className="flex items-center gap-2">
                  <Headphones size={16} />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Audio Timestamps</h3>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline-block">
                  Click to jump
                </span>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {chapter.timestamps.map((ts, idx) => {
                    const isActive = activeTimestampIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleTimestampClick(ts.time, idx)}
                        className={`w-full text-left flex items-center justify-between px-3 py-2.5 text-sm transition-all group cursor-pointer ${
                          isActive
                            ? 'bg-brand-50/80 border-l-4 border-l-brand-600'
                            : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex-shrink-0 px-2 py-0.5 text-xs font-mono rounded border transition-colors ${
                              isActive
                                ? 'bg-brand-600 text-white border-brand-600 font-bold'
                                : 'bg-brand-50 text-brand-700 border-brand-100 group-hover:bg-brand-100'
                            }`}
                          >
                            {ts.time}
                          </span>
                          <span
                            className={`text-xs sm:text-sm transition-colors ${
                              isActive
                                ? 'text-brand-900 font-bold'
                                : 'text-slate-800 font-medium group-hover:text-brand-700'
                            }`}
                          >
                            {ts.label}
                          </span>
                        </div>

                        <div
                          className={`flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-0.5 transition-all ${
                            isActive
                              ? 'bg-brand-600 text-white opacity-100'
                              : 'text-brand-700 bg-brand-50 opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {isActive ? <Clock size={10} /> : <Play size={10} className="fill-current" />}
                          <span>{isActive ? `Cued at ${ts.time}` : 'Jump'}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        console.warn('Clipboard API not available in this context');
      }
    } catch (err) {
      console.warn('Failed to copy URL to clipboard:', err);
    }
  };

  const getIconForPlatform = (platform: string) => {
    switch (platform) {
      case 'Spotify':
        return <Podcast size={18} className="text-green-500" />;
      case 'YouTube':
        return <Video size={18} className="text-red-500" />;
      case 'Apple Podcasts':
        return <Mic size={18} className="text-purple-500" />;
      default:
        return <ExternalLink size={18} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-100">
            Complete Archive
          </span>
        </div>

        <div className="flex flex-col items-center justify-center relative">
          <h1 className="text-4xl lg:text-5xl font-black hero-title text-slate-900 mb-4 leading-tight font-serif">
            {bookTitle}:<br />Audio Resources
          </h1>

          <button
            onClick={handleShare}
            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-full transition-all"
            title="Copy link to this collection"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
            <span className="font-semibold">{copied ? 'Copied!' : 'Share Collection'}</span>
          </button>
        </div>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
          Access the full collection of audio narrations, timestamps, and external platform links for every chapter.
        </p>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <ArchiveChapterCard
            key={chapter.chapterNumber}
            chapter={chapter}
            isExpanded={expandedId === chapter.chapterNumber}
            onToggle={() => toggleChapter(chapter.chapterNumber)}
            getIconForPlatform={getIconForPlatform}
          />
        ))}
      </div>
    </div>
  );
};