"use client";

import { useApp } from '@/context/AppContext';
import AISummary from '@/components/AISummary';
import LineChartMinimal from '@/components/LineChartMinimal';
import DualLineChartMinimal from '@/components/DualLineChartMinimal';
import CircularGauge from '@/components/CircularGauge';
import Link from 'next/link';

export default function AthleteDashboardPage() {
  const { metrics } = useApp();
  if (!metrics || metrics.length === 0) {
    return (
      <main className="mx-auto w-full max-w-6xl p-4">
        <h1 className="text-2xl font-semibold">Elite Athlete — Dashboard</h1>
        <div className="mt-4 text-sm text-gray-400">Loading sample data...</div>
      </main>
    );
  }
  const latest = metrics[metrics.length - 1];

  const readiness = latest.recoveryScore; // 0-100
  const readinessColor =
    readiness >= 67 ? 'bg-emerald-600/20 text-emerald-300 border-emerald-700/50' :
    readiness >= 34 ? 'bg-yellow-600/20 text-yellow-300 border-yellow-700/50' :
    'bg-red-600/20 text-red-300 border-red-700/50';

  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Elite Athlete — Dashboard</h1>
      <div className="mt-2">
        <Link
          href="/athlete/analytics"
          className="inline-flex items-center rounded-md border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-gray-200 transition-colors hover:bg-gray-900"
        >
          Open Athlete Analytics
        </Link>
      </div>
      <AISummary context="athlete" />

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4 flex items-center justify-center">
          <CircularGauge percent={readiness} label="Readiness" valueText={`${readiness}%`} color="#10B981" />
        </section>
        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4 md:col-span-2">
          <h2 className="text-sm font-medium text-gray-200">7‑Day Load Balance</h2>
          <div className="mt-2">
            <DualLineChartMinimal
              a={metrics.slice(-7).map((m,i)=>({x:i,y:m.strainScore}))}
              b={metrics.slice(-7).map((m,i)=>({x:i,y:m.recoveryScore}))}
              colorA="#60A5FA"
              colorB="#10B981"
            />
          </div>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">Recovery</h2>
          <div className="mt-2 text-sm text-gray-300">HRV {Math.round(latest.hrv)} ms · Resting HR —</div>
          <LineChartMinimal data={metrics.slice(-14).map((m,i)=>({x:i,y:m.recoveryScore}))} />
        </section>

        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">Strain</h2>
          <div className="mt-2 text-sm text-gray-300">Today {latest.strainScore.toFixed(1)} · Load —</div>
        </section>

        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">Hydration</h2>
          <div className="mt-2 text-sm text-gray-300">Score {latest.hydrationScore}% · Intake {latest.hydrationIntakeMl} ml</div>
        </section>

        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">VO₂ / Performance</h2>
          <div className="mt-2 text-sm text-gray-300">VO₂ max {latest.vo2Max.toFixed(1)}</div>
        </section>

        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4 md:col-span-2">
          <h2 className="text-sm font-medium text-gray-200">Coach’s Summary</h2>
          <div className="mt-2 text-sm text-gray-300">Recovery strong despite higher load. Prioritize hydration to sustain VO₂ gains.</div>
        </section>
      </div>
    </main>
  );
}


