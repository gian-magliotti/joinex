interface Props {
  query: string;
  setQuery: (q: string) => void;
  onRun: () => void;
  validating: boolean;
  disabled: boolean;
}

export const SqlEditor = ({ query, setQuery, onRun, validating, disabled }: Props) => {
  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900/50">
        <span className="text-xs text-gray-500 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span> postgres_console
        </span>
        <button 
          onClick={onRun}
          disabled={validating || disabled}
          className={`
            flex items-center gap-2 px-5 py-1.5 rounded text-xs font-bold transition-all
            ${validating || disabled ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg hover:shadow-violet-500/25'}
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
          placeholder="SELECT * FROM..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};