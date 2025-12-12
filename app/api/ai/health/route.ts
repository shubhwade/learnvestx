import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

// Fallback calculation if AI fails
function calculateFallbackHealth(portfolio: any) {
    const total = (portfolio.equity || 0) + (portfolio.cash || 100000);
    const cashPercent = ((portfolio.cash || 100000) / total) * 100;

    if (cashPercent > 80) return { score: 40, riskLevel: 'Low', verdict: "Too much cash sitting idle. Consider investing for growth." };
    if (cashPercent > 60) return { score: 55, riskLevel: 'Low', verdict: "Conservative approach. Good for safety, might miss opportunities." };
    if (cashPercent >= 20) return { score: 85, riskLevel: 'Moderate', verdict: "Well-balanced portfolio! Great mix of investments and liquidity." };
    return { score: 55, riskLevel: 'High', verdict: "Highly invested. Consider keeping more cash for opportunities." };
}

export async function POST(req: Request) {
    try {
        const { portfolio } = await req.json();

        const prompt = `
You are a strict financial advisor AI analyzing a stock portfolio.

Portfolio data:
${JSON.stringify(portfolio)}

Analyze this and return ONLY valid JSON in this exact format:
{
  "score": <number 0-100>,
  "verdict": "<1 sentence assessment, be blunt and specific>",
  "riskLevel": "<Low|Moderate|High>"
}

Scoring guidelines:
- 80-100: Well diversified, good cash/equity balance
- 50-79: Decent but room for improvement
- 0-49: Poor diversification or too risky
`;

        const result = await generateText({
            model: google('gemini-1.5-flash'),
            prompt,
        });

        // Parse the AI response
        const jsonMatch = result.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return NextResponse.json(parsed);
        }

        throw new Error('Could not parse AI response');
    } catch (error) {
        console.error('Health API error:', error);
        // Return fallback calculation
        const { portfolio } = await req.json().catch(() => ({ portfolio: {} }));
        return NextResponse.json(calculateFallbackHealth(portfolio));
    }
}
