import { GET } from "@/app/api/currency/format/route"
import { NextRequest } from "next/server"

function makeRequest(params: Record<string, string>) {
  const url = new URL("http://localhost:3000/api/currency/format")
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return new NextRequest(url)
}

describe("GET /api/currency/format", () => {
  it("formats USD correctly", async () => {
    const req = makeRequest({ amount: "1000", currency: "USD", locale: "en-US" })
    const res = await GET(req)
    const data = await res.json()
    expect(data.formatted).toBe("$1,000.00")
    expect(data.currency).toBe("USD")
    expect(data.locale).toBe("en-US")
  })

it("formats EUR correctly for German locale", async () => {
  const req = makeRequest({ amount: "1000", currency: "EUR", locale: "de-DE" })
  const res = await GET(req)
  const data = await res.json()
  expect(data.formatted).toContain("1.000,00")
  expect(data.formatted).toContain("€")
  expect(data.currency).toBe("EUR")
})

  it("returns 400 for missing amount", async () => {
    const req = makeRequest({ currency: "USD", locale: "en-US" })
    const res = await GET(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeDefined()
  })

  it("returns 400 for invalid amount", async () => {
    const req = makeRequest({ amount: "abc", currency: "USD", locale: "en-US" })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })
})