import { useRef } from "react";

export const useCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth : clientWidth,
        behavior: 'smooth'
      });
    }
  };

  return { scrollContainerRef, scroll };
};