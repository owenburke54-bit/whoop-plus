"use client";

import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';

const metrics = [
  { key: 'recoveryScore', label: 'Recovery %' },
  { key: 'strainScore', label: 'Strain' },
  { key: 'hrv', label: 'HRV' },
  { key: 'sleepHours', label: 'Sleep Hours' },
  { key: 'hydrationScore', label: 'Hydration %' }
] as const;

export default function CommunityPage() {
  const { team, metrics: myMetrics, user, toggleSharedMetric } = useApp();
  const latest = myMetrics[myMetrics.length - 1];
  const [metricKey, setMetricKey] = useState<(typeof metrics)[number]['key']>('recoveryScore');
  const lastUpdated = useMemo(() => new Date().toLocaleTimeString(), []);

  const teamAvg = useMemo(() => {
    const vals = team.map(m => m.latest[metricKey]);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }, [team, metricKey]);

  const leaderboard = useMemo(() => {
    return [...team]
      .map(m => ({ name: m.name, value: m.latest[metricKey] }))
      .sort((a, b) => b.value - a.value);
  }, [team, metricKey]);

  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Community</h1>
      <p className="mt-2 text-sm text-gray-300">Team averages and leaderboards. Privacy controls to be added.</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <div className="text-xs text-gray-400">Metric</div>
        <select value={metricKey} onChange={e => setMetricKey(e.target.value as any)} className="rounded-md border border-gray-800 bg-gray-900 px-2 py-1">
          {metrics.map(m => (
            <option key={m.key} value={m.key}>{m.label}</option>
          ))}
        </select>
        <div className="inline-flex gap-1">
          {['recoveryScore','strainScore','hrv'].map(k => (
            <button
              key={k}
              onClick={() => setMetricKey(k as any)}
              className={`rounded-md px-2 py-1 text-xs ${metricKey===k ? 'bg-gray-200 text-gray-900' : 'bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800'}`}
            >
              {k==='recoveryScore'?'Recovery':k==='strainScore'?'Strain':'HRV'}
            </button>
          ))}
        </div>
        <div className="ml-auto text-xs text-gray-500">Last updated: {lastUpdated}</div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">You vs Team</h2>
          <div className="mt-3 text-sm text-gray-300">
            You: {(latest as any)[metricKey]} · Team Avg: {teamAvg.toFixed(1)}
          </div>
          <div className="mt-3 h-3 w-full rounded bg-gray-900">
            <div className="h-3 rounded bg-emerald-600" style={{ width: `${Math.min(100, ((latest as any)[metricKey] / Math.max(100, teamAvg)) * 100)}%` }} />
          </div>
        </section>

        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">Leaderboard</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {leaderboard.map((row, i) => (
              <li key={row.name} className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-900 p-2">
                <div className="text-gray-200">{i + 1}. {row.name}</div>
                <div className="text-gray-300">{row.value}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <h2 className="text-sm font-medium text-gray-200">Team Feed</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="rounded-md border border-gray-800 bg-gray-900 p-2">
            <div className="text-gray-200">Alex: PR on 5K today! Recovery 78%.</div>
            <div className="text-xs text-gray-400">2h ago</div>
          </li>
          <li className="rounded-md border border-gray-800 bg-gray-900 p-2">
            <div className="text-gray-200">Taylor: Hydration streak 5 days.</div>
            <div className="text-xs text-gray-400">5h ago</div>
          </li>
          <li className="rounded-md border border-gray-800 bg-gray-900 p-2">
            <div className="text-gray-200">Jordan: Big lift day, strain 15.1.</div>
            <div className="text-xs text-gray-400">Yesterday</div>
          </li>
        </ul>
      </section>

      <section className="mt-6 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <h2 className="text-sm font-medium text-gray-200">Privacy Controls</h2>
        <p className="mt-1 text-xs text-gray-400">Toggle which metrics are shared with the team.</p>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {metrics.map(m => {
            const shared = user.sharedMetrics.includes(m.key);
            return (
              <li key={m.key} className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-900 p-2">
                <span className="text-gray-200">{m.label}</span>
                <button
                  onClick={() => toggleSharedMetric(m.key)}
                  className={
                    'rounded-md px-2 py-1 text-xs ' +
                    (shared ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700')
                  }
                >
                  {shared ? 'Shared ✅' : 'Private 🔒'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}


