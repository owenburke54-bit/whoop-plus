# WHOOP+ — Technical Specification (Part 2: Technical Implementation)

> **Version:** v1.0
> **Author:** Owen Burke
> **Purpose:** Defines architecture, data flow, AI logic, and technical systems for implementing WHOOP+ in Cursor using React/Next.js + Python or Node.js backend.

---

## 1. Architecture Overview

WHOOP+ operates as a modular app built around **four core systems**:

1. **Core Metrics Engine** – Handles tracking, storage, and visualization of recovery, strain, sleep, HRV, VO₂, and hydration data.
2. **AI Layer** – Manages conversational context, insight generation, journaling automation, and smart reminders.
3. **Analytics & KPI Module** – Correlation engine, drag‑and‑drop builder, and bookmarkable dashboards.
4. **User Interaction Layer** – Frontend UI logic for journaling, hydration tracking, community, and team comparisons.

Each module connects through shared user data stored locally or in cloud (Firebase/Supabase) and synced in real time.

---

## 2. Data Model

### User Schema

```js
User = {
  user_id: string,
  name: string,
  email: string,
  team_id: string | null,
  preferences: {
    units: 'imperial' | 'metric',
    hydration_goal_ml: number,
    ai_tone: 'professional' | 'friendly' | 'chill'
  },
  shared_metrics: string[] // user privacy toggles
}
```

### Metrics Schema

```js
Metrics = {
  date: string,
  recovery_score: number,
  strain_score: number,
  sleep_hours: number,
  hrv: number,
  vo2_max: number,
  hydration_score: number,
  hydration_intake_ml: number,
  reminders: Reminder[],
}
```

### Journal Schema

```js
JournalEntry = {
  id: string,
  user_id: string,
  date: string,
  mood: number, // 1‑5
  stress: number,
  energy: number,
  soreness: number,
  sleep_quality: number,
  nutrition_quality: number,
  hydration_goal_met: boolean,
  ai_generated: boolean,
  notes?: string
}
```

### Bookmark / KPI Schema

```js
Bookmark = {
  id: string,
  user_id: string,
  name: string,
  formula: string,
  metrics_used: string[],
  graph_type: 'line' | 'scatter' | 'bar' | 'heatmap',
  date_saved: string,
  favorite: boolean
}
```

---

## 3. Data Flow Logic

```
User Action → Input Module (Hydration / Journal / Coach)
     ↓
Database Update → Core Metrics Engine
     ↓
Correlation Engine → Analytics / Dashboard Update
     ↓
AI Layer → Insight Generation
     ↓
UI → Updated Visualization + Recommendations
```

### A. Metrics → Dashboard

* Metrics pulled from API or local dataset.
* Populates dashboard components (Key Metrics, Fitness, Athlete).
* Cards listen for state updates via React Context or Redux.

### B. Hydration Input → Correlations

* User logs intake → updates hydration_intake_ml.
* Hydration Score recalculated: `intake / goal * 100`.
* Trigger correlation check with Recovery, HRV, and Strain.

### C. Journal → AI + Analytics

* Quick‑tap or AI conversation generates a JournalEntry.
* Emotion tags stored as numeric values for correlation engine.
* Correlations displayed in Analytics sub‑tab when selected.

### D. AI Coach → All Systems

* Accesses latest metrics + journal data.
* Generates summaries, recommendations, and logs.
* Writes new data (hydration or journal entries) on confirmation.
* Uses tone presets based on current tab context.

### E. Bookmarks / KPI Builder

* Formula parsed client‑side with JS eval or math parser.
* Result stored to Bookmark collection.
* Appears instantly in Bookmark side panel.

### F. Community Sync

* Shared metrics uploaded nightly or on demand.
* Aggregated via simple API endpoint:

  ```js
  GET /team/:team_id/averages
  POST /team/:team_id/update-metric
  ```
* AI can pull team aggregates for comparison summaries.

---

## 4. AI Layer Flow

### Step 1: Input Parsing

* Detect user intent → classify as `query`, `log`, `compare`, `insight`, or `reminder`.
* Identify active context (General Fitness, Elite Athlete, Journal).

### Step 2: Data Fetch

* Retrieve relevant data from Metrics or Journal collections.

### Step 3: Computation

* Run correlation or regression (Pearson or linear least squares).
* Generate insight summary with cause/effect tone.

### Step 4: Response Generation

* Format insight text + embed visualization (chart snapshot).
* Push response to chat interface.

### Example (Hydration vs Recovery)

> *Input:* “How does hydration affect recovery?”
> *Output:* “Hydration and recovery are 0.74 correlated over the past 7 days. Recovery increases ~8% when hydration goal met.”

---

## 5. Technology Stack (Cursor Build)

| Component            | Tool / Library                        |
| :------------------- | :------------------------------------ |
| **Frontend (UI)**    | React or Next.js with TailwindCSS     |
| **State Management** | React Context or Redux Toolkit        |
| **Charts**           | Recharts or Plotly.js                 |
| **Backend (API)**    | Node.js (Express) or Python (FastAPI) |
| **Database**         | Firebase or Supabase (real‑time sync) |
| **Auth**             | Firebase Auth or Clerk                |
| **AI Integration**   | OpenAI API (GPT model)                |
| **Voice Input**      | Web Speech API (MVP)                  |
| **Notifications**    | Firebase Cloud Messaging              |

---

## 6. Core Components (Frontend)

* `Dashboard.jsx` → Displays Key Metrics cards.
* `DetailView.jsx` → Graph + correlation + AI summary.
* `AnalyticsPanel.jsx` → Simple or advanced correlation builder.
* `BookmarksPanel.jsx` → Displays saved KPIs.
* `HydrationWidget.jsx` → Quick add and progress ring.
* `JournalPanel.jsx` → Quick tap + voice log.
* `AIChat.jsx` → Chat UI for AI Coach.
* `CommunityBoard.jsx` → Team averages and leaderboards.

Each component communicates via React Context → central `AppProvider` controlling data flow and syncing with Firebase.

---

## 7. Backend Logic (High‑Level)

* API routes for metrics, hydration logs, journal entries, and team data.
* Server calculates derived stats (hydration score, readiness trends).
* AI endpoints forward user queries to OpenAI API and merge responses with app data.

Example (Node.js Express):

```js
app.post('/api/insight', async (req, res) => {
  const { question, user_id } = req.body;
  const data = await fetchUserData(user_id);
  const aiPrompt = buildInsightPrompt(question, data);
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'system', content: aiPrompt }]
  });
  res.json({ insight: response.choices[0].message.content });
});
```

---

## 8. Scalability & Future Roadmap

* Plug‑and‑play wearable API adapters (WHOOP, Garmin, Apple Health).
* Smart hydration integration (HidrateSpark, LARQ).
* Predictive modeling layer for recovery forecasting.
* AI Coach personalization (tone, routine scheduling, proactive suggestions).
* Transition to native app (React Native / Expo) once MVP validated.

---

## 9. Implementation Checklist (Cursor Setup)

1. Create new **Next.js + Tailwind** project in Cursor.
2. Add `docs/` folder → paste Part 1 and Part 2 markdown files.
3. Use `Ctrl/⌘ + I` → instruct Cursor: *“Use my WHOOP+ tech spec in /docs as context and scaffold the Dashboard and Analytics components.”*
4. Create component files under `/src/components/` following section 6.
5. Implement sample data with Firebase mock.
6. Add AI Coach integration using OpenAI API key.
7. Test hydration input and journal flows.
8. Expand Analytics to support drag‑and‑drop correlations.


