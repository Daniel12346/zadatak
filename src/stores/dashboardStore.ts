import { create } from 'zustand'

export interface DashboardStats {
  totalUsers: number
  activeSessions: number
  revenue: number
  signupsToday: number
}

interface DashboardState {
  stats: DashboardStats
  isLoading: boolean
  fetchStats: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: {
    totalUsers: 0,
    activeSessions: 0,
    revenue: 0,
    signupsToday: 0,
  },
  isLoading: false,

  fetchStats: async () => {
    set({ isLoading: true })
    await new Promise((r) => setTimeout(r, 600))
    set({
      stats: {
        totalUsers: 2483,
        activeSessions: 142,
        revenue: 45280,
        signupsToday: 37,
      },
      isLoading: false,
    })
  },
}))
