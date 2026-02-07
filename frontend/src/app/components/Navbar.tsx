import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="group flex items-center gap-2 text-2xl font-extrabold tracking-tighter hover:opacity-90 transition">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white group-hover:to-violet-200 transition-all duration-500">
          JOINEX
        </span>
      </Link>
    </nav>
  );
}