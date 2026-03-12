import { highlights} from "@/src/data/experience"

export default function HighlightsSection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Key Work Highlights</h2>

      <div className="space-y-6">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="border p-4 rounded-lg 
                        border-gray-200 dark:border-gray-700
                        bg-white dark:bg-gray-900">
            <h3 className="text-xl font-semibold">{highlight.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}