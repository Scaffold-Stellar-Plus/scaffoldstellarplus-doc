'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X, FileText, Filter, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { 
  searchContent, 
  generateSuggestions, 
  getPopularSearches,
  type SearchFilters,
  type SearchState
} from '@/lib/simple-search'

export function EnhancedDocsSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    filters: { section: [], category: [], difficulty: [], tags: [] },
    sortBy: 'relevance',
    showFilters: false,
    recentSearches: [],
    suggestions: []
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches')
    if (saved) {
      setSearchState(prev => ({ ...prev, recentSearches: JSON.parse(saved) }))
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Generate suggestions based on query
  useEffect(() => {
    if (searchState.query.trim()) {
      const suggestions = generateSuggestions(searchState.query)
      setSearchState(prev => ({ ...prev, suggestions }))
    } else {
      setSearchState(prev => ({ ...prev, suggestions: [] }))
    }
  }, [searchState.query])

  // Search results with debouncing
  const searchResults = useMemo(() => {
    if (!searchState.query.trim()) return []
    
    return searchContent(
      searchState.query,
      searchState.filters,
      searchState.sortBy
    )
  }, [searchState.query, searchState.filters, searchState.sortBy])

  // Handle search
  const handleSearch = (query: string) => {
    setSearchState(prev => ({ ...prev, query }))
    setSelectedIndex(0)
  }

  // Handle result click
  const handleResultClick = () => {
    // Save to recent searches
    const newRecentSearches = [
      searchState.query,
      ...searchState.recentSearches.filter(s => s !== searchState.query)
    ].slice(0, 10)
    
    setSearchState(prev => ({ ...prev, recentSearches: newRecentSearches }))
    localStorage.setItem('recent-searches', JSON.stringify(newRecentSearches))
    
    // Close search and navigate
    setIsOpen(false)
    setSearchState(prev => ({ ...prev, query: '' }))
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = searchResults.length + searchState.suggestions.length
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % totalItems)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems)
        break
      case 'Enter':
        e.preventDefault()
        if (searchResults.length > 0 && selectedIndex < searchResults.length) {
          handleResultClick()
        } else if (searchState.suggestions.length > 0) {
          const suggestionIndex = selectedIndex - searchResults.length
          if (suggestionIndex >= 0 && suggestionIndex < searchState.suggestions.length) {
            handleSearch(searchState.suggestions[suggestionIndex])
          }
        }
        break
    }
  }

  // Filter options
  const filterOptions = {
    section: ['Getting Started', 'Core Concepts', 'Guides', 'Examples', 'Reference'],
    category: ['guide', 'example', 'reference', 'tutorial'],
    difficulty: ['beginner', 'intermediate', 'advanced'],
    tags: ['deployment', 'hooks', 'wallets', 'contracts', 'mainnet', 'testnet', 'troubleshooting']
  }

  // Toggle filter
  const toggleFilter = (type: keyof SearchFilters, value: string) => {
    setSearchState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [type]: prev.filters[type].includes(value)
          ? prev.filters[type].filter(v => v !== value)
          : [...prev.filters[type], value]
      }
    }))
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search docs</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={searchState.query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            />
            <button
              onClick={() => setSearchState(prev => ({ ...prev, showFilters: !prev.showFilters }))}
              className={`p-2 rounded transition-colors ${
                searchState.showFilters 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400'
              }`}
            >
              <Filter className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Filters */}
          {searchState.showFilters && (
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Section</label>
                  <div className="space-y-1">
                    {filterOptions.section.map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={searchState.filters.section.includes(option)}
                          onChange={() => toggleFilter('section', option)}
                          className="rounded border-gray-300"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Category</label>
                  <div className="space-y-1">
                    {filterOptions.category.map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={searchState.filters.category.includes(option)}
                          onChange={() => toggleFilter('category', option)}
                          className="rounded border-gray-300"
                        />
                        <span className="capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Difficulty</label>
                  <div className="space-y-1">
                    {filterOptions.difficulty.map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={searchState.filters.difficulty.includes(option)}
                          onChange={() => toggleFilter('difficulty', option)}
                          className="rounded border-gray-300"
                        />
                        <span className="capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Tags</label>
                  <div className="space-y-1">
                    {filterOptions.tags.map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={searchState.filters.tags.includes(option)}
                          onChange={() => toggleFilter('tags', option)}
                          className="rounded border-gray-300"
                        />
                        <span className="capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto" ref={resultsRef}>
            {!searchState.query.trim() && (
              <div className="px-4 py-8">
                <div className="text-center text-sm text-gray-500 mb-4">
                  Type to search documentation...
                </div>
                
                {/* Recent Searches */}
                {searchState.recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recent Searches
                    </h3>
                    <div className="space-y-1">
                      {searchState.recentSearches.slice(0, 5).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getPopularSearches().map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {searchState.query.trim() && searchResults.length === 0 && searchState.suggestions.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No results found for &quot;{searchState.query}&quot;
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </div>
                {searchResults.map((result, index) => (
                  <Link
                    key={result.id}
                    href={result.href}
                    onClick={() => handleResultClick()}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                      index === selectedIndex 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {result.excerpt}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                          {result.section}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded capitalize">
                          {result.difficulty}
                        </span>
                        {result.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {searchState.suggestions.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                  Suggestions
                </div>
                {searchState.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      index + searchResults.length === selectedIndex 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {suggestion}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">ESC</kbd> to close</span>
              <span>Navigate with arrow keys</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchState(prev => ({ ...prev, sortBy: 'relevance' }))}
                className={`px-2 py-1 rounded text-xs ${
                  searchState.sortBy === 'relevance' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Relevance
              </button>
              <button
                onClick={() => setSearchState(prev => ({ ...prev, sortBy: 'popularity' }))}
                className={`px-2 py-1 rounded text-xs ${
                  searchState.sortBy === 'popularity' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Popularity
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
