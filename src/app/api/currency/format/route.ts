import { NextRequest, NextResponse } from "next/server"

const JAVA_SERVICE_URL = process.env.JAVA_SERVICE_URL

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const params = new URLSearchParams({
      amount: searchParams.get("amount") || "",
      currency: searchParams.get("currency") || "USD",
      locale: searchParams.get("locale") || "en-US",
    })

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