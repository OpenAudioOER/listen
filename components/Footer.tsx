import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} EduPlatform Inc. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-slate-600 transition-colors">Help Center</a>
                <a href="#" className="hover:text-slate-600 transition-colors">Accessibility</a>
                <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            </div>
        </div>
    </footer>
  );
};