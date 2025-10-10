import Link from 'next/link'
import { 
  ArrowRight, 
  CheckCircle2,
  Code2,
  Zap,
  Wallet,
  Shield
} from 'lucide-react'

export default function IntroductionPage() {
  return (
    <div className="max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-border">
          <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Scaffold Stellar Plus is an enhanced, production-ready fullstack boilerplate for building Stellar Soroban smart contracts with a Next.js 14 frontend. It features <strong>zero-configuration dynamic contract detection</strong>, <strong>multi-wallet support</strong>, and <strong>powerful reusable hooks</strong> for seamless blockchain interactions.
          </p>
        </header>

        {/* What is Scaffold Stellar Plus */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">What is Scaffold Stellar Plus?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Scaffold Stellar Plus is a comprehensive development environment that bridges Stellar Soroban smart contracts with modern web applications. Unlike traditional scaffolds, it <strong>automatically detects and adapts</strong> to any contract structure, eliminating manual configuration and enabling rapid prototyping.
          </p>

          <div className="bg-muted/30 border-l-4 border-primary p-6 rounded-r">
            <p className="text-base italic">
              <strong>Core Philosophy:</strong> &quot;Build faster, configure less&quot; – Our framework eliminates traditional barriers to blockchain development through intelligent automation and zero-configuration workflows.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
          
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">100% Automatic Contract Detection</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Smart Analysis:</strong> Automatically scans and analyzes your Soroban contracts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Zero Configuration:</strong> No manual contract registration required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Real-time Updates:</strong> UI adapts instantly when contracts are deployed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Unified Hook System</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Universal API:</strong> Use <code className="px-1.5 py-0.5 bg-muted rounded text-sm">callReadMethod</code> and <code className="px-1.5 py-0.5 bg-muted rounded text-sm">callWriteMethod</code> with any contract</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Type Safety:</strong> Full TypeScript support with auto-generated bindings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Error Handling:</strong> Built-in error management and user feedback</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Multi-Wallet Support</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Universal Compatibility:</strong> Works with Freighter, Albedo, XBull, and more</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Seamless Integration:</strong> One API for all wallet interactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>User-Friendly:</strong> Automatic wallet detection and connection flow</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Professional UI/UX</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Auto-Generated Forms:</strong> Interactive forms created for every contract method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Responsive Design:</strong> Beautiful interface that works on all devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                      <span><strong>Dark/Light Mode:</strong> Automatic theme switching with system preference</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Comparison: Scaffold Stellar Plus vs Traditional Approach</h2>
          
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Aspect</th>
                  <th className="px-4 py-3 text-left font-semibold">Scaffold Stellar Plus</th>
                  <th className="px-4 py-3 text-left font-semibold">Traditional Development</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-medium">Setup Time</td>
                  <td className="px-4 py-3 text-foreground">Minutes</td>
                  <td className="px-4 py-3 text-muted-foreground">Hours/Days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Contract Integration</td>
                  <td className="px-4 py-3 text-foreground">Automatic</td>
                  <td className="px-4 py-3 text-muted-foreground">Manual Configuration</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">UI Development</td>
                  <td className="px-4 py-3 text-foreground">Auto-Generated</td>
                  <td className="px-4 py-3 text-muted-foreground">Hand-Coded</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Type Safety</td>
                  <td className="px-4 py-3 text-foreground">Full TypeScript</td>
                  <td className="px-4 py-3 text-muted-foreground">Partial/Manual</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Wallet Support</td>
                  <td className="px-4 py-3 text-foreground">Multi-Wallet</td>
                  <td className="px-4 py-3 text-muted-foreground">Single Wallet</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Maintenance</td>
                  <td className="px-4 py-3 text-foreground">Self-Updating</td>
                  <td className="px-4 py-3 text-muted-foreground">Manual Updates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Choose */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Scaffold Stellar Plus?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">For Developers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Rapid prototyping from idea to deployed dApp in minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Production-ready with enterprise-grade best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Intuitive APIs and comprehensive tooling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Rich documentation with extensive guides</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">For Teams</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Consistent architecture and standardized patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Easy onboarding for new team members</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Scalable from MVP to enterprise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Active open-source community support</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">For Projects</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Reduce development time by up to 70%</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Launch your dApp weeks earlier</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Built-in security best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <span>Mobile-ready responsive design</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What You'll Build */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">What You Can Build</h2>
          <p className="text-muted-foreground">
            With Scaffold Stellar Plus, you can create a wide range of blockchain applications:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">DeFi Applications</h4>
              <p className="text-sm text-muted-foreground">Decentralized exchanges, lending platforms, and yield farming protocols</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Gaming dApps</h4>
              <p className="text-sm text-muted-foreground">NFT marketplaces and play-to-earn gaming platforms</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Enterprise Solutions</h4>
              <p className="text-sm text-muted-foreground">Supply chain tracking and identity management systems</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Payment Systems</h4>
              <p className="text-sm text-muted-foreground">Multi-currency wallets and cross-border payment solutions</p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Getting Started</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Start Path</h3>
              <div className="space-y-2">
                <Link href="/docs/installation" className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">1</span>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">Installation</h4>
                      <p className="text-sm text-muted-foreground">Set up your development environment</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                
                <Link href="/docs/getting-started" className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">2</span>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">Quick Start</h4>
                      <p className="text-sm text-muted-foreground">Build your first contract interaction</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                
                <Link href="/docs/dynamic-contracts" className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">3</span>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">Learn the Fundamentals</h4>
                      <p className="text-sm text-muted-foreground">Understand the core concepts</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                
                <Link href="/docs/examples/reading" className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">4</span>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">Explore Examples</h4>
                      <p className="text-sm text-muted-foreground">See real-world implementations</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/installation" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Installation →</h3>
              <p className="text-sm text-muted-foreground">Get Scaffold Stellar Plus installed on your machine</p>
            </Link>
            <Link href="/docs/getting-started" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold mb-1">Quick Start →</h3>
              <p className="text-sm text-muted-foreground">Build your first smart contract interaction</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}