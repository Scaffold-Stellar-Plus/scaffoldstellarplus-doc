'use client'

import Link from 'next/link'
import { 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'

export default function InstallationPage() {
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
        className="absolute right-2 top-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded opacity-0 group-hover:opacity-100 transition-opacity"
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
          <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get Scaffold Stellar Plus up and running on your development machine. This guide will walk you through installing prerequisites, setting up the project, and deploying your first contracts.
          </p>
        </header>

        {/* Prerequisites */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Prerequisites</h2>
          <p className="text-muted-foreground">
            Before you begin, ensure you have the following tools installed on your system:
          </p>

          {/* Rust */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">1. Rust Toolchain</h3>
            <p className="text-muted-foreground">
              Scaffold Stellar Plus uses Rust for smart contract development. Install Rust with the WASM target:
            </p>
            <CodeBlock id="rust-install">
{`# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add WASM target for Soroban contracts
rustup target add wasm32v1-none

# Verify installation
rustc --version`}
              </CodeBlock>
            <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r">
              <p className="text-sm text-foreground">
                <strong>Note:</strong> Soroban smart contracts are compiled to WebAssembly (WASM) for execution on the Stellar network.
                </p>
              </div>
            </div>

            {/* Stellar CLI */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">2. Stellar CLI</h3>
            <p className="text-muted-foreground">
              The Stellar CLI is essential for deploying and managing smart contracts:
            </p>
            <CodeBlock id="stellar-cli">
{`# Install Stellar CLI 
cargo install --locked stellar-cli@23.1.4

# Verify installation
stellar --version`}
              </CodeBlock>
            </div>

            {/* Node.js & Yarn */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">3. Node.js & Yarn</h3>
            <p className="text-muted-foreground">
              For frontend development and package management:
            </p>
            <CodeBlock id="node-yarn">
{`# Install Node.js 18+ from https://nodejs.org/
# Then install Yarn globally
npm install -g yarn

# Verify installations
node --version
yarn --version`}
              </CodeBlock>
            <p className="text-sm text-muted-foreground">
              <strong>Requirements:</strong> Node.js 18.0.0 or higher, Yarn 1.22.0 or higher
            </p>
            </div>

            {/* Freighter Wallet */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">4. Stellar Wallet (Freighter)</h3>
            <p className="text-muted-foreground">
              Install the Freighter browser extension for wallet interactions:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://chrome.google.com/webstore/detail/freighter/bcacfldlkkdogcmkkibnjlaoficiaabh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  Chrome Web Store <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://addons.mozilla.org/en-US/firefox/addon/freighter/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  Firefox Add-ons <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
        </div>
      </section>

        {/* Installation Steps */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Installation Steps</h2>
        
        <div className="space-y-8">
            {/* Step 1 */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Step 1: Create Your Project</h3>
              <CodeBlock id="create-project">
{`npx create-scaffoldstellarplus my-stellar-dapp
cd my-stellar-dapp`}
            </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                Replace <code className="px-1.5 py-0.5 bg-muted rounded text-xs">my-stellar-dapp</code> with your desired project name. This command creates a new project with all the necessary files and structure.
              </p>
          </div>

            {/* Step 2 */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Step 2: Install Dependencies</h3>
              <CodeBlock id="install-deps">
{`yarn install`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground">
                This installs all dependencies for the root, contracts, and frontend workspaces.
              </p>
              </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Step 3: Run Setup</h3>
              <CodeBlock id="setup">
{`yarn setup`}
              </CodeBlock>
              <p className="text-muted-foreground">This automatically:</p>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Installs all dependencies (root, contracts, frontend)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Creates Stellar identities for testnet/futurenet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Builds all contracts to WASM</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Prepares the development environment</span>
                </li>
              </ul>
            </div>
            
            {/* Step 4 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Step 4: Deploy Contracts</h3>
              <p className="text-muted-foreground">Deploy to Stellar testnet:</p>
              <CodeBlock id="deploy">
{`yarn deploy:testnet`}
            </CodeBlock>
              <p className="text-muted-foreground">This command:</p>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Deploys all contracts in the <code className="px-1.5 py-0.5 bg-muted rounded text-xs">contracts/</code> directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Generates TypeScript bindings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Creates contract import map</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Generates metadata for dynamic UI</span>
                </li>
              </ul>
            </div>
            
            {/* Step 5 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Step 5: Start Development Server</h3>
              <CodeBlock id="dev-server">
{`yarn dev`}
              </CodeBlock>
              <p className="text-muted-foreground">
                Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://localhost:3000</a> to see your app!
              </p>
          </div>
        </div>
      </section>

        {/* Verification */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Verification</h2>
          <p className="text-muted-foreground">
            After installation, verify everything is working:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Check contract builds</h4>
              <CodeBlock id="check-builds">
{`ls -la contracts/target/wasm32-unknown-unknown/release/*.wasm`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                Expected: You should see <code className="px-1.5 py-0.5 bg-muted rounded text-xs">.wasm</code> files for each contract
              </p>
          </div>
          
            <div>
              <h4 className="font-semibold mb-2">2. Check deployments</h4>
              <CodeBlock id="check-deployment">
{`cat deployment.json`}
          </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                Expected: JSON file containing contract IDs and network information
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">3. Check frontend packages</h4>
              <CodeBlock id="check-packages">
{`ls -la frontend/packages/`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                Expected: Directories for each deployed contract containing TypeScript bindings
              </p>
          </div>
        </div>
      </section>

        {/* Troubleshooting */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Troubleshooting</h2>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">&quot;stellar: command not found&quot;</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Make sure Stellar CLI is in your PATH:
              </p>
              <CodeBlock id="fix-path">
{`export PATH="$HOME/.cargo/bin:$PATH"
# Add to .bashrc or .zshrc for persistence
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.zshrc`}
              </CodeBlock>
          </div>
          
            <div>
              <h4 className="font-semibold mb-2">&quot;No contracts found after deployment&quot;</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Regenerate metadata:
              </p>
              <CodeBlock id="regen-metadata">
{`yarn generate:metadata
yarn dev`}
          </CodeBlock>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Wallet connection issues</h4>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Ensure Freighter is installed and unlocked</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Verify you&apos;re on the correct network (testnet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Try disconnecting and reconnecting</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/getting-started" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Quick Start →</h3>
              <p className="text-sm text-muted-foreground">Build your first contract interaction</p>
            </Link>
            <Link href="/docs/dynamic-contracts" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Dynamic Contracts →</h3>
              <p className="text-sm text-muted-foreground">Learn about automatic contract detection</p>
            </Link>
        </div>
      </section>
      </div>
    </div>
  )
}