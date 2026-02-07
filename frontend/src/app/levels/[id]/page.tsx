"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import confetti from "canvas-confetti";
import { LevelDetail, ValidationResult } from "@/app/types/types";

export default function LevelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info', msg: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    axios.get(`http://192.168.1.15:8080/api/levels/${id}`)
      .then((res) => {
        setLevel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setFeedback({ type: 'error', msg: "Error conectando con el servidor." });
        setLoading(false);
      });
  }, [id]);

  const handleRunQuery = async () => {
    if (!level) return;
    setValidating(true);
    setFeedback(null);
    setResults(null);

    const currentStep = level.steps[currentStepIndex];

    try {
      const response = await axios.post<ValidationResult>(
        `http://localhost:8080/levels/${level.id}/validate`, 
        null, 
        {
          params: {
            stepId: currentStep.id, 
            query: query
          }
        }
);

      const data = response.data;
      setResults(data.results);

      if (data.correct) {
        setFeedback({ type: 'success', msg: data.message });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
          if (currentStepIndex < level.steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
            setFeedback(null);
            setQuery("");      
          } else {
            setFeedback({ type: 'success', msg: "¡NIVEL COMPLETADO!" });
            confetti({ particleCount: 500, spread: 100 });
          }
        }, 2000);
      } else {
        setFeedback({ type: 'error', msg: data.message });
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Error de ejecución";
      setFeedback({ type: 'error', msg: errorMsg });
    } finally {
      setValidating(false);
    }
  };

  if (loading) return <div className="h-screen bg-black text-violet-500 flex items-center justify-center animate-pulse">Cargando caso...</div>;
  if (!level) return <div className="h-screen bg-black text-white flex items-center justify-center">Nivel no encontrado</div>;

  const currentStep = level.steps[currentStepIndex];
  const isLastStep = currentStepIndex === level.steps.length - 1;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-70px)] bg-black text-white overflow-hidden font-sans">
      
      {/* PANEL IZQUIERDO */}
      <div className="w-full md:w-1/2 h-full flex flex-col border-r border-gray-800 bg-[#0a0a0a]">
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Header */}
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

          {/* STEPPER (Barra de Progreso) */}
          <div className="flex items-center gap-2 mb-8">
            {level.steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${idx === currentStepIndex ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-110' : 
                    idx < currentStepIndex ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-500'}
                `}>
                  {idx < currentStepIndex ? '✓' : idx + 1}
                </div>
                {/* Línea conectora */}
                {idx < level.steps.length - 1 && (
                  <div className={`w-6 h-0.5 mx-1 ${idx < currentStepIndex ? 'bg-green-500' : 'bg-gray-800'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: EDITOR Y RESULTADOS */}
      <div className="w-full md:w-1/2 h-full flex flex-col bg-[#0d0d0d]">
        
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900/50">
          <span className="text-xs text-gray-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> postgres_console
          </span>
          <button 
            onClick={handleRunQuery}
            disabled={validating || !currentStep}
            className={`
              flex items-center gap-2 px-5 py-1.5 rounded text-xs font-bold transition-all
              ${validating ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg hover:shadow-violet-500/25'}
            `}
          >
            {validating ? 'EJECUTANDO...' : '▶ RUN QUERY'}
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1 relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-full bg-[#0d0d0d] text-gray-300 font-mono text-sm p-6 resize-none focus:outline-none focus:ring-0 leading-relaxed custom-scrollbar selection:bg-violet-500/30"
            placeholder="Escribe tu consulta SQL aquí..."
            spellCheck="false"
          />
        </div>

        {/* Panel de Resultados / Feedback */}
        <div className="h-2/5 border-t border-gray-800 bg-gray-900/20 flex flex-col">
          
          {/* Barra de estado del resultado */}
          <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Resultados</span>
            {feedback && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                feedback.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {feedback.type === 'success' ? '✓ CORRECTO' : '⚠ ERROR'}
              </span>
            )}
          </div>

          {/* Área de contenido */}
          <div className="flex-1 overflow-auto p-4 custom-scrollbar font-mono text-xs">
            
            {/* Mensaje de Feedback Principal */}
            {feedback && (
              <div className={`mb-4 p-3 rounded border ${
                feedback.type === 'success' ? 'bg-green-900/20 border-green-500/30 text-green-300' : 'bg-red-900/20 border-red-500/30 text-red-300'
              }`}>
                {feedback.msg}
              </div>
            )}

            {/* TABLA DINÁMICA DE RESULTADOS */}
            {results && results.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th key={key} className="border-b border-gray-700 p-2 text-gray-400 font-bold bg-gray-800/50 sticky top-0">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className="border-b border-gray-800 p-2 text-gray-300 truncate max-w-[200px]">
                          {val !== null ? val.toString() : <span className="text-gray-600 italic">null</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !feedback && <div className="text-gray-600 italic mt-4 text-center">Ejecuta una query para ver los datos...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}