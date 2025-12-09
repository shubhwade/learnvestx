"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import Link from "next/link";
import { User, Mail, Wallet, Trophy, Award, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, logout, refreshUser } = useAuth();
  const router = useRouter();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.certificates
        .list()
        .then(setCertificates)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">Account</p>
          <h1 className="text-4xl font-bold mt-2">Profile</h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 flex items-center gap-2 border border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* User Info Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg font-semibold mb-4">Account Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-white/40" />
              <div>
                <p className="text-sm text-white/50">Name</p>
                <p className="font-medium text-white">{user.name || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-white/40" />
              <div>
                <p className="text-sm text-white/50">Email</p>
                <p className="font-medium text-white">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg font-semibold mb-4">Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-white/50">Total Points</p>
                <p className="font-medium text-white">{user.totalPoints.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-white/50">Virtual Balance</p>
                <p className="font-medium text-white">₹{Number(user.virtualBalance).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-white/50">Certificates</p>
                <p className="font-medium text-white">{loading ? '...' : certificates.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates */}
      {certificates.length > 0 && (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">Your Certificates</h2>
            <p className="text-sm text-white/40 mt-1">{certificates.length} earned</p>
          </div>
          <div className="divide-y divide-white/5">
            {certificates.map((cert) => (
              <div key={cert.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div>
                  <p className="font-medium text-white">{cert.name}</p>
                  <p className="text-sm text-white/40">
                    {new Date(cert.dateIssued).toLocaleDateString()} • {cert.certificateId}
                  </p>
                </div>
                <button className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
