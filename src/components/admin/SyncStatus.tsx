"use client"

import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function SyncStatus() {
  const [status, setStatus] = useState<'loading' | 'synced' | 'error'>('loading')
  const [lastSync, setLastSync] = useState<string>('')

  useEffect(() => {
    // Simular verificación de estado de sincronización
    const checkSyncStatus = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          setStatus('synced')
          setLastSync(new Date().toLocaleString('es-CO'))
        } else {
          setStatus('error')
        }
      } catch (error) {
        setStatus('error')
      }
    }

    checkSyncStatus()
    
    // Verificar cada 30 segundos
    const interval = setInterval(checkSyncStatus, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'synced':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'loading':
        return 'Sincronizando...'
      case 'synced':
        return 'Sincronizado'
      case 'error':
        return 'Error de conexión'
    }
  }

  const getStatusVariant = () => {
    switch (status) {
      case 'loading':
        return 'secondary' as const
      case 'synced':
        return 'default' as const
      case 'error':
        return 'destructive' as const
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={getStatusVariant()} className="flex items-center space-x-1">
        {getStatusIcon()}
        <span className="text-xs">{getStatusText()}</span>
      </Badge>
      {status === 'synced' && lastSync && (
        <span className="text-xs text-gray-500">
          Última sincronización: {lastSync}
        </span>
      )}
    </div>
  )
}
