import { POST } from "@/app/api/payment/retry/route"
import { NextRequest } from "next/server"

function makeRequest(body: Record<string, string>) {
  return new NextRequest("http://localhost:3000/api/payment/retry", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
}

describe("POST /api/payment/retry", () => {
  it("returns attempts and finalStatus", async () => {
    const req = makeRequest({ amount: "100", currency: "USD" })
    const res = await POST(req)
    const data = await res.json()
    expect(data.attempts).toBeDefined()
    expect(data.finalStatus).toBeDefined()
    expect(Array.isArray(data.attempts)).toBe(true)
  })

  it("always succeeds by attempt 3", async () => {
    const req = makeRequest({ amount: "100", currency: "USD" })
    const res = await POST(req)
    const data = await res.json()
    expect(data.finalStatus).toBe("success")
  })

  it("each attempt has correct shape", async () => {
    const req = makeRequest({ amount: "100", currency: "USD" })
    const res = await POST(req)
    const data = await res.json()
    data.attempts.forEach((a: { attempt: number; status: string; message: string }) => {
      expect(a.attempt).toBeDefined()
      expect(a.status).toBeDefined()
      expect(a.message).toBeDefined()
    })
  })

  it("returns 400 when amount is missing", async () => {
    const req = makeRequest({ currency: "USD" })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it("returns 400 when currency is missing", async () => {
    const req = makeRequest({ amount: "100" })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})