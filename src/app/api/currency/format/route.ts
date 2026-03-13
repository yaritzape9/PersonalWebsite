import { NextRequest, NextResponse } from "next/server" 

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const amount = searchParams.get("amount")
    const currency = searchParams.get("currency") || "USD"
    const locale = searchParams.get("locale") || "en-US"

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json(
        { error: "Invalid or missing amount" },
        { status: 400 }
      )
    }

    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(Number(amount))

    return NextResponse.json({ formatted, amount, currency, locale })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}