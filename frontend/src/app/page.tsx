// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"; 

export default function Home() {
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/levels")
      .then((response) => {
        setLevels(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error: No puedo conectar con el servidor de Joinex.");
      });
  }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {levels.map((level) => (
          <div key={level.id} className="group relative bg-gray-800 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)] flex flex-col overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-green-500 to-blue-500"></div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-gray-700 text-xs font-bold px-2 py-1 rounded text-gray-300 uppercase tracking-wider">
                  Caso #{level.id}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors">
                {level.title}
              </h2>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                {level.description}
              </p>
              <Link href={`/levels/${level.id}`} className="block">
                <button className="w-full bg-gray-700 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                  <span>Resolver Misterio</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}