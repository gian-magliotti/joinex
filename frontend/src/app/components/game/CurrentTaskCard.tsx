import { LevelStep } from "@/app/types/types";

interface Props {
  step: LevelStep | undefined;
}

export const CurrentTaskCard = ({ step }: Props) => {
  if (!step) {
    return (
      <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl text-center animate-in fade-in zoom-in duration-500">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-2xl font-bold text-green-400 mb-2">¡Caso Resuelto!</h3>
        <p className="text-gray-300 text-sm">
          Has completado todos los pasos de esta investigación con éxito.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-violet-500/30 rounded-xl p-6 relative group transition-all hover:border-violet-500/50 mb-8">

      <div className="absolute top-0 left-0 w-1 h-full bg-violet-500 rounded-l-xl shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
      
      <h3 className="text-xs font-bold text-violet-300 mb-3 uppercase tracking-wide flex items-center gap-2">
        <span className="animate-pulse text-violet-500 text-lg">●</span> Objetivo Actual
      </h3>
      
      <p className="text-white text-lg font-medium leading-relaxed mb-6">
        {step.instruction}
      </p>

      <div className="bg-black/40 rounded-lg p-4 border border-gray-800 flex gap-4 items-start">
        <span className="text-yellow-500 text-xl">💡</span>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 uppercase mb-1">Pista</span>
          <p className="text-sm text-gray-400 italic font-mono">{step.hint}</p>
        </div>
      </div>
    </div>
  );
};