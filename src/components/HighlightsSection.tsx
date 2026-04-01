"use client"

import { useEffect, useState } from "react"
import { WorkHighlight } from "@/data/experience"

export default function HighlightsSection() {
  const [highlights, setHighlights] = useState<WorkHighlight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/highlights")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then((data) => setHighlights(data))
      .catch(() => setError("Failed to load highlights"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section className="mb-16">
      <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-8" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl mb-3 animate-pulse" />
      ))}
    </section>
  )

  if (error) return <p className="text-red-500 mb-16">{error}</p>

  return (
    <section className="mb-16">
      <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
        Work Highlights
      </p>
      <div className="space-y-3">
        {highlights.map((highlight, i) => (
          <div
            key={highlight.title}
            className="group border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
              <span className="text-xs font-mono text-gray-300 dark:text-gray-700 shrink-0 mt-0.5">
                0{i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}