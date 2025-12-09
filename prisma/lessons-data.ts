// Comprehensive Financial Education Lessons - ALL 30 LESSONS
// 10 Beginner + 10 Intermediate + 10 Advanced

export type LessonData = {
    title: string;
    category: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    content: string;
    infographicURL: string | null;
};

export const BEGINNER_LESSONS: LessonData[] = [
    {
        title: "What is the Stock Market?",
        category: "BEGINNER",
        content: `# What is the Stock Market?

The **stock market** is a marketplace where buyers and sellers trade shares of publicly listed companies.

## Key Definitions

**Stock/Share:** A unit of ownership in a company.

**Stock Exchange:** The marketplace where stocks are traded. In India:
- **NSE (National Stock Exchange)** - Established in 1992
- **BSE (Bombay Stock Exchange)** - Established in 1875 (Asia's oldest!)

**NIFTY 50:** Top 50 companies listed on NSE
**SENSEX:** Top 30 companies listed on BSE

## Primary Market vs Secondary Market

**Primary Market (IPO):** Company sells NEW shares to public. Money goes to the company.
**Secondary Market:** Investors trade existing shares. Company gets nothing.

## Market Timings

- Trading Hours: 9:15 AM - 3:30 PM
- Pre-open: 9:00 AM - 9:15 AM

## Who Regulates?

**SEBI (Securities and Exchange Board of India)** - Established 1992
- Protects investors
- Regulates markets
- Punishes manipulation

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "Understanding Stocks & Shares",
        category: "BEGINNER",
        content: `# Understanding Stocks & Shares

When you buy a **stock**, you become a part-owner of that company.

## Types of Shares

**Equity Shares:**
- Voting rights (1 share = 1 vote)
- Variable dividends
- Higher risk, higher return potential

**Preference Shares:**
- Usually no voting rights
- Fixed dividends
- Lower risk, limited returns

## Market Capitalization

**Formula:** Market Cap = Share Price × Total Shares

**Categories:**
- Large Cap: > ₹20,000 crore (Reliance, TCS)
- Mid Cap: ₹5,000 - ₹20,000 crore
- Small Cap: < ₹5,000 crore

## How to Make Money

1. **Capital Appreciation** - Buy low, sell high
2. **Dividends** - Company shares profits
3. **Bonus Shares** - Free additional shares

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "How to Buy & Sell Stocks",
        category: "BEGINNER",
        content: `# How to Buy & Sell Stocks

## Three Essential Accounts

1. **Bank Account** - Your money source
2. **Trading Account** - Place buy/sell orders
3. **Demat Account** - Holds shares digitally

## Types of Orders

**Market Order:** Buy/sell immediately at current price
**Limit Order:** Buy/sell only at your specified price
**Stop-Loss Order:** Automatically sell to limit losses

## Settlement: T+1

T = Trade Day
+1 = Next working day (when shares/money transfer)

## Charges

- Brokerage: ₹0 for delivery (discount brokers)
- STT: 0.1% on buy
- Total charges: ~0.1-0.15%

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "Reading Stock Quotes",
        category: "BEGINNER",
        content: `# Reading Stock Quotes

## Price Information

- **LTP (Last Traded Price):** Current price
- **Open:** Today's first trade price
- **Previous Close:** Yesterday's closing price
- **Day's High/Low:** Today's range

## Bid and Ask

- **Bid:** Highest price buyers will pay
- **Ask:** Lowest price sellers will accept
- **Spread:** Difference between ask and bid

## Volume

Total shares traded. High volume = high interest.

## 52-Week High/Low

Shows the price range over the past year.

## P/E Ratio

**Formula:** P/E = Share Price / Earnings Per Share

- P/E < 15: Generally cheap
- P/E 15-25: Fair
- P/E > 25: Expensive

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "Risk & Return Basics",
        category: "BEGINNER",
        content: `# Risk & Return Basics

## The Golden Rule

**Higher Returns = Higher Risk**
**Lower Risk = Lower Returns**

No investment offers high returns with zero risk.

## Types of Risk

1. **Market Risk:** Affects entire market (COVID crash)
2. **Company Risk:** Specific to one company
3. **Liquidity Risk:** Cannot sell when needed
4. **Inflation Risk:** Returns don't beat inflation

## Risk-Return Pyramid

1. **Low Risk (3-7%):** FD, Savings Account
2. **Medium Risk (7-12%):** Debt Funds, Large Cap
3. **High Risk (12-20%+):** Mid/Small Cap, F&O

## Diversification

Don't put all eggs in one basket. Spread investments.

## Before Investing

1. Emergency Fund (6 months expenses)
2. Health Insurance
3. Term Life Insurance
4. THEN invest

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "Mutual Funds 101",
        category: "BEGINNER",
        content: `# Mutual Funds 101

A **mutual fund** pools money from many investors. A professional fund manager invests it.

## How It Works

1. You invest ₹10,000
2. NAV is ₹100 per unit
3. You get 100 units
4. If NAV rises to ₹110, your investment = ₹11,000

## Types of Mutual Funds

**By Asset Class:**
- Equity Funds (stocks)
- Debt Funds (bonds)
- Hybrid Funds (mix)

**By Investment Style:**
- Active Funds (manager picks stocks)
- Passive/Index Funds (follows an index)

## Direct vs Regular

**Direct:** Buy directly, lower expense ratio
**Regular:** Through agent, higher expense ratio

Always choose Direct plans - saves 0.5-1% annually!

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "Index Funds & ETFs",
        category: "BEGINNER",
        content: `# Index Funds & ETFs

## What is an Index Fund?

A mutual fund that simply copies an index like Nifty 50.

**Benefits:**
- Low cost (0.1-0.5% expense ratio)
- Diversification
- No fund manager bias

## What is an ETF?

Exchange Traded Fund - like index fund but trades like a stock.

**Difference from Index Fund:**
- Trades on exchange during market hours
- Can buy/sell instantly
- Needs demat account

## Popular Options in India

- Nifty 50 Index Fund
- Nifty Next 50 Index Fund
- Sensex Index Fund

**Warren Buffett recommends index funds for most investors!**

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "Bonds & Fixed Income",
        category: "BEGINNER",
        content: `# Bonds & Fixed Income

A **bond** is a loan you give to government or companies. They pay you interest.

## Types of Bonds

**Government Bonds:**
- Safest (sovereign guarantee)
- Lower returns (5-7%)

**Corporate Bonds:**
- Higher risk
- Higher returns (7-10%)

## Key Terms

- **Face Value:** Amount you'll get back at maturity
- **Coupon Rate:** Interest rate
- **Maturity:** When bond expires

## Why Include Bonds?

- Stable income
- Lower risk than stocks
- Diversification

## How to Invest

- Debt Mutual Funds
- RBI Floating Rate Bonds
- Corporate Bond Funds

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "SIP (Systematic Investment Plan)",
        category: "BEGINNER",
        content: `# SIP (Systematic Investment Plan)

Invest a fixed amount regularly (daily/weekly/monthly) in mutual funds.

## Benefits of SIP

1. **Rupee Cost Averaging:** Buy more units when prices are low
2. **Discipline:** Automatic investment
3. **Power of Compounding:** Small amounts grow big
4. **Start Small:** As low as ₹100/month

## Example

Monthly SIP: ₹5,000
Duration: 20 years
Expected Return: 12%
**Final Value: ₹49.9 lakhs!**
(Total invested: ₹12 lakhs)

## SIP vs Lumpsum

**SIP:** Reduces timing risk, suitable for salary earners
**Lumpsum:** If you have a large sum, time in market matters

**Start SIP today - time is your biggest asset!**

**Reading Time: 15 minutes**`,
        infographicURL: null
    },
    {
        title: "Emergency Fund & Goal Setting",
        category: "BEGINNER",
        content: `# Emergency Fund & Goal Setting

## Emergency Fund

Money for unexpected expenses (job loss, medical).

**How Much?** 6-12 months of monthly expenses

**Where to Keep?**
- Savings Account
- Liquid Mutual Fund
- FD with premature withdrawal option

## Financial Goal Setting

**SMART Goals:**
- **S**pecific: "Save for car" not "save money"
- **M**easurable: "₹10 lakhs"
- **A**chievable: Based on your income
- **R**elevant: Matters to you
- **T**ime-bound: "In 3 years"

## Example Goals

| Goal | Amount | Time | Investment |
|------|--------|------|------------|
| Emergency Fund | 3L | 1 year | Liquid Fund |
| Car | 10L | 3 years | Short-term Debt |
| House | 50L | 10 years | Equity + Debt |
| Retirement | 5Cr | 30 years | Equity |

**Plan your goals BEFORE investing!**

**Reading Time: 15 minutes**`,
        infographicURL: null
    }
];

export const INTERMEDIATE_LESSONS: LessonData[] = [
    {
        title: "Introduction to Technical Analysis",
        category: "INTERMEDIATE",
        content: `# Introduction to Technical Analysis

Study of price patterns to predict future movements.

## Core Principles

1. **Market discounts everything**
2. **Prices move in trends**
3. **History repeats itself**

## Chart Types

- **Line Chart:** Simple, connects closing prices
- **Candlestick:** Shows open, high, low, close

## Support and Resistance

**Support:** Price floor where buyers step in
**Resistance:** Price ceiling where sellers emerge

## Trends

**Uptrend:** Higher highs + Higher lows
**Downtrend:** Lower highs + Lower lows

## Volume

Confirms price movements. High volume = strong move.

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "Candlestick Patterns",
        category: "INTERMEDIATE",
        content: `# Candlestick Patterns

Visual representation of price action.

## Basic Patterns

**Bullish Patterns (Buy signals):**
- Hammer
- Morning Star
- Bullish Engulfing

**Bearish Patterns (Sell signals):**
- Shooting Star
- Evening Star
- Bearish Engulfing

## Doji

Open = Close. Indecision in the market.

## How to Use

1. Identify the pattern
2. Confirm with volume
3. Wait for confirmation candle
4. Set stop-loss

**Never trade on patterns alone!**

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "Technical Indicators",
        category: "INTERMEDIATE",
        content: `# Technical Indicators

Mathematical calculations based on price/volume.

## Moving Averages

**Simple Moving Average (SMA):** Average of last N days
**Exponential Moving Average (EMA):** Gives more weight to recent prices

## RSI (Relative Strength Index)

- Range: 0-100
- Above 70: Overbought (potential sell)
- Below 30: Oversold (potential buy)

## MACD

Shows trend direction and momentum.

## Bollinger Bands

Price channel based on standard deviation.

## Golden Rules

1. No indicator is 100% accurate
2. Use multiple indicators together
3. Always use stop-loss

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "Fundamental Analysis Basics",
        category: "INTERMEDIATE",
        content: `# Fundamental Analysis Basics

Analyze company financials to find intrinsic value.

## Key Financial Statements

1. **Balance Sheet:** Assets, Liabilities, Equity
2. **Income Statement:** Revenue, Expenses, Profit
3. **Cash Flow Statement:** Actual cash movements

## Important Ratios

**P/E Ratio:** Price / EPS
**P/B Ratio:** Price / Book Value
**ROE:** Net Profit / Shareholder Equity
**Debt/Equity:** Total Debt / Equity

## Qualitative Factors

- Management quality
- Business model
- Competitive advantage (moat)
- Industry outlook

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "Valuation Methods",
        category: "INTERMEDIATE",
        content: `# Valuation Methods

How to value a company.

## Relative Valuation

Compare with peers using ratios:
- P/E comparison
- P/B comparison
- EV/EBITDA

## Discounted Cash Flow (DCF)

Present value of future cash flows.

**Steps:**
1. Project future cash flows
2. Determine discount rate (WACC)
3. Calculate present value

## Price Targets

- Analyst estimates
- Historical average multiples
- DCF outputs

## Margin of Safety

Buy below intrinsic value for protection.

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "Portfolio Construction",
        category: "INTERMEDIATE",
        content: `# Portfolio Construction

Building a well-diversified portfolio.

## Asset Allocation

Divide money across asset classes:
- Equity
- Debt
- Gold
- Real Estate

## Diversification Rules

- Across sectors
- Across market caps
- Across geographies

## Rebalancing

Periodically adjust back to target allocation.

## Example Portfolio (Age 30)

- 60% Equity (Large + Mid cap)
- 25% Debt (Short-term + Corporate)
- 10% Gold
- 5% Emergency Fund

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "Sector Analysis",
        category: "INTERMEDIATE",
        content: `# Sector Analysis

Understand different sectors of the economy.

## Major Sectors

- **Banking/Financial:** HDFC, ICICI, SBI
- **IT:** TCS, Infosys, Wipro
- **FMCG:** HUL, ITC, Nestle
- **Pharma:** Sun Pharma, Dr Reddy
- **Auto:** Maruti, Tata Motors

## Cyclical vs Defensive

**Cyclical:** Auto, Real Estate (economy-dependent)
**Defensive:** FMCG, Pharma (stable demand)

## Sector Rotation

Money flows between sectors based on economic cycle.

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "IPO Investing",
        category: "INTERMEDIATE",
        content: `# IPO Investing

Buying shares when company first goes public.

## Types of Investors

- **Retail:** Up to ₹2 lakhs
- **HNI:** Above ₹2 lakhs
- **QIB:** Mutual funds, FIIs

## How to Apply

1. Check IPO dates
2. Apply through broker
3. Wait for allotment
4. Shares credited on listing

## Things to Check

- Company fundamentals
- Price band valuation
- Grey market premium
- Subscription numbers

## Risks

- Overpriced IPOs
- Lock-in periods for early investors
- Listing losses

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "Dividend Investing",
        category: "INTERMEDIATE",
        content: `# Dividend Investing

Earning regular income from stocks.

## What is a Dividend?

Company shares profit with shareholders.

## Key Dates

- **Record Date:** Date to be eligible
- **Ex-Dividend Date:** Shares trade without dividend
- **Payment Date:** When you receive money

## Dividend Yield

**Formula:** (Annual Dividend / Share Price) × 100

**High Yield Stocks:** ITC, Coal India, Power Grid

## Dividend Growth

Companies that increase dividends yearly.

## DRIP

Dividend Reinvestment Plan - compound your returns.

**Reading Time: 30 minutes**`,
        infographicURL: null
    },
    {
        title: "Reading Annual Reports",
        category: "INTERMEDIATE",
        content: `# Reading Annual Reports

Extract insights from company annual reports.

## Key Sections

1. **Chairman's Letter:** Company vision
2. **Management Discussion:** Business analysis
3. **Financial Statements:** Numbers
4. **Notes to Accounts:** Important details
5. **Auditor's Report:** Red flags

## What to Look For

- Revenue growth trends
- Profit margins
- Debt levels
- Related party transactions
- Auditor qualifications

## Red Flags

- Frequent auditor changes
- Complex structures
- Unusual accounting policies
- Hidden debts

**Reading Time: 30 minutes**`,
        infographicURL: null
    }
];

export const ADVANCED_LESSONS: LessonData[] = [
    {
        title: "Futures Trading",
        category: "ADVANCED",
        content: `# Futures Trading

A contract to buy/sell an asset at a future date at a predetermined price.

## Key Terms

- **Lot Size:** Minimum quantity (Nifty = 50)
- **Margin:** Upfront deposit (15-50%)
- **Expiry:** Last Thursday of month
- **MTM:** Daily profit/loss settlement

## Example

Buy 1 Lot Nifty Futures at 19,550
- Contract Value: 19,550 × 50 = ₹9.77 lakhs
- Margin: ₹1.5 lakhs

If Nifty rises to 20,000:
Profit = (20,000 - 19,550) × 50 = ₹22,500

## Leverage

Control large positions with small capital.
**WARNING: Amplifies both gains AND losses!**

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Options Fundamentals",
        category: "ADVANCED",
        content: `# Options Fundamentals

Right (not obligation) to buy/sell at a specific price.

## Types

**Call Option:** Right to BUY
**Put Option:** Right to SELL

## Key Terms

- **Strike Price:** Price at which you can buy/sell
- **Premium:** Price you pay for the option
- **Expiry:** When option expires

## Buying vs Selling

**Buying Options:** Limited loss, unlimited potential
**Selling Options:** Limited profit, unlimited potential loss

## Greeks

- **Delta:** Price sensitivity
- **Theta:** Time decay
- **Vega:** Volatility sensitivity

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Option Strategies",
        category: "ADVANCED",
        content: `# Option Strategies

Combinations of options for different market views.

## Basic Strategies

**Bull Call Spread:** Bullish, limited risk
**Bear Put Spread:** Bearish, limited risk
**Straddle:** Expecting big move, direction unknown
**Strangle:** Similar, lower cost

## Iron Condor

Profit from range-bound market.
- Sell OTM Call
- Buy further OTM Call
- Sell OTM Put
- Buy further OTM Put

## Covered Call

Own stock + Sell Call = Generate income

## Protective Put

Own stock + Buy Put = Insurance

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Risk Management in F&O",
        category: "ADVANCED",
        content: `# Risk Management in F&O

## Position Sizing

Risk only 1-2% of capital per trade.

## Stop-Loss

Always set before entering trade.

## Margin Management

Keep 50% of margin as buffer.

## Hedging

Use options to protect stock portfolio.

## Example

Portfolio: ₹10 lakhs in stocks
Buy Puts worth ₹20,000
If market falls 10%: Stock loss ₹1L, Put gain ₹80K
Net loss: Only ₹20K instead of ₹1L

## Rules

1. Never over-leverage
2. Always have exit plan
3. Accept losses quickly
4. Size positions correctly

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Intraday Trading",
        category: "ADVANCED",
        content: `# Intraday Trading

Buy and sell within the same day.

## Key Concepts

- **Margin:** Brokers offer 5-20x leverage
- **Square Off:** Must close before 3:20 PM
- **MIS:** Margin Intraday Square-off order

## Strategies

- **Momentum:** Trade strong movers
- **Breakout:** Trade range breakouts
- **Scalping:** Quick small profits

## Rules

1. Trade liquid stocks only
2. Use strict stop-loss
3. Take profits at targets
4. Never average down
5. Risk management first

## Reality Check

90% of intraday traders lose money!

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Algorithmic Trading Basics",
        category: "ADVANCED",
        content: `# Algorithmic Trading Basics

Using computer programs to trade automatically.

## Types

- **Execution Algos:** Execute large orders efficiently
- **Strategy Algos:** Automated trading strategies

## Popular Platforms

- Zerodha Streak (no coding)
- Python + Broker APIs
- Amibroker

## Basic Strategy Example

Example:
IF RSI less than 30 AND MACD crosses up: BUY
IF RSI greater than 70: SELL

## Requirements

1. Programming knowledge
2. Market understanding
3. Backtesting data
4. Risk management

## Caution

Algos can fail. Always monitor and have kill switch.

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Tax on Investments",
        category: "ADVANCED",
        content: `# Tax on Investments

## Capital Gains Tax

**Short-Term (STCG):** < 1 year holding
- Stocks: 15%
- Other assets: Slab rate

**Long-Term (LTCG):** > 1 year holding
- Stocks: 10% above ₹1 lakh gain
- Other assets: 20% with indexation

## Intraday Trading

Treated as business income. Slab rate applicable.

## F&O Trading

Business income. Can offset losses against future gains (8 years).

## Tax-Saving Investments

- ELSS Mutual Funds (80C)
- NPS (80CCD)

## Keep Records

All buy/sell transactions for ITR filing.

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Global Markets & FIIs",
        category: "ADVANCED",
        content: `# Global Markets & FIIs

## Foreign Institutional Investors

FIIs/FPIs bring foreign money to Indian markets.

## Impact

- Heavy FII buying = Market rises
- Heavy FII selling = Market falls

## Global Factors

- US Fed interest rates
- Dollar strength
- Oil prices
- Geopolitical events

## Correlation

Indian markets often follow:
- US (Dow Jones, S&P 500, NASDAQ)
- Asian markets (SGX Nifty)

## Tracking FII Data

NSE publishes daily FII/DII data.

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Behavioral Finance",
        category: "ADVANCED",
        content: `# Behavioral Finance

Psychology impacts investment decisions.

## Common Biases

**Loss Aversion:** Losses hurt more than equivalent gains feel good
**Confirmation Bias:** Seeking info that confirms our view
**Herd Mentality:** Following the crowd
**Overconfidence:** Overestimating our abilities
**Anchoring:** Fixating on a number (buy price)

## How to Overcome

1. Have written investment plan
2. Use checklists
3. Review decisions objectively
4. Keep investment journal
5. Learn from mistakes

## Market Psychology

Markets swing between greed and fear.

**Be greedy when others are fearful,
fearful when others are greedy.**
— Warren Buffett

**Reading Time: 60 minutes**`,
        infographicURL: null
    },
    {
        title: "Building a Trading System",
        category: "ADVANCED",
        content: `# Building a Trading System

## Components

1. **Entry Rules:** When to buy
2. **Exit Rules:** When to sell
3. **Position Sizing:** How much
4. **Risk Management:** Stop-loss rules

## Backtesting

Test strategy on historical data.

## Paper Trading

Practice without real money.

## Metrics

- Win Rate
- Risk-Reward Ratio
- Maximum Drawdown
- Sharpe Ratio

## Trading Journal

Record every trade:
- Entry/Exit prices
- Reasoning
- Outcome
- Lessons

## Continuous Improvement

Review and refine regularly.

**Reading Time: 60 minutes**`,
        infographicURL: null
    }
];

export const ALL_LESSONS = [...BEGINNER_LESSONS, ...INTERMEDIATE_LESSONS, ...ADVANCED_LESSONS];
