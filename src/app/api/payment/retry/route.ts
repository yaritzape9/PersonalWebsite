import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { amount, currency } = await req.json()

    if (!amount || !currency) {
      return NextResponse.json(
        { error: "Missing required fields: amount, currency" },
        { status: 400 }
      )
    }

    const attempts: { attempt: number; status: string; message: string }[] = []
    const outcomes = ["network_failure", "declined", "success"]
    let finalStatus = "failed"

    for (let i = 1; i <= 3; i++) {
      const outcome = i === 3 ? "success" : outcomes[Math.floor(Math.random() * 2)]

      attempts.push({
        attempt: i,
        status: outcome,
        message:
          outcome === "success"
            ? `Payment of ${amount} ${currency} processed successfully`
            : outcome === "declined"
            ? "Card declined — retrying..."
            : "Network failure — retrying...",
      })

      if (outcome === "success") {
        finalStatus = "success"
        break
      }
    }

    return NextResponse.json({ attempts, finalStatus })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}