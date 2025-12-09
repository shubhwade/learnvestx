"use client";

import { useState } from "react";
import { Award, ExternalLink, Clock, Star, GraduationCap, Filter } from "lucide-react";

// Verified working links to free finance certificates
const FREE_CERTIFICATES = [
  {
    id: 1,
    title: "Financial Markets",
    provider: "Yale University (Coursera)",
    description: "Overview of financial markets, risk management, and behavioral finance by Professor Robert Shiller.",
    url: "https://www.coursera.org/learn/financial-markets-global",
    duration: "33 hours",
    difficulty: "Beginner",
    rating: 4.8,
    free: true
  },
  {
    id: 2,
    title: "Introduction to Corporate Finance",
    provider: "Corporate Finance Institute",
    description: "Learn fundamentals of corporate finance, financial analysis, and valuation.",
    url: "https://corporatefinanceinstitute.com/course/introduction-to-corporate-finance/",
    duration: "3 hours",
    difficulty: "Beginner",
    rating: 4.7,
    free: true
  },
  {
    id: 3,
    title: "Finance & Capital Markets",
    provider: "Khan Academy",
    description: "Comprehensive free courses on stocks, bonds, interest, inflation and more.",
    url: "https://www.khanacademy.org/economics-finance-domain/core-finance",
    duration: "Self-paced",
    difficulty: "Beginner",
    rating: 4.9,
    free: true
  },
  {
    id: 4,
    title: "Introduction to Finance and Accounting",
    provider: "University of Pennsylvania (Coursera)",
    description: "Introduction to key finance and accounting concepts.",
    url: "https://www.coursera.org/specializations/finance-accounting",
    duration: "4 months",
    difficulty: "Beginner",
    rating: 4.7,
    free: true
  },
  {
    id: 5,
    title: "Financial Accounting Fundamentals",
    provider: "University of Virginia (Coursera)",
    description: "Learn the language of business through financial reports.",
    url: "https://www.coursera.org/learn/uva-darden-financial-accounting",
    duration: "9 hours",
    difficulty: "Beginner",
    rating: 4.6,
    free: true
  },
  {
    id: 6,
    title: "Personal & Family Financial Planning",
    provider: "University of Florida (Coursera)",
    description: "Learn how to make smart financial decisions for saving and investing.",
    url: "https://www.coursera.org/learn/family-planning",
    duration: "13 hours",
    difficulty: "Beginner",
    rating: 4.7,
    free: true
  },
  {
    id: 7,
    title: "Investment Management Specialization",
    provider: "University of Geneva (Coursera)",
    description: "Understand investment theory and develop portfolio management skills.",
    url: "https://www.coursera.org/specializations/investment-management",
    duration: "5 months",
    difficulty: "Intermediate",
    rating: 4.6,
    free: true
  },
  {
    id: 8,
    title: "Stock Market Basics",
    provider: "Zerodha Varsity",
    description: "Comprehensive guide to Indian stock markets, trading and investing.",
    url: "https://zerodha.com/varsity/",
    duration: "Self-paced",
    difficulty: "Beginner",
    rating: 4.8,
    free: true
  },
  {
    id: 9,
    title: "NCFM Modules",
    provider: "NSE India",
    description: "National Stock Exchange certifications for financial markets.",
    url: "https://www.nseindia.com/learn/content/ncfm",
    duration: "Self-paced",
    difficulty: "Intermediate",
    rating: 4.5,
    free: false,
    fee: "₹1,500-2,000"
  },
  {
    id: 10,
    title: "Excel for Finance",
    provider: "Corporate Finance Institute",
    description: "Master Excel skills essential for financial modeling and analysis.",
    url: "https://corporatefinanceinstitute.com/course/excel-fundamentals/",
    duration: "4 hours",
    difficulty: "Beginner",
    rating: 4.8,
    free: true
  },
  {
    id: 11,
    title: "Python for Finance",
    provider: "DataCamp",
    description: "Learn Python programming for financial analysis and algorithmic trading.",
    url: "https://www.datacamp.com/tracks/finance-fundamentals-in-python",
    duration: "20 hours",
    difficulty: "Intermediate",
    rating: 4.5,
    free: false,
    fee: "Free trial"
  },
  {
    id: 12,
    title: "Economics of Money and Banking",
    provider: "Columbia University (Coursera)",
    description: "Deep understanding of money, banking and financial intermediation.",
    url: "https://www.coursera.org/learn/money-banking",
    duration: "28 hours",
    difficulty: "Advanced",
    rating: 4.9,
    free: true
  }
];

export default function CertificatesPage() {
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filteredCerts = FREE_CERTIFICATES.filter(cert => {
    if (filter === "free" && !cert.free) return false;
    if (filter === "paid" && cert.free) return false;
    if (difficultyFilter !== "all" && cert.difficulty !== difficultyFilter) return false;
    return true;
  });

  const freeCount = FREE_CERTIFICATES.filter(c => c.free).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Finance Certificates</h1>
        <p className="text-white/50 mt-2">Free and professional certifications • {freeCount} free courses available</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Filter className="w-4 h-4 text-white/40 mt-2" />
        {["all", "free", "paid"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                ? 'bg-white text-black'
                : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20'
              }`}
          >
            {f === "all" ? "All" : f === "free" ? "Free Only" : "Paid"}
          </button>
        ))}

        <span className="w-px h-8 bg-white/10 mx-2" />

        {["all", "Beginner", "Intermediate", "Advanced"].map(d => (
          <button
            key={d}
            onClick={() => setDifficultyFilter(d)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${difficultyFilter === d
                ? 'bg-white/20 text-white'
                : 'text-white/40 hover:text-white/60'
              }`}
          >
            {d === "all" ? "All Levels" : d}
          </button>
        ))}
      </div>

      {/* Certificate List */}
      <div className="space-y-4">
        {filteredCerts.map(cert => (
          <a
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-white/90">{cert.title}</h3>
                    {cert.free ? (
                      <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded">FREE</span>
                    ) : (
                      <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded">{cert.fee}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/50 mb-2">{cert.provider}</p>
                  <p className="text-sm text-white/40">{cert.description}</p>
                </div>

                {/* Right: Meta */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-white/40">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {cert.duration}
                  </div>
                  <div className="text-white/40">{cert.difficulty}</div>
                  <div className="text-white/50">
                    <Star className="w-4 h-4 inline mr-1 text-white/40" />
                    {cert.rating}
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Empty State */}
      {filteredCerts.length === 0 && (
        <div className="text-center py-16 rounded-xl bg-white/5 border border-white/10">
          <GraduationCap className="w-12 h-12 mx-auto text-white/20 mb-4" />
          <p className="text-white/40">No certificates match your filter</p>
        </div>
      )}

      {/* Tip */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-sm text-white/50">
        💡 <strong className="text-white/70">Tip:</strong> Coursera courses offer free audit access - you can learn the full course for free, and only pay if you want the certificate.
      </div>
    </div>
  );
}
