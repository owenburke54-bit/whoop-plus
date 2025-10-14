# WHOOP+ — Technical Specification (Part 1: Product & Design)

> **Version:** v1.0
> **Author:** Owen Burke
> **Purpose:** Defines the full design, navigation, user flows, and UI behaviors of WHOOP+, formatted for direct use in Cursor.

---

## 1. Product Overview

**WHOOP+** reimagines the WHOOP app experience with a dual-view model and AI‑powered customization. The app provides:

* **Two main user modes:**

  * **General Fitness View:** Simplified dashboard for wellness users (steps, active minutes, hydration, sleep, HR).
  * **Elite Athlete View:** Advanced performance hub for data‑driven athletes (VO₂ max, HRV, strain, readiness).
* **AI‑Assisted Analytics:** Drag‑and‑drop correlation builder, custom KPI creator, and bookmarkable dashboards.
* **Hydration Tracking:** Manual input (MVP) with progress visualization, adaptive reminders, and impact graphs.
* **Journal System:** Quick‑tap or voice‑to‑AI entries that auto‑tag emotional and lifestyle data.
* **Community Integration:** Optional data sharing and team comparisons, fully controlled by user privacy toggles.
* **AI Coach:** Context‑aware assistant that adapts tone by situation (coach, analyst, or reflective journal mode).

Design philosophy: minimalistic, WHOOP‑like dark aesthetic with subtle animations and more dynamic data visuals in the Elite Athlete section.

---

## 2. Navigation & Structure

### Top‑Level Tabs (3)

1. **Key Metrics (Home)** – Mirrors WHOOP’s core dashboard (Sleep Performance, Recovery, Strain, Last Night’s Sleep, and Today’s Activities).
2. **General Fitness View** – Scrolling dashboard for everyday wellness; sub‑tabs: `Overview` and `Analytics (Simple Mode)`.
3. **Elite Athlete View** – Multi‑section performance dashboard; sub‑tabs: `Dashboard` and `Analytics (Advanced Mode)`.

### Global Elements

* **AI Coach:** Floating button (context‑aware tone and features) across most tabs.
* **Community:** Accessible from top‑right icon.
* **Journal:** Floating “+ Journal” button and voice trigger.

---

## 3. Color & Visual System

| Metric        | Color                   | Purpose                          |
| :------------ | :---------------------- | :------------------------------- |
| **Recovery**  | Red → Yellow → Green    | Standard WHOOP readiness system  |
| **Strain**    | Deep navy blue          | Aligns with WHOOP strain visuals |
| **Hydration** | Light blue              | Represents balance and clarity   |
| **HRV / VO₂** | Soft pink (limited use) | Highlight in advanced charts     |

**Base Design:**
Dark backgrounds, white text, muted gray dividers, minimal gradients. Color is only used to communicate performance state or correlation strength.

---

## 4. Core Screens & Flows

### 4.1 Key Metrics Tab (Home)

* **Layout:** Header with date/profile → stacked tiles (Sleep, Recovery, Strain) → sub‑cards for last night’s sleep and today’s activities → Hydration card.
* **Behavior:** Each card opens its own detail view with interactive analytics.

#### Detail View Structure

1. Metric trend graph (7–14 days)
2. Sub‑cards with detailed data (e.g., Sleep stages, Strain zones)
3. **Mini Correlation Builder** (drag metrics to view correlations)
4. Journal integration preview
5. Contextual **AI Summary** (bottom)
6. **Ask AI Coach** button (opens chat overlay)

---

### 4.2 General Fitness View

**Overview Tab:**
Scrolling dashboard with modular cards: Activity, Sleep, Hydration, Heart, Energy Predictor, and Journal shortcut.

**Analytics (Simple Mode):**
Auto‑generated insights with natural‑language summaries and simple graphs. Users can tap for more detail or bookmark insights.

**AI Coach Behavior:** Supportive tone; focuses on habits and daily wellness consistency.

---

### 4.3 Elite Athlete View

**Dashboard (Multi‑Section):**

* **Performance Readiness:** Top banner (color‑coded readiness score, short AI summary, “You vs Team” toggle).
* **Recovery Section:** HRV trends, resting HR, respiratory rate, drivers.
* **Strain Section:** Strain zones, training load, hydration‑impact mini graph.
* **Hydration Section:** Score ring, goal progress, consistency metric.
* **VO₂ / Performance Section:** VO₂ max trend, HR zones, efficiency ratio.

**Analytics (Advanced Mode):**
Drag‑and‑drop workspace with side metric panel, correlation graphs (line/scatter/heatmap), r‑values, slope indicators, and team overlays. Bookmark panel on the right.

**AI Coach Behavior:** Assertive, analytical tone; data‑driven coaching responses.

---

### 4.4 AI Coach Flow

* **Access:** Floating chat icon across app; voice or text interaction.
* **Modes:** Adapts automatically based on context — Fitness, Athlete, Analytics, Journal.
* **Features:**

  * Fetch metrics, generate insights, log journal entries, and adjust reminders.
  * Responds with visuals + actionable steps.
  * Saves insights to bookmarks.
* **Personality:** Always named “AI Coach.” Calm, direct, adaptive tone per mode.

---

### 4.5 Journal System

* **Quick‑Tap Entry:** WHOOP‑style icons and sliders for mood, stress, sleep, energy, soreness, hydration goal, nutrition, screen time.
* **AI Conversational Entry:** User speaks or types naturally; AI parses and logs structured data (flagged 🎤/💬).
* **Journal Timeline:** Scrollable daily entries with filters. “View Correlations” opens Analytics preloaded with selected tag.
* **Privacy:** Fully private; no data shared to team by default.

---

### 4.6 Community Flow

* **Home:** Team averages (Recovery, Sleep, Strain) + leaderboards.
* **Expanded View:** Custom comparison board with optional metrics; You vs Team overlays.
* **Privacy Controls:** Metric toggles (off by default) showing 🔒/✅ status.
* **AI Coach:** Answers team context queries (“Compare my hydration to the team”).

---

### 4.7 Hydration Flow

* **Quick Add:** +/− buttons on dashboard card; progress ring shows % of goal.
* **Detail View:** Hydration Score, Impact Graphs (vs Recovery/HRV/Strain), consistency streak chart.
* **Reminders:** Manual frequency + AI adaptive prompts.
* **Analytics Integration:** Correlation engine for hydration vs other metrics; bookmarkable charts.
* **Community:** Optional team visibility for hydration streaks and averages.

---

### 4.8 Bookmarks & KPI Builder

* **Bookmarks Pane:** Right side of Analytics views.

  * Displays saved dashboards and KPIs (name, timestamp, ⭐ favorite pin).
  * One‑click reload restores full analytics layout.
* **KPI Builder:** Users define formulas (e.g., `Hydration Efficiency = (hydration_score * sleep_hours) / strain_score`).
* KPIs can be shared or saved privately.

---

## 5. Design Language Summary

* **Aesthetic:** WHOOP‑style minimalism (black background, white text, sharp typography).
* **Animation:** Soft transitions, chart pulsing for updates in Elite Athlete Analytics.
* **Consistency:** Simple layouts in Fitness mode; denser, multi‑section format in Athlete mode.
* **Icons:** Flat outline icons, consistent spacing, minimalist line charts.


