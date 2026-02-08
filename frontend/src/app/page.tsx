"use client";

import LevelCard from "./components/LevelCard";
import LevelCardSkeleton from "./components/LevelCardSkeleton";
import CarouselButton from "./components/CarouselButton";
import { useLevels } from "./hooks/useLevels";
import { useCarousel } from "./hooks/useCarousel";

export default function Home() {
  const { levels, error, loading } = useLevels();
  const { scrollContainerRef, scroll } = useCarousel();

  return (
    <main className="relative min-h-[calc(100vh-70px)] bg-black text-white flex flex-col items-center py-10 px-4 overflow-hidden selection:bg-violet-500/30">
      
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black pointer-events-none z-0" 
        aria-hidden="true"
      />

      <header className="relative z-10 text-center mb-20 max-w-3xl">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          <span className="text-xs font-medium text-violet-300 tracking-wide uppercase">
            SQL Training Platform
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">
          WELCOME TO <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">
            JOINEX
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          Master SQL solving <span className="text-violet-200 font-medium">real mysteries</span>.
        </p>
      </header>

      {error && (
        <div className="relative z-10 bg-red-950/40 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-12 backdrop-blur-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <section className="relative z-10 w-full max-w-7xl group px-4">
        
        <CarouselButton direction="left" onClick={() => scroll('left')} />
        <CarouselButton direction="right" onClick={() => scroll('right')} />

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-12 pt-4 gap-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={`skeleton-card-${i}`} 
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 snap-center"
              >
                <LevelCardSkeleton />
              </div>
            ))
          ) : (
            levels.map((level) => (
              <div 
                key={`level-${level.id}`} 
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 snap-center"
              >
                <LevelCard level={level} />
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}