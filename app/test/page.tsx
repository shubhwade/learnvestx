"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const logs: any[] = [];

      try {
        // Test 1: Home
        logs.push({ test: "GET /", status: "running" });
        const homeRes = await fetch("/", { method: "GET" });
        logs[logs.length - 1] = { test: "GET /", status: homeRes.status, ok: homeRes.ok };

        // Test 2: Login
        logs.push({ test: "POST /api/auth/login", status: "running" });
        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "demo@finsim.academy", password: "password123" })
        });
        let token = null;
        let loginData: any = null;
        try {
          loginData = await loginRes.json();
          token = loginData?.accessToken;
        } catch (e) {
          loginData = await loginRes.text();
        }
        logs[logs.length - 1] = { test: "POST /api/auth/login", status: loginRes.status, ok: loginRes.ok, token: token ? "✓ received" : "✗ missing", data: loginData };

        // Test 3: Lessons
        logs.push({ test: "GET /api/lessons", status: "running" });
        const lessonsRes = await fetch("/api/lessons");
        let lessonsCount = 0;
        try {
          const lessonsData = await lessonsRes.json();
          lessonsCount = Array.isArray(lessonsData) ? lessonsData.length : 0;
        } catch (e) {}
        logs[logs.length - 1] = { test: "GET /api/lessons", status: lessonsRes.status, ok: lessonsRes.ok, count: lessonsCount };

        // Test 4: Holdings (with token)
        if (token) {
          logs.push({ test: "GET /api/stocks/holdings", status: "running" });
          const holdingsRes = await fetch("/api/stocks/holdings", {
            headers: { Authorization: `Bearer ${token}` }
          });
          let holdingsCount = 0;
          try {
            const holdingsData = await holdingsRes.json();
            holdingsCount = Array.isArray(holdingsData) ? holdingsData.length : 0;
          } catch (e) {}
          logs[logs.length - 1] = { test: "GET /api/stocks/holdings", status: holdingsRes.status, ok: holdingsRes.ok, count: holdingsCount };
        }
      } catch (e: any) {
        logs.push({ test: "ERROR", error: e.message });
      }

      setResults(logs);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Smoke Tests</h1>

        {loading && <p className="text-gray-400">Running tests...</p>}

        <div className="space-y-3">
          {results.map((result, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-gray-700 bg-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold">{result.test}</span>
                <span className={`px-3 py-1 rounded font-bold ${result.ok ? "bg-green-900 text-green-200" : result.status === "running" ? "bg-yellow-900 text-yellow-200" : "bg-red-900 text-red-200"}`}>
                  {result.status}
                </span>
              </div>
              {result.token && <p className="text-sm text-blue-400">Token: {result.token}</p>}
              {result.count !== undefined && <p className="text-sm text-gray-400">Count: {result.count}</p>}
              {result.error && <p className="text-sm text-red-400">Error: {result.error}</p>}
              {result.data && typeof result.data === "string" && <pre className="text-xs text-gray-500 mt-2 overflow-auto">{result.data.substring(0, 300)}</pre>}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-gray-400">View this page in browser at: <code className="bg-gray-900 px-2 py-1 rounded">http://localhost:3000/test</code></p>
        </div>
      </div>
    </div>
  );
}
