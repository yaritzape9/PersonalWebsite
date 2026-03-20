import { NextRequest, NextResponse } from "next/server"

const JAVA_SERVICE_URL = process.env.JAVA_SERVICE_URL ?? 'http://localhost:8080'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const payload = {
      amount: body.amount ?? "100",
      currency: body.currency ?? "USD",
    }

    const res = await fetch(`${JAVA_SERVICE_URL}/api/payment/retry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Java service unavailable" },
      { status: 503 }
    )
  }
}