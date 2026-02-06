"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import LevelCard from "./components/LevelCard";
import CarouselButton from "./components/CarouselButton";

type Level = {
  id: number;
  title: string;
  description: string;
  difficulty?: string;
};

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
    <main className="min-h-[calc(100vh-70px)] bg-gray-900 text-white flex flex-col items-center py-20 px-4">
      
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">JOINEX</span>
        </h1>
        <p className="text-xl text-gray-400 font-light">
          Become a master solving SQL queries.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-3 rounded-lg mb-8 animate-pulse">
          🚨 {error}
        </div>
      )}

      {/* --- ZONA DEL CARRUSEL --- */}
      {/* La clase 'group' es vital aquí para que los botones sepan cuándo aparecer */}
      <div className="relative w-full max-w-6xl group px-4">
        
        {/* Usamos el componente nuevo (Izquierda) */}
        <CarouselButton direction="left" onClick={() => scroll('left')} />

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-10"
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

        {/* Usamos el componente nuevo (Derecha) */}
        <CarouselButton direction="right" onClick={() => scroll('right')} />

      </div>
    </main>
  );
}