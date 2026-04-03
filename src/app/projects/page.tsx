type Project = {
  title: string
  description: string
  tech: string[]
  github: string | null
  status: string
}

const projects: Project[] = [
  {
    title: "payments-service-demo",
    description:
      "Java Spring Boot microservice demonstrating production-grade payment patterns — state machine, retry logic, and i18n currency formatting. Proxied through a Next.js API gateway.",
    tech: ["Java", "Spring Boot", "Next.js", "TypeScript"],
    github: "https://github.com/yaritzape9/payments-service-demo",
    status: "live",
  },
  {
    title: "Coming Soon",
    description: "Something new is in the works.",
    tech: [],
    github: null,
    status: "coming-soon",
  },
]

export default function ProjectsPage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-16 min-h-screen">

      <div className="mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          Projects
        </p>
        <h1 className="text-5xl font-bold tracking-tight leading-none mb-6">
          Things I&apos;ve<br />Built
        </h1>
        <div className="w-12 h-px bg-gray-300 dark:bg-gray-700 mb-6" />
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
          A mix of production demos and work in progress.
        </p>
      </div>

      <div className="space-y-3">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="group border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  {project.title}
                </h2>
                {project.status === "coming-soon" && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-400">
                    soon
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-gray-300 dark:text-gray-700 shrink-0">
                0{i + 1}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              {project.description}
            </p>

            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {project.github && (
              
                <a href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                github.com/yaritzape9/payments-service-demo ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}