import { getSkills } from "@/services/experienceService"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = getSkills()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    )
  }
}