import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

const USER_ID = 'u_demo';

function todayStr() { return new Date().toISOString().slice(0, 10); }

export async function POST(req: Request) {
  if (!prisma) return NextResponse.json({ ok: false }, { status: 200 });
  const { amountMl } = await req.json();
  const today = todayStr();

  const existing = await prisma.metric.findFirst({ where: { userId: USER_ID, date: today } });
  const goal = 2500; // demo goal
  if (existing) {
    const hydrationIntakeMl = existing.hydrationIntakeMl + (Number(amountMl) || 0);
    const hydrationScore = Math.min(100, Math.round((hydrationIntakeMl / goal) * 100));
    const updated = await prisma.metric.update({
      where: { id: existing.id },
      data: { hydrationIntakeMl, hydrationScore }
    });
    return NextResponse.json(updated);
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
      hydrationIntakeMl: Number(amountMl) || 0,
      hydrationScore: Math.min(100, Math.round(((Number(amountMl) || 0) / goal) * 100))
    }
  });
  return NextResponse.json(created);
}


