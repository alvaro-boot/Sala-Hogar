// Sistema de autenticación simple para administradores
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Credenciales de administrador (en producción esto debería estar en variables de entorno)
const ADMIN_CREDENTIALS = {
  email: 'admin@salahogar.com',
  password: 'admin123', // En producción usar hash
  name: 'Administrador',
  role: 'admin' as const
}

export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user: User = {
        id: '1',
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role
      }

      this.currentUser = user
      
      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('salahogar_user', JSON.stringify(user))
        localStorage.setItem('salahogar_token', 'fake-jwt-token')
      }

      return { success: true, user }
    }

    return { success: false, error: 'Credenciales incorrectas' }
  }

  async logout(): Promise<void> {
    this.currentUser = null
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('salahogar_user')
      localStorage.removeItem('salahogar_token')
    }
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser
    }

    // Intentar cargar desde localStorage
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('salahogar_user')
      if (userStr) {
        try {
          this.currentUser = JSON.parse(userStr)
          return this.currentUser
        } catch (error) {
          console.error('Error parsing user from localStorage:', error)
        }
      }
    }

    return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser()
    return user?.role === 'admin'
  }

  // Verificar si el token es válido (simulado)
  async validateToken(): Promise<boolean> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('salahogar_token')
      return token === 'fake-jwt-token'
    }
    return false
  }
}

export const authService = AuthService.getInstance()
