import { TableSchema } from "@/app/types/types"; 

interface SchemaViewerProps {
  schemas: TableSchema[];
}

export const SchemaViewer = ({ schemas }: SchemaViewerProps) => {
  if (!schemas || schemas.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-violet-300 font-bold uppercase tracking-wide text-xs mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        Database Schema
      </h3>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {schemas.map((table) => (
          <div key={table.name} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:bg-gray-900 transition-colors">
            <div className="font-mono text-sm font-bold text-gray-200 mb-3 pb-2 border-b border-gray-800 flex justify-between items-center">
              <span>{table.name}</span>
              <span className="text-[10px] text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">TABLE</span>
            </div>
            <ul className="space-y-2">
              {table.columns.map((col) => (
                <li key={col.name} className="flex justify-between items-center text-xs font-mono group">
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{col.name}</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-600 text-[10px]">{col.type}</span>
                    {col.pk && <span className="text-yellow-500/90 font-bold text-[9px] border border-yellow-500/30 px-1 rounded">PK</span>}
                    {col.fk && <span className="text-blue-500/90 font-bold text-[9px] border border-blue-500/30 px-1 rounded">FK</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};