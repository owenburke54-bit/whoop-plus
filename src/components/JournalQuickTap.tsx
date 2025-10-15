"use client";

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

function Scale({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="mt-1 inline-flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            className={
              "h-7 w-7 rounded-md text-xs " +
              (n === value ? "bg-gray-200 text-gray-900" : "bg-gray-800 text-gray-200 hover:bg-gray-700")
            }
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function JournalQuickTap() {
  const { user, addJournalEntry } = useApp();
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [soreness, setSoreness] = useState(2);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [nutritionQuality, setNutritionQuality] = useState(3);
  const [hydrationGoalMet, setHydrationGoalMet] = useState(false);
  const [notes, setNotes] = useState("");

  const submit = () => {
    const date = new Date().toISOString().slice(0, 10);
    addJournalEntry({
      userId: user.userId,
      date,
      mood,
      stress,
      energy,
      soreness,
      sleepQuality,
      nutritionQuality,
      hydrationGoalMet,
      aiGenerated: false,
      notes: notes || undefined
    });
    setNotes("");
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
      <h2 className="text-sm font-medium text-gray-200">Quick‑Tap Entry</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Scale label="Mood" value={mood} onChange={setMood} />
        <Scale label="Stress" value={stress} onChange={setStress} />
        <Scale label="Energy" value={energy} onChange={setEnergy} />
        <Scale label="Soreness" value={soreness} onChange={setSoreness} />
        <Scale label="Sleep" value={sleepQuality} onChange={setSleepQuality} />
        <Scale label="Nutrition" value={nutritionQuality} onChange={setNutritionQuality} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-gray-300">
          <input type="checkbox" checked={hydrationGoalMet} onChange={e => setHydrationGoalMet(e.target.checked)} />
          Hydration goal met today
        </label>
      </div>
      <textarea
        placeholder="Notes (optional)"
        className="mt-3 w-full rounded-md border border-gray-800 bg-gray-900 p-2 text-sm text-gray-200 placeholder:text-gray-500"
        rows={3}
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <div className="mt-3">
        <button onClick={submit} className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-white">Save Entry</button>
      </div>
    </div>
  );
}



