"use client"

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from './input'
import { Button } from './button'
import { useSearch } from '@/hooks/useSearch'
import Link from 'next/link'

interface SearchBoxProps {
  className?: string
  placeholder?: string
  showSuggestions?: boolean
}

export function SearchBox({ 
  className = "", 
  placeholder = "Buscar productos...",
  showSuggestions = true 
}: SearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showSuggestionsList, setShowSuggestionsList] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const {
    searchQuery,
    handleSearch,
    handleSearchSubmit,
    handleSearchChange,
    getSearchSuggestions
  } = useSearch()

  const suggestions = getSearchSuggestions(searchQuery)

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestionsList(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e)
    setShowSuggestionsList(e.target.value.length >= 2)
  }

  const handleSuggestionClick = (productName: string) => {
    setSearchQuery(productName)
    setShowSuggestionsList(false)
    handleSearch(productName)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setShowSuggestionsList(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestionsList(searchQuery.length >= 2)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </form>

      {/* Sugerencias de búsqueda */}
      {showSuggestions && showSuggestionsList && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2 px-2">Sugerencias:</div>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.name)}
                className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded text-sm transition-colors"
              >
                <div className="font-medium text-gray-900">{suggestion.name}</div>
                <div className="text-xs text-gray-500">
                  {suggestion.category} {suggestion.subcategory && `• ${suggestion.subcategory}`}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay sugerencias */}
      {showSuggestions && showSuggestionsList && suggestions.length === 0 && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 text-center text-sm text-gray-500">
            No se encontraron productos para "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  )
}
