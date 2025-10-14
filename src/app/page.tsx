"use client";

import React, { useEffect, useState } from 'react';
import KeyMetricCard from '@/components/KeyMetricCard';
import { useApp } from '@/context/AppContext';
import AISummary from '@/components/AISummary';
import ClientOnly from '@/components/ClientOnly';
import LineChartMinimal from '@/components/LineChartMinimal';
import CircularGauge from '@/components/CircularGauge';
import { ozToMl, formatOzFromMl } from '@/utils/units';

export default function HomePage() {
  const { metrics, user, logHydration } = useApp();
  if (metrics.length === 0) {
    return (
      <main className="mx-auto w-full max-w-6xl p-4">
        <h1 className="text-2xl font-semibold">Key Metrics</h1>
        <div className="mt-4 text-sm text-gray-400">Loading sample data...</div>
      </main>
    );
  }
  const latest = metrics[metrics.length - 1];
  const lastNight = metrics[metrics.length - 1];
  const hydration7 = metrics.slice(-7).map((m, i) => ({ x: i, y: m.hydrationScore }));
  const [reminderEnabled, setReminderEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('hydration_reminder_enabled');
    setReminderEnabled(saved === '1');
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('hydration_reminder_enabled', reminderEnabled ? '1' : '0');
    }
  }, [reminderEnabled]);

  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Key Metrics</h1>
      <ClientOnly>
        <AISummary context="home" />
      </ClientOnly>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-950 p-4">
          <CircularGauge
            percent={Math.round((lastNight.sleepHours / 8) * 100)}
            label="Sleep"
            valueText={`${lastNight.sleepHours.toFixed(1)}h`}
            color="#3B82F6"
          />
        </div>
        <div className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-950 p-4">
          <CircularGauge
            percent={latest.recoveryScore}
            label="Recovery"
            valueText={`${latest.recoveryScore}%`}
            color="#10B981"
          />
        </div>
        <div className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-950 p-4">
          <CircularGauge
            percent={Math.min(100, Math.round((latest.strainScore / 21) * 100))}
            label="Strain"
            valueText={`${latest.strainScore.toFixed(1)}`}
            color="#005CFF"
            labelColor="text-blue-400"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-200">My Day</h2>
        <div className="mt-3 rounded-lg border border-gray-800 bg-gray-950 p-4">
          <div className="text-xs text-gray-400">Your Daily Outlook</div>
          <div className="mt-1 text-sm text-gray-200">Focus on consistency. Hydration and sleep are trending positively.</div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <h3 className="text-sm font-medium text-gray-200">Today's Activities</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-900 p-2">
            <div className="flex items-center gap-2">
              <span>🌙</span>
              <div>
                <div className="text-gray-200">Sleep</div>
                <div className="text-xs text-gray-400">2:24 AM - 9:11 AM</div>
              </div>
            </div>
            <div className="text-gray-300">Strain 0.0</div>
          </li>
          <li className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-900 p-2">
            <div className="flex items-center gap-2">
              <span>⚽</span>
              <div>
                <div className="text-gray-200">Soccer Training</div>
                <div className="text-xs text-gray-400">4:30 PM - 6:00 PM</div>
              </div>
            </div>
            <div className="text-gray-300">Strain 14.2</div>
          </li>
        </ul>
        <div className="mt-3 inline-flex gap-2">
          <button className="rounded-md bg-gray-200 px-3 py-2 text-xs font-medium text-gray-900 hover:bg-white">Add Activity</button>
          <button className="rounded-md border border-gray-700 px-3 py-2 text-xs text-gray-200 hover:bg-gray-900">Start Activity</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h3 className="text-sm font-medium text-gray-200">Tonight's Sleep</h3>
          <div className="mt-2 text-sm text-gray-300">Recommended bedtime: 11:00 PM</div>
          <div className="text-sm text-gray-300">Goal: 8:00 h</div>
          <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-gray-300">
            <input type="checkbox" /> Alarm OFF
          </label>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h3 className="text-sm font-medium text-gray-200">Hydration</h3>
          <div className="mt-2 h-2 w-full rounded bg-gray-900">
            <div className="h-2 rounded bg-emerald-600" style={{ width: `${latest.hydrationScore}%` }} />
          </div>
          <div className="mt-2 text-xs text-gray-400">{latest.hydrationScore}% of goal</div>
          <div className="mt-3 inline-flex gap-2">
            <button onClick={() => logHydration(ozToMl(8))} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">+8 oz</button>
            <button onClick={() => logHydration(ozToMl(16))} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">+16 oz</button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-200">Hydration — Weekly</h2>
          <div className="text-xs text-gray-400">Mock sparkline</div>
        </div>
        <div className="mt-3">
          <LineChartMinimal data={hydration7} />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="inline-flex gap-2">
            <button onClick={() => logHydration(ozToMl(8))} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">+8 oz</button>
            <button onClick={() => logHydration(ozToMl(16))} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">+16 oz</button>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-gray-300">
            <input type="checkbox" checked={reminderEnabled} onChange={(e) => setReminderEnabled(e.target.checked)} />
            Reminder ON
          </label>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <KeyMetricCard
          title="Hydration"
          value={`${latest.hydrationScore}%`}
          subtitle={`${formatOzFromMl(latest.hydrationIntakeMl)} / ${formatOzFromMl(user.preferences.hydrationGoalMl)}`}
          href="/metrics/hydration"
        />
        <KeyMetricCard
          title="Today's Activities"
          value={`${latest.strainScore.toFixed(1)} strain`}
          subtitle="Tap for details"
          href="/metrics/activities"
        />
      </div>

      <div className="mt-8 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-200">Analytics</h2>
          <div className="text-xs text-gray-400">Quick access</div>
        </div>
        <div className="mt-3 inline-flex gap-2 text-sm">
          <a className="rounded-md bg-gray-200 px-3 py-2 text-gray-900 hover:bg-white" href="/fitness/analytics">Fitness Analytics</a>
          <a className="rounded-md border border-gray-700 px-3 py-2 text-gray-200 hover:bg-gray-900" href="/athlete/analytics">Athlete Analytics</a>
        </div>
      </div>
    </main>
  );
}


