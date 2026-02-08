export default function LevelCardSkeleton() {
  return (
    <div className="relative bg-gray-915/50 rounded-2xl border border-gray-800 flex flex-col overflow-hidden h-full backdrop-blur-sm">
      <div className="h-1.5 w-full bg-gray-800"></div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5">
          <div className="h-5 w-16 bg-gray-800 rounded animate-pulse"></div>
        </div>

        <div className="h-8 w-3/4 bg-gray-800 rounded-md mb-3 animate-pulse"></div>

        <div className="space-y-2 mb-8 flex-1">
          <div className="h-3 w-full bg-gray-800 rounded animate-pulse"></div>
          <div className="h-3 w-5/6 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-3 w-4/6 bg-gray-800 rounded animate-pulse"></div>
        </div>

        <div className="w-full h-[54px] bg-gray-800 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}