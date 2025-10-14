"use client";

import { useApp } from '@/context/AppContext';
import LineChartMinimal from '@/components/LineChartMinimal';

export default function RecoveryDetailPage() {
  const { metrics } = useApp();
  const data = metrics.slice(-14).map((m, i) => ({ x: i, y: m.recoveryScore }));
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Recovery</h1>
      <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <LineChartMinimal data={data} />
        <div className="mt-3 text-sm text-gray-300">Recent trend of recovery. Mock data displayed.</div>
      </div>
    </main>
  );
}


