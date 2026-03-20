import { NextRequest, NextResponse } from 'next/server';

const JAVA_BASE = process.env.JAVA_SERVICE_URL ?? 'http://localhost:8080';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${JAVA_BASE}/api/payment/state/${id}`);
  if (res.status === 404) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}