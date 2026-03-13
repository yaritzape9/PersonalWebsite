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

  if (loading) return <p className="text-gray-400 mt-12">Loading skills...</p>
  if (error) return <p className="text-red-500 mt-12">{error}</p>

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
      <div className="space-y-6">
        {skills.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold">{category.category}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
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