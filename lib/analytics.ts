/**
 * Client-side analytics tracking utility
 * Sends page views and events to /api/track endpoint
 */

export interface TrackEvent {
  path: string
  referrer?: string
  userAgent?: string
  timestamp?: string
}

export const trackPageView = async () => {
  if (typeof window === 'undefined') return

  try {
    const event: TrackEvent = {
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }

    // Send to API (fire and forget)
    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }).catch(() => {
      // Silently fail - analytics should not break the app
    })
  } catch (error) {
    // Silently fail
    console.error('Analytics error:', error)
  }
}

export const trackEvent = async (eventName: string, data?: Record<string, any>) => {
  if (typeof window === 'undefined') return

  try {
    const event: TrackEvent = {
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }

    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        eventName,
        eventData: data,
      }),
    }).catch(() => {
      // Silently fail
    })
  } catch (error) {
    console.error('Analytics error:', error)
  }
}

