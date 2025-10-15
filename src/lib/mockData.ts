export const homeMock = {
  recovery: { score: 87, hrv: 75 },
  strain: {
    score: 9.6,
    activities: [
      { name: 'Soccer Training', strain: 14.2, duration: '1h 30m' },
      { name: 'Mobility', strain: 4.8, duration: '30m' },
      { name: 'Recovery Run', strain: 8.3, duration: '45m' }
    ]
  },
  sleep: { duration: 8.0, goal: 8.0, efficiency: 0.92 },
  hydration: { progress: 100, goal: 2500, daily: [1800, 2100, 2000, 2500, 2300, 2600, 2450] }
};

export const fitnessMock = {
  avgStrain: 8.4,
  avgSleep: 7.6,
  avgRecovery: 72,
  weeklyCalories: 3450,
  workouts: [
    { day: 'Mon', activity: 'Run', strain: 9.1 },
    { day: 'Tue', activity: 'Yoga', strain: 4.6 },
    { day: 'Wed', activity: 'Strength', strain: 10.3 },
    { day: 'Thu', activity: 'Mobility', strain: 3.1 },
    { day: 'Fri', activity: 'Intervals', strain: 11.2 },
    { day: 'Sat', activity: 'Long Run', strain: 12.8 },
    { day: 'Sun', activity: 'Rest', strain: 1.2 }
  ]
};

export const athleteMock = {
  performanceReadiness: 82,
  trainingLoad: 17.4,
  vo2Max: 58,
  recoveryTrend: [64, 78, 81, 87, 90, 84, 88],
  strainTrend: [15.1, 13.8, 16.2, 18.0, 17.6, 14.4, 15.8]
};

export const journalMock = [
  { date: '2025-10-12', mood: 'Focused', entry: 'Felt strong during training. HRV trending up.' },
  { date: '2025-10-11', mood: 'Tired', entry: "Didn't hydrate enough, poor sleep last night." }
];

export const communityMock = {
  leaderboard: [
    { name: 'Owen', recovery: 87, strain: 18.3 },
    { name: 'Victoria', recovery: 92, strain: 16.9 },
    { name: 'Alex', recovery: 78, strain: 15.1 }
  ],
  recentPosts: [
    { user: 'Owen', text: 'Hydration 100% three days in a row 💧' },
    { user: 'Victoria', text: 'Recovery streak at 90+ all week 💚' }
  ]
};



