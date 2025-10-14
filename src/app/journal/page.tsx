"use client";

import JournalQuickTap from '@/components/JournalQuickTap';
import { useApp } from '@/context/AppContext';
import ScatterChartMinimal from '@/components/ScatterChartMinimal';

export default function JournalPage() {
  const { journal, metrics } = useApp();
  const joined = journal
    .map(j => {
      const m = metrics.find(mm => mm.date === j.date);
      return m ? { date: j.date, x: j.mood, y: m.recoveryScore } : null;
    })
    .filter(Boolean) as { date: string; x: number; y: number }[];
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Journal</h1>
      <p className="mt-2 text-sm text-gray-300">Quick‑tap entries and AI conversational logs.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <JournalQuickTap />
        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">Timeline</h2>
          <ul className="mt-3 space-y-2">
            {journal.map(j => (
              <li key={j.id} className="rounded-md border border-gray-800 bg-gray-900 p-3 text-sm text-gray-200">
                <div className="text-xs text-gray-400">{j.date}</div>
                <div className="mt-1">Mood {j.mood} · Stress {j.stress} · Energy {j.energy}</div>
                {j.notes ? <div className="mt-1 text-xs text-gray-300">{j.notes}</div> : null}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-medium text-gray-200">Mood vs Recovery</h2>
          <div className="mt-3">
            <ScatterChartMinimal data={joined} />
          </div>
        </section>
      </div>
    </main>
  );
}


