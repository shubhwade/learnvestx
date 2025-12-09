'use client';

import { useEffect, useState } from 'react';

export default function SignupVisual() {
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
        {/* Outer rotating circle */}
        <div className="absolute w-72 h-72 border-2 border-green-500/40 rounded-full animate-spin-slow" />

        {/* Middle rotating diamond */}
        <div className="absolute w-52 h-52 border-2 border-blue-500/50 rotate-45 animate-spin-reverse" />

        {/* Inner circle */}
        <div className="absolute w-36 h-36 border-2 border-purple-500/40 rounded-full animate-spin-slow" />

        {/* Central chart icon */}
        <div className="absolute w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-white/30">
          <svg className="w-12 h-12 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>

        {/* Corner brackets */}
        <div className="absolute w-80 h-80">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40" />
        </div>

        {/* Progress arc */}
        <svg className="absolute w-64 h-64" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="1"
            strokeDasharray="15 8"
            className="animate-spin-slow origin-center"
          />
        </svg>
      </div>

      {/* Floating finance elements */}
      <div className="absolute top-12 right-16 animate-float">
        <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/50 rounded text-green-400 text-sm font-mono font-medium">
          +24.8%
        </div>
      </div>
      <div className="absolute bottom-36 left-10 animate-float-delayed">
        <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/50 rounded text-blue-400 text-sm font-mono font-medium">
          SENSEX
        </div>
      </div>
      <div className="absolute top-36 left-12 animate-float">
        <div className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/40 rounded text-white/70 text-sm font-mono">
          <span>SIP</span>
          <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-28 right-8 animate-float-delayed">
        <div className="w-12 h-12 bg-white/10 border border-white/40 rounded-lg flex items-center justify-center text-white/80 text-xl font-bold">
          ₹
        </div>
      </div>
      <div className="absolute top-24 right-8 animate-float">
        <div className="px-3 py-1.5 bg-white/5 border border-white/30 rounded text-white/60 text-xs font-mono">
          PORTFOLIO
        </div>
      </div>

      {/* Orbiting particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 animate-spin-orbit">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 animate-spin-orbit-reverse">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
      </div>

      {/* Bottom progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-10 h-1.5 bg-green-500/60 rounded-full" />
        <div className="w-10 h-1.5 bg-white/30 rounded-full" />
        <div className="w-10 h-1.5 bg-white/30 rounded-full" />
      </div>

      {/* Top label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono tracking-wider">
        START INVESTING
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
          50% { transform: translateY(-6px); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 22s linear infinite;
        }
        .animate-spin-orbit {
          animation: spin-orbit 10s linear infinite;
        }
        .animate-spin-orbit-reverse {
          animation: spin-orbit-reverse 7s linear infinite;
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
