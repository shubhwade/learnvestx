# FinSim Academy - FacilPay-Inspired UI/UX Guide

## 🎨 Design System Implementation

### Color Palette
- **Primary**: `#0A2342` (Navy Blue) - Main brand color for buttons, headings, nav
- **Accent**: `#00C26F` (Finance Green) - Call-to-action, success states, highlights
- **Light**: `#F7F9FB` (Off-white) - Page backgrounds, card backgrounds
- **Dark**: `#020B20` (Dark Navy) - Hero gradient backgrounds
- **Text**: `#1E1E1E` (Dark Gray) - Primary text on light backgrounds
- **Text Light**: `#FFFFFF` (White) - Text on dark backgrounds

### Typography
- **Font Family**: Inter (all weights)
- **Headings**: Bold (700-800 weight), tight line-height (~1.1-1.2)
- **Body**: Regular (400 weight), 1.6 line-height
- **Sizes**: h1 (3.5rem), h2 (2.5rem), h3 (1.875rem)

## 📁 Project Structure

```
/components
  /layout
    - Navbar.tsx (Landing/public navbar with mobile menu)
    - Sidebar.tsx (Dashboard navigation - desktop only)
    - DashboardLayout.tsx (Dashboard wrapper with sidebar + main)
    - DashboardHeader.tsx (Dashboard top bar with user menu)
    - BottomNav.tsx (Mobile navigation - hidden on desktop)
  /ui
    - button.tsx (Primary, Secondary, Outline, Ghost variants)
    - card.tsx (Card, CardHeader, CardTitle, CardContent)
    - input.tsx (Form input with focus states)
    - badge.tsx, select.tsx, tabs.tsx, skeleton.tsx (Additional UI)

/app
  /page.tsx → Landing page (hero, features, how it works, CTA, footer)
  /(auth)/
    /login/page.tsx → Clean login form with demo credentials
    /signup/page.tsx → Registration with benefits checklist
  /(dashboard)/
    /layout.tsx → Uses DashboardLayout component
    /page.tsx → Dashboard home (pending implementation)
    /portfolio/page.tsx → Holdings, charts, P&L (pending)
    /stocks/page.tsx → Stock trading interface (pending)
    /sip/page.tsx → SIP simulator (pending)
    /lessons/page.tsx → Lessons library (pending)
    /casestudies/page.tsx → Case studies with charts (pending)
    /challenges/page.tsx → Challenges list with progress (pending)
    /leaderboard/page.tsx → Leaderboard rankings (pending)
    /quiz/page.tsx → Quiz MCQ interface (pending)
    /certificates/page.tsx → Earned certificates (pending)
    /profile/page.tsx → User settings & profile (pending)

/app/globals.css → Design system CSS classes
/tailwind.config.ts → Tailwind color tokens (finsim-* prefixed)
```

## 🎯 Completed Pages

### 1. **Landing Page** (`/`)
- **Hero Section**: Dark gradient background with navy-to-lighter-navy gradient
  - Left: Bold heading "Learn Finance by Simulating" with subheading
  - Right: Mock dashboard card showing portfolio preview
  - CTA buttons: "Get Started" (green accent) + "Login to Dashboard" (outline)
  - Trust badges: 10K+ traders, 500M+ virtual capital, 99% success
  
- **Features Section** (8 cards): Stock Trading, SIP Simulator, Lessons, Challenges, Real-Time Data, Community, Risk-Free, Analytics
  
- **How It Works**: 4-step process with numbered circles
  
- **CTA Section**: "Ready to Master Finance?" with final signup button
  
- **Footer**: Multi-column layout with product, company, legal, and connect sections

### 2. **Login Page** (`/login`)
- Clean card-based layout centered on page
- Email + Password inputs with focus states
- "Forgot Password" link
- "Continue with Google" button (placeholder)
- Link to signup
- **Demo Credentials Card**: Shows demo@finsim.academy / password123
- Error handling with red alert boxes

### 3. **Signup Page** (`/signup`)
- Identical layout to login
- Name + Email + Password fields
- Password requirement note
- **Benefits Checklist**: 
  - ₹10 lakh virtual capital
  - 50+ interactive lessons
  - Real-time market data
  - Trading challenges
- Google signup button
- Link to login
- Terms of Service acceptance note

## 🎨 Component Usage Examples

### Button Variants
```tsx
// Primary (Navy background, white text)
<Button variant="primary" size="lg">Get Started</Button>

// Secondary (Green background, white text)
<Button variant="secondary">Join Now</Button>

// Outline (Navy border + text, white background)
<Button variant="outline">Learn More</Button>

// Ghost (Transparent, navy text)
<Button variant="ghost">View Details</Button>
```

### Card Components
```tsx
<Card className="p-6">
  <CardHeader>
    <CardTitle>Portfolio Value</CardTitle>
  </CardHeader>
  <CardContent>
    <p>₹5,24,380</p>
  </CardContent>
</Card>
```

### Navigation
```tsx
// Landing/Public pages use Navbar
<Navbar />

// Dashboard pages wrap with DashboardLayout
<DashboardLayout>
  <YourDashboardPage />
</DashboardLayout>
```

## 🚀 Pending Implementation

### Dashboard Pages to Build:
1. **Portfolio** - Holdings list, portfolio chart (recharts LineChart), P&L breakdown
2. **Trade** - Stock search, buy/sell modal, transaction history
3. **SIP Simulator** - Input form, projection chart, comparison table
4. **Lessons** - Grid of lesson cards, filtering by difficulty, detail page with rich content
5. **Case Studies** - Similar to lessons, with detailed charts and analysis
6. **Challenges** - Challenge cards with progress bars, deadline, join button
7. **Leaderboard** - Top users table/cards, sorting by portfolio value/points
8. **Quiz** - MCQ interface, single/multiple choice, submit & results
9. **Certificates** - Earned certs list, printable cert mock-up
10. **Profile** - User info, settings, account preferences

## 📊 Chart Integration (Recharts)

All dashboard pages should use **Recharts** for visualizations:
- **Portfolio**: LineChart showing portfolio value over time (blue line)
- **SIP Simulator**: AreaChart showing growth projection (green fill, navy stroke)
- **Case Studies**: BarChart for market comparisons
- **Leaderboard**: BarChart for top performers

Install: `npm install recharts`

## 🎭 Color Usage Rules

- **Primary (Navy)**: Main headings, button text, nav links, active states
- **Accent (Green)**: CTA buttons, success messages, highlights, "Buy" actions
- **Light Background**: Card backgrounds, section backgrounds
- **Dark Gradient**: Hero sections only
- **Text Colors**: Dark gray on light, white on dark

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation visible, desktop layouts
- **Tablet**: Sidebar may collapse, adjust grid layouts
- **Mobile**: 
  - Sidebar hidden, bottom navigation visible
  - Single column layouts
  - Touch-friendly button sizes (min 44px)
  - Full-width cards

## ✨ Animation & Interactions

- **Hover States**: Cards lift slightly, shadows increase (using Tailwind `hover:shadow-lg` + `-translate-y-1`)
- **Button Interactions**: Active state scales down (`active:scale-95`)
- **Transitions**: All color/shadow changes use `transition-all duration-300`
- **Loading States**: Button shows spinner, disabled state at 50% opacity

## 🔐 Authentication Flow

1. User lands on `/` (landing page)
2. Clicks "Get Started" → redirects to `/signup`
3. Fills in name, email, password
4. Backend creates user, returns JWT token
5. Token saved to `localStorage`
6. Redirect to `/dashboard`
7. Dashboard pages check token, show content or redirect to login

## 🎯 Next Steps

1. Build remaining dashboard pages using the component system
2. Integrate Recharts for portfolio and SIP visualizations
3. Connect API endpoints for lessons, challenges, quiz data
4. Implement trading modal for stock transactions
5. Add mobile optimizations and test on various screen sizes
6. Implement dark mode toggle (optional, design supports it)

---

**Design Philosophy**: Minimal, clean, modern fintech aesthetic inspired by FacilPay. Focus on clarity, trust, and actionable CTAs. Use plenty of whitespace, rounded corners (lg), and subtle shadows for depth.
