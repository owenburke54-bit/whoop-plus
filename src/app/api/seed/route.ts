export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

const USER_ID = 'u_demo';

function dateOffset(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export async function POST() {
  if (!prisma) return NextResponse.json({ ok: false }, { status: 200 });

  await prisma.bookmark.deleteMany({ where: { userId: USER_ID } });
  await prisma.journalEntry.deleteMany({ where: { userId: USER_ID } });
  await prisma.metric.deleteMany({ where: { userId: USER_ID } });
  await prisma.user.deleteMany({ where: { userId: USER_ID } });

  await prisma.user.create({
    data: {
      userId: USER_ID,
      name: 'Demo User',
      email: 'demo@example.com',
      preferencesUnits: 'metric',
      preferencesHydrationGoal: 2500,
      preferencesAiTone: 'friendly',
      sharedMetrics: 'recoveryScore,strainScore,sleepHours,hydrationScore'
    }
  });

  const metrics = Array.from({ length: 21 }).map((_, i) => {
    const date = dateOffset(9 - i);
    const hydrationIntakeMl = 1800 + Math.floor(Math.random() * 1000);
    const hydrationScore = Math.round((hydrationIntakeMl / 2500) * 100);
    return {
      userId: USER_ID,
      date,
      recoveryScore: 40 + Math.floor(Math.random() * 60),
      strainScore: 4 + Math.random() * 10,
      sleepHours: 5 + Math.random() * 4,
      hrv: 30 + Math.random() * 50,
      vo2Max: 40 + Math.random() * 10,
      hydrationScore,
      hydrationIntakeMl
    };
  });
  await prisma.metric.createMany({ data: metrics });

  // Example journal entries
  await prisma.journalEntry.createMany({
    data: [
      {
        id: 'j_seed_1',
        userId: USER_ID,
        date: dateOffset(0),
        mood: 4,
        stress: 2,
        energy: 4,
        soreness: 2,
        sleepQuality: 4,
        nutritionQuality: 4,
        hydrationGoalMet: true,
        aiGenerated: false,
        notes: 'Felt good after easy run.'
      },
      {
        id: 'j_seed_2',
        userId: USER_ID,
        date: dateOffset(1),
        mood: 3,
        stress: 3,
        energy: 3,
        soreness: 3,
        sleepQuality: 3,
        nutritionQuality: 3,
        hydrationGoalMet: false,
        aiGenerated: true,
        notes: 'Long day, light workout.'
      }
    ]
  });

  return NextResponse.json({ ok: true });
}


