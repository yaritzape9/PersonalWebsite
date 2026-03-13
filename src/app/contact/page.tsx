"use client"

import { useState } from "react"

export default function ContactPage() {
  const [showPhone, setShowPhone] = useState(false)

  const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY
  const phoneLink = process.env.NEXT_PUBLIC_PHONE_LINK

  return (
    <main className="max-w-2xl mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Contact</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Feel free to reach out — I am always open to new opportunities.
      </p>

      <div className="space-y-4">

        <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
          <a href="mailto:yaritzape9@gmail.com" className="text-lg font-medium hover:underline">
            yaritzape9@gmail.com
          </a>
        </div>

        <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
        <span
            onClick={() => setShowPhone(!showPhone)}
            className="text-lg font-medium cursor-pointer"
        >
            {showPhone ? phoneDisplay : "••••••••••"}
        </span>
        </div>

        <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">LinkedIn</p>
          <a href="https://www.linkedin.com/in/yaritzaperez/" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:underline">
            linkedin.com/in/yaritzaperez
          </a>
        </div>

        <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">GitHub</p>
          <a href="https://github.com/yaritzape9" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:underline">
            github.com/yaritzape9
          </a>
        </div>

      </div>
    </main>
  )
}