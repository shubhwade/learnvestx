import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { PHProvider } from "./providers/PostHogProvider";
import PostHogPageView from "./providers/PostHogPageView";
// import { AICopilot } from "@/components/ai/AICopilot";


const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: {
    default: "LearnVestX - Master Investing Through Realistic Simulations",
    template: "%s | LearnVestX"
  },
  description: "Learn investing through realistic stock trading simulations, SIP calculators, micro-lessons, and gamified challenges. Practice with virtual money, master real skills. India's #1 Finance Learning Platform.",
  keywords: [
    "stock trading simulator",
    "learn investing",
    "virtual trading",
    "SIP calculator",
    "finance education",
    "stock market learning",
    "investment courses",
    "paper trading India",
    "financial literacy",
    "stock market course"
  ],
  authors: [{ name: "LearnVestX Team" }],
  creator: "LearnVestX",
  publisher: "LearnVestX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://learnvestx.com',
    siteName: 'LearnVestX',
    title: 'LearnVestX - Master Investing Through Realistic Simulations',
    description: 'Learn investing through realistic stock trading simulations. Practice with ₹1,00,000 virtual money, master real skills.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LearnVestX - Finance Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnVestX - Master Investing',
    description: 'Learn investing through realistic simulations. Practice with virtual money, master real skills.',
    images: ['/og-image.png'],
    creator: '@learnvestx',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  category: 'education',
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PHProvider>
          <PostHogPageView />
          <AuthProvider>
            {children}
            {/* <AICopilot /> */}
          </AuthProvider>
        </PHProvider>
      </body>
    </html>
  );
}

