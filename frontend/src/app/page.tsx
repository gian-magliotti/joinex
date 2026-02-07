"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import LevelCard from "./components/LevelCard";
import CarouselButton from "./components/CarouselButton";
import { Level } from "./types/types";

export default function Home() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [error, setError] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get("http://192.168.1.15:8080/api/levels")
      .then((response) => {
        setLevels(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error: No puedo conectar con el servidor de Joinex.");
      });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-70px)] bg-black text-white flex flex-col items-center py-10 px-4 overflow-hidden selection:bg-violet-500/30">
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black pointer-events-none z-0"></div>

      <div className="relative z-10 text-center mb-20 max-w-3xl">
        {/* Badge superior pequeño */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          <span className="text-xs font-medium text-violet-300 tracking-wide uppercase">SQL Training Platform</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">
          WELCOME TO <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white animate-gradient-x">
            JOINEX
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          Master SQL solving <span className="text-violet-200 font-medium">real mysteries</span>.
        </p>
      </div>
      
      {error && (
        <div className="relative z-10 bg-red-950/40 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-12 backdrop-blur-sm flex items-center gap-3">
          <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl group px-4">
        
        <CarouselButton direction="left" onClick={() => scroll('left')} />

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-12 pt-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {levels.map((level) => (
            <div 
              key={level.id} 
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 snap-center"
            >
              <LevelCard level={level} />
            </div>
          ))}
        </div>

        <CarouselButton direction="right" onClick={() => scroll('right')} />

      </div>
    </main>
  );
}