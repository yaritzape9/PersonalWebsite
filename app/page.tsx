import HighlightsSection from "@/src/components/HighlightsSection";
import SkillsSection from "@/src/components/SkillsSection";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-8
                 bg-white dark:bg-black
                 min-h-screen">

      <h1 className="text-4xl font-bold mb-4">
        Yaritza Perez
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300">
        Full-stack engineer with experience building payments infrastructure,
        notification systems, and scalable microservices.
      </p>

      <HighlightsSection />

      <SkillsSection />

    </main>
  );
}