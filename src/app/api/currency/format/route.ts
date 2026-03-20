import { NextRequest, NextResponse } from "next/server"

const JAVA_SERVICE_URL = process.env.JAVA_SERVICE_URL ?? 'http://localhost:8080'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const amount = searchParams.get("amount")
    const currency = searchParams.get("currency") || "USD"
    const locale = searchParams.get("locale") || "en-US"

    if (!amount) {
      return NextResponse.json({ error: "amount is required" }, { status: 400 })
    }
    if (isNaN(Number(amount))) {
      return NextResponse.json({ error: "amount must be a number" }, { status: 400 })
    }

    const params = new URLSearchParams({ amount, currency, locale })
    const res = await fetch(`${JAVA_SERVICE_URL}/api/currency/format?${params}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Java service unavailable" },
      { status: 503 }
    )
  }
}