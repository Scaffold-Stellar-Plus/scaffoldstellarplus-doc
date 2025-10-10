'use client'

import Link from 'next/link'
import { Code2, Zap } from 'lucide-react'

export default function APIReferencePage() {
  return (
    <div className="max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-border">
          <h1 className="text-4xl font-bold tracking-tight">API Reference</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Complete API documentation for Scaffold Stellar Plus hooks, utilities, and components.
          </p>
        </header>

        {/* useDynamicContracts */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">useDynamicContracts()</h2>
          <p className="text-muted-foreground">
            The main hook for interacting with deployed Soroban contracts.
          </p>

          <div className="bg-muted/50 border border-border p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{`const {
  contracts,
  isLoading,
  error,
  refreshContracts,
  addContract,
  callReadMethod,
  callWriteMethod
} = useDynamicContracts()`}
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Return Values</h3>
            
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">contracts</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">Contract[]</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Array of all deployed contracts with their metadata, methods, and contract IDs.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">isLoading</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">boolean</code>
              </p>
              <p className="text-sm text-muted-foreground">
                True while contracts are being loaded or methods are executing.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">error</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">string | null</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Error message if contract loading or method execution fails.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">refreshContracts()</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">() ={'>'} Promise&lt;void&gt;</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Manually reload all contracts from deployment.json and regenerate metadata.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">addContract(contractId, name)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">(contractId: string, name?: string) ={'>'} Promise&lt;void&gt;</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Dynamically add a contract by its ID without redeployment.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">callReadMethod(contractName, methodName, args)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">(contractName: string, methodName: string, args: Record&lt;string, any&gt;) ={'>'} Promise&lt;any&gt;</code>
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Execute a read-only contract method. Does not require wallet connection or transaction fees.
              </p>
              <div className="bg-muted/30 p-3 rounded text-xs">
                <p className="font-semibold mb-1">Parameters:</p>
                <ul className="space-y-1 ml-4">
                  <li><code>contractName</code> - Name of the contract (directory name)</li>
                  <li><code>methodName</code> - Name of the method to call</li>
                  <li><code>args</code> - Object with parameter names and values</li>
                </ul>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">callWriteMethod(contractName, methodName, args)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">(contractName: string, methodName: string, args: Record&lt;string, any&gt;) ={'>'} Promise&lt;any&gt;</code>
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Execute a write contract method. Requires wallet connection and creates a transaction.
              </p>
              <div className="bg-muted/30 p-3 rounded text-xs">
                <p className="font-semibold mb-1">Parameters:</p>
                <ul className="space-y-1 ml-4">
                  <li><code>contractName</code> - Name of the contract (directory name)</li>
                  <li><code>methodName</code> - Name of the method to call</li>
                  <li><code>args</code> - Object with parameter names and values</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* useWallet */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">useWallet()</h2>
          <p className="text-muted-foreground">
            Hook for managing Stellar wallet connections (Freighter, Albedo, XBull, etc.).
          </p>

          <div className="bg-muted/50 border border-border p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{`const {
  publicKey,
  isConnected,
  connect,
  disconnect
} = useWallet()`}
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Return Values</h3>
            
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">publicKey</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">string | null</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The connected wallet&apos;s public key (Stellar address). Null if not connected.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">isConnected</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">boolean</code>
              </p>
              <p className="text-sm text-muted-foreground">
                True if a wallet is currently connected.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">connect()</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">() ={'>'} Promise&lt;void&gt;</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Open wallet selection modal and connect to chosen wallet.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">disconnect()</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">() ={'>'} void</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Disconnect the currently connected wallet.
              </p>
            </div>
          </div>
        </section>

        {/* Contract Type */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Contract Type</h2>
          <p className="text-muted-foreground">
            TypeScript interface for contract objects returned by <code className="px-1.5 py-0.5 bg-muted rounded text-sm">useDynamicContracts()</code>:
          </p>

          <div className="bg-muted/50 border border-border p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{`interface Contract {
  name: string              // Contract name (e.g., "hello_world")
  contractId: string        // Deployed contract ID
  methods: Method[]         // Array of contract methods
  metadata?: {
    description?: string
    author?: string
    version?: string
  }
}

interface Method {
  name: string              // Method name (e.g., "increment")
  parameters: Parameter[]   // Method parameters
  returnType?: string       // Return type (if known)
  isWrite: boolean          // true if method modifies state
}

interface Parameter {
  name: string              // Parameter name
  type: string              // Parameter type
  optional?: boolean        // Whether parameter is optional
}`}
            </pre>
          </div>
        </section>

        {/* Environment Variables */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Environment Variables</h2>
          <p className="text-muted-foreground">
            Required environment variables in <code className="px-1.5 py-0.5 bg-muted rounded text-sm">frontend/.env.local</code>:
          </p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">NEXT_PUBLIC_STELLAR_NETWORK</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Network to connect to: <code className="px-1 py-0.5 bg-muted rounded text-xs">testnet</code>, <code className="px-1 py-0.5 bg-muted rounded text-xs">futurenet</code>, or <code className="px-1 py-0.5 bg-muted rounded text-xs">standalone</code>
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">NEXT_PUBLIC_STELLAR_RPC_URL</h4>
              <p className="text-sm text-muted-foreground mb-2">
                RPC endpoint URL for the chosen network
              </p>
              <div className="text-xs mt-2">
                <p><strong>Testnet:</strong> <code className="px-1 py-0.5 bg-muted rounded">https://soroban-testnet.stellar.org</code></p>
                <p className="mt-1"><strong>Futurenet:</strong> <code className="px-1 py-0.5 bg-muted rounded">https://rpc-futurenet.stellar.org</code></p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Hook System →</h3>
              <p className="text-sm text-muted-foreground">Learn how to use the hooks in practice</p>
            </Link>
            <Link href="/docs/examples/reading" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Examples →</h3>
              <p className="text-sm text-muted-foreground">See real-world usage examples</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

