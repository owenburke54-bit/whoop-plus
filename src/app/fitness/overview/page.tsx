"use client";

import OverviewCard from '@/components/OverviewCard';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import AISummary from '@/components/AISummary';
import LineChartMinimal from '@/components/LineChartMinimal';

export default function FitnessOverviewPage() {
  const { metrics, user, logHydration } = useApp();
  const latest = metrics[metrics.length - 1];
  const add = (ml: number) => () => logHydration(ml);
  const last7 = metrics.slice(-7);
  const sleepSpark = last7.map((m, i) => ({ x: i, y: m.sleepHours }));
  const hydSpark = last7.map((m, i) => ({ x: i, y: m.hydrationScore }));
  const recSpark = last7.map((m, i) => ({ x: i, y: m.recoveryScore }));
  const strainSpark = last7.map((m, i) => ({ x: i, y: m.strainScore }));
  const energyPred = Math.max(1, Math.min(10, Math.round((latest.recoveryScore / 100) * 6 + (8 - Math.min(8, latest.sleepHours)))));
  const hydrationStreak = last7.filter(m => m.hydrationScore >= 100).length;

  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">General Fitness — Overview</h1>
      <div className="mt-2">
        <Link
          href="/fitness/analytics"
          className="inline-flex items-center rounded-md border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-gray-200 transition-colors hover:bg-gray-900"
        >
          Open Fitness Analytics
        </Link>
      </div>
      <AISummary context="fitness" />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <OverviewCard title="Activity" href="/metrics/activities">
          Today’s strain {latest.strainScore.toFixed(1)} — tap for session details
        </OverviewCard>
        <OverviewCard title="Sleep" href="/metrics/sleep">
          Last night {latest.sleepHours.toFixed(1)} h — stages coming soon
        </OverviewCard>
        <OverviewCard
          title="Hydration"
          href="/metrics/hydration"
          action={
            <div className="inline-flex gap-2">
              <button onClick={add(250)} className="rounded-md bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">+250</button>
              <button onClick={add(500)} className="rounded-md bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">+500</button>
            </div>
          }
        >
          {latest.hydrationIntakeMl}/{user.preferences.hydrationGoalMl} ml — score {latest.hydrationScore}%
        </OverviewCard>
        <OverviewCard title="Heart" href="/metrics/recovery">
          HRV {Math.round(latest.hrv)} ms — Resting HR coming soon
        </OverviewCard>
        <OverviewCard title="Energy Predictor">
          <div className="text-sm text-gray-300">Predicted Energy: {energyPred}/10</div>
          <div className="mt-2 h-2 w-full rounded bg-gradient-to-r from-red-600 via-yellow-500 to-green-500">
            <div className="h-2 rounded bg-white/30" style={{ width: `${(energyPred/10)*100}%` }} />
          </div>
        </OverviewCard>
        <OverviewCard title="Journal" href="/journal">
          Quick‑tap entries and timeline
        </OverviewCard>
      </div>

      {/* Progress cards with sparklines */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all duration-200 hover:shadow-md">
          <div className="text-xs text-gray-400">💧 Hydration</div>
          <div className="mt-1 text-xl font-semibold text-white">{latest.hydrationScore}%</div>
          <div className="mt-2">
            <LineChartMinimal data={hydSpark} height={80} />
          </div>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all duration-200 hover:shadow-md">
          <div className="text-xs text-gray-400">💤 Sleep</div>
          <div className="mt-1 text-xl font-semibold text-white">{latest.sleepHours.toFixed(1)}h / 8h</div>
          <div className="mt-2">
            <LineChartMinimal data={sleepSpark} height={80} />
          </div>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all duration-200 hover:shadow-md">
          <div className="text-xs text-gray-400">❤️ Recovery</div>
          <div className="mt-1 text-xl font-semibold text-white">{latest.recoveryScore}%</div>
          <div className="mt-2">
            <LineChartMinimal data={recSpark} height={80} />
          </div>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all duration-200 hover:shadow-md">
          <div className="text-xs text-gray-400">🔥 Strain</div>
          <div className="mt-1 text-xl font-semibold text-white">{latest.strainScore.toFixed(1)}</div>
          <div className="mt-2">
            <LineChartMinimal data={strainSpark} height={80} />
          </div>
        </div>
      </div>

      {/* Motivational goal tile */}
      <div className="mt-6 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <div className="text-sm text-gray-200">✅ Daily streak: {hydrationStreak} days of full hydration goals met.</div>
      </div>
    </main>
  );
}


