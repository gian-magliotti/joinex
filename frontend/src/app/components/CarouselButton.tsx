interface CarouselButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export default function CarouselButton({ direction, onClick }: CarouselButtonProps) {
  const isLeft = direction === 'left';
  
  return (
    <button
      onClick={onClick}
      className={`
        hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 
        w-12 h-12 items-center justify-center rounded-full
        bg-black/60 backdrop-blur-md border border-gray-800 
        text-gray-400 
        hover:text-white hover:border-violet-500 hover:bg-violet-600/20 
        hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]
        transition-all duration-300 transform hover:scale-110 
        opacity-0 group-hover:opacity-100 cursor-pointer
        ${isLeft ? '-left-4 lg:-left-16' : '-right-4 lg:-right-16'}
      `}
    >
      {isLeft ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  );
}