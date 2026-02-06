import Link from "next/link";

interface Level {
  id: number;
  title: string;
  description: string;
}

interface LevelCardProps {
  level: Level;
}

// 3. Aplicamos el tipo en la función
export default function LevelCard({ level }: LevelCardProps) {
  return (
    <div className="group relative bg-gray-800 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)] flex flex-col overflow-hidden cursor-pointer">
      <div className="h-2 w-full bg-gradient-to-r from-green-500 to-blue-500"></div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-gray-700 text-xs font-bold px-2 py-1 rounded text-gray-300 uppercase tracking-wider">
            Case #{level.id}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors">
          {level.title}
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
          {level.description}
        </p>

        <Link href={`/levels/${level.id}`} className="block">
          <button className="w-full bg-gray-700 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg cursor-pointer">
            <span>Play now</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}