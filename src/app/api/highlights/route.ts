import { highlights } from "@/data/experience"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(highlights)
}