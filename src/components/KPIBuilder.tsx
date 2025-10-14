"use client";

import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import LineChartMinimal from '@/components/LineChartMinimal';

const availableVars = [
  { key: 'hydration_score', map: 'hydrationScore', label: 'hydration_score' },
  { key: 'sleep_hours', map: 'sleepHours', label: 'sleep_hours' },
  { key: 'strain_score', map: 'strainScore', label: 'strain_score' },
  { key: 'recovery_score', map: 'recoveryScore', label: 'recovery_score' },
  { key: 'hrv', map: 'hrv', label: 'hrv' },
  { key: 'vo2_max', map: 'vo2Max', label: 'vo2_max' }
] as const;

function safeEvalFormula(formula: string, vars: Record<string, number>): number | null {
  // Very small sanitizer: allow digits, ops, parentheses, spaces, and variable names with underscores
  // Hyphen must be escaped or placed at the end to avoid range errors in a character class
  const allowed = /[^0-9+*\/()._ a-z-]/i;
  if (allowed.test(formula)) return null;
  const args = Object.keys(vars);
  const vals = Object.values(vars);
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(...args, `return (${formula});`);
    const out = fn(...vals);
    if (typeof out !== 'number' || !Number.isFinite(out)) return null;
    return out;
  } catch {
    return null;
  }
}

export default function KPIBuilder() {
  const { metrics, addBookmark } = useApp();
  const [formula, setFormula] = useState(' (hydration_score * sleep_hours) / Math.max(1, strain_score) ');
  const [name, setName] = useState('Hydration Efficiency');
  const [saveToDashboard, setSaveToDashboard] = useState(true);

  const results = useMemo(() => {
    return metrics.map(m => {
      const vars: Record<string, number> = {
        hydration_score: m.hydrationScore,
        sleep_hours: m.sleepHours,
        strain_score: m.strainScore,
        recovery_score: m.recoveryScore,
        hrv: m.hrv,
        vo2_max: m.vo2Max
      };
      const val = safeEvalFormula(formula, vars);
      return { date: m.date, value: val };
    });
  }, [metrics, formula]);

  const preview = results.filter(r => typeof r.value === 'number') as { date: string; value: number }[];
  const latest = preview[preview.length - 1]?.value ?? null;

  const save = () => {
    addBookmark({
      userId: 'u_demo',
      name,
      formula,
      metricsUsed: availableVars.map(v => v.key),
      graphType: 'line',
      favorite: !!saveToDashboard
    });
  };

  return (
    <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
      <h2 className="text-sm font-medium text-gray-200">KPI Builder</h2>
      <div className="mt-2 text-xs text-gray-400">Use variables: {availableVars.map(v => v.label).join(', ')}</div>
      <input
        className="mt-3 w-full rounded-md border border-gray-800 bg-gray-900 px-2 py-1 text-sm text-gray-200"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="KPI name"
      />
      <textarea
        className="mt-2 w-full rounded-md border border-gray-800 bg-gray-900 p-2 text-sm text-gray-200"
        rows={3}
        value={formula}
        onChange={e => setFormula(e.target.value)}
      />
      <div className="mt-2 text-sm text-gray-300">Latest value: {latest == null ? '—' : latest.toFixed(2)}</div>
      <div className="mt-3 rounded-lg border border-gray-800 bg-gray-900 p-3">
        <div className="text-xs text-gray-400 mb-2">Preview (last {preview.length} days)</div>
        <LineChartMinimal data={preview.map((p, i) => ({ x: i, y: p.value }))} />
      </div>
      <label className="mt-3 inline-flex items-center gap-2 text-xs text-gray-300">
        <input type="checkbox" checked={saveToDashboard} onChange={e => setSaveToDashboard(e.target.checked)} /> Save to Dashboard
      </label>
      <button onClick={save} className="mt-3 w-full rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-white">Save KPI</button>
    </section>
  );
}


