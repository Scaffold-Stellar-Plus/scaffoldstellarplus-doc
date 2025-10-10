'use client'

import Link from 'next/link'
import { 
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'

export default function WalletsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Multi-Wallet Support</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Scaffold Stellar Plus provides seamless integration with all major Stellar wallets through a unified API.
          </p>
        </header>

        {/* Supported Wallets */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Supported Wallets</h2>
          
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold">Freighter</h3>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">Recommended</span>
              </div>
              <p className="text-muted-foreground mb-3">
                The most popular Stellar wallet with the best user experience.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Platform:</strong> Chrome, Firefox, Edge, Brave</p>
                <p><strong>Features:</strong> Full Soroban support, hardware wallet integration</p>
                <a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  Visit Website <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Albedo</h3>
              <p className="text-muted-foreground mb-3">
                Web-based wallet with no extension required.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Platform:</strong> Any browser</p>
                <p><strong>Features:</strong> Portable, no installation needed</p>
                <a href="https://albedo.link/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  Visit Website <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">XBull</h3>
              <p className="text-muted-foreground mb-3">
                Feature-rich wallet with advanced capabilities.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Platform:</strong> Chrome, Firefox</p>
                <p><strong>Features:</strong> Multi-account, DEX integration</p>
                <a href="https://xbull.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  Visit Website <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Rabet</h3>
              <p className="text-muted-foreground mb-3">
                Simple and secure wallet.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Platform:</strong> Chrome, Firefox</p>
                <p><strong>Features:</strong> Clean UI, easy to use</p>
                <a href="https://rabet.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  Visit Website <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Using the Wallet Hook */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Using the Wallet Hook</h2>

          <div>
            <h3 className="text-lg font-semibold mb-3">Basic Usage</h3>
            <CodeBlock id="basic-usage">
{`import { useWallet } from '@/hooks/useWallet'

function WalletConnection() {
  const { connect, disconnect, isConnected, publicKey } = useWallet()

  if (isConnected) {
    return (
      <div>
        <p>Connected: {publicKey}</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  }

  return <button onClick={connect}>Connect Wallet</button>
}`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">With Transaction</h3>
            <CodeBlock id="with-transaction">
{`import { useWallet } from '@/hooks/useWallet'
import { useDynamicContracts } from '@/hooks/useDynamicContracts'

function TransactionButton() {
  const { isConnected, connect } = useWallet()
  const { callWriteMethod } = useDynamicContracts()

  async function handleTransaction() {
    if (!isConnected) {
      await connect()
      return
    }

    try {
      await callWriteMethod('increment', 'increment', {})
      alert('Transaction successful!')
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  return (
    <button onClick={handleTransaction}>
      {isConnected ? 'Execute' : 'Connect & Execute'}
    </button>
  )
}`}
            </CodeBlock>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Security Best Practices</h2>

          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-6 rounded-r">
            <h4 className="font-semibold mb-3 text-foreground">Never Request Secret Keys</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Always ask the wallet to sign transactions. Never ask users for their secret keys.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">✅ Good Practice:</p>
                <CodeBlock id="good-practice">
{`await callWriteMethod('contract', 'method', {})`}
                </CodeBlock>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">❌ Bad Practice:</p>
                <CodeBlock id="bad-practice">
{`// NEVER DO THIS!
const secretKey = prompt('Enter your secret key')`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Contract Hooks →</h3>
              <p className="text-sm text-muted-foreground">Learn about the unified hook system</p>
            </Link>
            <Link href="/docs/examples/writing" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Transaction Examples →</h3>
              <p className="text-sm text-muted-foreground">See wallet integration in action</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}