"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CaseStudyDetail() {
  const params = useParams();
  const caseId = parseInt(params.id as string);
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudy();
  }, [caseId]);

  const fetchCaseStudy = async () => {
    try {
      const data = await api.caseStudies.get(caseId);
      setCaseStudy(data);
    } catch (err) {
      console.error("Failed to fetch case study:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-500">Case study not found</p>
      </div>
    );
  }

  const chartData = caseStudy.chartsData
    ? Object.entries(caseStudy.chartsData).map(([key, value]: [string, any]) => ({
        label: key,
        value: typeof value === "number" ? value : Array.isArray(value) ? value[0] : 0
      }))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Case {caseId}</p>
          <h1 className="text-2xl font-bold text-[#0A2342]">{caseStudy.title}</h1>
        </div>
        <Badge variant="outline">Story</Badge>
      </div>

      {caseStudy.chartsData && (
        <Card>
          <CardHeader>
            <CardTitle>Performance chart</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.length > 0 ? chartData : [{ label: "N/A", value: 0 }]}>
                <XAxis dataKey="label" stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#0A2342" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Story</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-sm max-w-none text-slate-700"
            dangerouslySetInnerHTML={{
              __html: caseStudy.content?.replace(/\n/g, "<br />") || ""
            }}
          />
        </CardContent>
      </Card>

      {caseStudy.summaryPoints && caseStudy.summaryPoints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Lessons learned</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            {caseStudy.summaryPoints.map((point: string, idx: number) => (
              <p key={idx}>• {point}</p>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard/case-studies">
          <Button variant="ghost">Back to Case Studies</Button>
        </Link>
      </div>
    </div>
  );
}
