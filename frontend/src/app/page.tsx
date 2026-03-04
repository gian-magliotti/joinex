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
    <main className="w-full min-h-screen bg-[#0f0d0c] text-[#e3c9a8] font-serif overflow-x-hidden selection:bg-[#c9a66b] selection:text-black">
      
      <header className="w-full px-6 py-8 md:py-12 border-b border-[#2d241f] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1412_0%,_transparent_100%)] opacity-40"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block border border-[#c9a66b]/30 px-4 md:px-6 py-1 mb-6 md:mb-8 text-[8px] md:text-[10px] uppercase tracking-[.4em] text-[#c9a66b]">
            SQL_FORENSICS_DIVISION
          </div>
          
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-[#f5e6d3] leading-none mb-6">
            JOINEX <br /> 
            <span className="text-[0.4em] md:text-[0.45em] italic font-light text-[#c9a66b]">Relational Deduction</span>
          </h1>
          
          <p className="text-xs md:text-xl text-[#8c7456] italic max-w-2xl mx-auto px-4">
            "It is a capital mistake to theorize before one has <span className="text-[#e3c9a8] not-italic font-bold">structured data</span>."
          </p>
        </div>
      </header>

      <section className="w-full max-w-7xl mx-auto py-12 px-4 relative group">
        <div className="hidden md:block">
          <CarouselButton direction="left" onClick={() => scroll('left')} />
          <CarouselButton direction="right" onClick={() => scroll('right')} />
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-2 md:gap-4 pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[85%] sm:w-1/2 lg:w-1/3 snap-center p-2">
                <LevelCardSkeleton />
              </div>
            ))
          ) : (
            levels.map((level) => (
              <div key={level.id} className="flex-shrink-0 w-[85%] sm:w-1/2 lg:w-1/3 snap-center p-2">
                <LevelCard level={level} />
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}