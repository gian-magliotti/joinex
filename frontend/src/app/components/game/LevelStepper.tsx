import { LevelStep } from "@/app/types/types";

interface Props {
  steps: LevelStep[];
  currentIndex: number;
}

export const LevelStepper = ({ steps, currentIndex }: Props) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
            ${idx === currentIndex ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-110' : 
              idx < currentIndex ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-500'}
          `}>
            {idx < currentIndex ? '✓' : idx + 1}
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-6 h-0.5 mx-1 ${idx < currentIndex ? 'bg-green-500' : 'bg-gray-800'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};