"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "./api";
import posthog from "posthog-js";

type User = {
  id: number;
  email: string;
  name: string | null;
  totalPoints: number;
  portfolioValue: number;
  virtualBalance: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.auth
        .me()
        .then((userData) => {
          setUser(userData);
          posthog.identify(userData.id.toString(), {
            email: userData.email,
            name: userData.name
          });
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.auth.login(email, password);
    const userData = await api.auth.me();
    setUser(userData);
    posthog.identify(userData.id.toString(), {
      email: userData.email,
      name: userData.name
    });
  };

  const signup = async (email: string, password: string, name?: string) => {
    await api.auth.signup(email, password, name);
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    posthog.reset();
    window.location.href = "/login";
  };

  const refreshUser = async () => {
    try {
      const userData = await api.auth.me();
      setUser(userData);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
