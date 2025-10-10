'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function MultipleContractsPage() {
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
        <header className="space-y-4 pb-8 border-b border-border">
          <h1 className="text-4xl font-bold tracking-tight">Working with Multiple Contracts</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Learn how to interact with multiple smart contracts simultaneously in a single application using Scaffold Stellar Plus&apos;s unified hook system.
          </p>
        </header>

        {/* Overview */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            One of the key advantages of Scaffold Stellar Plus is that a single <code className="px-1.5 py-0.5 bg-muted rounded text-sm">useDynamicContracts()</code> hook instance can interact with any number of deployed contracts. You don&apos;t need separate hooks for each contract.
          </p>
        </section>

        {/* Example: Dashboard with Multiple Contracts */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Example: Multi-Contract Dashboard</h2>
          <p className="text-muted-foreground">
            Here&apos;s an example that fetches and displays data from three different contracts:
          </p>
          <CodeBlock id="multiple-contracts">
{`// pages/dashboard.tsx
'use client'

import { useDynamicContracts } from '@/hooks/useDynamicContracts'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { contracts, callReadMethod, isLoading } = useDynamicContracts()
  const [data, setData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllData = async () => {
      if (isLoading || contracts.length === 0) return
      
      try {
        setLoading(true)
        const results: Record<string, any> = {}

        // Fetch from hello_world contract
        try {
          results.greeting = await callReadMethod('hello_world', 'hello', {})
        } catch (e) {
          console.error('Failed to fetch greeting:', e)
          results.greeting = 'Error'
        }

        // Fetch from increment contract
        try {
          results.count = await callReadMethod('increment', 'get_count', {})
        } catch (e) {
          console.error('Failed to fetch count:', e)
          results.count = 0
        }

        // Fetch from token contract
        try {
          results.tokenName = await callReadMethod('token', 'name', {})
          results.tokenSymbol = await callReadMethod('token', 'symbol', {})
        } catch (e) {
          console.error('Failed to fetch token info:', e)
          results.tokenName = 'Error'
          results.tokenSymbol = 'Error'
        }

        setData(results)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [contracts, isLoading, callReadMethod])

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Contract Dashboard</h1>
        <p className="text-muted-foreground">Loading contract data...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contract Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hello World Card */}
        <div className="p-6 bg-secondary/50 border border-border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Hello World</h2>
          <p className="text-3xl font-bold text-foreground">
            {data.greeting || 'Loading...'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Greeting from contract
          </p>
        </div>

        {/* Counter Card */}
        <div className="p-6 bg-secondary/50 border border-border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Counter</h2>
          <p className="text-3xl font-bold text-foreground">
            {data.count ?? 'Loading...'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Current count value
          </p>
        </div>

        {/* Token Card */}
        <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Token</h2>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {data.tokenSymbol || 'Loading...'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {data.tokenName || 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  )
}`}
          </CodeBlock>
        </section>

        {/* Key Concepts */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Key Concepts</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">🔄 Single Hook Instance</h3>
              <p className="text-sm text-muted-foreground">
                You only need one <code className="px-1.5 py-0.5 bg-muted rounded text-xs">useDynamicContracts()</code> call to work with all contracts.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">📝 Contract Names</h3>
              <p className="text-sm text-muted-foreground">
                Contracts are identified by their directory name in <code className="px-1.5 py-0.5 bg-muted rounded text-xs">contracts/</code>.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">⚡ Parallel or Sequential</h3>
              <p className="text-sm text-muted-foreground">
                You can call methods sequentially (with await) or in parallel (with Promise.all).
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">🛡️ Error Handling</h3>
              <p className="text-sm text-muted-foreground">
                Handle errors for each contract independently to prevent one failure from breaking the entire UI.
              </p>
            </div>
          </div>
        </section>

        {/* Parallel Calls */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Parallel Contract Calls</h2>
          <p className="text-muted-foreground">
            For better performance, you can fetch data from multiple contracts in parallel using <code className="px-1.5 py-0.5 bg-muted rounded text-sm">Promise.all()</code>:
          </p>
          <CodeBlock id="parallel-calls">
{`const fetchDataInParallel = async () => {
  try {
    const [greeting, count, tokenName] = await Promise.all([
      callReadMethod('hello_world', 'hello', {}),
      callReadMethod('increment', 'get_count', {}),
      callReadMethod('token', 'name', {})
    ])

    setData({
      greeting,
      count,
      tokenName
    })
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}`}
          </CodeBlock>
          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r">
            <p className="text-sm text-foreground">
              <strong>Note:</strong> Parallel calls are faster but if one fails, all fail. Use <code className="px-1.5 py-0.5 bg-muted rounded text-xs">Promise.allSettled()</code> if you want to handle failures independently.
            </p>
          </div>
        </section>

        {/* Contract-to-Contract Interactions */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Contract-to-Contract Interactions</h2>
          <p className="text-muted-foreground">
            You can orchestrate interactions between multiple contracts:
          </p>
          <CodeBlock id="contract-interactions">
{`const transferAndUpdate = async () => {
  try {
    // First, transfer tokens
    await callWriteMethod('token', 'transfer', {
      from: userAddress,
      to: recipientAddress,
      amount: 1000
    })

    // Then, update a counter to track transfers
    await callWriteMethod('increment', 'increment', {})

    console.log('Transfer completed and counter updated!')
  } catch (error) {
    console.error('Operation failed:', error)
  }
}`}
          </CodeBlock>
        </section>

        {/* Listing All Contracts */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Listing All Available Contracts</h2>
          <p className="text-muted-foreground">
            The <code className="px-1.5 py-0.5 bg-muted rounded text-sm">contracts</code> array from <code className="px-1.5 py-0.5 bg-muted rounded text-sm">useDynamicContracts()</code> contains all deployed contracts:
          </p>
          <CodeBlock id="list-contracts">
{`const { contracts } = useDynamicContracts()

return (
  <div>
    <h2>Available Contracts</h2>
    <ul>
      {contracts.map(contract => (
        <li key={contract.name}>
          <strong>{contract.name}</strong>
          <p>Methods: {contract.methods.length}</p>
          <p>Contract ID: {contract.contractId}</p>
        </li>
      ))}
    </ul>
  </div>
)`}
          </CodeBlock>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/examples/custom-hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Custom Hooks →</h3>
              <p className="text-sm text-muted-foreground">Build reusable hooks for specific contracts</p>
            </Link>
            <Link href="/docs/hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Hook System →</h3>
              <p className="text-sm text-muted-foreground">Learn more about the unified hook architecture</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

