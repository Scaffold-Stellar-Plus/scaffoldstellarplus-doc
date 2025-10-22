'use client'

import Link from 'next/link'
import { CheckCircle2, Globe, Server, Laptop } from 'lucide-react'
import { useState } from 'react'

export default function DeploymentPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Deployment</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Deploy your Soroban smart contracts to different Stellar networks with a single command. Scaffold Stellar Plus supports testnet, futurenet, and localnet deployments.
          </p>
        </header>

        {/* Network Options */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Available Networks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold">Mainnet</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Production network with real XLM. Use for live applications and real transactions.
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>Recommended for:</strong> Production deployments
              </div>
            </div>

            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Testnet</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Public test network for development and testing. Free XLM available from faucet.
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>Recommended for:</strong> Development, testing, demos
              </div>
            </div>

            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <Server className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold">Futurenet</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Experimental network with the latest Stellar features and protocol changes.
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>Recommended for:</strong> Testing upcoming features
              </div>
            </div>

            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <Laptop className="h-6 w-6 text-foreground" />
                <h3 className="text-lg font-semibold">Localnet</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Local Stellar network running on your machine for rapid development and testing.
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>Recommended for:</strong> Fast iteration, offline work
              </div>
            </div>
          </div>
        </section>

        {/* Deploying to Testnet */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Deploying to Testnet</h2>
          <p className="text-muted-foreground">
            Testnet is the recommended network for development and testing. Deploy all contracts with a single command:
          </p>
          <CodeBlock id="deploy-testnet">
{`yarn deploy:testnet`}
          </CodeBlock>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What happens during deployment:</h3>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Builds all contracts in <code className="px-1.5 py-0.5 bg-muted rounded text-xs">contracts/</code> directory to WASM</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Deploys each contract to Stellar testnet</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Generates TypeScript bindings for type-safe contract interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Creates contract import map for dynamic loading</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Generates metadata JSON for automatic UI generation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Saves contract addresses to <code className="px-1.5 py-0.5 bg-muted rounded text-xs">deployment.json</code></span>
              </li>
            </ul>
          </div>

          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r">
            <p className="text-sm text-foreground">
              <strong>Note:</strong> First-time deployment may take several minutes as contracts are compiled and deployed. Subsequent deployments are faster.
            </p>
          </div>
        </section>

        {/* Deploying to Mainnet */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Deploying to Mainnet</h2>
          <p className="text-muted-foreground">
            ScaffoldStellar+ supports secure deployment to Stellar Mainnet with built-in safety features.
          </p>

          <div className="bg-black dark:bg-black border-l-4 border-red-500 p-4 rounded-r mb-6">
            <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
              ⚠️ Important: Production Deployment
            </p>
            <p className="text-sm text-red-700 dark:text-red-300">
              Mainnet deployments use real XLM and cannot be undone. Always test thoroughly on testnet first.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Prerequisites for Mainnet</h3>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>A funded Stellar account with sufficient XLM for deployment fees</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Your account&apos;s private key (starts with &apos;S&apos;)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Tested contracts on testnet first</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Deployment Process</h3>
            <ol className="space-y-4 text-muted-foreground ml-6">
              <li>
                <strong className="text-foreground">1. Deploy to mainnet:</strong>
                <CodeBlock id="deploy-mainnet">
{`yarn deploy:mainnet`}
                </CodeBlock>
              </li>
              <li>
                <strong className="text-foreground">2. Enter your private key</strong> when prompted (input is masked):
                <CodeBlock id="mainnet-prompt">
{`🔐 MAINNET DEPLOYMENT - PRIVATE KEY REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  WARNING: You are deploying to Stellar MAINNET!
⚠️  This will use real XLM from your account.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Enter your private key: ********`}
                </CodeBlock>
              </li>
              <li>
                <strong className="text-foreground">3. Confirm deployment</strong> by typing exactly:
                <CodeBlock id="mainnet-confirm">
{`DEPLOY TO MAINNET`}
                </CodeBlock>
              </li>
              <li>
                <strong className="text-foreground">4. Wait for deployment</strong> - the script will:
                <ul className="space-y-1 text-sm ml-6 mt-2">
                  <li>• Build all contracts</li>
                  <li>• Deploy to Stellar mainnet</li>
                  <li>• Generate TypeScript bindings</li>
                  <li>• Create mainnet configuration files</li>
                </ul>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Generated Mainnet Files</h3>
            <ul className="space-y-2 text-sm text-muted-foreground ml-6">
              <li>• <code className="px-1.5 py-0.5 bg-muted rounded text-xs">.env.mainnet.local</code> - Mainnet environment variables</li>
              <li>• <code className="px-1.5 py-0.5 bg-muted rounded text-xs">deployment-mainnet.json</code> - Mainnet contract addresses</li>
              <li>• <code className="px-1.5 py-0.5 bg-muted rounded text-xs">frontend/public/deployment-mainnet.json</code> - For network switching</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Security Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-green-500/20 bg-green-50 dark:bg-black rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Safe Practices</h4>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>• Private key never logged or stored</li>
                  <li>• Input is masked during entry</li>
                  <li>• Double confirmation required</li>
                  <li>• Script runs entirely locally</li>
                </ul>
              </div>
              <div className="border border-red-500/20 bg-black dark:bg-black rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Never</h4>
                <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                  <li>• Commit private keys to git</li>
                  <li>• Share your private key</li>
                  <li>• Use production keys in development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Deploying to Futurenet */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Deploying to Futurenet</h2>
          <p className="text-muted-foreground">
            Futurenet includes experimental features and upcoming protocol changes:
          </p>
          <CodeBlock id="deploy-futurenet">
{`yarn deploy:futurenet`}
          </CodeBlock>
          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r">
            <p className="text-sm text-foreground">
              <strong>Warning:</strong> Futurenet is experimental and may be reset at any time. Use it only for testing upcoming features.
            </p>
          </div>
        </section>

        {/* Deploying to Localnet */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Deploying to Localnet</h2>
          <p className="text-muted-foreground">
            For rapid development, you can deploy to a local Stellar network:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Start local Stellar network:</h3>
              <CodeBlock id="start-localnet">
{`stellar network start standalone`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                Keep this terminal running while you develop.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">2. Deploy to localnet:</h3>
              <CodeBlock id="deploy-localnet">
{`yarn deploy:localnet`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">3. Update environment variables:</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Edit <code className="px-1.5 py-0.5 bg-muted rounded text-xs">frontend/.env.local</code>:
              </p>
              <CodeBlock id="env-localnet">
{`NEXT_PUBLIC_STELLAR_NETWORK=standalone
NEXT_PUBLIC_STELLAR_RPC_URL=http://localhost:8000`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">4. Restart dev server:</h3>
              <CodeBlock id="restart-dev">
{`yarn dev`}
              </CodeBlock>
            </div>
          </div>

          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r">
            <p className="text-sm text-foreground">
              <strong>Benefits:</strong> Localnet provides instant transaction finality and doesn&apos;t require internet connectivity.
            </p>
          </div>
        </section>

        {/* Deployment Configuration */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Deployment Configuration</h2>
          <p className="text-muted-foreground">
            Contract addresses and network information are stored in <code className="px-1.5 py-0.5 bg-muted rounded text-xs">deployment.json</code>:
          </p>
          <CodeBlock id="deployment-json">
{`{
  "testnet": {
    "hello_world": {
      "contractId": "CCQJ4...",
      "deployedAt": "2024-01-15T10:30:00.000Z"
    },
    "increment": {
      "contractId": "CDXR7...",
      "deployedAt": "2024-01-15T10:31:00.000Z"
    }
  }
}`}
          </CodeBlock>
          <p className="text-sm text-muted-foreground">
            This file is automatically generated and updated during deployment.
          </p>
        </section>

        {/* Selective Contract Deployment */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Selective Contract Deployment</h2>
          <p className="text-muted-foreground">
            Deploy only specific contracts instead of all contracts at once:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Deploy single contract to testnet:</h3>
              <CodeBlock id="deploy-single-testnet">
{`# Deploy only hello_world to testnet
yarn deploy:testnet hello_world

# Deploy only increment to testnet
yarn deploy:testnet increment`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Deploy single contract to mainnet:</h3>
              <CodeBlock id="deploy-single-mainnet">
{`# Deploy only hello_world to mainnet
yarn deploy:mainnet hello_world

# Deploy only increment to mainnet
yarn deploy:mainnet increment`}
              </CodeBlock>
            </div>
          </div>

          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r mt-4">
            <p className="text-sm text-foreground mb-2">
              <strong>Benefits:</strong>
            </p>
            <ul className="space-y-1 text-sm text-foreground ml-4">
              <li>• ⚡ Faster deployment (only builds/deploys one contract)</li>
              <li>• 🎯 More control over what gets deployed</li>
              <li>• 💰 Lower fees on mainnet (only one contract)</li>
              <li>• 🔄 Update specific contracts without touching others</li>
            </ul>
          </div>
        </section>

        {/* Network Switching */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Network Switching</h2>
          <p className="text-muted-foreground">
            The frontend includes a network selector in the header that allows switching between networks:
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🟢</span>
                <h3 className="font-semibold">Mainnet</h3>
              </div>
              <p className="text-sm text-muted-foreground">Production deployment with real XLM</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔵</span>
                <h3 className="font-semibold">Testnet</h3>
              </div>
              <p className="text-sm text-muted-foreground">Development and testing</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🟣</span>
                <h3 className="font-semibold">Futurenet</h3>
              </div>
              <p className="text-sm text-muted-foreground">Experimental features</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              The frontend automatically:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Loads the correct contract addresses for each network</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Updates RPC endpoints automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Saves network selection to localStorage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <span>Shows visual indicators with color-coded badges</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Environment Variables */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Environment Variables</h2>
          <p className="text-muted-foreground">
            Configure which network your frontend connects to in <code className="px-1.5 py-0.5 bg-muted rounded text-xs">frontend/.env.local</code>:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Testnet (default):</h3>
              <CodeBlock id="env-testnet">
{`NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Futurenet:</h3>
              <CodeBlock id="env-futurenet">
{`NEXT_PUBLIC_STELLAR_NETWORK=futurenet
NEXT_PUBLIC_STELLAR_RPC_URL=https://rpc-futurenet.stellar.org`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Redeployment */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Redeploying Contracts</h2>
          <p className="text-muted-foreground">
            After making changes to your contracts, simply redeploy:
          </p>
          <CodeBlock id="redeploy">
{`yarn deploy:testnet`}
          </CodeBlock>
          <p className="text-muted-foreground">
            The deployment script will:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground ml-6">
            <li>• Rebuild modified contracts</li>
            <li>• Deploy new instances with new contract IDs</li>
            <li>• Regenerate all bindings and metadata</li>
            <li>• Update the frontend automatically</li>
          </ul>
          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r mt-4">
            <p className="text-sm text-foreground">
              <strong>Note:</strong> Each deployment creates a new contract instance with a new ID. The old contract remains on-chain but is no longer referenced.
            </p>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Troubleshooting</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-foreground/20 p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">Deployment fails with &quot;insufficient balance&quot;</h3>
              <p className="text-sm">
                Fund your testnet account using the <a href="https://laboratory.stellar.org/#account-creator?network=test" target="_blank" rel="noopener noreferrer" className="text-primary underline">Stellar Laboratory</a> or Freighter faucet.
              </p>
            </div>
            <div className="border-l-4 border-foreground/20 p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">Bindings not generated</h3>
              <p className="text-sm">
                Run <code className="px-1.5 py-0.5 bg-muted rounded text-xs">yarn build:packages</code> manually to regenerate TypeScript bindings.
              </p>
            </div>
            <div className="border-l-4 border-foreground/20 p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">Contract not appearing in UI</h3>
              <p className="text-sm">
                Regenerate metadata with <code className="px-1.5 py-0.5 bg-muted rounded text-xs">yarn generate:metadata</code> and restart the dev server.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/commands" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">CLI Commands →</h3>
              <p className="text-sm text-muted-foreground">Learn about all available commands</p>
            </Link>
            <Link href="/docs/troubleshooting" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Troubleshooting →</h3>
              <p className="text-sm text-muted-foreground">Fix common deployment issues</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

