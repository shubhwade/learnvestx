const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
}

export const api = {
  auth: {
    signup: (email: string, password: string, name?: string) =>
      fetchAPI("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name })
      }),
    login: (email: string, password: string) =>
      fetchAPI("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      }).then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        return data;
      }),
    me: () => fetchAPI("/api/auth/me")
  },
  stocks: {
    quote: (symbol: string) => fetchAPI(`/api/stocks/quote?symbol=${symbol}`),
    trade: (symbol: string, type: "BUY" | "SELL", quantity: number, price: number) =>
      fetchAPI("/api/stocks/trade", {
        method: "POST",
        body: JSON.stringify({ symbol, type, quantity, price })
      }),
    holdings: () => fetchAPI("/api/stocks/holdings"),
    transactions: (limit = 50) => fetchAPI(`/api/stocks/transactions?limit=${limit}`),
    portfolioValue: () => fetchAPI("/api/stocks/portfolio-value")
  },
  sip: {
    simulate: (fundName: string, sipAmount: number, durationMonths: number, expectedReturn: number) =>
      fetchAPI("/api/sip/simulate", {
        method: "POST",
        body: JSON.stringify({ fundName, sipAmount, durationMonths, expectedReturn })
      }),
    list: () => fetchAPI("/api/sip")
  },
  lessons: {
    list: (category?: string) =>
      fetchAPI(`/api/lessons${category ? `?category=${category}` : ""}`),
    get: (id: number) => fetchAPI(`/api/lessons/${id}`),
    complete: (id: number) => fetchAPI(`/api/lessons/${id}/complete`, { method: "POST" })
  },
  caseStudies: {
    list: () => fetchAPI("/api/case-studies"),
    get: (id: number) => fetchAPI(`/api/case-studies/${id}`)
  },
  challenges: {
    list: () => fetchAPI("/api/challenges"),
    get: (id: number) => fetchAPI(`/api/challenges/${id}`),
    start: (id: number) => fetchAPI(`/api/challenges/${id}/start`, { method: "POST" }),
    updateProgress: (id: number, progress: number) =>
      fetchAPI(`/api/challenges/${id}/progress`, {
        method: "POST",
        body: JSON.stringify({ progress })
      })
  },
  leaderboard: {
    get: (type: "portfolio" | "points" | "challenges" = "portfolio") =>
      fetchAPI(`/api/leaderboard?type=${type}`)
  },
  quiz: {
    list: () => fetchAPI("/api/quiz"),
    get: (id: number) => fetchAPI(`/api/quiz?id=${id}`),
    submit: (quizId: number, answers: Record<number, number>) =>
      fetchAPI("/api/quiz/submit", {
        method: "POST",
        body: JSON.stringify({ quizId, answers })
      })
  },
  certificates: {
    list: () => fetchAPI("/api/certificates")
  }
};
