import { projects } from "@/data/experience";

export default function ProjectsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Projects</h1>
      <div className="flex flex-col gap-6">
        {projects.map((p) => (
          <div key={p.title} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
            <p className="text-gray-600 mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <span key={t} className="text-sm bg-gray-100 rounded px-2 py-1">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}