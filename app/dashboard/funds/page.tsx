"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";

type Fund = { id: string; name: string; amount: number; months: number; expected: number };

function simulate(amount: number, months: number, expected: number) {
  const r = expected / 100;
  return amount * (((1 + r / 12) ** months - 1) / (r / 12));
}

export default function FundComparisonPage() {
  const [funds, setFunds] = useState<Fund[]>([
    { id: "a", name: "Alpha Growth", amount: 5000, months: 24, expected: 12 },
    { id: "b", name: "Steady Wealth", amount: 5000, months: 24, expected: 10 }
  ]);

  const chartData = useMemo(() => {
    const maxMonths = Math.max(...funds.map((f) => f.months));
    return Array.from({ length: maxMonths }, (_, idx) => {
      const month = idx + 1;
      const point: Record<string, number> = { month };
      funds.forEach((f) => {
        point[f.id] = simulate(f.amount, month, f.expected);
      });
      return point;
    });
  }, [funds]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Compare multiple funds side-by-side</p>
          <h1 className="text-2xl font-bold text-[#0A2342]">Fund Comparison</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {funds.map((fund, idx) => (
            <div
              key={fund.id}
              className="grid gap-3 rounded-2xl border border-slate-100 p-3 md:grid-cols-4"
            >
              <Input
                value={fund.name}
                onChange={(e) =>
                  setFunds((prev) =>
                    prev.map((f) => (f.id === fund.id ? { ...f, name: e.target.value } : f))
                  )
                }
              />
              <Input
                type="number"
                value={fund.amount}
                onChange={(e) =>
                  setFunds((prev) =>
                    prev.map((f) => (f.id === fund.id ? { ...f, amount: Number(e.target.value) } : f))
                  )
                }
                placeholder="SIP amount"
              />
              <Input
                type="number"
                value={fund.months}
                onChange={(e) =>
                  setFunds((prev) =>
                    prev.map((f) => (f.id === fund.id ? { ...f, months: Number(e.target.value) } : f))
                  )
                }
                placeholder="Months"
              />
              <Input
                type="number"
                value={fund.expected}
                onChange={(e) =>
                  setFunds((prev) =>
                    prev.map((f) => (f.id === fund.id ? { ...f, expected: Number(e.target.value) } : f))
                  )
                }
                placeholder="Return %"
              />
              {idx === funds.length - 1 && (
                <Button
                  variant="ghost"
                  className="md:col-span-4 w-full"
                  onClick={() =>
                    setFunds((prev) => [
                      ...prev,
                      {
                        id: `fund-${Date.now()}`,
                        name: "New Fund",
                        amount: 5000,
                        months: 24,
                        expected: 10
                      }
                    ])
                  }
                >
                  Add fund
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparison chart</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <Tooltip />
              {funds.map((fund, idx) => (
                <Line
                  key={fund.id}
                  type="monotone"
                  dataKey={fund.id}
                  name={fund.name}
                  stroke={idx % 2 === 0 ? "#0A2342" : "#00C26F"}
                  strokeWidth={3}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
