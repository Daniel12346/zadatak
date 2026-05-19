import { useAuthStore } from '../stores/authStore'

export function useAuth() {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoggingIn = useAuthStore((s) => s.isLoggingIn)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)

  return { token, user, isAuthenticated, isLoggingIn, login, logout }
}
