export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

const USER_ID = 'u_demo';

export async function GET() {
  if (!prisma) return NextResponse.json([]);
  const rows = await prisma.journalEntry.findMany({
    where: { userId: USER_ID },
    orderBy: { date: 'desc' }
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  if (!prisma) return NextResponse.json({ ok: false }, { status: 200 });
  const payload = await req.json();
  const created = await prisma.journalEntry.create({
    data: { ...payload, userId: USER_ID }
  });
  return NextResponse.json(created);
}



