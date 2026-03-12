import { highlights, skills, WorkHighlight, SkillCategory } from "@/data/experience"

export function getHighlights(): WorkHighlight[] {
  return highlights
}

export function getSkills(): SkillCategory[] {
  return skills
}