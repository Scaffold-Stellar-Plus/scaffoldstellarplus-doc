'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, FileText } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  title: string
  href: string
  excerpt: string
}

const searchableContent: SearchResult[] = [
  { title: 'Introduction', href: '/docs', excerpt: 'What is Scaffold Stellar Plus and why use it' },
  { title: 'Installation', href: '/docs/installation', excerpt: 'Set up your development environment' },
  { title: 'Quick Start', href: '/docs/getting-started', excerpt: 'Build your first smart contract interaction' },
  { title: 'Dynamic Contract System', href: '/docs/dynamic-contracts', excerpt: 'Automatic contract detection and adaptation' },
  { title: 'Unified Hook System', href: '/docs/hooks', excerpt: 'callReadMethod and callWriteMethod hooks' },
  { title: 'Multi-Wallet Support', href: '/docs/wallets', excerpt: 'Freighter, Albedo, XBull wallet integration' },
  { title: 'CLI Commands', href: '/docs/commands', excerpt: 'All available yarn commands and scripts' },
  { title: 'Reading Contract Data', href: '/docs/examples/reading', excerpt: 'Query smart contracts without fees' },
  { title: 'Writing to Contracts', href: '/docs/examples/writing', excerpt: 'Execute state-changing transactions' },
  { title: 'Troubleshooting', href: '/docs/troubleshooting', excerpt: 'Common issues and solutions' },
]

export function DocsSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.excerpt.toLowerCase().includes(searchQuery)
    )
    setResults(filtered.slice(0, 8))
  }, [query])

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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {!query.trim() && (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                Type to search documentation...
              </div>
            )}

            {query.trim() && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No results found for &quot;{query}&quot;
              </div>
            )}

            {results.length > 0 && (
              <div className="py-2">
                {results.map((result, index) => (
                  <Link
                    key={index}
                    href={result.href}
                    onClick={() => {
                      setIsOpen(false)
                      setQuery('')
                    }}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {result.excerpt}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500">
            <div>Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">ESC</kbd> to close</div>
            <div>Navigate with arrow keys</div>
          </div>
        </div>
      </div>
    </>
  )
}
