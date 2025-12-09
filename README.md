# LearnVestX - Finance Learning & Simulation Platform

**LearnVestX** is a comprehensive financial literacy platform designed to gamify the learning experience of stock trading, investing, and personal finance for the Indian market.

![LearnVestX Demo](https://learnvestx.vercel.app/og-image.png)

## 🚀 Features

### 📈 Real-Time Stock Simulator
- Trade 15+ real Indian stocks (RELIANCE, TCS, HDFCBANK, etc.) with live-simulated price updates.
- **₹1,00,000 Virtual Capital** provided on signup.
- Track Portfolio P&L, Holdings, and Transaction History.
- Interactive charts and green/red market indicators.

### 📚 Gamified Learning
- **Micro-Lessons**: 30+ bite-sized lessons across Beginner, Intermediate, and Advanced levels.
- **Quizzes**: Test your knowledge with instant feedback.
- **Challenges**: Auto-tracking missions (e.g., "Make your first trade", "Grow portfolio by 10%") that award points.
- **Leaderboard**: Compete with other learners globally.

### 💰 Financial Tools
- **SIP Calculator**: Visualize long-term wealth creation with interactive projections.
- **Certificates**: Track your progress and earn certifications.

### 🔐 Secure & Private
- **Email/Password Auth**: Secure login restricted to verified accounts.
- **Persistent Sessions**: Seamless user experience.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: PostgreSQL (Neon Tech)
- **ORM**: Prisma
- **State Management**: React Context + Hooks
- **Charts**: Recharts
- **Deployment**: Vercel

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL Database URL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhwade/learnvestx.git
   cd learnvestx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
   JWT_SECRET="your-super-secret-key"
   JWT_REFRESH_SECRET="your-refresh-secret-key"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
