"use client";

import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import ScatterChartMinimal from '@/components/ScatterChartMinimal';
import { pearsonCorrelation } from '@/utils/stats';

const subjective = [
  { key: 'mood', label: 'Mood' },
  { key: 'stress', label: 'Stress' },
  { key: 'energy', label: 'Energy' },
  { key: 'soreness', label: 'Soreness' },
  { key: 'sleepQuality', label: 'Sleep Quality' },
  { key: 'nutritionQuality', label: 'Nutrition Quality' }
] as const;

const objective = [
  { key: 'recoveryScore', label: 'Recovery %' },
  { key: 'hrv', label: 'HRV' },
  { key: 'strainScore', label: 'Strain' }
] as const;

export default function JournalCorrelationsPage() {
  const { journal, metrics } = useApp();
  const [xKey, setXKey] = useState<(typeof subjective)[number]['key']>('stress');
  const [yKey, setYKey] = useState<(typeof objective)[number]['key']>('recoveryScore');

  const data = useMemo(() => {
    // Join by date
    return journal.map(j => {
      const m = metrics.find(mm => mm.date === j.date);
      if (!m) return null as any;
      return { date: j.date, x: (j as any)[xKey] as number, y: (m as any)[yKey] as number };
    }).filter(Boolean) as { date: string; x: number; y: number }[];
  }, [journal, metrics, xKey, yKey]);

  const r = useMemo(() => pearsonCorrelation(data.map(d => d.x), data.map(d => d.y)), [data]);

  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Journal Correlations</h1>
      <div className="mt-2 text-sm text-gray-300">Explore relationships between journal entries and metrics.</div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <label className="inline-flex items-center gap-2">
          <span className="text-xs text-gray-400">Subjective</span>
          <select value={xKey} onChange={e => setXKey(e.target.value as any)} className="rounded-md border border-gray-800 bg-gray-900 px-2 py-1">
            {subjective.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </label>
        <label className="inline-flex items-center gap-2">
          <span className="text-xs text-gray-400">Objective</span>
          <select value={yKey} onChange={e => setYKey(e.target.value as any)} className="rounded-md border border-gray-800 bg-gray-900 px-2 py-1">
            {objective.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-3 text-sm text-gray-300">r = {r.toFixed(2)}</div>
      <div className="mt-3">
        <ScatterChartMinimal data={data} />
      </div>
    </main>
  );
}



