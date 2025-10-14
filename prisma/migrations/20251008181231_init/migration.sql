-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "teamId" TEXT,
    "preferencesUnits" TEXT,
    "preferencesHydrationGoal" INTEGER,
    "preferencesAiTone" TEXT,
    "sharedMetrics" TEXT
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "recoveryScore" INTEGER NOT NULL,
    "strainScore" REAL NOT NULL,
    "sleepHours" REAL NOT NULL,
    "hrv" REAL NOT NULL,
    "vo2Max" REAL NOT NULL,
    "hydrationScore" INTEGER NOT NULL,
    "hydrationIntakeMl" INTEGER NOT NULL,
    CONSTRAINT "Metric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "mood" INTEGER NOT NULL,
    "stress" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "soreness" INTEGER NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "nutritionQuality" INTEGER NOT NULL,
    "hydrationGoalMet" BOOLEAN NOT NULL,
    "aiGenerated" BOOLEAN NOT NULL,
    "notes" TEXT,
    CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formula" TEXT NOT NULL,
    "metricsUsed" TEXT NOT NULL,
    "graphType" TEXT NOT NULL,
    "dateSaved" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Metric_userId_date_idx" ON "Metric"("userId", "date");

-- CreateIndex
CREATE INDEX "JournalEntry_userId_date_idx" ON "JournalEntry"("userId", "date");

-- CreateIndex
CREATE INDEX "Bookmark_userId_dateSaved_idx" ON "Bookmark"("userId", "dateSaved");
