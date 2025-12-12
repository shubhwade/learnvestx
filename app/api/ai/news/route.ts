import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

// Fallback headlines if AI fails
const FALLBACK_HEADLINES = [
    { id: 1, text: "Markets open strong amid positive global cues", sentiment: "positive", relatedStock: "NIFTY50" },
    { id: 2, text: "IT sector sees profit booking after recent rally", sentiment: "negative", relatedStock: "TCS" },
    { id: 3, text: "Banking stocks lead gains on RBI policy expectations", sentiment: "positive", relatedStock: "HDFCBANK" },
];

export async function POST(req: Request) {
    try {
        const { topMovers } = await req.json();

        const prompt = `
You are a financial news generator for a stock market simulator.

Generate exactly 3 short, realistic news headlines (max 12 words each) for these Indian stocks:
${JSON.stringify(topMovers)}

Rules:
- If stock is UP, create positive news (merger, contract win, strong results)
- If stock is DOWN, create negative news (regulatory issues, profit booking, concerns)
- Use Indian context
- Return ONLY valid JSON in this exact format:
{"headlines": [{"id": 1, "text": "headline here", "sentiment": "positive", "relatedStock": "SYMBOL"}, ...]}
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
        console.error('News API error:', error);
        // Return fallback headlines
        return NextResponse.json({ headlines: FALLBACK_HEADLINES });
    }
}
