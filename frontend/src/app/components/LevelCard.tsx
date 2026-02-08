import Link from "next/link";

interface Level {
  id: number;
  title: string;
  description: string;
}

interface LevelCardProps {
  level: Level;
}

export default function LevelCard({ level }: LevelCardProps) {
  return (
    <div className="group relative bg-gray-915/50 rounded-2xl border border-gray-800 hover:border-violet-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] flex flex-col overflow-hidden cursor-pointer h-full backdrop-blur-sm">
      
      <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5">
          <span className="bg-gray-800 border border-gray-700 text-[10px] font-bold px-2 py-1 rounded text-violet-300 uppercase tracking-widest shadow-sm">
            Case #{level.id}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-400 transition-colors duration-300">
          {level.title}
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
          {level.description}
        </p>

        <Link href={`/levels/${level.id}`} className="block mt-auto">
          <button className="w-full bg-gray-800 border border-gray-700 hover:border-violet-500 hover:bg-violet-600/20 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] cursor-pointer group-hover:text-violet-100">
            <span>Play now</span>
            <span className="group-hover:translate-x-1 transition-transform text-violet-400 group-hover:text-white">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}