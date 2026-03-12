export interface SkillCategory{
    category: string
    skills: string[]
}

export interface Project {
    title: string
    description: string
    technologies: string[]
}

export interface WorkHighlight {
    title: string
    description: string
}

export const skills: SkillCategory[] = [
 {
    category: "Languages",
    skills: ["Java", "Kotlin", "JavaScript","TypeScript", "GraphQL", "Thrift IDL"]
  },
  {
    category: "Frontend",
    skills: ["React", "TSX", "Email templating", "CSS","UI Testing & Backend data flow validation"]
  },
  {
    category: "Backend",
    skills: [
      "Microservices",
      "Async DataLoaders",
      "CompletableFuture",
      "Java/kotlin backend services",
      "REST APIs (Dropwizard / JAX-RS)",
      "Dependency Injection (Google Guice)",
      "Async data orchestration (CompletableFuture / DataLoader patterns)",
      "Payment systems",
      "Notification systems (email, SMS, push)",
      "Feature flags / A/B testing",
      "Internationalization (i18n)",
      "Service integrations across distributed systems",
      "Unit and integration testing (JUnit, AssertJ, Mockito, MockK)"
    ]
  },
  {
    category: "Infrastructure",
    skills: [
      "Bazel",
      "Kubernetes",
      "CI/CD",
      "Service Mesh",
      "Monitoring & Alerting",
      "MySQL data storage (via service data layers)",
      "Spinnaker deployment pipelines"
    ]
  }
]

export const highlights: WorkHighlight[] = [
  {
    title: "Payments Systems Engineering",
    description:
      "Worked on large-scale payment systems including billing flows, refunds, currency formatting, installment logic, and receipt generation across multiple backend services."
  },
  {
    title: "International Payment Features",
    description:
      "Contributed to installment-based payment support for international markets, implementing backend service changes, API integrations, and frontend state management for checkout flows."
  },
  {
    title: "Notification Platform Migration",
    description:
      "Migrated multiple transactional notifications (email, SMS, push) to a modern event-driven notification platform, implementing backend data hydration and frontend email templates."
  },
  {
    title: "API Lifecycle Management",
    description:
      "Led deprecation and migration of legacy API endpoints across multiple services, coordinating caller migrations and using feature flags to ensure safe production rollouts."
  }
]