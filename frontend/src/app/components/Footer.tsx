"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0d0b0a] border-t border-[#2d241f] mt-auto">
      
      {/* Sombra interna para profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none h-4"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          
          {/* Identidad: Centrada en móvil, izquierda en desktop */}
          <div className="text-center md:text-left w-full md:w-auto">
            <h2 className="text-xl md:text-2xl font-serif italic text-[#c9a66b] tracking-tighter flex items-center justify-center md:justify-start gap-3">
              Joinex
              <span className="text-[8px] md:text-[9px] font-mono font-bold text-[#634e42] border border-[#634e42]/40 px-2 py-0.5 uppercase tracking-[0.2em]">
                Registry_No_01
              </span>
            </h2>
            <p className="text-[#4d3f35] font-serif text-[10px] md:text-[11px] mt-2 md:mt-3 italic tracking-wide">
              © {currentYear} Mar del Plata Yard
            </p>
          </div>

          {/* Enlaces: Se apilan en móvil para que no se corten */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-4 gap-x-6 md:gap-x-10 text-[9px] md:text-[10px] font-serif uppercase tracking-[0.2em] text-[#8c7456] w-full md:w-auto">
            <a 
              href="https://github.com/gian-magliotti/joinex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#e3c9a8] transition-colors flex items-center gap-2 group border-b border-[#2d241f] pb-1 sm:border-none sm:pb-0"
            >
              [ The_Repository ]
            </a>

            <a 
              href="https://github.com/gian-magliotti/joinex/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-700 transition-colors border-b border-[#2d241f] pb-1 sm:border-none sm:pb-0"
            >
              [ Report_Malfunction ]
            </a>

            {/* Separador: Solo visible en pantallas grandes */}
            <div className="hidden md:block w-1 h-1 rounded-full bg-[#2d241f]"></div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <span className="text-[#4d3f35]">PATENT:</span>
              <span className="text-[#8c7456] border-b border-[#4d3f35] pb-0.5">MIT_1895</span>
            </div>
          </div>
        </div>
      </div>

      {/* Línea final decorativa */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a66b]/10 to-transparent"></div>
    </footer>
  );
}