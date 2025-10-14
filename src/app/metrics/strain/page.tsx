"use client";

const mockActivities = [
  { name: 'Soccer Training', strain: 14.2, duration: '1h 15m' },
  { name: 'Weightlifting', strain: 11.6, duration: '55m' },
  { name: 'Recovery Run', strain: 8.4, duration: '40m' },
  { name: 'Mobility', strain: 4.9, duration: '20m' }
];

export default function StrainDetailPage() {
  const total = mockActivities.reduce((a, b) => a + b.strain, 0);
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">Strain</h1>
      <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <h2 className="text-sm font-medium text-gray-200">Today</h2>
        <ul className="mt-3 divide-y divide-gray-800 text-sm">
          {mockActivities.map((a, i) => (
            <li key={i} className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-200">{a.name}</div>
                <div className="text-xs text-gray-400">Duration {a.duration}</div>
              </div>
              <div className="text-gray-300">Strain {a.strain.toFixed(1)}</div>
            </li>
          ))}
          <li className="flex items-center justify-between py-2">
            <div className="text-gray-200">Total Daily Strain</div>
            <div className="text-gray-300">{total.toFixed(1)}</div>
          </li>
        </ul>
      </div>
    </main>
  );
}


