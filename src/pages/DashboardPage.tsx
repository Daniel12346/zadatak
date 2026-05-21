import { useEffect, useState, useRef } from 'react'
import { useDashboardStore } from '../stores/dashboardStore'
import styles from './DashboardPage.module.css'

const iconColors = ['#6366f1', '#f59e0b', '#10b981', '#0ea5e9']

const trendData = [
  [42, 45, 38, 52, 48, 61, 55, 68, 72, 65, 78, 82],
  [12, 18, 15, 22, 19, 28, 24, 32, 29, 35, 31, 42],
  [3200, 3400, 3100, 3800, 3600, 4100, 3900, 4300, 4200, 4500, 4400, 4528],
  [8, 12, 10, 15, 13, 18, 16, 22, 20, 28, 25, 37],
]

const icons = [
  <svg key="users" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="activity" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  <svg key="revenue" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  <svg key="signups" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>,
]

function useCountUp(target: number, duration: number = 1000, delay: number = 0) {
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * target))
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    const timeout = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [target, duration, delay])

  return count
}

export function DashboardPage() {
  const { stats, isLoading, fetchStats } = useDashboardStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, prefix: '', suffix: '', data: trendData[0] },
    { label: 'Active Sessions', value: stats.activeSessions, prefix: '', suffix: '', data: trendData[1] },
    { label: 'Revenue', value: stats.revenue, prefix: '$', suffix: '', data: trendData[2] },
    { label: 'Signups Today', value: stats.signupsToday, prefix: '', suffix: '', data: trendData[3] },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.bgPattern} aria-hidden="true" />
      <div className={styles.heroSection}>
        <h1 className={styles.greeting}>Overview</h1>
        <p className={styles.subtitle}>Platform metrics & performance indicators</p>
        <div className={styles.decorativeLine} />
      </div>

      <div className={styles.grid}>
        {cards.map((card, i) => (
          <Card key={card.label} card={card} index={i} isLoading={isLoading} />
        ))}
      </div>
    </div>
  )
}

interface CardProps {
  card: { label: string; value: number; prefix: string; suffix: string; data: number[] }
  index: number
  isLoading: boolean
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 160
  const h = 40
  const padding = 2
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (w - padding * 2)
    const y = h - padding - ((v - min) / range) * (h - padding * 2)
    return `${x},${y}`
  })

  const areaPoints = `${points[0].split(',')[0]},${h} ` + points.join(' ') + ` ${points[points.length - 1].split(',')[0]},${h}`

  return (
    <svg width="100%" height="40" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={styles.sparkline}>
      <polygon points={areaPoints} fill={color} opacity="0.08" />
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Card({ card, index, isLoading }: CardProps) {
  const animatedValue = useCountUp(card.value, 1200, index * 150)
  const displayValue = isLoading ? '…' : `${card.prefix}${animatedValue.toLocaleString()}${card.suffix}`
  
  return (
    <div className={styles.card}>
      <div 
        className={styles.cardAccent}
        style={{ background: iconColors[index] }}
      />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>{card.label}</span>
          <div
            className={styles.cardIcon}
            style={{ color: iconColors[index] }}
          >
            {icons[index]}
          </div>
        </div>
        <p className={styles.cardValue}>
          {displayValue}
        </p>
        <Sparkline data={card.data} color={iconColors[index]} />
      </div>
    </div>
  )
}
