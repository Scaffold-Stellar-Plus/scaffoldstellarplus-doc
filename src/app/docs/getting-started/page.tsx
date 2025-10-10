'use client'

import Link from 'next/link'
import { 
  CheckCircle2
} from 'lucide-react'
import { useState } from 'react'

export default function GettingStartedPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Quick Start</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get started with Scaffold Stellar Plus by building your first smart contract interaction. This guide will have you up and running in under 10 minutes.
          </p>
        </header>

        {/* Prerequisites */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Prerequisites</h2>
          <p className="text-muted-foreground">
            Before you begin, ensure you have the following installed:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-6">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
              <span><strong>Rust Toolchain</strong> with <code className="px-1.5 py-0.5 bg-muted rounded text-xs">wasm32v1-none</code> target</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
              <span><strong>Stellar CLI</strong> (latest version)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
              <span><strong>Node.js 18+</strong> and <strong>Yarn</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
              <span><strong>Freighter Wallet</strong> browser extension</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            For detailed installation instructions, see the <Link href="/docs/installation" className="text-primary hover:underline">Installation Guide</Link>.
          </p>
        </section>

        {/* Setup Steps */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Initial Setup</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Clone the Repository</h3>
              <CodeBlock id="clone-repo">
{`git clone https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus.git
cd scaffoldstellarplus`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. Install Dependencies</h3>
              <CodeBlock id="install-deps">
{`yarn`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                This installs all necessary packages for the project.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3. Run Setup Script</h3>
              <CodeBlock id="run-setup">
{`yarn setup`}
              </CodeBlock>
              <p className="text-muted-foreground mt-2">
                This one command automatically:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground ml-6 mt-2">
                <li>• Installs all dependencies (root, contracts, frontend)</li>
                <li>• Creates Stellar identities for testnet/futurenet</li>
                <li>• Builds all contracts to WASM</li>
                <li>• Prepares the development environment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Deploy Contracts to Testnet</h3>
              <CodeBlock id="deploy-testnet">
{`yarn deploy:testnet`}
              </CodeBlock>
              <p className="text-muted-foreground mt-2">
                This command:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground ml-6 mt-2">
                <li>• Deploys all contracts in the <code className="px-1.5 py-0.5 bg-muted rounded text-xs">contracts/</code> directory</li>
                <li>• Generates TypeScript bindings automatically</li>
                <li>• Creates contract import map</li>
                <li>• Generates metadata for dynamic UI</li>
              </ul>
              <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r mt-4">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> This process may take a few minutes on first run as it compiles contracts and generates bindings.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5. Start the Development Server</h3>
              <CodeBlock id="start-server">
{`yarn dev`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://localhost:3000</a> in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* Your First Contract Interaction */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Your First Contract Interaction</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Connect Your Wallet</h3>
              <ol className="space-y-2 text-muted-foreground ml-6">
                <li>Click &quot;Connect Wallet&quot; in the top-right corner</li>
                <li>Select Freighter from the wallet options</li>
                <li>Approve the connection in the Freighter popup</li>
                <li>Verify connection - you should see your wallet address</li>
              </ol>
              <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r mt-4">
                <p className="text-sm text-foreground">
                  <strong>Tip:</strong> Make sure you&apos;re on the testnet network in Freighter. You can switch networks in the Freighter settings.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. Explore Example Contracts</h3>
              <p className="text-muted-foreground mb-4">
                Scaffold Stellar Plus comes with three example contracts:
              </p>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Hello World Contract</h4>
                  <p className="text-sm text-muted-foreground mb-2">Simple greeting functionality</p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Methods:</strong> <code className="px-1.5 py-0.5 bg-muted rounded">hello()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">greet()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">version()</code>
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Increment Contract</h4>
                  <p className="text-sm text-muted-foreground mb-2">Counter with increment/decrement operations</p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Methods:</strong> <code className="px-1.5 py-0.5 bg-muted rounded">increment()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">decrement()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">reset()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">get_count()</code>
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Token Contract</h4>
                  <p className="text-sm text-muted-foreground mb-2">Full-featured token implementation</p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Methods:</strong> <code className="px-1.5 py-0.5 bg-muted rounded">mint()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">transfer()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">balance()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">name()</code>, <code className="px-1.5 py-0.5 bg-muted rounded">symbol()</code>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3. Read Contract Data</h3>
              <p className="text-muted-foreground mb-3">
                Let&apos;s try reading data from the increment contract:
              </p>
              <ol className="space-y-2 text-muted-foreground ml-6">
                <li>Select &quot;increment&quot; from the contract dropdown</li>
                <li>Switch to &quot;Read Contract&quot; tab</li>
                <li>Click on <code className="px-1.5 py-0.5 bg-muted rounded text-xs">get_count</code> method</li>
                <li>Click &quot;Execute&quot; to call the method</li>
              </ol>
              <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r mt-4">
                <p className="text-sm text-foreground">
                  <strong>Result:</strong> The method is called without any transaction fees, and you receive the current count value instantly.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Write to Contract</h3>
              <p className="text-muted-foreground mb-3">
                Now let&apos;s modify the contract state:
              </p>
              <ol className="space-y-2 text-muted-foreground ml-6">
                <li>Switch to &quot;Write Contract&quot; tab</li>
                <li>Click on <code className="px-1.5 py-0.5 bg-muted rounded text-xs">increment</code> method</li>
                <li>Click &quot;Execute&quot; to call the method</li>
                <li>Approve the transaction in Freighter</li>
                <li>Wait for confirmation</li>
              </ol>
              <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r mt-4">
                <p className="text-sm text-foreground">
                  <strong>Result:</strong> A transaction is created and signed, the contract state is modified, and the UI shows the transaction hash.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Adding Your First Contract */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Adding Your First Contract</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Create a new contract</h3>
              <CodeBlock id="init-contract">
{`yarn initcontract my_counter`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                This creates the contract structure in <code className="px-1.5 py-0.5 bg-muted rounded text-xs">contracts/my_counter/</code>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Implement the contract</h3>
              <p className="text-muted-foreground mb-3">
                Edit <code className="px-1.5 py-0.5 bg-muted rounded text-xs">contracts/my_counter/src/lib.rs</code>:
              </p>
              <CodeBlock id="contract-code">
{`#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct MyCounter;

#[contractimpl]
impl MyCounter {
    pub fn increment(env: Env) -> u32 {
        let mut count: u32 = env.storage()
            .instance()
            .get(&"count")
            .unwrap_or(0);
        count += 1;
        env.storage().instance().set(&"count", &count);
        count
    }

    pub fn get_count(env: Env) -> u32 {
        env.storage().instance().get(&"count").unwrap_or(0)
    }
}`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Deploy the contract</h3>
              <CodeBlock id="deploy-contract">
{`yarn deploy:testnet`}
              </CodeBlock>
              <p className="text-muted-foreground mt-2">
                The frontend <strong>automatically detects</strong> your new contract and generates UI components. No manual configuration needed!
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/dynamic-contracts" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Dynamic Contract System →</h3>
              <p className="text-sm text-muted-foreground">Learn how automatic detection works</p>
            </Link>
            <Link href="/docs/hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Hook System →</h3>
              <p className="text-sm text-muted-foreground">Master the callReadMethod and callWriteMethod APIs</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}