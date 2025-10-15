import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

const USER_ID = 'u_demo';
const GOAL_ML = 2500; // matches demo goal

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export async function POST() {
  if (!prisma) return NextResponse.json({ ok: false }, { status: 200 });
  const today = todayStr();
  const targetScore = 50;
  const targetMl = Math.round((GOAL_ML * targetScore) / 100);

  const existing = await prisma.metric.findFirst({ where: { userId: USER_ID, date: today } });
  if (existing) {
    const updated = await prisma.metric.update({
      where: { id: existing.id },
      data: { hydrationIntakeMl: targetMl, hydrationScore: targetScore }
    });
    return NextResponse.json({ ok: true, metric: updated });
  }

  const created = await prisma.metric.create({
    data: {
      userId: USER_ID,
      date: today,
      recoveryScore: 0,
      strainScore: 0,
      sleepHours: 0,
      hrv: 0,
      vo2Max: 0,
      hydrationIntakeMl: targetMl,
      hydrationScore: targetScore
    }
  });
  return NextResponse.json({ ok: true, metric: created });
}



