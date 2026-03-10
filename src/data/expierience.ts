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
    title: "Payments & Billing Systems",
    description:
      "Built backend features supporting billing workflows including refunds, receipt generation, currency formatting, and installment payment logic across multiple microservices."
  },
  {
    title: "International Payment Support",
    description:
      "Implemented localization support for international payment flows, handling currency formatting, installment calculations, and multi-locale user experiences."
  },
  {
    title: "Notification System Migration",
    description:
      "Migrated multiple email, SMS, and push notifications to a modern event-driven notification platform by implementing event triggers, data hydration layers, and service integrations."
  },
  {
    title: "Legacy API Migration",
    description:
      "Led migration of legacy service endpoints to modern APIs using feature flags and staged rollouts to maintain backward compatibility and prevent production disruptions."
  }
];