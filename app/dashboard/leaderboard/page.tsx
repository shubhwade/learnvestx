"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Trophy, TrendingUp, Target } from "lucide-react";

type LeaderboardUser = {
  id: number;
  name: string | null;
  email: string;
  portfolioValue?: number;
  totalPoints?: number;
  challengeCount?: number;
  rank?: number;
};

export default function LeaderboardPage() {
  const { user: currentUser } = useAuth();
  const [tab, setTab] = useState<"portfolio" | "points" | "challenges">("portfolio");
  const [data, setData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await api.leaderboard.get(tab);
      setData(result);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (user: LeaderboardUser) => {
    if (tab === "portfolio") {
      return `₹${Number(user.portfolioValue || 0).toLocaleString()}`;
    } else if (tab === "points") {
      return `${user.totalPoints || 0} pts`;
    } else {
      return `${user.challengeCount || 0}`;
    }
  };

  const getScoreLabel = () => {
    if (tab === "portfolio") return "Portfolio Value";
    if (tab === "points") return "Total Points";
    return "Challenges";
  };

  const tabs = [
    { id: "portfolio", label: "Portfolio", icon: TrendingUp },
    { id: "points", label: "Points", icon: Trophy },
    { id: "challenges", label: "Challenges", icon: Target }
  ];

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
        <p className="text-white/50 mt-2">Top performers ranked by performance</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((t) => {
          const isActive = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${isActive
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20'
                }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="flex items-end justify-center gap-4 py-8">
            <div className="w-24 h-28 bg-white/5 rounded-t-xl animate-pulse" />
            <div className="w-28 h-36 bg-white/5 rounded-t-xl animate-pulse" />
            <div className="w-24 h-24 bg-white/5 rounded-t-xl animate-pulse" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16 rounded-xl bg-white/5 border border-white/10">
          <Trophy className="w-12 h-12 mx-auto text-white/20 mb-4" />
          <p className="text-white/40">No rankings available yet</p>
        </div>
      ) : (
        <>
          {/* Podium - Top 3 */}
          {top3.length >= 3 && (
            <div className="flex items-end justify-center gap-3 py-4">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 font-medium mb-2">
                  {getInitials(top3[1].name, top3[1].email)}
                </div>
                <p className="text-sm font-medium text-white/70 mb-1 truncate max-w-[80px]">
                  {top3[1].name || top3[1].email.split("@")[0]}
                </p>
                <p className="text-xs text-white/40 mb-2">{formatScore(top3[1])}</p>
                <div className="w-20 h-20 bg-white/10 rounded-t-lg flex items-center justify-center border-t border-x border-white/10">
                  <span className="text-2xl font-bold text-white/50">2</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center -mt-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-medium mb-2">
                  {getInitials(top3[0].name, top3[0].email)}
                </div>
                <p className="text-sm font-semibold text-white mb-1 truncate max-w-[90px]">
                  {top3[0].name || top3[0].email.split("@")[0]}
                </p>
                <p className="text-xs text-white/50 mb-2">{formatScore(top3[0])}</p>
                <div className="w-24 h-28 bg-white/15 rounded-t-lg flex items-center justify-center border-t border-x border-white/20">
                  <span className="text-3xl font-bold text-white/70">1</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 font-medium mb-2">
                  {getInitials(top3[2].name, top3[2].email)}
                </div>
                <p className="text-sm font-medium text-white/70 mb-1 truncate max-w-[80px]">
                  {top3[2].name || top3[2].email.split("@")[0]}
                </p>
                <p className="text-xs text-white/40 mb-2">{formatScore(top3[2])}</p>
                <div className="w-20 h-16 bg-white/10 rounded-t-lg flex items-center justify-center border-t border-x border-white/10">
                  <span className="text-2xl font-bold text-white/50">3</span>
                </div>
              </div>
            </div>
          )}

          {/* Rest of Leaderboard */}
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-sm text-white/50 font-medium">Rank</span>
              <span className="text-sm text-white/50 font-medium">{getScoreLabel()}</span>
            </div>

            <div className="divide-y divide-white/5">
              {(top3.length < 3 ? data : rest).map((user, i) => {
                const rank = top3.length < 3 ? i + 1 : i + 4;
                const isCurrentUser = currentUser?.id === user.id;

                return (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 transition-colors ${isCurrentUser
                        ? 'bg-white/10'
                        : 'hover:bg-white/5'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5">
                        <span className="text-sm font-bold text-white/40">#{rank}</span>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 font-medium text-sm">
                        {getInitials(user.name, user.email)}
                      </div>

                      <div>
                        <p className="font-medium text-white/80">
                          {user.name || user.email.split("@")[0]}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded">You</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-white/70">{formatScore(user)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
