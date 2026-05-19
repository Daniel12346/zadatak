export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  isLoggingIn: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
