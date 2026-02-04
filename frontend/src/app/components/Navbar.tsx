import Link from "next/link";
import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-80 transition">
        🕵️ JOINEX
      </Link>

      <div className="flex gap-4">
        <a 
          href="https://github.com/gian-magliotti/joinex" 
          target="_blank" 
          rel="noopener noreferrer"
          // AQUÍ ESTÁ LA MAGIA DE ESTILOS 👇
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-gray-400 
                     hover:text-white hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] 
                     transition-all duration-300 font-mono text-sm group"
        >
          <Github className="w-5 h-5 group-hover:text-green-400 group-hover:scale-110 transition-all" />
          <span className="font-semibold group-hover:text-green-400 transition-colors">GitHub</span>
        </a>
      </div>
    </nav>
  );
}