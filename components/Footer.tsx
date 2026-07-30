import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-slate-600">
            <p>&copy; 2026 OpenAudio. CC-BY-4.0.</p>
        </div>
    </footer>
  );
};