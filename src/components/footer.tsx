import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="w-full px-8 py-12 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Scaffold Stellar Plus
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Enhanced fullstack boilerplate for building Stellar Soroban smart contracts
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Built with Next.js & Stellar Soroban
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/examples"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Examples
                </Link>
              </li>
              <li>
                <a
                  href="https://stellar.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Stellar
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://soroban.stellar.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Soroban Docs
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Scaffold Stellar Plus. Released under the MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}
