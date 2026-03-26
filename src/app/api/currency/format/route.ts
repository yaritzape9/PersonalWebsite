import { NextRequest, NextResponse } from "next/server"

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

    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(Number(amount))

    return NextResponse.json({ formatted, currency, locale })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to format currency" },
      { status: 500 }
    )
  }
}