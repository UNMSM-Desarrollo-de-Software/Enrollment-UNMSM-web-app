import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  code: string
  name: string
  token: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (code: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (code: string, password: string) => {
        // TODO: Implement actual API call
        const mockUser = {
          code,
          name: 'Student Name',
          token: 'mock-token'
        }
        set({ user: mockUser, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
