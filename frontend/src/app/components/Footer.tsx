"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black border-t border-white/5 mt-auto overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-white tracking-tighter flex items-center justify-center md:justify-start gap-3">
              JOINEX
              <span className="text-[10px] font-bold text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20 tracking-wide">
                BETA v0.1
              </span>
            </h2>
            <p className="text-gray-500 text-xs mt-2 font-medium">
              © {currentYear} Joinex Open Source.
            </p>
          </div>

          <div className="flex items-center space-x-8 text-sm font-medium text-gray-500">
            <a 
              href="https://github.com/gian-magliotti/joinex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <div className="bg-white/5 p-1.5 rounded-full group-hover:bg-violet-600 group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </div>
              GitHub
            </a>

            <a 
              href="https://github.com/gian-magliotti/joinex/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              Report Bug
            </a>

            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span className="text-gray-600">MIT License</span>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}