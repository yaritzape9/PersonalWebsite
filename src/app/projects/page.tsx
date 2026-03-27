const projects = [
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
    <main className="max-w-2xl mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Projects</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Things I have built and things I am working on.
      </p>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border rounded-lg p-6 border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              {project.status === "coming-soon" && (
                <span className="text-xs font-medium px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                  Coming Soon
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
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
                className="text-sm font-medium hover:underline"
              >
                github.com/yaritzape9/payments-service-demo
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}