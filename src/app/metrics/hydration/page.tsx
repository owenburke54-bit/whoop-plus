"use client";

import { useApp } from '@/context/AppContext';
import { useEffect, useState } from 'react';

export default function HydrationDetailPage() {
  const { user, metrics, logHydration } = useApp();
  const latest = metrics[metrics.length - 1];
  const add = (ml: number) => () => logHydration(ml);
  const recent = metrics.slice(-7);
  const avgRecovery = recent.reduce((a, b) => a + b.recoveryScore, 0) / Math.max(1, recent.length);
  const wellHydrated = recent.filter(m => m.hydrationScore >= 80);
  const avgRecoveryHydrated = wellHydrated.reduce((a, b) => a + b.recoveryScore, 0) / Math.max(1, wellHydrated.length);
  const impact = Number.isFinite(avgRecoveryHydrated) ? avgRecoveryHydrated - avgRecovery : 0; // simple delta heuristic
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Hydration</h1>
      <p className="mt-2 text-sm text-gray-300">
        Goal {user.preferences.hydrationGoalMl} ml — intake {latest.hydrationIntakeMl} ml
      </p>
      <div className="mt-4 inline-flex gap-2">
        <button onClick={add(250)} className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700">+250 ml</button>
        <button onClick={add(500)} className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700">+500 ml</button>
        <button onClick={add(750)} className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700">+750 ml</button>
      </div>
      <p className="mt-4 text-sm text-gray-300">Hydration Score: {latest.hydrationScore}%</p>
      <div className="mt-2 rounded-md border border-gray-800 bg-gray-950 p-3 text-sm text-gray-200">
        Hydration impact score (7d): {impact >= 0 ? '+' : ''}{impact.toFixed(1)} recovery pts when well hydrated (≥80%).
      </div>
      <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-200">Reminders</h2>
        </div>
        <ReminderSettings />
      </div>
    </main>
  );
}

function ReminderSettings() {
  const key = 'hydration_reminder_minutes';
  const [minutes, setMinutes] = useState<number>(() => {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    return raw ? parseInt(raw, 10) : 180;
  });
  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, String(minutes));
  }, [minutes]);
  return (
    <div className="mt-3 text-sm text-gray-300">
      <label className="inline-flex items-center gap-2">
        <span className="text-xs text-gray-400">Every</span>
        <input
          type="number"
          className="w-24 rounded-md border border-gray-800 bg-gray-900 px-2 py-1 text-sm text-gray-200"
          value={minutes}
          min={30}
          step={15}
          onChange={e => setMinutes(parseInt(e.target.value, 10) || 0)}
        />
        <span className="text-xs text-gray-400">minutes (local reminder)</span>
      </label>
    </div>
  );
}


