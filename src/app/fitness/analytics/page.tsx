"use client";

import SimpleCorrelation from '@/components/SimpleCorrelation';
import LineChartMinimal from '@/components/LineChartMinimal';
import { useApp } from '@/context/AppContext';
import ClientOnly from '@/components/ClientOnly';

export default function FitnessAnalyticsPage() {
  const { metrics } = useApp();
  const weeklyStrain = metrics.slice(-7).map((m, i) => ({ x: i, y: m.strainScore }));
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">General Fitness — Analytics (Simple)</h1>
      <p className="mt-2 text-sm text-gray-300">Auto‑generated insights and simple graphs.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ClientOnly>
          <SimpleCorrelation />
        </ClientOnly>
        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">Weekly Average Strain</h2>
          <ClientOnly>
            <LineChartMinimal data={weeklyStrain} />
          </ClientOnly>
        </section>
      </div>
    </main>
  );
}


