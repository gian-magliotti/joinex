import { FeedbackType } from "@/app/hooks/useGameLevel";

interface Props {
  results: any[] | null;
  feedback: FeedbackType;
}

export const ResultsPanel = ({ results, feedback }: Props) => {
  return (
    <div className="h-2/5 border-t border-gray-800 bg-gray-900/20 flex flex-col">
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

      <div className="flex-1 overflow-auto p-4 custom-scrollbar font-mono text-xs">
        {feedback && (
          <div className={`mb-4 p-3 rounded border ${
            feedback.type === 'success' ? 'bg-green-900/20 border-green-500/30 text-green-300' : 'bg-red-900/20 border-red-500/30 text-red-300'
          }`}>
            {feedback.msg}
          </div>
        )}

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
  );
};