'use client'

import Link from 'next/link'
import { 
  CheckCircle2,
  ArrowRight,
  Code2,
  Eye,
  Edit,
  Wallet
} from 'lucide-react'
import { useState } from 'react'

export default function HooksPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Unified Hook System</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Scaffold Stellar Plus provides powerful React hooks that work with any Soroban contract, eliminating the need for contract-specific hook implementations.
          </p>
        </header>

        {/* useDynamicContracts Hook */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">The useDynamicContracts Hook</h2>
          <p className="text-muted-foreground">
            This is your main entry point for all contract interactions.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Import</h3>
            <CodeBlock id="import-dynamic">
{`import { useDynamicContracts } from '@/hooks/useDynamicContracts'`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Return Values</h3>
            <CodeBlock id="return-values">
{`const {
  contracts,           // Array of all deployed contracts
  isLoading,          // Loading state
  error,              // Error message (if any)
  refreshContracts,   // Function to reload contracts
  addContract,        // Function to add contract by ID
  callReadMethod,     // Execute read operations
  callWriteMethod     // Execute write operations
} = useDynamicContracts()`}
            </CodeBlock>
          </div>
        </section>

        {/* callReadMethod */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">callReadMethod</h2>
          <p className="text-muted-foreground">
            Execute read-only queries that don&apos;t modify blockchain state.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Signature</h3>
            <CodeBlock id="read-signature">
{`async function callReadMethod(
  contractName: string,
  methodName: string,
  args: Record<string, any>
): Promise<any>`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>No wallet connection required</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>No transaction fees</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Instant results</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Works offline with RPC node</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Example</h3>
            <CodeBlock id="read-example">
{`const { callReadMethod } = useDynamicContracts()

// Simple query
const count = await callReadMethod('increment', 'get_count', {})

// With parameters
const greeting = await callReadMethod('hello_world', 'greet', { 
  to: 'World' 
})

// Token balance
const balance = await callReadMethod('token', 'balance', { 
  address: 'GCDA...' 
})`}
            </CodeBlock>
          </div>
        </section>

        {/* callWriteMethod */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">callWriteMethod</h2>
          <p className="text-muted-foreground">
            Execute state-changing transactions that require wallet signatures.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Signature</h3>
            <CodeBlock id="write-signature">
{`async function callWriteMethod(
  contractName: string,
  methodName: string,
  args: Record<string, any>
): Promise<any>`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Automatic wallet connection check</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Transaction signing via wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Network fee handling</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Transaction hash returned</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Example</h3>
            <CodeBlock id="write-example">
{`const { callWriteMethod } = useDynamicContracts()
const { isConnected } = useWallet()

if (!isConnected) {
  alert('Please connect wallet first')
  return
}

// Simple write
await callWriteMethod('increment', 'increment', {})

// With parameters
await callWriteMethod('token', 'transfer', {
  from: userAddress,
  to: recipientAddress,
  amount: 1000
})`}
            </CodeBlock>
          </div>
        </section>

        {/* useWallet Hook */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">The useWallet Hook</h2>
          <p className="text-muted-foreground">
            Manage wallet connections and user authentication.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Import</h3>
            <CodeBlock id="import-wallet">
{`import { useWallet } from '@/hooks/useWallet'`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Return Values</h3>
            <CodeBlock id="wallet-return">
{`const {
  connect,      // Connect to wallet
  disconnect,   // Disconnect wallet
  publicKey,    // User's public key
  isConnected   // Connection status
} = useWallet()`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Example</h3>
            <CodeBlock id="wallet-example">
{`function WalletButton() {
  const { connect, disconnect, isConnected, publicKey } = useWallet()

  if (isConnected) {
    return (
      <div>
        <p>Connected: {publicKey.slice(0, 4)}...{publicKey.slice(-4)}</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  }

  return <button onClick={connect}>Connect Wallet</button>
}`}
            </CodeBlock>
          </div>
        </section>

        {/* Best Practices */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Best Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">1. Use Loading States</h4>
              <CodeBlock id="loading-states">
{`const [loading, setLoading] = useState(false)

async function handleAction() {
  setLoading(true)
  try {
    await callWriteMethod('contract', 'method', {})
  } finally {
    setLoading(false)
  }
}

return <button disabled={loading}>
  {loading ? 'Processing...' : 'Execute'}
</button>`}
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-semibold mb-3">2. Refresh After Writes</h4>
              <CodeBlock id="refresh-after">
{`async function incrementAndRefresh() {
  await callWriteMethod('increment', 'increment', {})
  
  // Refresh the count
  const newCount = await callReadMethod('increment', 'get_count', {})
  setCount(newCount)
}`}
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-semibold mb-3">3. Batch Reads for Performance</h4>
              <CodeBlock id="batch-reads">
{`// ✅ Good: Parallel reads
const [count, balance, name] = await Promise.all([
  callReadMethod('increment', 'get_count', {}),
  callReadMethod('token', 'balance', { address }),
  callReadMethod('token', 'name', {})
])

// ❌ Avoid: Sequential reads
const count = await callReadMethod('increment', 'get_count', {})
const balance = await callReadMethod('token', 'balance', { address })
const name = await callReadMethod('token', 'name', {})`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/examples/reading" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Reading Examples →</h3>
              <p className="text-sm text-muted-foreground">See practical examples of reading contract data</p>
            </Link>
            <Link href="/docs/examples/writing" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Writing Examples →</h3>
              <p className="text-sm text-muted-foreground">Learn how to modify contract state</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}