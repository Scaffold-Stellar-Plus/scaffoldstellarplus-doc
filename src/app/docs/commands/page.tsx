'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CommandsPage() {
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

  const commands = [
    {
      category: 'Contract Development',
      items: [
        { name: 'yarn initcontract <name>', desc: 'Create a new contract with boilerplate code', example: 'yarn initcontract my_contract' },
        { name: 'yarn removecontract <name>', desc: 'Remove a contract and clean up all references', example: 'yarn removecontract my_contract' },
        { name: 'yarn build:contracts', desc: 'Build all contracts to WASM', example: 'yarn build:contracts' },
        { name: 'yarn test:contracts', desc: 'Run Rust unit tests for all contracts', example: 'yarn test:contracts' },
        { name: 'yarn optimize', desc: 'Optimize WASM files for production', example: 'yarn optimize' }
      ]
    },
    {
      category: 'Deployment',
      items: [
        { name: 'yarn setup', desc: 'Complete project setup (run once after cloning)', example: 'yarn setup' },
        { name: 'yarn deploy:testnet', desc: 'Deploy all contracts to Stellar testnet', example: 'yarn deploy:testnet' },
        { name: 'yarn deploy:futurenet', desc: 'Deploy to Stellar futurenet', example: 'yarn deploy:futurenet' },
        { name: 'yarn deploy:localnet', desc: 'Deploy to local Stellar network', example: 'yarn deploy:localnet' }
      ]
    },
    {
      category: 'Frontend Development',
      items: [
        { name: 'yarn dev', desc: 'Start Next.js development server', example: 'yarn dev' },
        { name: 'yarn build', desc: 'Build contracts + frontend for production', example: 'yarn build' },
        { name: 'yarn lint', desc: 'Run ESLint on frontend code', example: 'yarn lint' },
        { name: 'yarn type-check', desc: 'Check TypeScript types', example: 'yarn type-check' }
      ]
    },
    {
      category: 'Code Generation & Utilities',
      items: [
        { name: 'yarn build:packages', desc: 'Build contract packages (generates dist/ folders)', example: 'yarn build:packages' },
        { name: 'yarn generate:contract-imports', desc: 'Auto-generate contract import map', example: 'yarn generate:contract-imports' },
        { name: 'yarn generate:metadata', desc: 'Regenerate contract metadata JSON', example: 'yarn generate:metadata' },
        { name: 'yarn detect:contracts', desc: 'Detect and analyze all contracts', example: 'yarn detect:contracts' }
      ]
    },
    {
      category: 'Maintenance',
      items: [
        { name: 'yarn clean', desc: 'Remove contracts/target, packages, metadata, and build artifacts', example: 'yarn clean' },
        { name: 'yarn clean:frontend', desc: 'Remove all auto-generated frontend files', example: 'yarn clean:frontend' },
        { name: 'yarn clean:all', desc: 'Deep clean (includes node_modules)', example: 'yarn clean:all' }
      ]
    }
  ]

  return (
    <div className="max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-border">
          <h1 className="text-4xl font-bold tracking-tight">CLI Commands</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Complete reference for all available commands in Scaffold Stellar Plus.
          </p>
        </header>

        {/* Commands by Category */}
        {commands.map((section, sectionIndex) => (
          <section key={sectionIndex} className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{section.category}</h2>
            
            <div className="space-y-6">
              {section.items.map((cmd, cmdIndex) => (
                <div key={cmdIndex} className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-mono font-semibold mb-2">{cmd.name}</h3>
                  <p className="text-muted-foreground mb-4">{cmd.desc}</p>
                  <CodeBlock id={`cmd-${sectionIndex}-${cmdIndex}`}>{cmd.example}</CodeBlock>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/getting-started" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Quick Start →</h3>
              <p className="text-sm text-muted-foreground">See these commands in action</p>
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