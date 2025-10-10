import Link from 'next/link'
import { Button } from '@/components/button'
import { 
  Rocket, 
  Zap, 
  Wallet, 
  Code2, 
  ArrowRight, 
  Github,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-secondary/50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-foreground mb-8 border border-border">
              <Sparkles className="h-4 w-4" />
              100% Zero-Configuration Smart Contract Detection
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
              Build Stellar Apps
              <br />
              <span>
                The Smart Way
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10">
              Enhanced, production-ready fullstack boilerplate for building Stellar Soroban 
              smart contracts with Next.js. Features dynamic contract detection, 
              multi-wallet support, and powerful reusable hooks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/docs/getting-started">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Github className="h-5 w-5" />
                  View on GitHub
                </Button>
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                <span>TypeScript First</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                <span>Production Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scaffold Stellar Plus provides a complete toolkit for rapid Stellar dApp development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary text-foreground mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Zero-Config Detection
                </h3>
                <p className="text-muted-foreground text-sm">
                  Automatically detects and adapts to any Soroban contract structure. 
                  No manual configuration needed.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary text-foreground mb-4">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Multi-Wallet Integration
                </h3>
                <p className="text-muted-foreground text-sm">
                  Seamless support for Freighter, Albedo, XBull, and more. 
                  One unified API for all wallets.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary text-foreground mb-4">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Reusable Blockchain Hooks
                </h3>
                <p className="text-muted-foreground text-sm">
                  Powerful React hooks for reading and writing to any smart contract 
                  with full TypeScript support.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary text-foreground mb-4">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Ready for Production
                </h3>
                <p className="text-muted-foreground text-sm">
                  Built with best practices, professional UI/UX, error handling, 
                  and deployment scripts included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 sm:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Powerful API
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interact with any smart contract using our intuitive hooks
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Read Example */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="bg-secondary px-6 py-4 border-b border-border">
                <h3 className="font-semibold text-sm">Reading Contract Data</h3>
              </div>
              <pre className="p-6 overflow-x-auto text-sm">
                <code className="text-foreground">{`import { useDynamicContracts } from '@/hooks/useDynamicContracts'

export function Counter() {
  const { callReadMethod } = useDynamicContracts()
  const [count, setCount] = useState(null)

  const fetchCount = async () => {
    const result = await callReadMethod(
      'increment',     // Contract name
      'get_count',     // Method name
      {}               // Arguments
    )
    setCount(result)
  }

  return <div>Count: {count}</div>
}`}</code>
              </pre>
            </div>

            {/* Write Example */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="bg-secondary px-6 py-4 border-b border-border">
                <h3 className="font-semibold text-sm">Writing to Contracts</h3>
              </div>
              <pre className="p-6 overflow-x-auto text-sm">
                <code className="text-foreground">{`import { useDynamicContracts } from '@/hooks/useDynamicContracts'

export function IncrementButton() {
  const { callWriteMethod } = useDynamicContracts()
  const { isConnected } = useWallet()

  const increment = async () => {
    await callWriteMethod(
      'increment',     // Contract name
      'increment',     // Method name
      {}               // Arguments
    )
    alert('Success!')
  }

  return <button onClick={increment}>+1</button>
}`}</code>
              </pre>
            </div>
          </div>

          {/* Features list */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground mb-3">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">Type-Safe</p>
              <p className="text-xs text-muted-foreground mt-1">
                Full TypeScript support with auto-generated bindings
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground mb-3">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">Auto-Detection</p>
              <p className="text-xs text-muted-foreground mt-1">
                Automatically discovers all contract methods
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground mb-3">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">Reusable</p>
              <p className="text-xs text-muted-foreground mt-1">
                Works with any Soroban smart contract
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-foreground p-12 sm:p-16 text-center overflow-hidden border border-foreground shadow-xl">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4">
                Ready to Build Your Stellar dApp?
              </h2>
              <p className="text-lg text-background/90 mb-8 max-w-2xl mx-auto">
                Get started in minutes with our comprehensive documentation and examples
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs/getting-started">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Read the Docs
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/examples">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-background/20 text-background hover:bg-background/10"
                  >
                    View Examples
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}