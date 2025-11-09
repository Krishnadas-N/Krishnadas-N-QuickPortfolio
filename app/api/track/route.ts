import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json')

interface AnalyticsEvent {
  path: string
  referrer?: string
  userAgent?: string
  timestamp: string
  eventName?: string
  eventData?: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path: eventPath, referrer, userAgent, timestamp, eventName, eventData } = body

    if (!eventPath) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      )
    }

    const event: AnalyticsEvent = {
      path: eventPath,
      referrer: referrer || undefined,
      userAgent: userAgent || undefined,
      timestamp: timestamp || new Date().toISOString(),
      eventName: eventName || undefined,
      eventData: eventData || undefined,
    }

    // Read existing analytics
    let analytics: AnalyticsEvent[] = []
    try {
      const data = await fs.readFile(ANALYTICS_FILE, 'utf-8')
      analytics = JSON.parse(data)
    } catch {
      // File doesn't exist, start fresh
      await fs.mkdir(path.dirname(ANALYTICS_FILE), { recursive: true })
    }

    // Add new event
    analytics.push(event)

    // Keep only last 10,000 events to prevent file from growing too large
    if (analytics.length > 10000) {
      analytics = analytics.slice(-10000)
    }

    // Write back to file
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(analytics, null, 2))

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Analytics tracking error:', error)
    // Don't fail the request - analytics should be silent
    return NextResponse.json({ ok: true })
  }
}

