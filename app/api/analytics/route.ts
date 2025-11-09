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

interface AnalyticsStats {
  totalVisits: number
  visitsLast7Days: number
  visitsLast30Days: number
  topPages: Array<{ path: string; count: number }>
  topReferrers: Array<{ referrer: string; count: number }>
  dailyVisits: Array<{ date: string; count: number }>
}

export async function GET(request: NextRequest) {
  try {
    // Check admin token
    const adminToken = request.headers.get('x-admin-token')
    const expectedToken = process.env.ADMIN_TOKEN

    if (!expectedToken || adminToken !== expectedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Read analytics file
    let analytics: AnalyticsEvent[] = []
    try {
      const data = await fs.readFile(ANALYTICS_FILE, 'utf-8')
      analytics = JSON.parse(data)
    } catch {
      // No analytics data yet
      return NextResponse.json({
        totalVisits: 0,
        visitsLast7Days: 0,
        visitsLast30Days: 0,
        topPages: [],
        topReferrers: [],
        dailyVisits: [],
      } as AnalyticsStats)
    }

    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Filter events
    const visitsLast7Days = analytics.filter(
      (event) => new Date(event.timestamp) >= sevenDaysAgo
    ).length

    const visitsLast30Days = analytics.filter(
      (event) => new Date(event.timestamp) >= thirtyDaysAgo
    ).length

    // Top pages
    const pageCounts = new Map<string, number>()
    analytics.forEach((event) => {
      const count = pageCounts.get(event.path) || 0
      pageCounts.set(event.path, count + 1)
    })
    const topPages = Array.from(pageCounts.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Top referrers
    const referrerCounts = new Map<string, number>()
    analytics.forEach((event) => {
      if (event.referrer) {
        try {
          // Ensure referrer has protocol before creating URL
          let referrerUrl = event.referrer
          if (!referrerUrl.startsWith('http://') && !referrerUrl.startsWith('https://')) {
            referrerUrl = `https://${referrerUrl}`
          }
          const referrer = new URL(referrerUrl).hostname
          const count = referrerCounts.get(referrer) || 0
          referrerCounts.set(referrer, count + 1)
        } catch {
          // Skip invalid referrer URLs
        }
      }
    })
    const topReferrers = Array.from(referrerCounts.entries())
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Daily visits (last 7 days)
    const dailyVisitsMap = new Map<string, number>()
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      dailyVisitsMap.set(dateStr, 0)
    }

    analytics
      .filter((event) => new Date(event.timestamp) >= sevenDaysAgo)
      .forEach((event) => {
        const dateStr = new Date(event.timestamp).toISOString().split('T')[0]
        const count = dailyVisitsMap.get(dateStr) || 0
        dailyVisitsMap.set(dateStr, count + 1)
      })

    const dailyVisits = Array.from(dailyVisitsMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    const stats: AnalyticsStats = {
      totalVisits: analytics.length,
      visitsLast7Days,
      visitsLast30Days,
      topPages,
      topReferrers,
      dailyVisits,
    }

    return NextResponse.json(stats)
  } catch (error: any) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

