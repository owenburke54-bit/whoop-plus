"use client";

import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import ScatterChartMinimal from '@/components/ScatterChartMinimal';
import BookmarksPanel from '@/components/BookmarksPanel';
import KPIBuilder from '@/components/KPIBuilder';
import ClientOnly from '@/components/ClientOnly';

const metricKeys = ['recoveryScore', 'strainScore', 'sleepHours', 'hrv', 'vo2Max', 'hydrationScore', 'hydrationIntakeMl'] as const;
const graphTypes = ['line', 'scatter', 'bar', 'heatmap'] as const;

export default function AthleteAnalyticsPage() {
  const { addBookmark, metrics } = useApp();
  const [selected, setSelected] = useState<string[]>(['hydrationScore', 'recoveryScore']);
  const [graphType, setGraphType] = useState<(typeof graphTypes)[number]>('scatter');
  const [name, setName] = useState('Hydration vs Recovery');

  const toggleMetric = (k: string) => {
    setSelected(prev => (prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]));
  };

  const save = () => {
    addBookmark({
      userId: 'u_demo',
      name,
      formula: selected.join(', '),
      metricsUsed: selected,
      graphType,
      favorite: false
    });
  };

  const xKey = selected[0];
  const yKey = selected[1];
  const points = useMemo(() => (
    xKey && yKey ? metrics.map(m => ({ x: (m as any)[xKey] as number, y: (m as any)[yKey] as number, label: m.date })) : []
  ), [metrics, xKey, yKey]);

  // Team overlay: shift by small random offset to simulate team variance (mock)
  const [showTeam, setShowTeam] = useState(false);
  const overlay = useMemo(() => (
    showTeam && xKey && yKey
      ? metrics.map(m => ({ x: ((m as any)[xKey] as number) * 0.95 + 1, y: ((m as any)[yKey] as number) * 1.05 - 1, label: m.date }))
      : []
  ), [showTeam, metrics, xKey, yKey]);

  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Elite Athlete — Analytics (Advanced)</h1>
      <p className="mt-2 text-sm text-gray-300">Metric panel, workspace, and bookmarks.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">Metric Panel</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {metricKeys.map(k => (
              <li key={k}>
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input type="checkbox" checked={selected.includes(k)} onChange={() => toggleMetric(k)} />
                  {k}
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <div className="text-xs text-gray-400">Graph Type</div>
            <select value={graphType} onChange={e => setGraphType(e.target.value as any)} className="mt-1 w-full rounded-md border border-gray-800 bg-gray-900 px-2 py-1 text-sm">
              {graphTypes.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <div className="text-xs text-gray-400">Bookmark Name</div>
            <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-md border border-gray-800 bg-gray-900 px-2 py-1 text-sm" />
            <button onClick={save} className="mt-2 w-full rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-white">Save Bookmark</button>
          </div>
        </section>

        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4 md:col-span-1 md:col-span-2">
          <h2 className="text-sm font-medium text-gray-200">Graph Workspace</h2>
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={showTeam} onChange={e => setShowTeam(e.target.checked)} /> Team overlay
            </label>
          </div>
          <div className="mt-3 text-sm text-gray-300">Selected metrics: {selected.join(', ') || 'None'}</div>
          <div className="mt-3">
            {graphType === 'scatter' && points.length > 0 ? (
              <ClientOnly>
                <ScatterChartMinimal data={points} secondaryData={overlay} />
              </ClientOnly>
            ) : (
              <div className="rounded-md border border-dashed border-gray-700 p-8 text-center text-sm text-gray-500">Graph placeholder</div>
            )}
          </div>
        </section>

        <div className="space-y-4">
          <BookmarksPanel />
          <KPIBuilder />
        </div>
      </div>
    </main>
  );
}


