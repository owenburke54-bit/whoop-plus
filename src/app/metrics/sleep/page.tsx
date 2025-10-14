"use client";

import DonutChartMinimal from '@/components/DonutChartMinimal';

export default function SleepDetailPage() {
  const stages = [
    { name: 'Deep', pct: 20, color: '#34D399' },
    { name: 'REM', pct: 25, color: '#60A5FA' },
    { name: 'Light', pct: 45, color: '#F59E0B' },
    { name: 'Awake', pct: 10, color: '#EF4444' }
  ];
  const totalPct = stages.reduce((a, b) => a + b.pct, 0);
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Sleep</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <DonutChartMinimal value={100} />
          <div className="mt-2 text-sm text-gray-300">Stages (mock): {totalPct}% of time accounted</div>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 text-sm text-gray-300">
          {stages.map(s => (
            <div key={s.name} className="mt-2 flex items-center justify-between">
              <div className="text-gray-200">{s.name}</div>
              <div>{s.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


