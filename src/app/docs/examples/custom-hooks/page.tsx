'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function CustomHooksPage() {
  const [copiedCommands, setCopiedCommands] = useState<Record<string, boolean>>({})

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommands(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setCopiedCommands(prev => ({ ...prev, [id]: false }))
    }, 2000)
  }

  const CodeBlock = ({ children, id }: { children: string; id: string }) => (
    <div className="relative group">
      <button
        onClick={() => copyToClipboard(children, id)}
        className="absolute right-2 top-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        {copiedCommands[id] ? 'Copied!' : 'Copy'}
      </button>
      <pre className="bg-muted/50 border border-border p-4 rounded-lg overflow-x-auto">
        <code className="text-sm">{children}</code>
      </pre>
    </div>
  )

  return (
    <div className="max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4 pb-8 border-border">
          <h1 className="text-4xl font-bold tracking-tight">Building Custom Hooks</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Learn how to create contract-specific hooks that encapsulate business logic and provide clean, reusable APIs for your components.
          </p>
        </header>

        {/* Why Custom Hooks */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Why Build Custom Hooks?</h2>
          <p className="text-muted-foreground">
            While <code className="px-1.5 py-0.5 bg-muted rounded text-sm">useDynamicContracts()</code> works great for any contract, creating custom hooks for frequently-used contracts provides several benefits:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4">
              <CheckCircle2 className="h-5 w-5 text-foreground mb-2" />
              <h3 className="font-semibold mb-1">Better Developer Experience</h3>
              <p className="text-sm text-muted-foreground">
                Provide clean, descriptive method names instead of generic <code className="text-xs">callReadMethod</code>
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <CheckCircle2 className="h-5 w-5 text-foreground mb-2" />
              <h3 className="font-semibold mb-1">Encapsulate Logic</h3>
              <p className="text-sm text-muted-foreground">
                Handle error management, state management, and caching in one place
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <CheckCircle2 className="h-5 w-5 text-foreground mb-2" />
              <h3 className="font-semibold mb-1">Type Safety</h3>
              <p className="text-sm text-muted-foreground">
                Define precise TypeScript types for method parameters and return values
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <CheckCircle2 className="h-5 w-5 text-foreground mb-2" />
              <h3 className="font-semibold mb-1">Reusability</h3>
              <p className="text-sm text-muted-foreground">
                Use the same hook across multiple components without duplicating code
              </p>
            </div>
          </div>
        </section>

        {/* Example: Counter Hook */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Example: useIncrement Hook</h2>
          <p className="text-muted-foreground">
            Here&apos;s a complete custom hook for the increment contract:
          </p>
          <CodeBlock id="use-increment">
{`// hooks/useIncrement.ts
import { useDynamicContracts } from '@/hooks/useDynamicContracts'
import { useCallback, useState, useEffect } from 'react'

export function useIncrement() {
  const { callReadMethod, callWriteMethod } = useDynamicContracts()
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch current count
  const fetchCount = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await callReadMethod('increment', 'get_count', {})
      setCount(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch count'
      setError(message)
      console.error('Failed to fetch count:', err)
    } finally {
      setLoading(false)
    }
  }, [callReadMethod])

  // Increment the counter
  const increment = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await callWriteMethod('increment', 'increment', {})
      await fetchCount() // Refresh after write
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to increment'
      setError(message)
      console.error('Failed to increment:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [callWriteMethod, fetchCount])

  // Decrement the counter
  const decrement = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await callWriteMethod('increment', 'decrement', {})
      await fetchCount() // Refresh after write
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to decrement'
      setError(message)
      console.error('Failed to decrement:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [callWriteMethod, fetchCount])

  // Reset the counter
  const reset = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await callWriteMethod('increment', 'reset', {})
      await fetchCount() // Refresh after write
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reset'
      setError(message)
      console.error('Failed to reset:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [callWriteMethod, fetchCount])

  // Auto-fetch on mount
  useEffect(() => {
    fetchCount()
  }, [fetchCount])

  return {
    count,
    loading,
    error,
    increment,
    decrement,
    reset,
    refresh: fetchCount
  }
}`}
          </CodeBlock>
        </section>

        {/* Using the Custom Hook */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Using the Custom Hook</h2>
          <p className="text-muted-foreground">
            Now you can use this hook in any component with a clean, simple API:
          </p>
          <CodeBlock id="use-hook">
{`// pages/counter.tsx
'use client'

import { useIncrement } from '@/hooks/useIncrement'
import { Button } from '@/components/ui/Button'

export default function CounterPage() {
  const { count, loading, error, increment, decrement, reset } = useIncrement()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Counter</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-secondary/50 border border-border rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="text-4xl font-bold mb-6">
        {count ?? '...'}
      </div>

      <div className="flex gap-4">
        <Button onClick={decrement} disabled={loading}>
          Decrement
        </Button>
        <Button onClick={increment} disabled={loading}>
          Increment
        </Button>
        <Button onClick={reset} disabled={loading} variant="destructive">
          Reset
        </Button>
      </div>
    </div>
  )
}`}
          </CodeBlock>
        </section>

        {/* Example: Token Hook */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Example: useToken Hook</h2>
          <p className="text-muted-foreground">
            Here&apos;s a more complex example for a token contract:
          </p>
          <CodeBlock id="use-token">
{`// hooks/useToken.ts
import { useDynamicContracts } from '@/hooks/useDynamicContracts'
import { useCallback, useState } from 'react'

interface TokenInfo {
  name: string
  symbol: string
  decimals: number
}

export function useToken() {
  const { callReadMethod, callWriteMethod } = useDynamicContracts()
  const [loading, setLoading] = useState(false)

  const getTokenInfo = useCallback(async (): Promise<TokenInfo | null> => {
    try {
      setLoading(true)
      const [name, symbol, decimals] = await Promise.all([
        callReadMethod('token', 'name', {}),
        callReadMethod('token', 'symbol', {}),
        callReadMethod('token', 'decimals', {})
      ])
      return { name, symbol, decimals }
    } catch (error) {
      console.error('Failed to fetch token info:', error)
      return null
    } finally {
      setLoading(false)
    }
  }, [callReadMethod])

  const getBalance = useCallback(async (address: string): Promise<bigint> => {
    try {
      const balance = await callReadMethod('token', 'balance', { address })
      return BigInt(balance)
    } catch (error) {
      console.error('Failed to fetch balance:', error)
      return BigInt(0)
    }
  }, [callReadMethod])

  const transfer = useCallback(async (
    from: string,
    to: string,
    amount: bigint
  ): Promise<boolean> => {
    try {
      setLoading(true)
      await callWriteMethod('token', 'transfer', {
        from,
        to,
        amount: amount.toString()
      })
      return true
    } catch (error) {
      console.error('Failed to transfer:', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [callWriteMethod])

  const mint = useCallback(async (
    to: string,
    amount: bigint
  ): Promise<boolean> => {
    try {
      setLoading(true)
      await callWriteMethod('token', 'mint', {
        to,
        amount: amount.toString()
      })
      return true
    } catch (error) {
      console.error('Failed to mint:', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [callWriteMethod])

  return {
    loading,
    getTokenInfo,
    getBalance,
    transfer,
    mint
  }
}`}
          </CodeBlock>
        </section>

        {/* Best Practices */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Best Practices</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">1. Always Handle Errors</h3>
              <p className="text-sm text-muted-foreground">
                Wrap contract calls in try-catch blocks and provide meaningful error messages.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">2. Use useCallback for Functions</h3>
              <p className="text-sm text-muted-foreground">
                Wrap your hook functions in <code className="px-1.5 py-0.5 bg-muted rounded text-xs">useCallback</code> to prevent unnecessary re-renders.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">3. Provide Loading States</h3>
              <p className="text-sm text-muted-foreground">
                Include loading indicators so components can show appropriate UI feedback.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">4. Auto-refresh After Writes</h3>
              <p className="text-sm text-muted-foreground">
                After write operations, automatically refresh read data to keep the UI in sync.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">5. Return Booleans for Success/Failure</h3>
              <p className="text-sm text-muted-foreground">
                Let components know if operations succeeded so they can show appropriate feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Hook System →</h3>
              <p className="text-sm text-muted-foreground">Learn about the core useDynamicContracts hook</p>
            </Link>
            <Link href="/docs/examples/multiple" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Multiple Contracts →</h3>
              <p className="text-sm text-muted-foreground">Work with multiple contracts simultaneously</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

