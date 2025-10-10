'use client'

import Link from 'next/link'
import { CheckCircle2, Terminal, FileCode } from 'lucide-react'
import { useState } from 'react'

export default function AddingContractsPage() {
  const [copiedCommands, setCopiedCommands] = useState<Record<string, boolean>>({})

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommands(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setCopiedCommands(prev => ({ ...prev, [id]: false }))
    }, 2000)
  }

  const CodeBlock = ({ children, id }: { children: string; id: string; language?: string }) => (
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
          <h1 className="text-4xl font-bold tracking-tight">Adding New Contracts</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Learn how to create, implement, and deploy new Soroban smart contracts with Scaffold Stellar Plus. The framework automatically detects and integrates your contracts into the UI.
          </p>
        </header>

        {/* Quick Overview */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Quick Overview</h2>
          <p className="text-muted-foreground">
            Adding a new contract is a simple 3-step process:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">1. Create</h3>
              </div>
              <p className="text-sm text-muted-foreground">Use CLI to scaffold contract structure</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <FileCode className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">2. Implement</h3>
              </div>
              <p className="text-sm text-muted-foreground">Write your contract logic in Rust</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">3. Deploy</h3>
              </div>
              <p className="text-sm text-muted-foreground">Deploy and auto-generate UI</p>
            </div>
          </div>
        </section>

        {/* Step 1: Create Contract */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Step 1: Create a New Contract</h2>
          <p className="text-muted-foreground">
            Use the <code className="px-1.5 py-0.5 bg-muted rounded text-sm">initcontract</code> command to create a new contract with boilerplate code:
          </p>
          <CodeBlock id="init-contract">
{`yarn initcontract my_counter`}
          </CodeBlock>
          <p className="text-muted-foreground">
            This creates the following structure:
          </p>
          <CodeBlock id="structure">
{`contracts/my_counter/
├── src/
│   ├── lib.rs      # Contract implementation
│   └── test.rs     # Unit tests
└── Cargo.toml      # Dependencies`}
          </CodeBlock>
        </section>

        {/* Step 2: Implement Contract */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Step 2: Implement Your Contract</h2>
          <p className="text-muted-foreground">
            Edit <code className="px-1.5 py-0.5 bg-muted rounded text-sm">contracts/my_counter/src/lib.rs</code> to implement your contract logic:
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Example: Counter Contract</h3>
            <CodeBlock id="contract-impl" language="rust">
{`#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct MyCounter;

#[contractimpl]
impl MyCounter {
    /// Increment the counter by 1
    pub fn increment(env: Env) -> u32 {
        let mut count: u32 = env.storage()
            .instance()
            .get(&"count")
            .unwrap_or(0);
        count += 1;
        env.storage().instance().set(&"count", &count);
        count
    }

    /// Get the current count (read-only)
    pub fn get_count(env: Env) -> u32 {
        env.storage().instance().get(&"count").unwrap_or(0)
    }

    /// Reset the counter to 0
    pub fn reset(env: Env) -> u32 {
        env.storage().instance().set(&"count", &0);
        0
    }
}`}
            </CodeBlock>
          </div>

          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r">
            <p className="text-sm text-foreground">
              <strong>Tip:</strong> Follow Soroban best practices for contract development. Check the <a href="https://soroban.stellar.org/docs" target="_blank" rel="noopener noreferrer" className="underline">official Soroban documentation</a> for more details.
            </p>
          </div>
        </section>

        {/* Step 3: Build and Test */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Step 3: Build and Test (Optional)</h2>
          <p className="text-muted-foreground">
            Before deploying, you can build and test your contract locally:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Build the contract:</h3>
              <CodeBlock id="build">
{`yarn build:contracts`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                This compiles all contracts to WASM format.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Run tests:</h3>
              <CodeBlock id="test">
{`yarn test:contracts`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                This runs all Rust unit tests defined in your contract.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: Deploy */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Step 4: Deploy to Testnet</h2>
          <p className="text-muted-foreground">
            Deploy your contract and automatically generate all necessary bindings:
          </p>
          <CodeBlock id="deploy">
{`yarn deploy:testnet`}
          </CodeBlock>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              This command automatically:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Builds the contract to WASM if not already built</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Deploys to Stellar testnet</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Generates TypeScript bindings for type-safe interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Updates the contract import map</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Generates metadata for automatic UI generation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Updates deployment.json with contract addresses</span>
              </li>
            </ul>
          </div>

          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r">
            <p className="text-sm text-foreground">
              <strong>Success!</strong> Your contract is now live on testnet. The frontend will automatically detect it and generate UI components for all contract methods.
            </p>
          </div>
        </section>

        {/* Automatic UI Generation */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Automatic UI Generation</h2>
          <p className="text-muted-foreground">
            After deployment, Scaffold Stellar Plus automatically creates:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">📄 Contract Interface</h3>
              <p className="text-sm text-muted-foreground">
                Tabbed interface with Read/Write sections based on method types
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">📝 Input Forms</h3>
              <p className="text-sm text-muted-foreground">
                Auto-generated forms with validation for each method parameter
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔍 Type Detection</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent detection of parameter types (string, number, address, etc.)
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">✅ Transaction Handling</h3>
              <p className="text-sm text-muted-foreground">
                Automatic wallet integration, signing, and transaction feedback
              </p>
            </div>
          </div>
        </section>

        {/* Removing Contracts */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Removing a Contract</h2>
          <p className="text-muted-foreground">
            To remove a contract from your project:
          </p>
          <CodeBlock id="remove">
{`yarn removecontract my_counter`}
          </CodeBlock>
          <p className="text-muted-foreground">
            This automatically:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground ml-6">
            <li>• Deletes the contract directory</li>
            <li>• Updates the Cargo workspace</li>
            <li>• Removes generated bindings and packages</li>
            <li>• Cleans up metadata and import maps</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Best Practices</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">📝 Method Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Add doc comments to your contract methods - they&apos;ll appear as tooltips in the UI.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">🧪 Write Tests</h3>
              <p className="text-sm text-muted-foreground">
                Include comprehensive unit tests in your contract to catch bugs early.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">🔄 Redeploy Often</h3>
              <p className="text-sm text-muted-foreground">
                During development, redeploy frequently to test changes. The UI updates automatically.
              </p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-muted/30">
              <h3 className="font-semibold mb-2">📦 Use Clear Naming</h3>
              <p className="text-sm text-muted-foreground">
                Choose descriptive contract and method names - they&apos;re used throughout the UI.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/deployment" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Deployment →</h3>
              <p className="text-sm text-muted-foreground">Learn about deploying to different networks</p>
            </Link>
            <Link href="/docs/hooks" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Using Hooks →</h3>
              <p className="text-sm text-muted-foreground">Interact with your contracts programmatically</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

