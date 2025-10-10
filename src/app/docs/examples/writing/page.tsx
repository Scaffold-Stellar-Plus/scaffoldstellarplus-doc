'use client'

import Link from 'next/link'
import { 
  CheckCircle2,
  ArrowRight,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

export default function WritingExamplesPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Writing to Contracts</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Learn how to execute state-changing transactions that modify smart contract data.
          </p>
        </header>

        {/* Requirements */}
        <div className="bg-secondary/50 border-l-4 border-foreground/20 p-6 rounded-r">
          <h3 className="font-semibold mb-3 text-foreground">Requirements for Write Operations</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
              <span>Wallet must be connected</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
              <span>User must approve transaction in wallet</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
              <span>Account must have XLM for fees</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
              <span>Network must be accessible</span>
            </li>
          </ul>
        </div>

        {/* Basic Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Basic Write Example</h2>
          <p className="text-muted-foreground">
            Writing requires wallet connection and user approval:
          </p>
          <CodeBlock id="basic-write">
{`'use client'

import { useDynamicContracts } from '@/hooks/useDynamicContracts'
import { useWallet } from '@/hooks/useWallet'
import { useState } from 'react'

export default function IncrementPage() {
  const { callWriteMethod, callReadMethod } = useDynamicContracts()
  const { isConnected, connect } = useWallet()
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchCount = async () => {
    const result = await callReadMethod('increment', 'get_count', {})
    setCount(result)
  }

  const incrementCounter = async () => {
    if (!isConnected) {
      await connect()
      return
    }

    try {
      setLoading(true)
      await callWriteMethod('increment', 'increment', {})
      await fetchCount() // Refresh after write
      alert('Counter incremented!')
    } catch (error) {
      console.error('Failed to increment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1>Increment Counter</h1>
      <div>Count: {count ?? '???'}</div>
      <button onClick={incrementCounter} disabled={loading}>
        {loading ? 'Processing...' : 'Increment'}
      </button>
    </div>
  )
}`}
          </CodeBlock>
        </section>

        {/* Token Transfer */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Token Transfer Example</h2>
          <p className="text-muted-foreground">
            Transferring tokens between addresses:
          </p>
          <CodeBlock id="token-transfer">
{`const { callWriteMethod } = useDynamicContracts()
const { isConnected, publicKey } = useWallet()

if (!isConnected) {
  alert('Please connect wallet first')
  return
}

await callWriteMethod('token', 'transfer', {
  from: publicKey,
  to: recipientAddress,
  amount: 1000
})

alert('Transfer successful!')`}
          </CodeBlock>
        </section>

        {/* Error Handling */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Error Handling</h2>
          <p className="text-muted-foreground">
            Comprehensive error handling for write operations:
          </p>
          <CodeBlock id="error-handling">
{`const { callWriteMethod } = useDynamicContracts()

try {
  await callWriteMethod('increment', 'increment', {})
  alert('Success!')
} catch (error) {
  if (error.message.includes('User rejected')) {
    alert('Transaction was rejected')
  } else if (error.message.includes('Insufficient balance')) {
    alert('Insufficient XLM balance')
  } else {
    alert(\`Error: \${error.message}\`)
  }
}`}
          </CodeBlock>
        </section>

        {/* Best Practices */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Best Practices</h2>
          
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">1. Always check wallet connection</h4>
              <p className="text-sm text-muted-foreground">Verify <code className="px-1.5 py-0.5 bg-muted rounded text-xs">isConnected</code> before writing</p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">2. Show loading states</h4>
              <p className="text-sm text-muted-foreground">Provide feedback during transactions</p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">3. Refresh data after writes</h4>
              <p className="text-sm text-muted-foreground">Update UI with new contract state</p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">4. Handle all error cases</h4>
              <p className="text-sm text-muted-foreground">User rejection, insufficient balance, timeouts</p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/wallets" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Multi-Wallet Support →</h3>
              <p className="text-sm text-muted-foreground">Learn about wallet integration</p>
            </Link>
            <Link href="/docs/troubleshooting" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Troubleshooting →</h3>
              <p className="text-sm text-muted-foreground">Common issues and solutions</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}