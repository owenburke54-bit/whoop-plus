export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

const USER_ID = 'u_demo';

export async function GET() {
  if (!prisma) return NextResponse.json([]);
  const rows = await prisma.metric.findMany({
    where: { userId: USER_ID },
    orderBy: { date: 'asc' }
  });
  return NextResponse.json(rows);
}



