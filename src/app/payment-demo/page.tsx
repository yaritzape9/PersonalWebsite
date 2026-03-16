"use client"

import { useState } from "react"

type RetryAttempt = {
  attempt: number
  status: string
  message: string
}

type RetryResult = {
  attempts: RetryAttempt[]
  finalStatus: string
}

type CurrencyResult = {
  formatted: string
  amount: string
  currency: string
  locale: string
}

const LOCALES = [
  { label: "US (en-US)", value: "en-US", currency: "USD" },
  { label: "Germany (de-DE)", value: "de-DE", currency: "EUR" },
  { label: "Japan (ja-JP)", value: "ja-JP", currency: "JPY" },
  { label: "UK (en-GB)", value: "en-GB", currency: "GBP" },
  { label: "Brazil (pt-BR)", value: "pt-BR", currency: "BRL" },
]

export default function PaymentDemoPage() {
  const [amount, setAmount] = useState("")
  const [selectedLocale, setSelectedLocale] = useState(LOCALES[0])
  const [loading, setLoading] = useState(false)
  const [formatResult, setFormatResult] = useState<CurrencyResult | null>(null)
  const [retryResult, setRetryResult] = useState<RetryResult | null>(null)

  async function handleSubmit() {
    if (!amount) return
    setLoading(true)
    setFormatResult(null)
    setRetryResult(null)

    try {
      const [formatRes, retryRes] = await Promise.all([
        fetch(`/api/currency/format?amount=${amount}&currency=${selectedLocale.currency}&locale=${selectedLocale.value}`),
        fetch("/api/payment/retry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, currency: selectedLocale.currency }),
        }),
      ])

      const formatData = await formatRes.json()
      const retryData = await retryRes.json()

      setFormatResult(formatData)
      setRetryResult(retryData)
    } catch {
      // handle error
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Payment Demo</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Enter a payment amount and select a market. The demo will format the amount
        for that locale and simulate a payment with retry logic.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Market</label>
          <select
            value={selectedLocale.value}
            onChange={(e) =>
              setSelectedLocale(LOCALES.find((l) => l.value === e.target.value) || LOCALES[0])
            }
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {LOCALES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 px-4 rounded-lg font-medium bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit Payment"}
        </button>
      </div>

      {formatResult && (
        <div className="border rounded-lg p-6 border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Amount</p>
          <p className="text-4xl font-bold">{formatResult.formatted}</p>
          <p className="text-xs text-gray-400 mt-1">{formatResult.currency} · {formatResult.locale}</p>
        </div>
      )}

      {retryResult && (
        <div className="border rounded-lg p-6 border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Payment Processing</p>
          <div className="space-y-2">
            {retryResult.attempts.map((a) => (
              <div
                key={a.attempt}
                className={`text-sm p-3 rounded-lg ${
                  a.status === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                }`}
              >
                <span className="font-medium">Attempt {a.attempt}:</span> {a.message}
              </div>
            ))}
          </div>
          <p className={`text-sm font-semibold mt-3 ${retryResult.finalStatus === "success" ? "text-green-600" : "text-red-500"}`}>
            Final status: {retryResult.finalStatus.toUpperCase()}
          </p>
        </div>
      )}
    </main>
  )
}