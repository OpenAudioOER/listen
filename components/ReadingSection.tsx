import React, { useState } from 'react';
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, Book } from 'lucide-react';

interface ReadingSectionProps {
  textbookUrl: string;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({ textbookUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Reading Options</h2>
      
      <div className="space-y-4">
        {/* External Link Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-brand-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-50 rounded-lg text-brand-600">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Official Textbook Source</h3>
              <p className="text-sm text-slate-500">Access the full chapter on OpenStax</p>
            </div>
          </div>
          <a 
            href={textbookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm shadow-accent-500/20"
          >
            Read on OpenStax
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Embedded Reader Accordion */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
                <Book size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Read Chapter on This Page</h3>
                <p className="text-sm text-slate-500">Quick view mode with simplified formatting</p>
              </div>
            </div>
            <div className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={20} />
            </div>
          </button>
          
          {/* Collapsible Content */}
          <div 
            className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="border-t border-slate-100 bg-slate-50 p-1 sm:p-2">
              <div className="w-full h-[600px] sm:h-[750px] bg-white rounded-lg border border-slate-200 overflow-hidden relative">
                 {isExpanded ? (
                   <iframe 
                     src={textbookUrl} 
                     title="Embedded Textbook"
                     className="w-full h-full border-0 relative z-10"
                     loading="lazy"
                   />
                 ) : null}
                 {/* Loading Spinner Background */}
                 <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                 </div>
              </div>
              <div className="p-2 text-center text-xs text-slate-500">
                Note: Some external providers may prevent embedding. If the content does not load, please use the "Read on OpenStax" button above.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};