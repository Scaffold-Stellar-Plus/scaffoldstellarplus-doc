'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { docsConfig, type NavItem } from '@/lib/docs-config'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

function NavGroup({ item, level = 0 }: { item: NavItem; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const hasItems = item.items && item.items.length > 0

  if (!hasItems && item.href) {
    return (
      <Link
        href={item.href}
        className={cn(
          'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
          pathname === item.href
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
              ? 'text-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
            <NavGroup key={index} item={subItem} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function DocsSidebar() {
  return (
    <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-card lg:block">
      <div className="py-6 pr-6 pl-8">
        <nav className="space-y-1">
          {docsConfig.map((item, index) => (
            <NavGroup key={index} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  )
}
