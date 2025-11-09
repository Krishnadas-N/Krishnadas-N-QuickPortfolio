import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const GENERATED_FILE = path.join(process.cwd(), 'data', 'generated.json')

interface GeneratedContent {
  metaDescription?: string
  heroTagline?: string
  aboutText?: string
  projectDescriptions?: Record<string, string>
  skillTags?: Record<string, string>
  lastGenerated?: string
}

export async function GET() {
  try {
    const data = await fs.readFile(GENERATED_FILE, 'utf-8')
    const content = JSON.parse(data) as GeneratedContent
    return NextResponse.json(content)
  } catch {
    // File doesn't exist, return empty
    return NextResponse.json({})
  }
}

