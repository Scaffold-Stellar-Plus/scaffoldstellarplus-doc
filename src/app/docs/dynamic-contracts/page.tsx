'use client'

import Link from 'next/link'
import { 
  CheckCircle2,
  Eye,
  Edit
} from 'lucide-react'
import { useState } from 'react'

export default function DynamicContractsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Dynamic Contract System</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Dynamic Contract System is the core of Scaffold Stellar Plus. It automatically detects, analyzes, and integrates any Soroban smart contract without requiring manual configuration.
          </p>
        </header>

        {/* What Makes It Dynamic */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">What Makes It Dynamic?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Unlike traditional blockchain development frameworks that require extensive manual setup, Scaffold Stellar Plus intelligently adapts to your contracts. When you deploy a new contract, the system:
          </p>

          <ol className="space-y-3 text-muted-foreground ml-6">
            <li className="flex items-start gap-3">
              <span className="font-semibold text-foreground">1.</span>
              <span><strong>Scans</strong> your contract&apos;s TypeScript bindings</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-foreground">2.</span>
              <span><strong>Analyzes</strong> method signatures and types</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-foreground">3.</span>
              <span><strong>Classifies</strong> read vs. write operations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-foreground">4.</span>
              <span><strong>Generates</strong> interactive UI components</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-foreground">5.</span>
              <span><strong>Updates</strong> the frontend in real-time</span>
            </li>
          </ol>

          <div className="bg-muted/30 border-l-4 border-primary p-6 rounded-r">
            <p className="text-base">
              <strong>The result:</strong> Zero configuration, maximum productivity.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Automatic Method Discovery</h3>
              <p className="text-muted-foreground mb-4">
                When you deploy a contract, the system automatically scans the generated TypeScript bindings to extract all available methods:
              </p>
              <CodeBlock id="method-discovery">
{`{
  contractName: "increment",
  address: "CDABCD1234...",
  network: "testnet",
  methods: [
    { 
      name: "increment", 
      type: "write",
      parameters: [],
      returns: "u32"
    },
    { 
      name: "get_count", 
      type: "read",
      parameters: [],
      returns: "u32"
    }
  ]
}`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Intelligent Method Classification</h3>
              <p className="text-muted-foreground mb-4">
                The system automatically determines whether each method is a read or write operation:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Read Method Indicators</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span>Methods that only query state</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span>Functions with return values but no state changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span>Getter methods (get_, read_, fetch_)</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Edit className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Write Method Indicators</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span>Methods that modify contract state</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span>Functions that require wallet signatures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span>State-changing functions (set_, update_, transfer_)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Zero Configuration */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Zero Configuration</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Traditional Approach</h4>
              <CodeBlock id="traditional">
{`// ❌ Manual configuration required
const config = {
  contracts: {
    increment: {
      address: "CDABCD...",
      methods: {
        increment: { type: "write", params: [] },
        get_count: { type: "read", params: [] }
      }
    }
  }
}`}
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Scaffold Stellar Plus Approach</h4>
              <CodeBlock id="scaffold-approach">
{`// ✅ Zero configuration - auto-detected!
const { callReadMethod, callWriteMethod } = useDynamicContracts()

// Just use it
await callReadMethod('increment', 'get_count', {})
await callWriteMethod('increment', 'increment', {})`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Benefits</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">For Developers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Faster development with no time wasted on configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Fewer errors with type-safe auto-generated code</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Easier testing - add contracts and test immediately</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">For Users</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Consistent UI across all contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Better UX with proper validation and error handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Real-time updates - always in sync with deployed contracts</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Unified Hook System →</h3>
              <p className="text-sm text-muted-foreground">Learn about the hook API</p>
            </Link>
            <Link href="/docs/examples/reading" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Examples →</h3>
              <p className="text-sm text-muted-foreground">See the system in action</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}