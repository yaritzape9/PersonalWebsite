"use client"

import { useEffect, useState } from "react"
import { SkillCategory } from "@/data/experience"

export default function SkillsSection() {
  const [skills, setSkills] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then((data) => setSkills(data))
      .catch(() => setError("Failed to load skills"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section>
      <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-8" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl mb-3 animate-pulse" />
      ))}
    </section>
  )

  if (error) return <p className="text-red-500">{error}</p>

  return (
    <section>
      <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
        Technical Skills
      </p>
      <div className="space-y-6">
        {skills.map((category) => (
          <div key={category.category} className="flex gap-6">
            <div className="w-28 shrink-0">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-1">
                {category.category}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}