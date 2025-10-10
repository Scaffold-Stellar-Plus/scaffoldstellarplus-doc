'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { docsConfig, type NavItem } from '@/lib/docs-config'

function NavGroup({ item, level = 0, onLinkClick }: { item: NavItem; level?: number; onLinkClick: () => void }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const hasItems = item.items && item.items.length > 0

  if (!hasItems && item.href) {
    return (
      <Link
        href={item.href}
        onClick={onLinkClick}
        className={cn(
          'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
          pathname === item.href
            ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        )}
        style={{ paddingLeft: `${0.75 + level * 0.75}rem` }}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <div>
      {item.title && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold transition-colors',
            level === 0
              ? 'text-gray-900 dark:text-gray-100'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          )}
          style={{ paddingLeft: `${0.75 + level * 0.75}rem` }}
        >
          {item.title}
          {hasItems && (
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-90'
              )}
            />
          )}
        </button>
      )}
      {hasItems && isOpen && (
        <div className="mt-1 space-y-1">
          {item.items?.map((subItem, index) => (
            <NavGroup key={index} item={subItem} level={level + 1} onLinkClick={onLinkClick} />
          ))}
        </div>
      )}
    </div>
  )
}

export function DocsMobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-purple-600 p-3 text-white shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Open navigation"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold">Documentation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {docsConfig.map((item, index) => (
                <NavGroup
                  key={index}
                  item={item}
                  onLinkClick={() => setIsOpen(false)}
                />
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
