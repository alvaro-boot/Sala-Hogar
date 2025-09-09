"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService, type User, type AuthState } from '@/lib/auth'

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  const refreshAuth = () => {
    const user = authService.getCurrentUser()
    setAuthState({
      user,
      isAuthenticated: authService.isAuthenticated(),
      isLoading: false
    })
  }

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    
    const result = await authService.login(email, password)
    
    if (result.success && result.user) {
      setAuthState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false
      })
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
    
    return result
  }

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    await authService.logout()
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  useEffect(() => {
    // Verificar autenticación al cargar la app
    refreshAuth()
  }, [])

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
