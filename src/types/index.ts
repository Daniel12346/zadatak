export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface UserFormData {
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

export const emptyUserForm: UserFormData = { name: '', email: '', role: 'Viewer', status: 'active' }

export interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  isLoggingIn: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
