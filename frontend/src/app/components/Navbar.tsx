import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#1a1412] border-b-2 border-[#2d241f] sticky top-0 z-50 shadow-2xl">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 md:py-5 flex justify-between items-center">
        <Link href="/" className="group flex flex-col">
          <span className="text-[#c9a66b] font-serif italic text-2xl md:text-3xl tracking-tighter drop-shadow-md">
            Joinex
          </span>
          <span className="text-[7px] md:text-[9px] text-[#634e42] font-bold tracking-[.3em] uppercase -mt-1">
            Consulting_Detective
          </span>
        </Link>

        <div className="flex gap-4 md:gap-10 items-center font-serif text-[9px] md:text-[11px] uppercase tracking-widest">
          <Link href="/levels" className="text-[#8c7456] hover:text-[#e3c9a8] transition-all">
            Case_Files
          </Link>
          <div className="w-[1px] h-4 bg-[#2d241f] hidden sm:block"></div>
          <Link href="/admin" className="text-[#8c7456] hover:text-[#e3c9a8] transition-all">
            The_Archive
          </Link>
        </div>
      </div>
    </nav>
  );
}