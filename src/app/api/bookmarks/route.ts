import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

const USER_ID = 'u_demo';

export async function GET() {
  if (!prisma) return NextResponse.json([]);
  const rows = await prisma.bookmark.findMany({
    where: { userId: USER_ID },
    orderBy: { dateSaved: 'desc' }
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  if (!prisma) return NextResponse.json({ ok: false }, { status: 200 });
  const payload = await req.json();
  const created = await prisma.bookmark.create({
    data: {
      userId: USER_ID,
      name: payload.name,
      formula: payload.formula ?? '',
      metricsUsed: Array.isArray(payload.metricsUsed) ? payload.metricsUsed.join(',') : String(payload.metricsUsed ?? ''),
      graphType: payload.graphType ?? 'line',
      favorite: !!payload.favorite
    }
  });
  return NextResponse.json(created);
}



