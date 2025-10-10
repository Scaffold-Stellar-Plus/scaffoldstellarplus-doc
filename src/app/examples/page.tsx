import Link from 'next/link'
import { Code2, FileCode2, Layers, Workflow } from 'lucide-react'

export default function ExamplesPage() {
  const examples = [
    {
      icon: FileCode2,
      title: 'Reading Contract Data',
      description: 'Learn how to query smart contract data without wallet connection or fees',
      href: '/docs/examples/reading',
      color: 'blue'
    },
    {
      icon: Code2,
      title: 'Writing to Contracts',
      description: 'Execute state-changing transactions with wallet signatures',
      href: '/docs/examples/writing',
      color: 'green'
    },
    {
      icon: Layers,
      title: 'Multiple Contracts',
      description: 'Work with multiple contracts simultaneously in one application',
      href: '/docs/examples/multiple',
      color: 'purple'
    },
    {
      icon: Workflow,
      title: 'Custom Hooks',
      description: 'Build reusable contract-specific hooks for cleaner code',
      href: '/docs/examples/custom-hooks',
      color: 'pink'
    }
  ]

  const colorClasses = {
    blue: 'text-foreground bg-secondary',
    green: 'text-foreground bg-secondary',
    purple: 'text-foreground bg-secondary',
    pink: 'text-foreground bg-secondary'
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Code Examples
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical examples showing how to use Scaffold Stellar Plus in real-world applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {examples.map((example) => {
            const Icon = example.icon
            return (
              <Link
                key={example.title}
                href={example.href}
                className="group relative rounded-2xl border border-border bg-card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${colorClasses[example.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {example.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {example.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want to see more examples?
          </p>
          <a
            href="https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus/tree/main/frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-all"
          >
            View Full Source Code on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
