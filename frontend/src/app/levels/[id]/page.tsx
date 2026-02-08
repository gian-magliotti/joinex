"use client";
import { use } from "react";
import Link from "next/link";
import { CurrentTaskCard } from "@/app/components/game/CurrentTaskCard";
import { LevelStepper } from "@/app/components/game/LevelStepper";
import { ResultsPanel } from "@/app/components/game/ResultPanel";
import { SchemaViewer } from "@/app/components/game/SchemaViewer";
import { SqlEditor } from "@/app/components/game/SqlEditor";
import { useGameLevel } from "@/app/hooks/useGameLevel";

export default function LevelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const { 
    level, loading, currentStepIndex, query, setQuery, 
    handleRunQuery, validating, results, feedback, currentStep 
  } = useGameLevel(id);

  if (loading) return <div className="h-screen bg-black text-violet-500 flex items-center justify-center animate-pulse">Cargando caso...</div>;
  if (!level) return <div className="h-screen bg-black text-white flex items-center justify-center">Nivel no encontrado</div>;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-70px)] bg-black text-white overflow-hidden font-sans">
      
      <div className="w-full md:w-1/2 h-full flex flex-col border-r border-gray-800 bg-[#0a0a0a]">
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          
          <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition">← Volver</Link>
            <span>•</span>
            <span className={level.difficulty === 'EASY' ? 'text-green-400' : 'text-orange-400'}>
              {level.difficulty}
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{level.title}</h1>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed border-l-2 border-gray-700 pl-4">
            {level.description}
          </p>

          <LevelStepper steps={level.steps} currentIndex={currentStepIndex} />
        
          <CurrentTaskCard step={currentStep} />

          <SchemaViewer />
        
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full flex flex-col bg-[#0d0d0d]">
        <div className="flex-1 relative">
           <SqlEditor 
             query={query} 
             setQuery={setQuery} 
             onRun={handleRunQuery} 
             validating={validating}
             disabled={!currentStep}
           />
        </div>
        <ResultsPanel results={results} feedback={feedback} />
      </div>
    </div>
  );
}