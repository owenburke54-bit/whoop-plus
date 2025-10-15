export type Units = 'imperial' | 'metric';
export type AITone = 'professional' | 'friendly' | 'chill';

export interface UserPreferences {
  units: Units;
  hydrationGoalMl: number;
  aiTone: AITone;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  teamId: string | null;
  preferences: UserPreferences;
  sharedMetrics: string[];
}

export interface Reminder {
  id: string;
  time: string; // ISO time or cron-like string
  enabled: boolean;
}

export interface Metrics {
  date: string; // YYYY-MM-DD
  recoveryScore: number;
  strainScore: number;
  sleepHours: number;
  hrv: number;
  vo2Max: number;
  hydrationScore: number;
  hydrationIntakeMl: number;
  reminders: Reminder[];
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string; // ISO or YYYY-MM-DD
  mood: number; // 1-5
  stress: number;
  energy: number;
  soreness: number;
  sleepQuality: number;
  nutritionQuality: number;
  hydrationGoalMet: boolean;
  aiGenerated: boolean;
  notes?: string;
}

export type GraphType = 'line' | 'scatter' | 'bar' | 'heatmap';

export interface Bookmark {
  id: string;
  userId: string;
  name: string;
  formula: string;
  metricsUsed: string[];
  graphType: GraphType;
  dateSaved: string;
  favorite: boolean;
}

export interface TeamMember {
  userId: string;
  name: string;
  latest: Pick<Metrics, 'recoveryScore' | 'strainScore' | 'sleepHours' | 'hydrationScore' | 'hrv'>;
}


