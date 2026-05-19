import type { AuthUser } from '../types'

const MOCK_USER: AuthUser = {
  id: '1',
  email: 'admin@orqa.com',
  name: 'Admin User',
}

export function loginApi(_email: string, _password: string): Promise<{ token: string; user: AuthUser }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'mock-jwt-token', user: MOCK_USER })
    }, 1000)
  })
}
