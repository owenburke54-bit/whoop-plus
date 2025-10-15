"use client";

import { useApp } from '@/context/AppContext';

export default function BookmarksPanel() {
  const { bookmarks } = useApp();
  return (
    <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
      <h2 className="text-sm font-medium text-gray-200">Bookmarks</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {bookmarks.length === 0 ? (
          <li className="text-gray-400">No bookmarks yet.</li>
        ) : (
          bookmarks.map(b => (
            <li key={b.id} className="rounded-md border border-gray-800 bg-gray-900 p-3 text-gray-200">
              <div className="text-xs text-gray-400">{new Date(b.dateSaved).toLocaleString()}</div>
              <div className="mt-1 font-medium">{b.name}</div>
              <div className="text-xs text-gray-400">{b.graphType}</div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}



