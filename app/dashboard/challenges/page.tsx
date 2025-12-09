"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { Trophy, Target, Zap, Clock, CheckCircle2, Play, Star, ArrowRight } from "lucide-react";

type Challenge = {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  goalDescription: string;
  rewardPoints: number;
  durationDays: number | null;
  autoProgress?: number;
  userProgress?: {
    status: string;
    progress: number;
    completedAt: string | null;
  } | null;
};

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState<number | null>(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const data = await api.challenges.list();
      setChallenges(data);
    } catch (err) {
      console.error("Failed to fetch challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChallenge = async (challengeId: number) => {
    setStarting(challengeId);
    try {
      const result = await api.challenges.start(challengeId);

      // Find the challenge to show appropriate action hint
      const challenge = challenges.find(c => c.id === challengeId);
      const title = challenge?.title.toLowerCase() || "";

      let actionHint = "Complete the required actions to finish this challenge!";
      if (title.includes("trade") || title.includes("first trade")) {
        actionHint = "Go to Stock Simulator → Search for a stock → Make a trade!";
      } else if (title.includes("portfolio") || title.includes("stock")) {
        actionHint = "Go to Stock Simulator → Buy different stocks to diversify!";
      } else if (title.includes("lesson") || title.includes("knowledge")) {
        actionHint = "Go to Lessons → Complete lessons to make progress!";
      } else if (title.includes("quiz")) {
        actionHint = "Go to Quizzes → Pass quizzes to complete this challenge!";
      } else if (title.includes("profit") || title.includes("growth")) {
        actionHint = "Trade wisely in Stock Simulator to grow your portfolio!";
      }

      alert(`🎯 Challenge Started!\n\n"${challenge?.title}"\n\n👉 ${actionHint}`);

      await fetchChallenges(); // Refresh to get updated progress
    } catch (err: any) {
      if (err.message?.includes("authenticated")) {
        alert("Please log in to join challenges.");
      } else if (err.message?.includes("already started")) {
        alert("You've already joined this challenge!");
      } else {
        alert("Failed to start challenge. Please try again.");
        console.error("Failed to start challenge:", err);
      }
    } finally {
      setStarting(null);
    }
  };

  const difficultyConfig: Record<string, {
    icon: any;
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
  }> = {
    EASY: {
      icon: Zap,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      label: "Easy"
    },
    MEDIUM: {
      icon: Target,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      label: "Medium"
    },
    HARD: {
      icon: Trophy,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      label: "Hard"
    }
  };

  const getActionLink = (title: string) => {
    const t = title.toLowerCase();
    // Match challenge titles: First Trade, Portfolio Builder, Consistent Investor, Knowledge Seeker, Quiz Master, Profit Maker
    if (t.includes("first trade") || t.includes("portfolio") || t.includes("consistent") || t.includes("investor") || t.includes("profit")) {
      return "/dashboard/stocks";
    } else if (t.includes("knowledge") || t.includes("seeker") || t.includes("lesson")) {
      return "/dashboard/lessons";
    } else if (t.includes("quiz") || t.includes("master")) {
      return "/dashboard/quiz";
    }
    return "/dashboard/stocks"; // Default to stocks for any challenge
  };

  const getProgress = (challenge: Challenge) => {
    if (challenge.userProgress?.status === "COMPLETED") return 100;
    return challenge.autoProgress || challenge.userProgress?.progress || 0;
  };

  const isCompleted = (challenge: Challenge) => {
    return challenge.userProgress?.status === "COMPLETED" || getProgress(challenge) >= 100;
  };

  const isStarted = (challenge: Challenge) => {
    return challenge.userProgress !== null && challenge.userProgress !== undefined;
  };

  const groupedChallenges = {
    EASY: challenges.filter(c => c.difficulty === "EASY"),
    MEDIUM: challenges.filter(c => c.difficulty === "MEDIUM"),
    HARD: challenges.filter(c => c.difficulty === "HARD")
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-10 w-48 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-5 w-64 bg-white/5 rounded mt-2 animate-pulse" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Challenges</h1>
          <p className="text-white/50 mt-2">Complete goals to earn points and level up your skills</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-white/70 text-sm">
            {challenges.filter(c => isCompleted(c)).length}/{challenges.length} Completed
          </span>
        </div>
      </div>

      {/* Challenge Categories */}
      {(["EASY", "MEDIUM", "HARD"] as const).map((difficulty) => {
        const categoryChallenges = groupedChallenges[difficulty];
        if (categoryChallenges.length === 0) return null;

        const config = difficultyConfig[difficulty];
        const Icon = config.icon;

        return (
          <section key={difficulty} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-3 py-2">
              <Icon className={`w-6 h-6 ${config.color}`} />
              <h2 className={`text-xl font-bold ${config.color}`}>{config.label} Challenges</h2>
              <span className="text-white/30 text-sm">
                • {categoryChallenges.filter(c => isCompleted(c)).length}/{categoryChallenges.length} done
              </span>
            </div>

            {/* Challenge Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryChallenges.map((challenge) => {
                const progress = getProgress(challenge);
                const completed = isCompleted(challenge);
                const started = isStarted(challenge);

                return (
                  <div
                    key={challenge.id}
                    className={`group p-6 rounded-xl border transition-all ${completed
                      ? 'bg-green-500/5 border-green-500/30'
                      : started
                        ? `${config.bgColor} ${config.borderColor}`
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                      }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${config.color}`} />
                        {completed && (
                          <span className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <span className={`text-xs font-semibold ${config.color}`}>
                        +{challenge.rewardPoints} pts
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
                    <p className="text-white/50 text-sm mb-4">{challenge.goalDescription}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                        <span>Progress</span>
                        <span>{Math.floor(progress)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${completed ? 'bg-green-400' : config.color.replace('text-', 'bg-')
                            }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      {challenge.durationDays && (
                        <div className="flex items-center gap-1 text-white/40 text-xs">
                          <Clock className="w-3 h-3" />
                          {challenge.durationDays} days
                        </div>
                      )}
                      {!challenge.durationDays && <div />}

                      {!started && !completed && (
                        <button
                          onClick={() => handleStartChallenge(challenge.id)}
                          disabled={starting === challenge.id}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${starting === challenge.id
                            ? 'bg-white/20 text-white/50 cursor-wait'
                            : 'bg-white text-black hover:bg-white/90'
                            }`}
                        >
                          <Play className="w-3 h-3" />
                          {starting === challenge.id ? 'Starting...' : 'Join Challenge'}
                        </button>
                      )}

                      {started && !completed && (
                        <Link
                          href={getActionLink(challenge.title)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-all"
                        >
                          Continue
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}

                      {completed && (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <Trophy className="w-3 h-3" />
                          +{challenge.rewardPoints} earned
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Empty State */}
      {challenges.length === 0 && (
        <div className="text-center py-20 rounded-xl bg-white/5 border border-white/10">
          <Trophy className="w-16 h-16 mx-auto text-white/20 mb-4" />
          <h3 className="text-xl font-semibold text-white/60 mb-2">No challenges available</h3>
          <p className="text-white/40">Check back soon for exciting challenges!</p>
        </div>
      )}
    </div>
  );
}
