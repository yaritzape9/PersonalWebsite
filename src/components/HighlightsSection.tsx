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

  if (loading) return <p className="text-gray-400 mt-12">Loading highlights...</p>
  if (error) return <p className="text-red-500 mt-12">{error}</p>

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Key Work Highlights</h2>
      <div className="space-y-6">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="border p-4 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <h3 className="text-xl font-semibold">{highlight.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}