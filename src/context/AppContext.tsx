"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Bookmark, JournalEntry, Metrics, TeamMember, UserProfile } from '@/types/models';

type AppState = {
  user: UserProfile;
  metrics: Metrics[];
  journal: JournalEntry[];
  bookmarks: Bookmark[];
  team: TeamMember[];
};

type AppActions = {
  logHydration: (amountMl: number) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  addBookmark: (b: Omit<Bookmark, 'id' | 'dateSaved'>) => void;
  toggleSharedMetric: (metricKey: string) => void;
};

const AppContext = createContext<(AppState & AppActions) | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

const seedUser: UserProfile = {
  userId: 'u_demo',
  name: 'Demo User',
  email: 'demo@example.com',
  teamId: null,
  preferences: { units: 'metric', hydrationGoalMl: 2500, aiTone: 'friendly' },
  sharedMetrics: []
};

// Avoid SSR/CSR mismatches by not generating random seeds at module load.
const seedMetrics: Metrics[] = [];

const seedJournal: JournalEntry[] = [];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(seedUser);
  const [metrics, setMetrics] = useState<Metrics[]>(seedMetrics);
  const [journal, setJournal] = useState<JournalEntry[]>(seedJournal);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [team] = useState<TeamMember[]>([
    { userId: 'u1', name: 'Alex', latest: { recoveryScore: 72, strainScore: 10.4, sleepHours: 7.6, hydrationScore: 88 } },
    { userId: 'u2', name: 'Taylor', latest: { recoveryScore: 54, strainScore: 13.1, sleepHours: 6.9, hydrationScore: 76 } },
    { userId: 'u3', name: 'Jordan', latest: { recoveryScore: 63, strainScore: 9.2, sleepHours: 7.2, hydrationScore: 92 } }
  ]);

  // Utilities
  async function fetchJson<T>(path: string, init?: RequestInit): Promise<T | null> {
    try {
      const res = await fetch(path, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
      if (!res.ok) return null;
      return (await res.json()) as T;
    } catch {
      return null;
    }
  }

  // Initial load from API (if available)
  useEffect(() => {
    (async () => {
      const [m, j, b] = await Promise.all([
        fetchJson<any[]>('/api/metrics'),
        fetchJson<any[]>('/api/journal'),
        fetchJson<any[]>('/api/bookmarks')
      ]);
      if (Array.isArray(m) && m.length) {
        // Map API rows to Metrics type if needed
        setMetrics(
          m.map(row => ({
            date: row.date,
            recoveryScore: Number(row.recoveryScore ?? 0),
            strainScore: Number(row.strainScore ?? 0),
            sleepHours: Number(row.sleepHours ?? 0),
            hrv: Number(row.hrv ?? 0),
            vo2Max: Number(row.vo2Max ?? 0),
            hydrationScore: Number(row.hydrationScore ?? 0),
            hydrationIntakeMl: Number(row.hydrationIntakeMl ?? 0),
            reminders: []
          }))
        );
      }
      if (Array.isArray(j)) {
        setJournal(
          j.map(row => ({
            id: String(row.id),
            userId: String(row.userId ?? 'u_demo'),
            date: String(row.date ?? todayStr()),
            mood: Number(row.mood ?? 3),
            stress: Number(row.stress ?? 3),
            energy: Number(row.energy ?? 3),
            soreness: Number(row.soreness ?? 2),
            sleepQuality: Number(row.sleepQuality ?? 3),
            nutritionQuality: Number(row.nutritionQuality ?? 3),
            hydrationGoalMet: Boolean(row.hydrationGoalMet ?? false),
            aiGenerated: Boolean(row.aiGenerated ?? false),
            notes: row.notes ?? undefined
          }))
        );
      }
      if (Array.isArray(b)) {
        setBookmarks(
          b.map(row => ({
            id: String(row.id),
            userId: String(row.userId ?? 'u_demo'),
            name: String(row.name ?? ''),
            formula: String(row.formula ?? ''),
            metricsUsed: typeof row.metricsUsed === 'string' ? String(row.metricsUsed).split(',').filter(Boolean) : ([] as string[]),
            graphType: String(row.graphType ?? 'line') as any,
            dateSaved: String(row.dateSaved ?? new Date().toISOString()),
            favorite: Boolean(row.favorite ?? false)
          }))
        );
      }
      // Fallback deterministic mock if API returned nothing
      if ((!m || !m.length) && metrics.length === 0) {
        const today = new Date();
        const days = 14;
        const demo: Metrics[] = Array.from({ length: days }).map((_, idx) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (days - 1 - idx));
          const ds = d.toISOString().slice(0, 10);
          const hydrationIntakeMl = 2000 + (idx % 5) * 100;
          const hydrationScore = Math.min(100, Math.round((hydrationIntakeMl / seedUser.preferences.hydrationGoalMl) * 100));
          return {
            date: ds,
            recoveryScore: 60 + ((idx * 7) % 30),
            strainScore: 5 + ((idx * 1.3) % 10),
            sleepHours: 6 + ((idx % 4) * 0.5),
            hrv: 40 + ((idx * 3) % 40),
            vo2Max: 50 + (idx % 6),
            hydrationScore,
            hydrationIntakeMl,
            reminders: []
          };
        });
        setMetrics(demo);
        setJournal([
          {
            id: 'j_seed_a',
            userId: 'u_demo',
            date: todayStr(),
            mood: 4,
            stress: 2,
            energy: 4,
            soreness: 2,
            sleepQuality: 4,
            nutritionQuality: 4,
            hydrationGoalMet: true,
            aiGenerated: false,
            notes: 'Mock entry: felt strong today.'
          }
        ]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions: AppActions = useMemo(
    () => ({
      logHydration: (amountMl: number) => {
        // Try API first; if unavailable, fall back to local update
        (async () => {
          const updated = await fetchJson<any>('/api/hydration', {
            method: 'POST',
            body: JSON.stringify({ amountMl })
          });
          if (updated && updated.date) {
            setMetrics(prev => {
              const idx = prev.findIndex(m => m.date === updated.date);
              const nextMetrics: Metrics = {
                date: updated.date,
                recoveryScore: Number(updated.recoveryScore ?? 0),
                strainScore: Number(updated.strainScore ?? 0),
                sleepHours: Number(updated.sleepHours ?? 0),
                hrv: Number(updated.hrv ?? 0),
                vo2Max: Number(updated.vo2Max ?? 0),
                hydrationScore: Number(updated.hydrationScore ?? 0),
                hydrationIntakeMl: Number(updated.hydrationIntakeMl ?? 0),
                reminders: []
              };
              if (idx >= 0) {
                const next = [...prev];
                next[idx] = nextMetrics;
                return next;
              }
              return [...prev, nextMetrics];
            });
            return;
          }
          // Fallback local update if API not available
          setMetrics(prev => {
            const today = todayStr();
            const idx = prev.findIndex(m => m.date === today);
            const base =
              idx >= 0
                ? prev[idx]
                : {
                    date: today,
                    recoveryScore: 0,
                    strainScore: 0,
                    sleepHours: 0,
                    hrv: 0,
                    vo2Max: 0,
                    hydrationScore: 0,
                    hydrationIntakeMl: 0,
                    reminders: []
                  };
            const updatedIntake = base.hydrationIntakeMl + amountMl;
            const goal = user.preferences.hydrationGoalMl;
            const updatedScore = Math.min(100, Math.round((updatedIntake / goal) * 100));
            const updatedLocal: Metrics = { ...base, hydrationIntakeMl: updatedIntake, hydrationScore: updatedScore };
            if (idx >= 0) {
              const next = [...prev];
              next[idx] = updatedLocal;
              return next;
            }
            return [...prev, updatedLocal];
          });
        })();
      },
      addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => {
        (async () => {
          const created = await fetchJson<any>('/api/journal', {
            method: 'POST',
            body: JSON.stringify(entry)
          });
          if (created && created.id) {
            setJournal(prev => [
              {
                id: String(created.id),
                userId: String(created.userId ?? entry.userId),
                date: String(created.date ?? entry.date),
                mood: Number(created.mood ?? entry.mood),
                stress: Number(created.stress ?? entry.stress),
                energy: Number(created.energy ?? entry.energy),
                soreness: Number(created.soreness ?? entry.soreness),
                sleepQuality: Number(created.sleepQuality ?? entry.sleepQuality),
                nutritionQuality: Number(created.nutritionQuality ?? entry.nutritionQuality),
                hydrationGoalMet: Boolean(created.hydrationGoalMet ?? entry.hydrationGoalMet),
                aiGenerated: Boolean(created.aiGenerated ?? entry.aiGenerated),
                notes: created.notes ?? entry.notes
              },
              ...prev
            ]);
            return;
          }
          // Fallback local
          setJournal(prev => [{ ...entry, id: crypto.randomUUID?.() ?? String(Date.now()) }, ...prev]);
        })();
      },
      addBookmark: (b: Omit<Bookmark, 'id' | 'dateSaved'>) => {
        (async () => {
          const created = await fetchJson<any>('/api/bookmarks', {
            method: 'POST',
            body: JSON.stringify({
              name: b.name,
              formula: b.formula,
              metricsUsed: b.metricsUsed,
              graphType: b.graphType,
              favorite: b.favorite,
              userId: b.userId
            })
          });
          if (created && created.id) {
            setBookmarks(prev => [
              {
                id: String(created.id),
                userId: String(created.userId ?? b.userId),
                name: String(created.name ?? b.name),
                formula: String(created.formula ?? b.formula),
                metricsUsed: typeof created.metricsUsed === 'string' ? String(created.metricsUsed).split(',').filter(Boolean) : (b.metricsUsed ?? []),
                graphType: String(created.graphType ?? b.graphType) as any,
                dateSaved: String(created.dateSaved ?? new Date().toISOString()),
                favorite: Boolean(created.favorite ?? b.favorite)
              },
              ...prev
            ]);
            return;
          }
          // Fallback local
          const id = crypto.randomUUID?.() ?? String(Date.now());
          const dateSaved = new Date().toISOString();
          setBookmarks(prev => [{ id, dateSaved, ...b }, ...prev]);
        })();
      },
      toggleSharedMetric: (metricKey: string) => {
        setUser(prev => {
          const isShared = prev.sharedMetrics.includes(metricKey);
          const nextShared = isShared
            ? prev.sharedMetrics.filter(k => k !== metricKey)
            : [...prev.sharedMetrics, metricKey];
          return { ...prev, sharedMetrics: nextShared };
        });
      }
    }),
    [user.preferences.hydrationGoalMl]
  );

  const value = { user, metrics, journal, bookmarks, team, ...actions };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}


