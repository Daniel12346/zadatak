import { create } from 'zustand'
import type { AuthState, AuthUser } from '../types'
import { loginApi } from '../utils/mockApi'

const STORAGE_KEY = 'auth'

function loadFromStorage(): { token: string | null; user: AuthUser | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { token: null, user: null }
    return JSON.parse(raw)
  } catch {
    return { token: null, user: null }
  }
}

function saveToStorage(token: string | null, user: AuthUser | null): void {
  if (token && user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

const initial = loadFromStorage()

export const useAuthStore = create<AuthState>((set) => ({
  token: initial.token,
  user: initial.user,
  isAuthenticated: !!initial.token,
  isLoggingIn: false,

  login: async (email: string, password: string) => {
    set({ isLoggingIn: true })
    try {
      const { token, user } = await loginApi(email, password)
      saveToStorage(token, user)
      set({ token, user, isAuthenticated: true, isLoggingIn: false })
    } catch {
      set({ isLoggingIn: false })
    }
  },

  logout: () => {
    saveToStorage(null, null)
    set({ token: null, user: null, isAuthenticated: false, isLoggingIn: false })
  },
}))
