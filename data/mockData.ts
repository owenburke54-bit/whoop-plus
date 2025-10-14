export const mockData = {
  recovery: { score: 87, hrv: 75 },
  strain: {
    score: 9.6,
    activities: [
      { name: "Soccer Training", strain: 14.2, duration: "1h 30m" },
      { name: "Mobility", strain: 4.8, duration: "30m" },
      { name: "Recovery Run", strain: 8.3, duration: "45m" }
    ],
  },
  sleep: { duration: 8.0, goal: 8.0, efficiency: 0.92 },
  hydration: {
    progress: 100,
    goal: 2500,
    daily: [1800, 2100, 2000, 2500, 2300, 2600, 2450],
  },
  generalFitness: {
    avgStrain: 8.4,
    avgSleep: 7.6,
    avgRecovery: 72,
    weeklyCalories: 3450,
  },
  eliteAthlete: {
    performanceReadiness: 82,
    trainingLoad: 17.4,
    vo2Max: 58,
  },
  journal: [
    { date: "2025-10-12", mood: "Focused", entry: "Felt strong during training. HRV trending up." },
    { date: "2025-10-11", mood: "Tired", entry: "Didn’t hydrate enough, poor sleep last night." },
  ],
  community: {
    leaderboard: [
      { name: "Owen", recovery: 87, strain: 18.3 },
      { name: "Victoria", recovery: 92, strain: 16.9 },
      { name: "Alex", recovery: 78, strain: 15.1 },
    ],
    posts: [
      { user: "Owen", text: "Hydration 100% three days in a row 💧" },
      { user: "Victoria", text: "Recovery streak at 90+ all week 💚" },
    ],
  },
};


