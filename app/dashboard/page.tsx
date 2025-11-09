'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface AnalyticsStats {
  totalVisits: number
  visitsLast7Days: number
  visitsLast30Days: number
  topPages: Array<{ path: string; count: number }>
  topReferrers: Array<{ referrer: string; count: number }>
  dailyVisits: Array<{ date: string; count: number }>
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setError('Token required. Add ?token=YOUR_ADMIN_TOKEN to the URL.')
      setLoading(false)
      return
    }

    fetch('/api/analytics', {
      headers: {
        'x-admin-token': token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized or failed to fetch analytics')
        }
        return res.json()
      })
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="glass terminal-box rounded-lg p-8 text-center">
          <div className="text-hacker-green font-mono text-xl mb-4">
            {'>'} LOADING_ANALYTICS...
          </div>
          <div className="w-64 h-1 bg-terminal-bg rounded overflow-hidden">
            <div className="h-full bg-hacker-green animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="glass terminal-box rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-mono font-bold text-hacker-red mb-4 neon-text-white">
            {'>'} ERROR
          </h1>
          <p className="text-hacker-green/80 font-mono mb-4">{error || 'Failed to load analytics'}</p>
          <p className="text-hacker-green/60 font-mono text-sm">
            Add ?token=YOUR_ADMIN_TOKEN to the URL
          </p>
        </div>
      </div>
    )
  }

  const dailyChartData = {
    labels: stats.dailyVisits.map((d) => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Visits',
        data: stats.dailyVisits.map((d) => d.count),
        borderColor: '#00ff41',
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#00ff41',
        pointBorderColor: '#00ffff',
        pointRadius: 4,
      },
    ],
  }

  const topPagesData = {
    labels: stats.topPages.slice(0, 5).map((p) => p.path.length > 20 ? p.path.substring(0, 20) + '...' : p.path),
    datasets: [
      {
        label: 'Page Views',
        data: stats.topPages.slice(0, 5).map((p) => p.count),
        backgroundColor: [
          'rgba(0, 255, 65, 0.8)',
          'rgba(0, 255, 255, 0.8)',
          'rgba(255, 0, 255, 0.8)',
          'rgba(0, 255, 65, 0.6)',
          'rgba(0, 255, 255, 0.6)',
        ],
        borderColor: [
          '#00ff41',
          '#00ffff',
          '#ff00ff',
          '#00ff41',
          '#00ffff',
        ],
        borderWidth: 2,
      },
    ],
  }

  const referrersData = {
    labels: stats.topReferrers.slice(0, 5).map((r) => {
      const ref = r.referrer || 'Direct'
      return ref.length > 15 ? ref.substring(0, 15) + '...' : ref
    }),
    datasets: [
      {
        data: stats.topReferrers.slice(0, 5).map((r) => r.count),
        backgroundColor: [
          '#00ff41',
          '#00ffff',
          '#ff00ff',
          '#00ff41',
          '#00ffff',
        ],
        borderColor: '#000000',
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#00ff41',
          font: {
            family: 'JetBrains Mono',
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { 
          color: '#00ff41',
          font: {
            family: 'JetBrains Mono',
            size: 10,
          },
        },
        grid: { 
          color: 'rgba(0, 255, 65, 0.1)',
          borderColor: 'rgba(0, 255, 65, 0.3)',
        },
      },
      y: {
        ticks: { 
          color: '#00ff41',
          font: {
            family: 'JetBrains Mono',
            size: 10,
          },
        },
        grid: { 
          color: 'rgba(0, 255, 65, 0.1)',
          borderColor: 'rgba(0, 255, 65, 0.3)',
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8 relative">
      {/* Matrix background effect */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,65,0.03) 0px, transparent 1px, transparent 2px, rgba(0,255,65,0.03) 3px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white mb-2"
            style={{
              textShadow: '0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3)',
            }}
          >
            {'>'} ANALYTICS_DASHBOARD.EXE
          </h1>
          <p className="text-hacker-green/70 font-mono text-sm">
            System monitoring and visitor statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="glass terminal-box rounded-lg p-4 sm:p-6 relative">
            <div className="absolute top-2 left-2 text-hacker-green font-mono text-xs opacity-60">
              {'┌─[TOTAL]─┐'}
            </div>
            <h3 className="text-hacker-green/70 font-mono text-xs sm:text-sm mb-2 mt-6">TOTAL VISITS</h3>
            <p className="text-2xl sm:text-3xl font-bold text-hacker-green font-mono">
              {stats.totalVisits.toLocaleString()}
            </p>
          </div>
          <div className="glass terminal-box rounded-lg p-4 sm:p-6 relative">
            <div className="absolute top-2 left-2 text-hacker-cyan font-mono text-xs opacity-60">
              {'┌─[7D]─┐'}
            </div>
            <h3 className="text-hacker-cyan/70 font-mono text-xs sm:text-sm mb-2 mt-6">LAST 7 DAYS</h3>
            <p className="text-2xl sm:text-3xl font-bold text-hacker-cyan font-mono">
              {stats.visitsLast7Days.toLocaleString()}
            </p>
          </div>
          <div className="glass terminal-box rounded-lg p-4 sm:p-6 relative sm:col-span-2 lg:col-span-1">
            <div className="absolute top-2 left-2 text-hacker-purple font-mono text-xs opacity-60">
              {'┌─[30D]─┐'}
            </div>
            <h3 className="text-hacker-purple/70 font-mono text-xs sm:text-sm mb-2 mt-6">LAST 30 DAYS</h3>
            <p className="text-2xl sm:text-3xl font-bold text-hacker-purple font-mono">
              {stats.visitsLast30Days.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div className="glass terminal-box rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-mono font-semibold mb-4 text-white"
              style={{
                textShadow: '0 0 10px rgba(0,255,65,0.3)',
              }}
            >
              <span className="text-hacker-green">{'>'}</span> DAILY_VISITS (7D)
            </h3>
            <div className="h-64">
              <Line data={dailyChartData} options={chartOptions} />
            </div>
          </div>

          <div className="glass terminal-box rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-mono font-semibold mb-4 text-white"
              style={{
                textShadow: '0 0 10px rgba(0,255,255,0.3)',
              }}
            >
              <span className="text-hacker-cyan">{'>'}</span> TOP_REFERRERS
            </h3>
            <div className="h-64">
              <Doughnut 
                data={referrersData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: { 
                      position: 'bottom', 
                      labels: { 
                        color: '#00ff41',
                        font: {
                          family: 'JetBrains Mono',
                          size: 10,
                        },
                      } 
                    },
                  },
                }} 
              />
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="glass terminal-box rounded-lg p-4 sm:p-6 mb-8">
          <h3 className="text-lg sm:text-xl font-mono font-semibold mb-4 text-white"
            style={{
              textShadow: '0 0 10px rgba(0,255,65,0.3)',
            }}
          >
            <span className="text-hacker-green">{'>'}</span> TOP_PAGES
          </h3>
          <div className="h-64">
            <Bar data={topPagesData} options={chartOptions} />
          </div>
        </div>

        {/* Top Referrers List */}
        <div className="glass terminal-box rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-mono font-semibold mb-4 text-white"
            style={{
              textShadow: '0 0 10px rgba(255,0,255,0.3)',
            }}
          >
            <span className="text-hacker-purple">{'>'}</span> REFERRER_DETAILS
          </h3>
          <div className="space-y-2">
            {stats.topReferrers.length > 0 ? (
              stats.topReferrers.map((ref, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 px-3 border-b border-hacker-green/20 hover:bg-hacker-green/5 transition-colors">
                  <span className="text-hacker-green/80 font-mono text-sm">{ref.referrer || 'Direct'}</span>
                  <span className="text-hacker-cyan font-mono font-semibold">{ref.count}</span>
                </div>
              ))
            ) : (
              <p className="text-hacker-green/60 font-mono text-sm text-center py-4">
                No referrer data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="glass terminal-box rounded-lg p-8 text-center">
            <div className="text-hacker-green font-mono text-xl mb-4">
              {'>'} LOADING_ANALYTICS...
            </div>
            <div className="w-64 h-1 bg-terminal-bg rounded overflow-hidden">
              <div className="h-full bg-hacker-green animate-pulse" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
