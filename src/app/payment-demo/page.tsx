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

const STATUS_ICON: Record<string, string> = {
  success: "✓",
  declined: "✕",
  network_failure: "↺",
}

export default function PaymentDemoPage() {
  const [amount, setAmount] = useState("100")
  const [selectedLocale, setSelectedLocale] = useState(LOCALES[0])
  const [loading, setLoading] = useState(false)
  const [formatResult, setFormatResult] = useState<CurrencyResult | null>(null)
  const [retryResult, setRetryResult] = useState<RetryResult | null>(null)

  async function handleSubmit() {
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
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
    />

      <div className="relative max-w-2xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-gray-400">
              Live · payments-service-demo
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-3">
            Payment Demo
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
            Locale-aware currency formatting and retry simulation,
            powered by a Java Spring Boot microservice.
          </p>

          {/* Tech stack pills */}
          <div className="flex gap-2 mt-5 flex-wrap">
            {["Java", "Spring Boot", "Next.js", "TypeScript"].map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-5 shadow-sm">
          {/* Card header bar */}
          <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="ml-2 text-xs font-mono text-gray-400">payment.config</span>
          </div>

          <div className="p-6 space-y-5 bg-white dark:bg-gray-950">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-black border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 text-2xl font-mono font-bold tracking-tight"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Market
              </label>
              <select
                value={selectedLocale.value}
                onChange={(e) =>
                  setSelectedLocale(LOCALES.find((l) => l.value === e.target.value) || LOCALES[0])
                }
                className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-black border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 font-mono"
              >
                {LOCALES.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-all disabled:opacity-30 text-sm tracking-wide flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Payment →"
              )}
            </button>
          </div>
        </div>

        {/* Currency result */}
        {formatResult && (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-5 shadow-sm">
            <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                Formatted Amount
              </span>
            </div>
            <div className="p-6 bg-white dark:bg-gray-950">
              <p className="text-6xl font-bold tracking-tight">{formatResult.formatted}</p>
              <p className="text-xs font-mono text-gray-400 mt-3 flex gap-3">
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-900 rounded">
                  {formatResult.currency}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-900 rounded">
                  {formatResult.locale}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Retry log */}
        {retryResult && (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                Processing Log
              </span>
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                retryResult.finalStatus === "success"
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                  : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              }`}>
                {retryResult.finalStatus.toUpperCase()}
              </span>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 space-y-2 font-mono text-sm">
              {retryResult.attempts.map((a) => (
                <div
                  key={a.attempt}
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl ${
                    a.status === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                      : "bg-red-50 dark:bg-red-950/50 text-red-500 dark:text-red-400"
                  }`}
                >
                  <span className="font-bold shrink-0">{STATUS_ICON[a.status] ?? "·"}</span>
                  <span>
                    <span className="font-bold">attempt_{a.attempt}</span>
                    <span className="opacity-40 mx-2">›</span>
                    {a.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}