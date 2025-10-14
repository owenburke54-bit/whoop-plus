"use client";

import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { pearsonCorrelation } from '@/utils/stats';
import ScatterChartMinimal from '@/components/ScatterChartMinimal';

const metricOptions = [
  { key: 'recoveryScore', label: 'Recovery %' },
  { key: 'strainScore', label: 'Strain' },
  { key: 'sleepHours', label: 'Sleep Hours' },
  { key: 'hrv', label: 'HRV' },
  { key: 'vo2Max', label: 'VO₂ max' },
  { key: 'hydrationScore', label: 'Hydration %' },
  { key: 'hydrationIntakeMl', label: 'Hydration (ml)' }
];

export default function SimpleCorrelation() {
  const { metrics } = useApp();
  const [xKey, setXKey] = useState('hydrationScore');
  const [yKey, setYKey] = useState('recoveryScore');

  const [r, data] = useMemo(() => {
    const xs = metrics.map(m => (m as any)[xKey] as number);
    const ys = metrics.map(m => (m as any)[yKey] as number);
    const rVal = pearsonCorrelation(xs, ys);
    const points = metrics.map((m, i) => ({ x: xs[i], y: ys[i], date: m.date }));
    return [rVal, points] as const;
  }, [metrics, xKey, yKey]);

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-gray-200">Correlation</h2>
          <div className="text-xs text-gray-400">Pearson r between two metrics</div>
        </div>
        <div className="flex gap-2 text-sm">
          <select value={xKey} onChange={e => setXKey(e.target.value)} className="rounded-md border border-gray-800 bg-gray-900 px-2 py-1">
            {metricOptions.map(o => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
          <span className="self-center text-gray-400">vs</span>
          <select value={yKey} onChange={e => setYKey(e.target.value)} className="rounded-md border border-gray-800 bg-gray-900 px-2 py-1">
            {metricOptions.map(o => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-300">r = {r.toFixed(2)}</div>
      <div className="mt-3">
        <ScatterChartMinimal data={data} />
      </div>
    </div>
  );
}


