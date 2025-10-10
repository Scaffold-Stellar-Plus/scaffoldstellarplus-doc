'use client'

import { 
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'

export default function TroubleshootingPage() {
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

  const issues = [
    {
      category: 'Installation Issues',
      problems: [
        {
          title: '"stellar: command not found"',
          problem: 'Stellar CLI is not in your PATH',
          solution: `export PATH="$HOME/.cargo/bin:$PATH"
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.zshrc`
        },
        {
          title: 'Yarn install fails',
          problem: 'Node version incompatibility',
          solution: `nvm install 18
nvm use 18
yarn install`
        }
      ]
    },
    {
      category: 'Deployment Issues',
      problems: [
        {
          title: '"No contracts found" after deployment',
          problem: 'Metadata not generated properly',
          solution: `yarn generate:metadata
yarn dev`
        },
        {
          title: '"Method not found" errors',
          problem: 'Contract bindings out of sync',
          solution: `yarn build:contracts
yarn deploy:testnet`
        }
      ]
    },
    {
      category: 'Wallet Connection Issues',
      problems: [
        {
          title: 'Wallet not detected',
          problem: 'Wallet extension not installed or disabled',
          solution: `1. Install Freighter from freighter.app
2. Enable the extension
3. Refresh the page
4. Try a different browser`
        },
        {
          title: 'Wallet connects but transactions fail',
          problem: 'Wrong network selected in wallet',
          solution: `1. Open Freighter settings
2. Select "Testnet" network
3. Reconnect wallet
4. Try transaction again`
        }
      ]
    }
  ]

  return (
    <div className="max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-border">
          <h1 className="text-4xl font-bold tracking-tight">Troubleshooting</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Common issues and their solutions when working with Scaffold Stellar Plus.
          </p>
        </header>

        {/* Quick Fix */}
        <div className="bg-secondary/50 border-l-4 border-foreground/20 p-6 rounded-r">
          <h3 className="font-semibold mb-3 text-foreground">Quick Fix: Complete Reset</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you&apos;re experiencing persistent issues, try this complete reset:
          </p>
          <CodeBlock id="nuclear-fix">
{`yarn clean:all
yarn install
yarn setup
yarn deploy:testnet
yarn dev`}
          </CodeBlock>
          <p className="text-sm text-muted-foreground mt-3">
            This will clean everything and start fresh. It solves most common issues.
          </p>
        </div>

        {/* Issues by Category */}
        {issues.map((category, catIndex) => (
          <section key={catIndex} className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{category.category}</h2>
            
            <div className="space-y-6">
              {category.problems.map((problem, probIndex) => (
                <div key={probIndex} className="border border-border rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{problem.title}</h3>
                      <p className="text-sm text-muted-foreground">{problem.problem}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-semibold mb-2">Solution:</p>
                  </div>

                  <CodeBlock id={`fix-${catIndex}-${probIndex}`}>{problem.solution}</CodeBlock>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Common Error Messages */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Common Error Messages</h2>
          
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Error</th>
                  <th className="px-4 py-3 text-left font-semibold">Meaning</th>
                  <th className="px-4 py-3 text-left font-semibold">Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { error: 'User rejected the request', meaning: 'User declined in wallet', solution: 'Expected, handle gracefully' },
                  { error: 'Insufficient balance', meaning: 'Not enough XLM', solution: 'Fund account via Friendbot' },
                  { error: 'Contract not found', meaning: 'Invalid contract ID', solution: 'Check deployment.json' },
                  { error: 'Invalid parameter', meaning: 'Wrong parameter type/name', solution: 'Check contract bindings' },
                  { error: 'Network error', meaning: 'RPC unreachable', solution: 'Check internet, try different RPC' },
                  { error: 'Transaction timeout', meaning: 'Too long to confirm', solution: 'Retry or increase timeout' }
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-mono text-xs">{row.error}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.meaning}</td>
                    <td className="px-4 py-3">{row.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Getting Help */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Getting Help</h2>
          
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3">Before Asking for Help</h3>
              <ol className="space-y-2 text-sm text-muted-foreground ml-6">
                <li>Check this troubleshooting guide</li>
                <li>Search <a href="https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Issues</a></li>
                <li>Review the documentation</li>
                <li>Try the complete reset command above</li>
              </ol>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3">When Reporting Issues</h3>
              <p className="text-sm text-muted-foreground mb-3">Include:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Error message (full stack trace)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Steps to reproduce</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Your environment (OS, Node version, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Relevant code snippets</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Useful Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus/issues" target="_blank" rel="noopener noreferrer" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1 inline-flex items-center gap-2">
                GitHub Issues <ExternalLink className="h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground">Report bugs and request features</p>
            </a>
            <a href="https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus/discussions" target="_blank" rel="noopener noreferrer" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1 inline-flex items-center gap-2">
                Discussions <ExternalLink className="h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground">Ask questions and share ideas</p>
            </a>
            <a href="https://developers.stellar.org/" target="_blank" rel="noopener noreferrer" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1 inline-flex items-center gap-2">
                Stellar Docs <ExternalLink className="h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground">Official Stellar documentation</p>
            </a>
            <a href="https://soroban.stellar.org/" target="_blank" rel="noopener noreferrer" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1 inline-flex items-center gap-2">
                Soroban Docs <ExternalLink className="h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground">Soroban smart contract docs</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}