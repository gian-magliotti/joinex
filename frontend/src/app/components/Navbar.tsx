import Link from "next/link";
import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-80 transition">
        🕵️ JOINEX
      </Link>
    </nav>
  );
}