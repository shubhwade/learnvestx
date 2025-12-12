import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();

    // Portfolio context
    const portfolioContext = data ? `
USER PORTFOLIO CONTEXT:
- User Name: ${data.userName}
- Total Value: ₹${data.totalValue}
- Cash Balance: ₹${data.cashBalance}
- Holdings: ${JSON.stringify(data.holdings)}
` : '';

    const systemPrompt = `
You are Dr. Finance, an expert AI trading assistant for "FinSim Academy", a stock market simulator.

YOUR PERSONALITY:
- Professional but encouraging.
- Concise (mobile-friendly responses, max 3-4 sentences).
- Use Indian Rupees (₹) for currency.
- You are a financial educator. Never give illegal tips or guarantee returns. Remind users this is a simulation.

CONTEXT:
${portfolioContext}

TASKS:
1. Answer queries about stocks (e.g., "Is Reliance good?").
2. Analyze diversification if asked.
3. Explain financial concepts (P/E ratio, Market Cap) simply.
`;

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    // Return a fallback response
    return NextResponse.json({
      error: 'AI temporarily unavailable',
      fallbackMessage: "I'm having trouble connecting right now. Try asking about Reliance, TCS, or what a P/E ratio is!"
    }, { status: 500 });
  }
}
