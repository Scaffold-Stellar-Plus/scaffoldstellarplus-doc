'use client'

import Link from 'next/link'

export default function UsingHooksPage() {
  return (
    <div className="max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-border">
          <h1 className="text-4xl font-bold tracking-tight">Using Read & Write Hooks</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This page has been moved. Please see the updated documentation in the sections below.
          </p>
        </header>

        {/* Redirect Info */}
        <section className="space-y-6">
          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-6 rounded-r">
            <h2 className="text-xl font-semibold mb-3">Documentation Reorganized</h2>
            <p className="text-muted-foreground mb-4">
              The hook system documentation has been split into multiple pages for better organization:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/docs/hooks" className="p-4 bg-white dark:bg-gray-800 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-1">Unified Hook System →</h3>
                <p className="text-sm text-muted-foreground">Learn about the core hook architecture</p>
              </Link>
              <Link href="/docs/examples/reading" className="p-4 bg-white dark:bg-gray-800 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-1">Reading Contract Data →</h3>
                <p className="text-sm text-muted-foreground">Examples of using callReadMethod</p>
              </Link>
              <Link href="/docs/examples/writing" className="p-4 bg-white dark:bg-gray-800 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-1">Writing to Contracts →</h3>
                <p className="text-sm text-muted-foreground">Examples of using callWriteMethod</p>
              </Link>
              <Link href="/docs/examples/custom-hooks" className="p-4 bg-white dark:bg-gray-800 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-1">Custom Hooks →</h3>
                <p className="text-sm text-muted-foreground">Build contract-specific hooks</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

