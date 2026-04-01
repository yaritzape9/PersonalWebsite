import HighlightsSection from "@/components/HighlightsSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-16 min-h-screen">

      {/* Hero */}
      <div className="mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          Software Engineer · San Francisco
        </p>
        <h1 className="text-6xl font-bold tracking-tight leading-none mb-6">
          Yaritza<br />Perez
        </h1>
        <div className="w-12 h-px bg-gray-300 dark:bg-gray-700 mb-6" />
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
          Full-stack engineer with experience building payments infrastructure,
          notification systems, and scalable microservices.
        </p>
      </div>

      <HighlightsSection />
      <SkillsSection />

    </main>
  );
}