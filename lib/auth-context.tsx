"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { api } from "./api";

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
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync session user to local state
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      // If we have a session, we can trust the user is logged in
      // We can either use session.user data directly or fetch fresh data
      // Let's fetch fresh data to ensure we have the latest balance/points
      // accessing the protected API also verifies the token

      // For Google login, we don't have a localStorage token to send
      // But we modified the API to check cookies!
      // So api.auth.me() should work.

      api.auth.me()
        .then(userData => {
          setUser(userData);
        })
        .catch(err => {
          console.error("Failed to fetch user data:", err);
          // If API fails but we have session, use session data as fallback
          if (session.user) {
            // @ts-ignore
            setUser(session.user as User);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session, status]);

  const login = async (email: string, password: string) => {
    // For legacy credentials login
    // We can use NextAuth's signIn which handles everything
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    // Session update will trigger the useEffect above
  };

  const signup = async (email: string, password: string, name?: string) => {
    // Standard signup via API
    await api.auth.signup(email, password, name);
    // Then auto-login
    await login(email, password);
  };

  const logout = async () => {
    await signOut({ redirect: false });
    setUser(null);
    localStorage.removeItem("accessToken"); // Clean up legacy token
    window.location.href = "/login";
  };

  const refreshUser = async () => {
    if (user) {
      try {
        const userData = await api.auth.me();
        setUser(userData);
      } catch {
        // Don't logout on refresh error, might be temporary network issue
      }
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
