import { create } from 'zustand'
import type { User } from '../types'

const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@orqa.com', role: 'Admin', status: 'active', createdAt: '2025-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@orqa.com', role: 'Editor', status: 'active', createdAt: '2025-02-20' },
  { id: '3', name: 'Carol Davis', email: 'carol@orqa.com', role: 'Viewer', status: 'active', createdAt: '2025-03-10' },
  { id: '4', name: 'Dan Wilson', email: 'dan@orqa.com', role: 'Editor', status: 'inactive', createdAt: '2025-03-22' },
  { id: '5', name: 'Eve Martin', email: 'eve@orqa.com', role: 'Admin', status: 'active', createdAt: '2025-04-01' },
  { id: '6', name: 'Frank Lee', email: 'frank@orqa.com', role: 'Viewer', status: 'inactive', createdAt: '2025-04-15' },
  { id: '7', name: 'Grace Kim', email: 'grace@orqa.com', role: 'Editor', status: 'active', createdAt: '2025-05-02' },
]

interface UsersState {
  users: User[]
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void
  updateUser: (id: string, data: Partial<User>) => void
  deleteUser: (id: string) => void
}

export const useUsersStore = create<UsersState>((set) => ({
  users: mockUsers,

  addUser: (user) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...user,
          id: String(Date.now()),
          createdAt: new Date().toISOString().split('T')[0],
        },
      ],
    })),

  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}))
