'use client';

import { useEffect, useState } from 'react';

export default function LoginVisual() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full relative overflow-hidden flex items-start justify-start pl-8 pt-0 -mt-8">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      {/* Main container */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Outer rotating square */}
        <div className="absolute w-72 h-72 border-2 border-blue-500/40 rotate-45 animate-spin-slow" />

        {/* Middle rotating square - reverse */}
        <div className="absolute w-56 h-56 border-2 border-green-500/50 rotate-12 animate-spin-reverse" />

        {/* Inner rotating square */}
        <div className="absolute w-40 h-40 border-2 border-purple-500/40 -rotate-12 animate-spin-slow" />

        {/* Central shield/lock icon */}
        <div className="absolute w-24 h-24 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl flex items-center justify-center border border-white/30">
          <svg className="w-12 h-12 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        {/* Corner brackets */}
        <div className="absolute w-80 h-80">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40" />
        </div>
      </div>

      {/* Floating finance elements */}
      <div className="absolute top-16 right-16 animate-float">
        <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/50 rounded text-green-400 text-sm font-mono font-medium">
          +12.5%
        </div>
      </div>
      <div className="absolute bottom-32 left-12 animate-float-delayed">
        <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/50 rounded text-blue-400 text-sm font-mono font-medium">
          ₹1,00,000
        </div>
      </div>
      <div className="absolute top-40 left-8 animate-float">
        <div className="w-10 h-10 bg-white/10 border border-white/40 rounded-lg flex items-center justify-center text-white/80 text-lg font-bold">
          ₹
        </div>
      </div>
      <div className="absolute bottom-24 right-12 animate-float-delayed">
        <div className="px-3 py-1.5 bg-white/5 border border-white/40 rounded text-white/70 text-sm font-mono">
          NIFTY
        </div>
      </div>

      {/* Orbiting dots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 animate-spin-orbit">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 animate-spin-orbit-reverse">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/60 text-xs font-mono">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>SECURE</span>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-orbit-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 20s linear infinite;
        }
        .animate-spin-orbit {
          animation: spin-orbit 8s linear infinite;
        }
        .animate-spin-orbit-reverse {
          animation: spin-orbit-reverse 6s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 0.5s;
        }
      `}</style>
    </div>
  );
}
