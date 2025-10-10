export interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
}

export const docsConfig: NavItem[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/getting-started' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Dynamic Contract System', href: '/docs/dynamic-contracts' },
      { title: 'Unified Hook System', href: '/docs/hooks' },
      { title: 'Multi-Wallet Support', href: '/docs/wallets' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Using Read & Write Hooks', href: '/docs/using-hooks' },
      { title: 'Adding New Contracts', href: '/docs/adding-contracts' },
      { title: 'Deployment', href: '/docs/deployment' },
      { title: 'CLI Commands', href: '/docs/commands' },
    ],
  },
  {
    title: 'Examples',
    items: [
      { title: 'Reading Contract Data', href: '/docs/examples/reading' },
      { title: 'Writing to Contracts', href: '/docs/examples/writing' },
      { title: 'Multiple Contracts', href: '/docs/examples/multiple' },
      { title: 'Custom Hooks', href: '/docs/examples/custom-hooks' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'Project Structure', href: '/docs/project-structure' },
      { title: 'API Reference', href: '/docs/api-reference' },
      { title: 'Troubleshooting', href: '/docs/troubleshooting' },
    ],
  },
]
