/**
 * AI Content Generation Utility
 * Uses OpenAI API to generate SEO-optimized content from structured data
 */

import OpenAI from 'openai'
import fs from 'fs/promises'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const GENERATED_FILE = path.join(process.cwd(), 'data', 'generated.json')

interface GeneratedContent {
  metaDescription?: string
  heroTagline?: string
  aboutText?: string
  projectDescriptions?: Record<string, string>
  skillTags?: Record<string, string>
  lastGenerated?: string
}

/**
 * Load cached generated content
 */
export async function loadGeneratedContent(): Promise<GeneratedContent | null> {
  try {
    const data = await fs.readFile(GENERATED_FILE, 'utf-8')
    const content = JSON.parse(data) as GeneratedContent
    
    // Check if content is older than 7 days
    if (content.lastGenerated) {
      const lastGen = new Date(content.lastGenerated)
      const daysSince = (Date.now() - lastGen.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSince > 7) {
        return null // Regenerate
      }
    }
    
    return content
  } catch {
    return null
  }
}

/**
 * Save generated content to cache
 */
export async function saveGeneratedContent(content: GeneratedContent): Promise<void> {
  try {
    await fs.mkdir(path.dirname(GENERATED_FILE), { recursive: true })
    await fs.writeFile(
      GENERATED_FILE,
      JSON.stringify({ ...content, lastGenerated: new Date().toISOString() }, null, 2)
    )
  } catch (error) {
    console.error('Failed to save generated content:', error)
  }
}

/**
 * Generate meta description using AI
 */
export async function generateMetaDescription(profileData: any): Promise<string> {
  if (!process.env.AI_CONTENT_ENABLED || process.env.AI_CONTENT_ENABLED !== 'true') {
    return profileData.summary || 'Software engineer and freelancer'
  }

  try {
    const prompt = `Create a compelling, SEO-optimized meta description (max 160 characters) for a software engineer portfolio. 
    Name: ${profileData.name}
    Role: ${profileData.role}
    Summary: ${profileData.summary}
    Experience: ${profileData.experience}
    Focus: ${profileData.focusAreas?.join(', ')}
    
    Make it professional, keyword-rich, and engaging.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an SEO expert creating meta descriptions.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 100,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content?.trim() || profileData.summary
  } catch (error) {
    console.error('AI generation error:', error)
    return profileData.summary || 'Software engineer and freelancer'
  }
}

/**
 * Generate hero tagline
 */
export async function generateHeroTagline(profileData: any): Promise<string> {
  if (!process.env.AI_CONTENT_ENABLED || process.env.AI_CONTENT_ENABLED !== 'true') {
    return 'Engineering the Future in Code'
  }

  try {
    const prompt = `Create a short, impactful, futuristic tagline (max 8 words) for a software engineer portfolio. 
    Name: ${profileData.name}
    Role: ${profileData.role}
    Style: Robotic, futuristic, tech-forward
    
    Examples: "Engineering the Future in Code", "Building Tomorrow's Digital Experiences"`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You create futuristic, tech-forward taglines.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 30,
      temperature: 0.8,
    })

    return completion.choices[0]?.message?.content?.trim() || 'Engineering the Future in Code'
  } catch (error) {
    console.error('AI generation error:', error)
    return 'Engineering the Future in Code'
  }
}

/**
 * Generate enhanced about text
 */
export async function generateAboutText(profileData: any): Promise<string> {
  if (!process.env.AI_CONTENT_ENABLED || process.env.AI_CONTENT_ENABLED !== 'true') {
    return profileData.bio || profileData.summary
  }

  try {
    const prompt = `Write a professional, engaging "About Me" paragraph (2-3 sentences) for a software engineer portfolio.
    Name: ${profileData.name}
    Role: ${profileData.role}
    Experience: ${profileData.experience}
    Current Role: ${profileData.currentRole}
    Focus Areas: ${profileData.focusAreas?.join(', ')}
    Summary: ${profileData.summary}
    
    Make it personal, professional, and highlight expertise.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You write professional portfolio content.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content?.trim() || profileData.bio
  } catch (error) {
    console.error('AI generation error:', error)
    return profileData.bio || profileData.summary
  }
}

/**
 * Generate all content and cache it
 */
export async function generateAllContent(profileData: any, projectsData: any): Promise<GeneratedContent> {
  const cached = await loadGeneratedContent()
  if (cached) return cached

  const [metaDescription, heroTagline, aboutText] = await Promise.all([
    generateMetaDescription(profileData),
    generateHeroTagline(profileData),
    generateAboutText(profileData),
  ])

  const content: GeneratedContent = {
    metaDescription,
    heroTagline,
    aboutText,
    lastGenerated: new Date().toISOString(),
  }

  await saveGeneratedContent(content)
  return content
}

