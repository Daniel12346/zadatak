import { useEffect } from 'react'
import { useDashboardStore } from '../stores/dashboardStore'
import styles from './DashboardPage.module.css'

const iconColors = ['#6366f1', '#f59e0b', '#10b981', '#0ea5e9']

const icons = [
  <svg key="users" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="activity" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  <svg key="revenue" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  <svg key="signups" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>,
]

export function DashboardPage() {
  const { stats, isLoading, fetchStats } = useDashboardStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const cards = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString() },
    { label: 'Active Sessions', value: stats.activeSessions },
    { label: 'Revenue', value: `$${stats.revenue.toLocaleString()}` },
    { label: 'Signups Today', value: stats.signupsToday },
  ]

  return (
    <div className={styles.page}>
      <h2 className={styles.greeting}>Overview</h2>
      <p className={styles.subtitle}>Here&apos;s what&apos;s happening with your platform today.</p>

      <div className={styles.grid}>
        {cards.map((card, i) => (
          <div key={card.label} className={styles.card}>
            <div
              className={styles.cardIcon}
              style={{ background: `${iconColors[i]}15`, color: iconColors[i] }}
            >
              {icons[i]}
            </div>
            <p className={styles.cardLabel}>{card.label}</p>
            <p className={styles.cardValue}>
              {isLoading ? '…' : card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
