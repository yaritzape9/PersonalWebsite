"use client"

import { useState } from "react"

const links = [
  {
    label: "Email",
    display: "yaritzape9@gmail.com",
    href: "mailto:yaritzape9@gmail.com",
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/yaritzaperez",
    href: "https://www.linkedin.com/in/yaritzaperez/",
  },
  {
    label: "GitHub",
    display: "github.com/yaritzape9",
    href: "https://github.com/yaritzape9",
  },
]

export default function ContactPage() {
  const [showPhone, setShowPhone] = useState(false)

  const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY
  const phoneLink = process.env.NEXT_PUBLIC_PHONE_LINK

  return (
    <main className="max-w-3xl mx-auto px-8 py-16 min-h-screen">

      <div className="mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          Contact
        </p>
        <h1 className="text-5xl font-bold tracking-tight leading-none mb-6">
          Get In<br />Touch
        </h1>
        <div className="w-12 h-px bg-gray-300 dark:bg-gray-700 mb-6" />
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
          Always open to new opportunities and interesting conversations.
        </p>
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between border border-gray-200 dark:border-gray-800 rounded-xl px-6 py-4 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                {link.label}
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {link.display}
              </p>
            </div>
            <span className="text-gray-300 dark:text-gray-700 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors text-lg">
              ↗
            </span>
          </a>
        ))}

        {/* Phone */}
        <div
          onClick={() => setShowPhone(true)}
          className="group flex items-center justify-between border border-gray-200 dark:border-gray-800 rounded-xl px-6 py-4 hover:border-gray-400 dark:hover:border-gray-600 transition-colors cursor-pointer"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
              Phone
            </p>
            {showPhone ? (
              
                <a href={phoneLink ? `tel:${phoneLink}` : "#"}
                onClick={(e) => e.stopPropagation()}
                className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
              >
                {phoneDisplay ?? "Not configured"}
              </a>
            ) : (
              <p className="font-medium text-gray-400 tracking-widest">
                ••••••••••
              </p>
            )}
          </div>
          {!showPhone && (
            <span className="text-xs font-mono text-gray-300 dark:text-gray-700 group-hover:text-gray-500 transition-colors">
              reveal
            </span>
          )}
        </div>
      </div>
    </main>
  )
}