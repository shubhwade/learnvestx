// Quiz Questions - All questions are based on content from the lessons
// Students should be able to answer these after reading the corresponding lesson

export type QuizQuestion = {
    prompt: string;
    explanation: string;
    options: { text: string; isCorrect: boolean }[];
};

export type QuizData = {
    title: string;
    forLesson: string;
    passingScore: number;
    questions: QuizQuestion[];
};

// =====================================================
// BEGINNER QUIZZES - Based on Beginner Lesson Content
// =====================================================

export const BEGINNER_QUIZZES: QuizData[] = [
    {
        title: "Stock Market Basics Quiz",
        forLesson: "What is the Stock Market?",
        passingScore: 4,
        questions: [
            {
                prompt: "According to the lesson, which is Asia's oldest stock exchange?",
                explanation: "As stated in the lesson, BSE (Bombay Stock Exchange) was established in 1875, making it Asia's oldest stock exchange.",
                options: [
                    { text: "NSE (established 1992)", isCorrect: false },
                    { text: "BSE (established 1875)", isCorrect: true },
                    { text: "Tokyo Stock Exchange", isCorrect: false },
                    { text: "Shanghai Stock Exchange", isCorrect: false }
                ]
            },
            {
                prompt: "In the Primary Market (IPO), where does the money raised go?",
                explanation: "The lesson explains that in Primary Market IPOs, 'The money raised goes directly to the company' for expansion and operations.",
                options: [
                    { text: "To existing shareholders", isCorrect: false },
                    { text: "Directly to the company", isCorrect: true },
                    { text: "To stockbrokers", isCorrect: false },
                    { text: "To SEBI", isCorrect: false }
                ]
            },
            {
                prompt: "What is the benchmark index of NSE mentioned in the lesson?",
                explanation: "The lesson states that NIFTY 50 is the benchmark index of NSE, representing the top 50 companies.",
                options: [
                    { text: "SENSEX", isCorrect: false },
                    { text: "NIFTY 50", isCorrect: true },
                    { text: "BSE 500", isCorrect: false },
                    { text: "NIFTY Bank", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, what is SEBI's main role?",
                explanation: "The lesson explains SEBI's motto as 'Protecting Investors, Nurturing Growth' and describes it as the regulator that protects investors.",
                options: [
                    { text: "Lending money to companies", isCorrect: false },
                    { text: "Setting stock prices", isCorrect: false },
                    { text: "Protecting investors and regulating markets", isCorrect: true },
                    { text: "Trading stocks on behalf of government", isCorrect: false }
                ]
            },
            {
                prompt: "What are the regular trading hours mentioned in the lesson?",
                explanation: "The lesson clearly states regular trading hours are 9:15 AM - 3:30 PM.",
                options: [
                    { text: "9:00 AM - 4:00 PM", isCorrect: false },
                    { text: "9:15 AM - 3:30 PM", isCorrect: true },
                    { text: "10:00 AM - 3:00 PM", isCorrect: false },
                    { text: "9:30 AM - 4:30 PM", isCorrect: false }
                ]
            },
            {
                prompt: "In the Secondary Market, does the company receive money when shares are traded?",
                explanation: "The lesson emphasizes that in Secondary Market, 'The company does NOT receive any money from these trades' - only investors exchange money with each other.",
                options: [
                    { text: "Yes, company gets a commission", isCorrect: false },
                    { text: "Yes, company gets the full amount", isCorrect: false },
                    { text: "No, company gets nothing", isCorrect: true },
                    { text: "Company gets 50%", isCorrect: false }
                ]
            }
        ]
    },
    {
        title: "Stocks & Shares Quiz",
        forLesson: "Understanding Stocks & Shares",
        passingScore: 4,
        questions: [
            {
                prompt: "According to the lesson, which type of shares have voting rights?",
                explanation: "The lesson's comparison table shows that Equity Shares have voting rights (1 share = 1 vote), while Preference Shares usually do not.",
                options: [
                    { text: "Preference Shares only", isCorrect: false },
                    { text: "Equity Shares only", isCorrect: true },
                    { text: "Both equally", isCorrect: false },
                    { text: "Neither has voting rights", isCorrect: false }
                ]
            },
            {
                prompt: "What is the formula for Market Cap given in the lesson?",
                explanation: "The lesson clearly states: Market Cap = Current Share Price × Total Shares Outstanding",
                options: [
                    { text: "Price × Volume", isCorrect: false },
                    { text: "Price × Total Shares Outstanding", isCorrect: true },
                    { text: "Revenue × P/E Ratio", isCorrect: false },
                    { text: "Profit × Number of Investors", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, what is the Market Cap threshold for Large Cap stocks?",
                explanation: "The lesson states: Large Cap = Market Cap > ₹20,000 crore",
                options: [
                    { text: "> ₹10,000 crore", isCorrect: false },
                    { text: "> ₹20,000 crore", isCorrect: true },
                    { text: "> ₹50,000 crore", isCorrect: false },
                    { text: "> ₹1,00,000 crore", isCorrect: false }
                ]
            },
            {
                prompt: "The lesson mentions Preference Shares have what type of dividend?",
                explanation: "The lesson explains Preference Shares have 'Fixed rate, guaranteed before equity' dividends.",
                options: [
                    { text: "Variable based on profits", isCorrect: false },
                    { text: "Fixed rate dividend", isCorrect: true },
                    { text: "No dividend", isCorrect: false },
                    { text: "Same as equity shares", isCorrect: false }
                ]
            },
            {
                prompt: "What is the 'Spread' in a stock quote according to the lesson?",
                explanation: "The lesson defines Spread = Ask Price - Bid Price. In the example, spread was ₹1,680 - ₹1,678 = ₹2.",
                options: [
                    { text: "The day's price range", isCorrect: false },
                    { text: "Ask Price minus Bid Price", isCorrect: true },
                    { text: "Total shares traded", isCorrect: false },
                    { text: "Commission charged", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, what are the three ways to make money from stocks?",
                explanation: "The lesson covers three methods: Capital Appreciation (buy low, sell high), Dividends (company shares profits), and Bonus Shares (free additional shares).",
                options: [
                    { text: "Trading, Options, Futures", isCorrect: false },
                    { text: "Dividends, Interest, Rent", isCorrect: false },
                    { text: "Capital Appreciation, Dividends, Bonus Shares", isCorrect: true },
                    { text: "Day Trading, Swing Trading, Position Trading", isCorrect: false }
                ]
            }
        ]
    },
    {
        title: "Buying & Selling Stocks Quiz",
        forLesson: "How to Buy & Sell Stocks",
        passingScore: 4,
        questions: [
            {
                prompt: "According to the lesson, how many accounts do you need to trade stocks?",
                explanation: "The lesson clearly states you need THREE accounts: Bank Account, Trading Account, and Demat Account.",
                options: [
                    { text: "1 account", isCorrect: false },
                    { text: "2 accounts", isCorrect: false },
                    { text: "3 accounts", isCorrect: true },
                    { text: "4 accounts", isCorrect: false }
                ]
            },
            {
                prompt: "What is a Demat Account used for according to the lesson?",
                explanation: "The lesson explains Demat Account is 'a digital locker that holds your shares electronically'.",
                options: [
                    { text: "Placing buy/sell orders", isCorrect: false },
                    { text: "Holding shares electronically", isCorrect: true },
                    { text: "Storing physical share certificates", isCorrect: false },
                    { text: "Transferring money to broker", isCorrect: false }
                ]
            },
            {
                prompt: "What is the settlement period mentioned in the lesson?",
                explanation: "The lesson states 'T+1 = One working day later (When settlement happens)'.",
                options: [
                    { text: "T+0 (same day)", isCorrect: false },
                    { text: "T+1 (next working day)", isCorrect: true },
                    { text: "T+2 (two days)", isCorrect: false },
                    { text: "T+3 (three days)", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, when should you use a Market Order?",
                explanation: "The lesson states to use Market Order when 'You MUST buy/sell right now' and need immediate execution.",
                options: [
                    { text: "When you have a target price", isCorrect: false },
                    { text: "When you must buy/sell immediately", isCorrect: true },
                    { text: "When you want to wait for better price", isCorrect: false },
                    { text: "Only for large orders", isCorrect: false }
                ]
            },
            {
                prompt: "What is the purpose of a Stop-Loss order according to the lesson?",
                explanation: "The lesson explains Stop-Loss is used 'To protect profits on existing holdings' and 'To limit losses if trade goes wrong'.",
                options: [
                    { text: "To guarantee profits", isCorrect: false },
                    { text: "To limit losses and protect profits", isCorrect: true },
                    { text: "To get better prices", isCorrect: false },
                    { text: "To avoid brokerage charges", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, what is the approximate STT (Securities Transaction Tax) on delivery trades?",
                explanation: "The lesson's charges table shows STT on delivery = 0.1% on buy.",
                options: [
                    { text: "0.01%", isCorrect: false },
                    { text: "0.1%", isCorrect: true },
                    { text: "1%", isCorrect: false },
                    { text: "0.5%", isCorrect: false }
                ]
            }
        ]
    }
];

// =====================================================
// INTERMEDIATE QUIZZES
// =====================================================

export const INTERMEDIATE_QUIZZES: QuizData[] = [
    {
        title: "Technical Analysis Quiz",
        forLesson: "Introduction to Technical Analysis",
        passingScore: 6,
        questions: [
            {
                prompt: "What is the first core principle of Technical Analysis mentioned in the lesson?",
                explanation: "The lesson states the first principle is 'Market Discounts Everything' - all information is reflected in price.",
                options: [
                    { text: "Fundamentals matter most", isCorrect: false },
                    { text: "Market discounts everything", isCorrect: true },
                    { text: "History never repeats", isCorrect: false },
                    { text: "Random price movements", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, what is a Support Level?",
                explanation: "The lesson defines Support as 'A price level where buying interest is strong enough to prevent the price from falling further' - like a floor.",
                options: [
                    { text: "Price where selling is strong (ceiling)", isCorrect: false },
                    { text: "Price where buying is strong (floor)", isCorrect: true },
                    { text: "The average price of the day", isCorrect: false },
                    { text: "The opening price", isCorrect: false }
                ]
            },
            {
                prompt: "What defines an Uptrend according to the lesson?",
                explanation: "The lesson states an Uptrend is 'Series of Higher Highs (HH) and Higher Lows (HL)'.",
                options: [
                    { text: "Lower highs and lower lows", isCorrect: false },
                    { text: "Higher highs and higher lows", isCorrect: true },
                    { text: "Prices moving sideways", isCorrect: false },
                    { text: "Random price movements", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson's volume analysis, what does rising price + rising volume signal?",
                explanation: "The lesson's table shows: Rising Price + Rising Volume = Strong uptrend (BUY signal).",
                options: [
                    { text: "Weak trend, be cautious", isCorrect: false },
                    { text: "Strong uptrend (buy signal)", isCorrect: true },
                    { text: "Strong downtrend (sell signal)", isCorrect: false },
                    { text: "No clear signal", isCorrect: false }
                ]
            },
            {
                prompt: "What does a green candlestick represent according to the lesson?",
                explanation: "The lesson states 'Green candle: Close > Open (Bullish day)' - meaning price closed higher than it opened.",
                options: [
                    { text: "Close is less than Open", isCorrect: false },
                    { text: "Close is greater than Open", isCorrect: true },
                    { text: "High volume day", isCorrect: false },
                    { text: "Support level", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, what happens when support breaks?",
                explanation: "The lesson states 'Key Rule: When support breaks, it often becomes resistance.'",
                options: [
                    { text: "It disappears completely", isCorrect: false },
                    { text: "It often becomes resistance", isCorrect: true },
                    { text: "It becomes stronger support", isCorrect: false },
                    { text: "Price immediately reverses", isCorrect: false }
                ]
            },
            {
                prompt: "What is a Resistance Level according to the lesson?",
                explanation: "The lesson defines Resistance as 'A price level where selling interest is strong enough to prevent the price from rising further' - like a ceiling.",
                options: [
                    { text: "Price where buying is strong", isCorrect: false },
                    { text: "Price where selling is strong", isCorrect: true },
                    { text: "The day's high price", isCorrect: false },
                    { text: "The average closing price", isCorrect: false }
                ]
            },
            {
                prompt: "What does the lesson say about rising price with FALLING volume?",
                explanation: "According to the lesson: Rising Price + Falling Volume = Weak uptrend (CAUTION).",
                options: [
                    { text: "Strong buy signal", isCorrect: false },
                    { text: "Strong sell signal", isCorrect: false },
                    { text: "Weak uptrend - be cautious", isCorrect: true },
                    { text: "No significance", isCorrect: false }
                ]
            }
        ]
    }
];

// =====================================================
// ADVANCED QUIZZES
// =====================================================

export const ADVANCED_QUIZZES: QuizData[] = [
    {
        title: "Futures Trading Quiz",
        forLesson: "Futures Trading",
        passingScore: 8,
        questions: [
            {
                prompt: "According to the lesson, what is a Futures Contract?",
                explanation: "The lesson defines it as 'A legal agreement to buy or sell an asset at a predetermined price on a specific future date.'",
                options: [
                    { text: "A loan from the broker", isCorrect: false },
                    { text: "A contract to buy/sell at predetermined price on future date", isCorrect: true },
                    { text: "A type of stock", isCorrect: false },
                    { text: "A mutual fund", isCorrect: false }
                ]
            },
            {
                prompt: "What is the Nifty Futures lot size mentioned in the lesson?",
                explanation: "The lesson's key numbers table states: 'Nifty Lot Size = 50 units'.",
                options: [
                    { text: "25 units", isCorrect: false },
                    { text: "50 units", isCorrect: true },
                    { text: "75 units", isCorrect: false },
                    { text: "100 units", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, when is the expiry day for futures contracts?",
                explanation: "The lesson states: 'Expiry Day = Last Thursday of month'.",
                options: [
                    { text: "Last Friday of month", isCorrect: false },
                    { text: "Last Thursday of month", isCorrect: true },
                    { text: "First Monday of month", isCorrect: false },
                    { text: "15th of every month", isCorrect: false }
                ]
            },
            {
                prompt: "What is the leverage multiplier in the lesson's example?",
                explanation: "The lesson calculates: 'Leverage = 10 lakh / 1.5 lakh = 6.67x'.",
                options: [
                    { text: "2x", isCorrect: false },
                    { text: "5x", isCorrect: false },
                    { text: "6.67x", isCorrect: true },
                    { text: "10x", isCorrect: false }
                ]
            },
            {
                prompt: "According to the lesson, what is Mark-to-Market (MTM)?",
                explanation: "The lesson explains MTM as daily settlement where 'your futures position is marked to the closing price, and profit/loss is settled in cash.'",
                options: [
                    { text: "Monthly settlement", isCorrect: false },
                    { text: "Settlement only at expiry", isCorrect: false },
                    { text: "Daily profit/loss settlement in cash", isCorrect: true },
                    { text: "No settlement required", isCorrect: false }
                ]
            },
            {
                prompt: "In the lesson's example, if Nifty rises from 19,550 to 20,000, what is the profit per lot?",
                explanation: "The lesson calculates: Profit = (20,000 - 19,550) × 50 = ₹22,500.",
                options: [
                    { text: "₹450", isCorrect: false },
                    { text: "₹22,500", isCorrect: true },
                    { text: "₹45,000", isCorrect: false },
                    { text: "₹4,500", isCorrect: false }
                ]
            },
            {
                prompt: "What percentage of capital should you risk per trade according to the lesson?",
                explanation: "The lesson's risk management rules state: 'Risk only 1-2% of your capital per trade.'",
                options: [
                    { text: "5-10%", isCorrect: false },
                    { text: "1-2%", isCorrect: true },
                    { text: "10-20%", isCorrect: false },
                    { text: "50%", isCorrect: false }
                ]
            },
            {
                prompt: "According to the hedging example, what can you short to protect a stock portfolio?",
                explanation: "The lesson suggests shorting Nifty Futures to hedge: 'Short Nifty Futures!' to protect stock portfolio.",
                options: [
                    { text: "Gold", isCorrect: false },
                    { text: "More stocks", isCorrect: false },
                    { text: "Nifty Futures", isCorrect: true },
                    { text: "Bonds", isCorrect: false }
                ]
            },
            {
                prompt: "What is the margin requirement range mentioned in the lesson?",
                explanation: "The lesson states: 'Margin Requirement = 15-50% of contract value'.",
                options: [
                    { text: "5-10%", isCorrect: false },
                    { text: "15-50%", isCorrect: true },
                    { text: "50-80%", isCorrect: false },
                    { text: "100%", isCorrect: false }
                ]
            },
            {
                prompt: "According to the leverage table, if underlying moves +5%, what is the futures trader's return with 6x leverage?",
                explanation: "The lesson's table shows: +5% underlying move = +30% return for futures trader (with ~6x leverage).",
                options: [
                    { text: "+5%", isCorrect: false },
                    { text: "+15%", isCorrect: false },
                    { text: "+30%", isCorrect: true },
                    { text: "+60%", isCorrect: false }
                ]
            }
        ]
    }
];

export const ALL_QUIZZES = [...BEGINNER_QUIZZES, ...INTERMEDIATE_QUIZZES, ...ADVANCED_QUIZZES];
