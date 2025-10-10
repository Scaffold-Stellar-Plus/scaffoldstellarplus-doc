'use client'

import Link from 'next/link'
import { Folder, FileCode, Settings, Package } from 'lucide-react'

export default function ProjectStructurePage() {
  return (
    <div className="max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-border">
          <h1 className="text-4xl font-bold tracking-tight">Project Structure</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Understand the organization of a Scaffold Stellar Plus project and learn where to find and add different types of files.
          </p>
        </header>

        {/* Overview */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">High-Level Overview</h2>
          <p className="text-muted-foreground">
            Scaffold Stellar Plus is organized as a monorepo with contracts and frontend in separate directories:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <FileCode className="h-6 w-6 text-orange-600" />
                <h3 className="text-lg font-semibold">contracts/</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Rust-based Soroban smart contracts with Cargo workspace configuration
              </p>
            </div>
            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-6 w-6 text-foreground" />
                <h3 className="text-lg font-semibold">frontend/</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Next.js 14 application with TypeScript, React, and Tailwind CSS
              </p>
            </div>
          </div>
        </section>

        {/* Complete Structure */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Complete Directory Structure</h2>
          <div className="bg-muted/50 border border-border p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`scaffoldstellarplus/
├── contracts/              # Smart contracts directory
│   ├── hello_world/       # Example contract
│   │   ├── src/
│   │   │   ├── lib.rs     # Contract implementation
│   │   │   └── test.rs    # Unit tests
│   │   └── Cargo.toml     # Contract dependencies
│   ├── increment/         # Another example contract
│   ├── token/             # Token contract example
│   └── Cargo.toml         # Workspace configuration
│
├── frontend/              # Next.js application
│   ├── app/              # Next.js app router
│   │   ├── page.tsx      # Main page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ConnectWallet.tsx
│   │   ├── ContractMethodExecutor.tsx
│   │   ├── DynamicContractInterface.tsx
│   │   └── ui/          # Shadcn UI components
│   ├── hooks/            # Custom React hooks
│   │   ├── useDynamicContracts.ts
│   │   └── useWallet.ts
│   ├── lib/              # Utility libraries
│   │   ├── contract-analyzer.ts
│   │   ├── contract-map.ts    # Auto-generated
│   │   ├── contract-metadata.json  # Auto-generated
│   │   └── stellar-wallets-kit.ts
│   ├── contracts/        # Auto-generated clients
│   │   └── [contract-name].ts
│   ├── packages/         # Auto-generated bindings
│   │   └── [contract-name]/
│   ├── .env.local        # Environment variables
│   └── package.json
│
├── scripts/              # Automation scripts
│   ├── setup.js
│   ├── deploy-testnet.js
│   ├── deploy-futurenet.js
│   ├── deploy-localnet.js
│   ├── init-contract.js
│   ├── remove-contract.js
│   ├── build-contract-packages.js
│   ├── generate-contract-imports.js
│   └── generate-contract-metadata.js
│
├── deployment.json       # Deployed contract addresses
├── package.json          # Root package.json
├── Makefile              # Make commands
└── README.md`}
            </pre>
          </div>
        </section>

        {/* Contracts Directory */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Contracts Directory</h2>
          <p className="text-muted-foreground">
            The <code className="px-1.5 py-0.5 bg-muted rounded text-sm">contracts/</code> directory contains all Soroban smart contracts:
          </p>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Folder className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">contracts/[contract-name]/src/lib.rs</h3>
                  <p className="text-sm text-muted-foreground">
                    Main contract implementation with <code className="px-1 py-0.5 bg-muted rounded text-xs">#[contract]</code> and <code className="px-1 py-0.5 bg-muted rounded text-xs">#[contractimpl]</code> macros
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Folder className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">contracts/[contract-name]/src/test.rs</h3>
                  <p className="text-sm text-muted-foreground">
                    Rust unit tests for the contract methods
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">contracts/[contract-name]/Cargo.toml</h3>
                  <p className="text-sm text-muted-foreground">
                    Contract-specific dependencies and configuration
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">contracts/Cargo.toml</h3>
                  <p className="text-sm text-muted-foreground">
                    Workspace configuration that includes all contracts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frontend Directory */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Frontend Directory</h2>
          <p className="text-muted-foreground">
            The <code className="px-1.5 py-0.5 bg-muted rounded text-sm">frontend/</code> directory is a Next.js 14 application:
          </p>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">app/</h3>
              <p className="text-sm text-muted-foreground">
                Next.js App Router pages and layouts. Add new pages here.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">components/</h3>
              <p className="text-sm text-muted-foreground">
                Reusable React components. Includes contract interface components and UI primitives.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">hooks/</h3>
              <p className="text-sm text-muted-foreground">
                Custom React hooks for contract interactions and wallet management.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">lib/</h3>
              <p className="text-sm text-muted-foreground">
                Utility functions, analyzers, and configuration files.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">packages/ <span className="text-xs font-normal text-muted-foreground">(Auto-generated)</span></h3>
              <p className="text-sm text-muted-foreground">
                TypeScript bindings for each contract. Generated during deployment.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">contracts/ <span className="text-xs font-normal text-muted-foreground">(Auto-generated)</span></h3>
              <p className="text-sm text-muted-foreground">
                Contract client instances. Generated during deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Auto-Generated Files */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Auto-Generated Files</h2>
          <div className="bg-secondary/50 border-l-4 border-foreground/20 p-4 rounded-r mb-4">
            <p className="text-sm text-foreground">
              <strong>Important:</strong> Never manually edit auto-generated files. They will be overwritten during deployment.
            </p>
          </div>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">frontend/packages/[contract]/</h3>
              <p className="text-sm text-muted-foreground mb-2">
                TypeScript bindings generated from Soroban contract WASM files.
              </p>
              <p className="text-xs text-muted-foreground">
                Generated by: <code className="px-1 py-0.5 bg-muted rounded">yarn build:packages</code>
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">frontend/lib/contract-map.ts</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Import map that dynamically loads all contract clients.
              </p>
              <p className="text-xs text-muted-foreground">
                Generated by: <code className="px-1 py-0.5 bg-muted rounded">yarn generate:contract-imports</code>
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">frontend/lib/contract-metadata.json</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Metadata about all contracts including methods, parameters, and types.
              </p>
              <p className="text-xs text-muted-foreground">
                Generated by: <code className="px-1 py-0.5 bg-muted rounded">yarn generate:metadata</code>
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">deployment.json</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Contract IDs and deployment information for each network.
              </p>
              <p className="text-xs text-muted-foreground">
                Generated by: <code className="px-1 py-0.5 bg-muted rounded">yarn deploy:testnet</code>
              </p>
            </div>
          </div>
        </section>

        {/* Configuration Files */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Key Configuration Files</h2>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">frontend/.env.local</h3>
              <p className="text-sm text-muted-foreground">
                Environment variables for network configuration (testnet/futurenet/localnet)
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">package.json (root)</h3>
              <p className="text-sm text-muted-foreground">
                Scripts for building, deploying, and managing contracts
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">frontend/package.json</h3>
              <p className="text-sm text-muted-foreground">
                Frontend dependencies and Next.js configuration
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">contracts/Cargo.toml</h3>
              <p className="text-sm text-muted-foreground">
                Rust workspace configuration that includes all contract packages
              </p>
            </div>
          </div>
        </section>

        {/* Where to Add Files */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Where to Add Your Files</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-foreground/20 p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">New Smart Contract</h3>
              <p className="text-sm mb-2">Use CLI: <code className="px-1.5 py-0.5 bg-muted rounded text-xs">yarn initcontract your_contract</code></p>
              <p className="text-xs text-muted-foreground">Creates: <code className="px-1 py-0.5 bg-muted rounded">contracts/your_contract/</code></p>
            </div>
            <div className="border-l-4 border-foreground/20 p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">New Page</h3>
              <p className="text-sm mb-2">Add to: <code className="px-1.5 py-0.5 bg-muted rounded text-xs">frontend/app/your-page/page.tsx</code></p>
            </div>
            <div className="border-l-4 border-foreground/20 p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">New Component</h3>
              <p className="text-sm mb-2">Add to: <code className="px-1.5 py-0.5 bg-muted rounded text-xs">frontend/components/YourComponent.tsx</code></p>
            </div>
            <div className="border-l-4 border-foreground/20 p-4 bg-secondary/50">
              <h3 className="font-semibold mb-2">Custom Hook</h3>
              <p className="text-sm mb-2">Add to: <code className="px-1.5 py-0.5 bg-muted rounded text-xs">frontend/hooks/useYourHook.ts</code></p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/adding-contracts" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Adding Contracts →</h3>
              <p className="text-sm text-muted-foreground">Learn how to add new contracts to your project</p>
            </Link>
            <Link href="/docs/commands" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">CLI Commands →</h3>
              <p className="text-sm text-muted-foreground">Explore all available commands</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

