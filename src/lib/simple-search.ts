// Simple search implementation as fallback
export interface SearchableContent {
  id: string
  title: string
  href: string
  excerpt: string
  content: string
  section: string
  tags: string[]
  category: 'guide' | 'example' | 'reference' | 'tutorial'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  lastModified: Date
  popularity: number
  keywords: string[]
  codeBlocks: Array<{ language: string; content: string; title?: string }>
  headings: Array<{ level: number; text: string; id: string }>
}

export interface SearchFilters {
  section: string[]
  category: string[]
  difficulty: string[]
  tags: string[]
}

export interface SearchState {
  query: string
  filters: SearchFilters
  sortBy: 'relevance' | 'popularity' | 'date'
  showFilters: boolean
  recentSearches: string[]
  suggestions: string[]
}

// Simple searchable content
export const searchableContent: SearchableContent[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    href: '/docs',
    excerpt: 'What is Scaffold Stellar Plus and why use it',
    content: 'Scaffold Stellar Plus is an enhanced, production-ready fullstack boilerplate for building Stellar Soroban smart contracts with a Next.js 14 frontend. It features 100% zero-configuration dynamic contract detection, multi-wallet support, and powerful reusable hooks for seamless blockchain interactions.',
    section: 'Getting Started',
    tags: ['introduction', 'overview', 'getting started', 'stellar', 'soroban', 'nextjs'],
    category: 'guide',
    difficulty: 'beginner',
    lastModified: new Date('2024-01-15'),
    popularity: 95,
    keywords: ['scaffold', 'stellar', 'soroban', 'nextjs', 'boilerplate', 'smart contracts'],
    codeBlocks: [],
    headings: [
      { level: 1, text: 'What is Scaffold Stellar Plus?', id: 'what-is' },
      { level: 2, text: 'Key Differentiators', id: 'key-differentiators' },
      { level: 2, text: 'Core Functionalities', id: 'core-functionalities' }
    ]
  },
  {
    id: 'installation',
    title: 'Installation',
    href: '/docs/installation',
    excerpt: 'Set up your development environment',
    content: 'Get Scaffold Stellar Plus up and running on your development machine. This guide will walk you through installing prerequisites, setting up the project, and deploying your first contracts. Prerequisites include Rust toolchain with wasm32v1-none target, Stellar CLI, Node.js 18+, and Freighter wallet.',
    section: 'Getting Started',
    tags: ['installation', 'setup', 'prerequisites', 'rust', 'stellar cli', 'nodejs'],
    category: 'guide',
    difficulty: 'beginner',
    lastModified: new Date('2024-01-15'),
    popularity: 90,
    keywords: ['install', 'setup', 'prerequisites', 'rust', 'stellar cli', 'nodejs', 'freighter'],
    codeBlocks: [
      { language: 'bash', content: 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh', title: 'Install Rust' },
      { language: 'bash', content: 'cargo install --locked stellar-cli --features opt', title: 'Install Stellar CLI' },
      { language: 'bash', content: 'npx create-scaffoldstellarplus my-stellar-dapp', title: 'Create Project' }
    ],
    headings: [
      { level: 1, text: 'Installation', id: 'installation' },
      { level: 2, text: 'Prerequisites', id: 'prerequisites' },
      { level: 2, text: 'Installation Steps', id: 'installation-steps' },
      { level: 2, text: 'Verification', id: 'verification' }
    ]
  },
  {
    id: 'getting-started',
    title: 'Quick Start',
    href: '/docs/getting-started',
    excerpt: 'Build your first smart contract interaction',
    content: 'Get started with Scaffold Stellar Plus by building your first smart contract interaction. This guide will have you up and running in under 10 minutes. Learn how to create a project, install dependencies, deploy contracts, and start the development server.',
    section: 'Getting Started',
    tags: ['quick start', 'tutorial', 'first steps', 'deployment', 'development'],
    category: 'tutorial',
    difficulty: 'beginner',
    lastModified: new Date('2024-01-15'),
    popularity: 88,
    keywords: ['quick start', 'tutorial', 'first steps', 'deployment', 'development', 'getting started'],
    codeBlocks: [
      { language: 'bash', content: 'npx create-scaffoldstellarplus my-stellar-dapp', title: 'Create Project' },
      { language: 'bash', content: 'yarn setup', title: 'Setup' },
      { language: 'bash', content: 'yarn deploy:testnet', title: 'Deploy Contracts' },
      { language: 'bash', content: 'yarn dev', title: 'Start Development Server' }
    ],
    headings: [
      { level: 1, text: 'Quick Start', id: 'quick-start' },
      { level: 2, text: 'Prerequisites', id: 'prerequisites' },
      { level: 2, text: 'Initial Setup', id: 'initial-setup' },
      { level: 2, text: 'Your First Contract Interaction', id: 'first-interaction' }
    ]
  },
  {
    id: 'dynamic-contracts',
    title: 'Dynamic Contract System',
    href: '/docs/dynamic-contracts',
    excerpt: 'Automatic contract detection and adaptation',
    content: 'The Dynamic Contract System is the core of Scaffold Stellar Plus. It automatically detects, analyzes, and integrates any Soroban smart contract without requiring manual configuration. Features include automatic method discovery, intelligent method classification, constructor argument detection, and real-time UI generation.',
    section: 'Core Concepts',
    tags: ['dynamic contracts', 'automatic detection', 'contract analysis', 'zero config'],
    category: 'guide',
    difficulty: 'intermediate',
    lastModified: new Date('2024-01-15'),
    popularity: 85,
    keywords: ['dynamic', 'contracts', 'automatic', 'detection', 'analysis', 'zero config'],
    codeBlocks: [
      { language: 'typescript', content: 'const { callReadMethod, callWriteMethod } = useDynamicContracts()', title: 'Using Hooks' },
      { language: 'rust', content: '#[contract]\npub struct MyContract;', title: 'Contract Definition' }
    ],
    headings: [
      { level: 1, text: 'Dynamic Contract System', id: 'dynamic-contract-system' },
      { level: 2, text: 'What Makes It Dynamic?', id: 'what-makes-dynamic' },
      { level: 2, text: 'How It Works', id: 'how-it-works' },
      { level: 2, text: 'Zero Configuration', id: 'zero-configuration' }
    ]
  },
  {
    id: 'hooks',
    title: 'Unified Hook System',
    href: '/docs/hooks',
    excerpt: 'callReadMethod and callWriteMethod hooks',
    content: 'Scaffold Stellar Plus provides powerful React hooks that work with any Soroban contract, eliminating the need for contract-specific hook implementations. The useDynamicContracts hook provides callReadMethod and callWriteMethod functions for all contract interactions.',
    section: 'Core Concepts',
    tags: ['hooks', 'react', 'callReadMethod', 'callWriteMethod', 'useDynamicContracts'],
    category: 'guide',
    difficulty: 'intermediate',
    lastModified: new Date('2024-01-15'),
    popularity: 92,
    keywords: ['hooks', 'react', 'callReadMethod', 'callWriteMethod', 'useDynamicContracts', 'api'],
    codeBlocks: [
      { language: 'typescript', content: 'import { useDynamicContracts } from \'@/hooks/useDynamicContracts\'', title: 'Import Hook' },
      { language: 'typescript', content: 'const { callReadMethod, callWriteMethod } = useDynamicContracts()', title: 'Using Hook' },
      { language: 'typescript', content: 'const result = await callReadMethod(\'increment\', \'get_count\', {})', title: 'Read Method' },
      { language: 'typescript', content: 'await callWriteMethod(\'increment\', \'increment\', {})', title: 'Write Method' }
    ],
    headings: [
      { level: 1, text: 'Unified Hook System', id: 'unified-hook-system' },
      { level: 2, text: 'The useDynamicContracts Hook', id: 'useDynamicContracts' },
      { level: 2, text: 'callReadMethod', id: 'callReadMethod' },
      { level: 2, text: 'callWriteMethod', id: 'callWriteMethod' }
    ]
  },
  {
    id: 'wallets',
    title: 'Multi-Wallet Support',
    href: '/docs/wallets',
    excerpt: 'Freighter, Albedo, XBull wallet integration',
    content: 'Scaffold Stellar Plus provides seamless integration with all major Stellar wallets through a unified API. Supported wallets include Freighter (recommended), Albedo, XBull, and Rabet. The useWallet hook manages wallet connections and user authentication.',
    section: 'Core Concepts',
    tags: ['wallets', 'freighter', 'albedo', 'xbull', 'rabet', 'wallet integration'],
    category: 'guide',
    difficulty: 'beginner',
    lastModified: new Date('2024-01-15'),
    popularity: 80,
    keywords: ['wallets', 'freighter', 'albedo', 'xbull', 'rabet', 'integration', 'useWallet'],
    codeBlocks: [
      { language: 'typescript', content: 'import { useWallet } from \'@/hooks/useWallet\'', title: 'Import Hook' },
      { language: 'typescript', content: 'const { connect, disconnect, isConnected, publicKey } = useWallet()', title: 'Using Hook' }
    ],
    headings: [
      { level: 1, text: 'Multi-Wallet Support', id: 'multi-wallet-support' },
      { level: 2, text: 'Supported Wallets', id: 'supported-wallets' },
      { level: 2, text: 'Using the Wallet Hook', id: 'using-wallet-hook' },
      { level: 2, text: 'Security Best Practices', id: 'security-best-practices' }
    ]
  },
  {
    id: 'deployment',
    title: 'Deployment',
    href: '/docs/deployment',
    excerpt: 'Deploy your Soroban smart contracts to different Stellar networks',
    content: 'Deploy your Soroban smart contracts to different Stellar networks with a single command. Scaffold Stellar Plus supports mainnet, testnet, futurenet, and localnet deployments. Features include selective contract deployment, network switching, constructor argument detection, and secure mainnet deployment with private key protection.',
    section: 'Guides',
    tags: ['deployment', 'mainnet', 'testnet', 'futurenet', 'localnet', 'networks'],
    category: 'guide',
    difficulty: 'intermediate',
    lastModified: new Date('2024-01-15'),
    popularity: 87,
    keywords: ['deployment', 'mainnet', 'testnet', 'futurenet', 'localnet', 'networks', 'deploy'],
    codeBlocks: [
      { language: 'bash', content: 'yarn deploy:testnet', title: 'Deploy to Testnet' },
      { language: 'bash', content: 'yarn deploy:mainnet', title: 'Deploy to Mainnet' },
      { language: 'bash', content: 'yarn deploy:testnet hello_world', title: 'Selective Deployment' }
    ],
    headings: [
      { level: 1, text: 'Deployment', id: 'deployment' },
      { level: 2, text: 'Available Networks', id: 'available-networks' },
      { level: 2, text: 'Deploying to Testnet', id: 'deploying-testnet' },
      { level: 2, text: 'Deploying to Mainnet', id: 'deploying-mainnet' },
      { level: 2, text: 'Constructor Argument Detection', id: 'constructor-arguments' }
    ]
  },
  {
    id: 'commands',
    title: 'CLI Commands',
    href: '/docs/commands',
    excerpt: 'All available yarn commands and scripts',
    content: 'Complete reference for all available commands in Scaffold Stellar Plus. Includes contract development commands, deployment commands, frontend development, code generation utilities, and maintenance commands. Features detailed explanations and examples for each command.',
    section: 'Guides',
    tags: ['cli', 'commands', 'yarn', 'scripts', 'development', 'deployment'],
    category: 'reference',
    difficulty: 'beginner',
    lastModified: new Date('2024-01-15'),
    popularity: 75,
    keywords: ['cli', 'commands', 'yarn', 'scripts', 'development', 'deployment', 'maintenance'],
    codeBlocks: [
      { language: 'bash', content: 'yarn initcontract my_contract', title: 'Create Contract' },
      { language: 'bash', content: 'yarn deploy:testnet', title: 'Deploy to Testnet' },
      { language: 'bash', content: 'yarn clean', title: 'Clean Project' }
    ],
    headings: [
      { level: 1, text: 'CLI Commands', id: 'cli-commands' },
      { level: 2, text: 'Contract Development', id: 'contract-development' },
      { level: 2, text: 'Deployment', id: 'deployment' },
      { level: 2, text: 'Frontend Development', id: 'frontend-development' }
    ]
  },
  {
    id: 'reading-examples',
    title: 'Reading Contract Data',
    href: '/docs/examples/reading',
    excerpt: 'Query smart contracts without fees',
    content: 'Learn how to query smart contract data without wallet connection or transaction fees. Examples include reading contract state, fetching data with parameters, and working with multiple contracts. Uses the callReadMethod hook for all read operations.',
    section: 'Examples',
    tags: ['reading', 'query', 'contract data', 'callReadMethod', 'no fees'],
    category: 'example',
    difficulty: 'beginner',
    lastModified: new Date('2024-01-15'),
    popularity: 70,
    keywords: ['reading', 'query', 'contract', 'data', 'callReadMethod', 'no fees'],
    codeBlocks: [
      { language: 'typescript', content: 'const result = await callReadMethod(\'increment\', \'get_count\', {})', title: 'Basic Read' },
      { language: 'typescript', content: 'const greeting = await callReadMethod(\'hello_world\', \'greet\', { to: \'World\' })', title: 'With Parameters' }
    ],
    headings: [
      { level: 1, text: 'Reading Contract Data', id: 'reading-contract-data' },
      { level: 2, text: 'Basic Read Example', id: 'basic-read-example' },
      { level: 2, text: 'Read with Parameters', id: 'read-with-parameters' },
      { level: 2, text: 'Multiple Contracts', id: 'multiple-contracts' }
    ]
  },
  {
    id: 'writing-examples',
    title: 'Writing to Contracts',
    href: '/docs/examples/writing',
    excerpt: 'Execute state-changing transactions',
    content: 'Learn how to execute state-changing transactions that require wallet signatures. Examples include incrementing counters, transferring tokens, and modifying contract state. Uses the callWriteMethod hook for all write operations with automatic wallet connection handling.',
    section: 'Examples',
    tags: ['writing', 'transactions', 'state changes', 'callWriteMethod', 'wallet'],
    category: 'example',
    difficulty: 'intermediate',
    lastModified: new Date('2024-01-15'),
    popularity: 78,
    keywords: ['writing', 'transactions', 'state', 'changes', 'callWriteMethod', 'wallet'],
    codeBlocks: [
      { language: 'typescript', content: 'await callWriteMethod(\'increment\', \'increment\', {})', title: 'Basic Write' },
      { language: 'typescript', content: 'await callWriteMethod(\'token\', \'transfer\', { from, to, amount })', title: 'With Parameters' }
    ],
    headings: [
      { level: 1, text: 'Writing to Contracts', id: 'writing-to-contracts' },
      { level: 2, text: 'Basic Write Example', id: 'basic-write-example' },
      { level: 2, text: 'Write with Parameters', id: 'write-with-parameters' },
      { level: 2, text: 'Error Handling', id: 'error-handling' }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    href: '/docs/troubleshooting',
    excerpt: 'Common issues and solutions',
    content: 'Common issues and solutions for Scaffold Stellar Plus development. Includes deployment failures, wallet connection issues, contract not found errors, TypeScript errors, and SDK version mismatches. Provides step-by-step solutions for each problem.',
    section: 'Reference',
    tags: ['troubleshooting', 'issues', 'solutions', 'debugging', 'errors'],
    category: 'reference',
    difficulty: 'intermediate',
    lastModified: new Date('2024-01-15'),
    popularity: 65,
    keywords: ['troubleshooting', 'issues', 'solutions', 'debugging', 'errors', 'fix'],
    codeBlocks: [
      { language: 'bash', content: 'yarn generate:metadata', title: 'Regenerate Metadata' },
      { language: 'bash', content: 'yarn clean && yarn setup', title: 'Clean and Rebuild' }
    ],
    headings: [
      { level: 1, text: 'Troubleshooting', id: 'troubleshooting' },
      { level: 2, text: 'Common Issues', id: 'common-issues' },
      { level: 2, text: 'Deployment Issues', id: 'deployment-issues' },
      { level: 2, text: 'Wallet Issues', id: 'wallet-issues' }
    ]
  }
]

// Simple search function without FlexSearch
export const searchContent = (
  query: string,
  filters: SearchFilters = { section: [], category: [], difficulty: [], tags: [] },
  sortBy: 'relevance' | 'popularity' | 'date' = 'relevance'
): SearchableContent[] => {
  if (!query.trim()) return []

  const searchQuery = query.toLowerCase()
  
  // Simple text search
  const results = searchableContent.filter(item => {
    // Check if query matches title, content, or tags
    const matchesTitle = item.title.toLowerCase().includes(searchQuery)
    const matchesContent = item.content.toLowerCase().includes(searchQuery)
    const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    const matchesKeywords = item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery))
    
    return matchesTitle || matchesContent || matchesTags || matchesKeywords
  })
  
  // Apply filters
  const filteredResults = results.filter(item => {
    if (filters.section.length > 0 && !filters.section.includes(item.section)) {
      return false
    }
    if (filters.category.length > 0 && !filters.category.includes(item.category)) {
      return false
    }
    if (filters.difficulty.length > 0 && !filters.difficulty.includes(item.difficulty)) {
      return false
    }
    if (filters.tags.length > 0 && !filters.tags.some(tag => item.tags.includes(tag))) {
      return false
    }
    return true
  })
  
  // Sort results
  if (sortBy === 'relevance') {
    filteredResults.sort((a, b) => {
      // Simple relevance scoring
      const aScore = a.title.toLowerCase().includes(searchQuery) ? 100 : 0
      const bScore = b.title.toLowerCase().includes(searchQuery) ? 100 : 0
      return bScore - aScore
    })
  } else if (sortBy === 'popularity') {
    filteredResults.sort((a, b) => b.popularity - a.popularity)
  } else if (sortBy === 'date') {
    filteredResults.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
  }
  
  return filteredResults.slice(0, 20)
}

// Generate search suggestions
export const generateSuggestions = (query: string): string[] => {
  const suggestions = [
    'how to deploy contracts',
    'wallet connection',
    'constructor arguments',
    'mainnet deployment',
    'callReadMethod',
    'callWriteMethod',
    'useDynamicContracts',
    'yarn deploy:testnet',
    'contract not found',
    'wallet connection failed',
    'deployment failed',
    'getting started',
    'installation',
    'troubleshooting',
    'examples',
    'api reference'
  ]
  
  return suggestions.filter(s => 
    s.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8)
}

// Get popular searches
export const getPopularSearches = (): string[] => {
  return [
    'getting started',
    'deployment',
    'wallet connection',
    'contract interaction',
    'troubleshooting',
    'examples',
    'api reference',
    'installation'
  ]
}
