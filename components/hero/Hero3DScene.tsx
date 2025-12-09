'use client';

import { useEffect, useState } from 'react';

export default function Hero3DScene() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-full h-full bg-black" />;
    }

    return (
        <div className="w-full h-full relative overflow-hidden">
            {/* Very subtle gradient - blends with black background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-500/10" />
            </div>

            {/* Spinning rings container */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer ring */}
                <div className="absolute w-80 h-80 border-2 border-blue-500/30 rounded-full animate-spin-slow" />

                {/* Middle ring - reverse */}
                <div className="absolute w-64 h-64 border-2 border-green-500/40 rounded-full animate-spin-reverse" />

                {/* Inner ring */}
                <div className="absolute w-48 h-48 border-2 border-purple-500/50 rounded-full animate-spin-slow" />

                {/* Core glow */}
                <div className="absolute w-32 h-32 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur-xl animate-pulse opacity-50" />

                {/* Core wireframe */}
                <div className="absolute w-24 h-24 border-2 border-blue-400 rotate-45 animate-spin-slow" />
                <div className="absolute w-24 h-24 border-2 border-green-400 -rotate-45 animate-spin-reverse" />
            </div>

            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-float shadow-lg shadow-yellow-400/50" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-float-delayed shadow-lg shadow-green-400/50" />
            <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-blue-400 rounded-full animate-float shadow-lg shadow-blue-400/50" />
            <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float-delayed shadow-lg shadow-purple-400/50" />
            <div className="absolute top-1/2 left-1/5 w-2 h-2 bg-red-400 rounded-full animate-float shadow-lg shadow-red-400/50" />

            {/* Animated bars */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-2">
                <div className="w-4 bg-gradient-to-t from-green-500 to-green-400 rounded-t animate-bar-1" />
                <div className="w-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t animate-bar-2" />
                <div className="w-4 bg-gradient-to-t from-green-500 to-green-400 rounded-t animate-bar-3" />
                <div className="w-4 bg-gradient-to-t from-red-500 to-red-400 rounded-t animate-bar-4" />
                <div className="w-4 bg-gradient-to-t from-green-500 to-green-400 rounded-t animate-bar-5" />
            </div>

            {/* Floating cubes */}
            <div className="absolute top-20 right-20 w-8 h-8 border-2 border-red-400/60 rotate-45 animate-float-cube" />
            <div className="absolute bottom-32 left-16 w-6 h-6 border-2 border-green-400/60 rotate-12 animate-float-cube-delayed" />
            <div className="absolute top-40 left-24 w-5 h-5 border-2 border-blue-400/60 -rotate-12 animate-float-cube" />
            <div className="absolute bottom-20 right-16 w-7 h-7 border-2 border-purple-400/60 rotate-45 animate-float-cube-delayed" />

            {/* Line chart */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 opacity-40">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path
                        d="M 10 80 Q 30 60 50 70 T 90 40 T 130 50 T 170 20 T 190 30"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-dash"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Ticker labels */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-8 text-sm font-mono opacity-60">
                <span className="text-blue-400 animate-pulse">NIFTY</span>
                <span className="text-green-400 animate-pulse">+2.4%</span>
                <span className="text-yellow-400 animate-pulse">₹</span>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-cube {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        @keyframes float-cube-delayed {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        @keyframes bar-1 {
          0%, 100% { height: 40px; }
          50% { height: 60px; }
        }
        @keyframes bar-2 {
          0%, 100% { height: 60px; }
          50% { height: 80px; }
        }
        @keyframes bar-3 {
          0%, 100% { height: 30px; }
          50% { height: 50px; }
        }
        @keyframes bar-4 {
          0%, 100% { height: 50px; }
          50% { height: 40px; }
        }
        @keyframes bar-5 {
          0%, 100% { height: 70px; }
          50% { height: 90px; }
        }
        @keyframes dash {
          0% { stroke-dasharray: 0 1000; }
          100% { stroke-dasharray: 1000 0; }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        .animate-float-cube {
          animation: float-cube 5s ease-in-out infinite;
        }
        .animate-float-cube-delayed {
          animation: float-cube-delayed 6s ease-in-out infinite;
        }
        .animate-bar-1 {
          animation: bar-1 2s ease-in-out infinite;
        }
        .animate-bar-2 {
          animation: bar-2 2.2s ease-in-out infinite;
        }
        .animate-bar-3 {
          animation: bar-3 1.8s ease-in-out infinite;
        }
        .animate-bar-4 {
          animation: bar-4 2.5s ease-in-out infinite;
        }
        .animate-bar-5 {
          animation: bar-5 2.1s ease-in-out infinite;
        }
        .animate-dash {
          animation: dash 3s ease-in-out infinite alternate;
        }
      `}</style>
        </div>
    );
}
