"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Clock, BookOpen } from "lucide-react";

type Question = {
    id: number;
    prompt: string;
    explanation?: string;
    options: {
        id: number;
        text: string;
        isCorrect: boolean;
    }[];
};

type Quiz = {
    id: number;
    title: string;
    category: string;
    passingScore: number;
    questions: Question[];
};

export default function QuizTakePage() {
    const params = useParams();
    const router = useRouter();
    const quizId = parseInt(params.id as string);

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [selected, setSelected] = useState<Record<number, number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{ score: number; passed: boolean; certificateId?: string } | null>(null);

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    const fetchQuiz = async () => {
        try {
            const data = await api.quiz.get(quizId);
            setQuiz(data);
        } catch (err) {
            console.error("Failed to fetch quiz:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!quiz) return;

        setSubmitting(true);
        try {
            const answers: Record<number, number> = {};
            quiz.questions.forEach((q) => {
                const selectedOptionId = selected[q.id];
                if (selectedOptionId !== undefined) {
                    answers[q.id] = selectedOptionId;
                }
            });

            const resultData = await api.quiz.submit(quiz.id, answers);
            setResult(resultData);
            setSubmitted(true);
        } catch (err: any) {
            console.error("Failed to submit quiz:", err);
            alert(err.message || "Failed to submit quiz. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const categoryConfig: Record<string, { color: string; bgColor: string }> = {
        BEGINNER: { color: "text-green-400", bgColor: "bg-green-500/10" },
        INTERMEDIATE: { color: "text-blue-400", bgColor: "bg-blue-500/10" },
        ADVANCED: { color: "text-purple-400", bgColor: "bg-purple-500/10" }
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="h-10 w-64 bg-white/10 rounded animate-pulse" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-60 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="text-center py-20">
                <BookOpen className="w-16 h-16 mx-auto text-white/20 mb-4" />
                <p className="text-white/60">Quiz not found</p>
                <Link href="/dashboard/quiz" className="text-blue-400 hover:underline mt-4 inline-block">
                    ← Back to quizzes
                </Link>
            </div>
        );
    }

    const config = categoryConfig[quiz.category] || categoryConfig.BEGINNER;
    const answeredCount = Object.keys(selected).length;
    const totalQuestions = quiz.questions.length;

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <Link
                href="/dashboard/quiz"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Quizzes</span>
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-medium ${config.color} ${config.bgColor} px-2 py-1 rounded`}>
                            {quiz.category}
                        </span>
                        {!submitted && (
                            <span className="flex items-center gap-1 text-white/40 text-sm">
                                <Clock className="w-4 h-4" />
                                ~10 min
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-sm text-white/60">
                            Pass: <span className="text-white font-medium">{quiz.passingScore}/{totalQuestions}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Result Banner */}
            {result && (
                <div className={`rounded-xl border p-6 ${result.passed
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                    <div className="flex items-center gap-4">
                        {result.passed ? (
                            <Trophy className="w-12 h-12 text-green-400" />
                        ) : (
                            <XCircle className="w-12 h-12 text-red-400" />
                        )}
                        <div>
                            <h2 className={`text-xl font-bold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                                {result.passed ? '🎉 Congratulations! You Passed!' : 'Try Again'}
                            </h2>
                            <p className="text-white/60 mt-1">
                                Score: <span className="text-white font-medium">{result.score}/{totalQuestions}</span>
                                {result.passed && ' • +100 points earned!'}
                            </p>
                            {result.certificateId && (
                                <p className="text-green-400 mt-2">
                                    Certificate earned! ID: {result.certificateId}
                                    {' - '}
                                    <Link href="/dashboard/certificates" className="underline">View certificates</Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Questions */}
            <div className="space-y-6">
                {quiz.questions.map((q, index) => {
                    const selectedOptionId = selected[q.id];

                    return (
                        <div
                            key={q.id}
                            className="p-6 rounded-xl bg-white/5 border border-white/10"
                        >
                            <h3 className="text-lg font-medium text-white mb-4">
                                <span className="text-white/40 mr-2">Q{index + 1}.</span>
                                {q.prompt}
                            </h3>

                            <div className="space-y-3">
                                {q.options.map((opt) => {
                                    const isSelected = selectedOptionId === opt.id;
                                    const isCorrect = submitted && opt.isCorrect;
                                    const isWrong = submitted && isSelected && !opt.isCorrect;

                                    return (
                                        <button
                                            key={opt.id}
                                            onClick={() => !submitted && setSelected(prev => ({ ...prev, [q.id]: opt.id }))}
                                            disabled={submitted}
                                            className={`w-full rounded-lg border p-4 text-left transition-all flex items-center justify-between ${isCorrect
                                                    ? 'border-green-500/50 bg-green-500/10'
                                                    : isWrong
                                                        ? 'border-red-500/50 bg-red-500/10'
                                                        : isSelected
                                                            ? 'border-blue-500/50 bg-blue-500/10'
                                                            : 'border-white/10 hover:border-white/30'
                                                } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                                        >
                                            <span className={`${isCorrect ? 'text-green-400' : isWrong ? 'text-red-400' : 'text-white/80'}`}>
                                                {opt.text}
                                            </span>
                                            {isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                                            {isWrong && <XCircle className="w-5 h-5 text-red-400" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            {submitted && q.explanation && (
                                <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <p className="text-sm text-blue-300">
                                        <span className="font-medium">Explanation:</span> {q.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between py-6 border-t border-white/10 sticky bottom-0 bg-black/90 backdrop-blur-sm -mx-4 px-4">
                <div className="text-white/60">
                    {submitted
                        ? `Final Score: ${result?.score}/${totalQuestions}`
                        : `Answered: ${answeredCount}/${totalQuestions}`
                    }
                </div>

                {!submitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || answeredCount === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${submitting || answeredCount === 0
                                ? 'bg-white/20 text-white/50 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-white/90'
                            }`}
                    >
                        {submitting ? 'Submitting...' : `Submit Quiz (${answeredCount}/${totalQuestions} answered)`}
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setSelected({});
                                setSubmitted(false);
                                setResult(null);
                            }}
                            className="px-6 py-3 rounded-lg font-medium bg-white/10 text-white hover:bg-white/20 transition-all"
                        >
                            Retake Quiz
                        </button>
                        <Link href="/dashboard/quiz">
                            <button className="px-6 py-3 rounded-lg font-medium bg-white text-black hover:bg-white/90 transition-all">
                                Back to Quizzes
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
