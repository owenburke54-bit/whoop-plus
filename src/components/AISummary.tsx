"use client";

import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { pearsonCorrelation } from '@/utils/stats';

export default function AISummary({ context }: { context: 'home' | 'fitness' | 'athlete' }) {
  const { metrics } = useApp();

  const summaryBase = useMemo(() => {
    if (!metrics.length) return 'No data yet.';
    const last = metrics[metrics.length - 1];
    const prev = metrics[metrics.length - 2] ?? last;

    const hrvDeltaPct = prev.hrv ? ((last.hrv - prev.hrv) / prev.hrv) * 100 : 0;
    const recDeltaPct = prev.recoveryScore ? ((last.recoveryScore - prev.recoveryScore) / prev.recoveryScore) * 100 : 0;

    const xs = metrics.slice(-7).map(m => m.hydrationScore);
    const ys = metrics.slice(-7).map(m => m.recoveryScore);
    const r = pearsonCorrelation(xs, ys);

    const tone = context === 'athlete' ? 'Analytic' : context === 'fitness' ? 'Supportive' : 'Coach';

    const parts: string[] = [];
    parts.push(`${tone}: HRV ${hrvDeltaPct >= 0 ? '↑' : '↓'} ${Math.abs(hrvDeltaPct).toFixed(1)}% vs yesterday.`);
    parts.push(`Recovery ${recDeltaPct >= 0 ? '↑' : '↓'} ${Math.abs(recDeltaPct).toFixed(1)}% today.`);
    if (Number.isFinite(r)) {
      parts.push(`Hydration↔Recovery correlation r=${r.toFixed(2)} (last 7 days).`);
    }
    return parts;
  }, [metrics, context]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % Math.max(1, summaryBase.length)), 3500);
    return () => clearInterval(id);
  }, [summaryBase.length]);

  return (
    <div className="mt-3 rounded-md border border-gray-800 bg-gray-950 p-3 text-sm text-gray-200">
      {summaryBase[Math.min(idx, summaryBase.length - 1)]}
    </div>
  );
}


