import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Yaritza Perez",
  description: "Full-stack engineer with experience in payments infrastructure and distributed systems.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body>
            <Navbar />
            {children}
        </body>
    </html>
  )
}