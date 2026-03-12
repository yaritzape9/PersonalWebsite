import { skills } from "@/src/data/experience";

export default function SkillsSection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>

      <div className="space-y-6">
        {skills.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold">{category.category}</h3>

            <div className="flex flex-wrap gap-2 mt-2">
              {category.skills.map((skill) => (
                <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm
                                bg-gray-200 dark:bg-gray-700
                                text-gray-800 dark:text-gray-200"
                    >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}