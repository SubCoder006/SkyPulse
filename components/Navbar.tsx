'use client';
import { Wind } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass bg-slate-900/90 backdrop-blur-[100px] border-b border-sky-accent/30 mb-8 rounded-sm">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Wind size={26} className="text-sky-accent drop-shadow-[0_0_8px_#38bdf8]" />
            <span className="absolute inset-0 rounded-full border border-sky-accent/30
                             animate-ping opacity-30 pointer-events-none" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-sky-accent
                           animate-glow select-none">
            SkyPulse
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-slate-500 font-mono tracking-widest">v1.0</span>
          <div className="h-2 w-2 rounded-full bg-sky-accent animate-pulse" />
        </div>
      </div>
    </nav>
  );
}