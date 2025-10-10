'use client'

import Link from 'next/link'
import { 
  CheckCircle2
} from 'lucide-react'
import { useState } from 'react'

export default function ReadingExamplesPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Reading Contract Data</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Learn how to query smart contract data without wallet connection or transaction fees.
          </p>
        </header>

        {/* Key Points */}
        <div className="bg-secondary/50 border-l-4 border-foreground/20 p-6 rounded-r">
          <h3 className="font-semibold mb-3 text-foreground">Key Takeaways</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
              <span>Read methods don&apos;t require wallet connection</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
              <span>No transaction fees for reads</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
              <span>Results are instant</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
              <span>Use Promise.all() for parallel reads</span>
            </li>
          </ul>
        </div>

        {/* Basic Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Basic Read Example</h2>
          <p className="text-muted-foreground">
            Reading data is simple and requires no wallet connection:
          </p>
          <CodeBlock id="basic-read">
{`'use client'

import { useDynamicContracts } from '@/hooks/useDynamicContracts'
import { useState } from 'react'

export default function Dashboard() {
  const { callReadMethod } = useDynamicContracts()
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchCount = async () => {
    try {
      setLoading(true)
      const result = await callReadMethod(
        'increment',     // Contract name
        'get_count',     // Method name
        {}               // Arguments (empty)
      )
      setCount(result)
    } catch (error) {
      console.error('Failed to fetch count:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1>Counter Dashboard</h1>
      <div>Count: {count ?? '???'}</div>
      <button onClick={fetchCount} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Count'}
      </button>
    </div>
  )
}`}
          </CodeBlock>
        </section>

        {/* With Parameters */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Read with Parameters</h2>
          <p className="text-muted-foreground">
            Passing parameters to read methods:
          </p>
          <CodeBlock id="read-params">
{`const { callReadMethod } = useDynamicContracts()

// With parameters
const greeting = await callReadMethod('hello_world', 'greet', { 
  to: 'World' 
})

// Token balance
const balance = await callReadMethod('token', 'balance', { 
  address: 'GCDA...' 
})`}
          </CodeBlock>
        </section>

        {/* Multiple Contracts */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Multiple Contracts</h2>
          <p className="text-muted-foreground">
            Reading from multiple contracts simultaneously:
          </p>
          <CodeBlock id="multiple-contracts">
{`const { callReadMethod } = useDynamicContracts()

// Fetch from multiple contracts in parallel
const [greeting, count, tokenName] = await Promise.all([
  callReadMethod('hello_world', 'hello', {}),
  callReadMethod('increment', 'get_count', {}),
  callReadMethod('token', 'name', {})
])`}
          </CodeBlock>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/examples/writing" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Writing to Contracts →</h3>
              <p className="text-sm text-muted-foreground">Learn how to execute state-changing transactions</p>
            </Link>
            <Link href="/docs/hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Hook System Reference →</h3>
              <p className="text-sm text-muted-foreground">Complete API documentation</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}