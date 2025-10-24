import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

interface ExtractedSearchableContent {
  id: string
  title: string
  href: string
  excerpt: string
  content: string
  section: string
  tags: string[]
  category: string
  difficulty: string
  lastModified: Date
  popularity: number
  keywords: string[]
  codeBlocks: Array<{ language: string; content: string; title?: string }>
  headings: Array<{ level: number; text: string; id: string }>
}

export interface ExtractedContent {
  title: string
  content: string
  headings: Array<{ level: number; text: string; id: string }>
  codeBlocks: Array<{ language: string; content: string; title?: string }>
  tags: string[]
  keywords: string[]
}

// Extract content from JSX/TSX files
export function extractContentFromJSX(filePath: string): ExtractedContent {
  const content = readFileSync(filePath, 'utf-8')
  
  // Extract title from JSX
  const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/i)
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled'
  
  // Extract headings
  const headingMatches = content.matchAll(/<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/gi)
  const headings = Array.from(headingMatches).map(match => ({
    level: parseInt(match[1]),
    text: match[2].trim(),
    id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }))
  
  // Extract code blocks
  const codeBlockMatches = content.matchAll(/<pre[^>]*><code[^>]*class="[^"]*language-(\w+)[^"]*"[^>]*>([^<]+)<\/code><\/pre>/gi)
  const codeBlocks = Array.from(codeBlockMatches).map(match => ({
    language: match[1],
    content: match[2].trim()
  }))
  
  // Extract text content (remove JSX tags)
  const textContent = content
    .replace(/<[^>]+>/g, ' ') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  // Extract tags from content
  const tags = extractTags(textContent)
  
  // Extract keywords
  const keywords = extractKeywords(textContent)
  
  return {
    title,
    content: textContent,
    headings,
    codeBlocks,
    tags,
    keywords
  }
}

// Extract tags from content
function extractTags(content: string): string[] {
  const tagPatterns = [
    /deployment/gi,
    /contract/gi,
    /wallet/gi,
    /hook/gi,
    /mainnet/gi,
    /testnet/gi,
    /troubleshooting/gi,
    /example/gi,
    /tutorial/gi,
    /api/gi,
    /cli/gi,
    /yarn/gi,
    /typescript/gi,
    /react/gi,
    /nextjs/gi,
    /stellar/gi,
    /soroban/gi
  ]
  
  const tags = new Set<string>()
  
  tagPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      const match = content.match(pattern)
      if (match) {
        tags.add(match[0].toLowerCase())
      }
    }
  })
  
  return Array.from(tags)
}

// Extract keywords from content
function extractKeywords(content: string): string[] {
  // Common technical terms
  const technicalTerms = [
    'callReadMethod',
    'callWriteMethod',
    'useDynamicContracts',
    'useWallet',
    'deploy:testnet',
    'deploy:mainnet',
    'yarn setup',
    'yarn dev',
    'constructor',
    'bindings',
    'metadata',
    'RPC',
    'endpoint',
    'transaction',
    'address',
    'keypair',
    'freighter',
    'albedo',
    'xbull',
    'rabet'
  ]
  
  const keywords = new Set<string>()
  
  technicalTerms.forEach(term => {
    if (content.toLowerCase().includes(term.toLowerCase())) {
      keywords.add(term)
    }
  })
  
  return Array.from(keywords)
}

// Get all documentation files
export function getAllDocFiles(docsDir: string): string[] {
  const files: string[] = []
  
  function traverseDir(dir: string) {
    const items = readdirSync(dir)
    
    for (const item of items) {
      const fullPath = join(dir, item)
      const stat = statSync(fullPath)
      
      if (stat.isDirectory()) {
        traverseDir(fullPath)
      } else if (item.endsWith('.tsx') && item !== 'layout.tsx') {
        files.push(fullPath)
      }
    }
  }
  
  traverseDir(docsDir)
  return files
}

// Generate search index from all documentation files
export function generateSearchIndex(docsDir: string) {
  const files = getAllDocFiles(docsDir)
  const searchableContent: ExtractedSearchableContent[] = []
  
  files.forEach((filePath, index) => {
    try {
      const extracted = extractContentFromJSX(filePath)
      const relativePath = filePath.replace(docsDir, '').replace('.tsx', '')
      
      searchableContent.push({
        id: `doc-${index}`,
        title: extracted.title,
        href: `/docs${relativePath}`,
        excerpt: extracted.content.substring(0, 200) + '...',
        content: extracted.content,
        section: getSectionFromPath(relativePath),
        tags: extracted.tags,
        category: getCategoryFromPath(relativePath),
        difficulty: getDifficultyFromContent(extracted.content),
        lastModified: new Date(),
        popularity: Math.floor(Math.random() * 100),
        keywords: extracted.keywords,
        codeBlocks: extracted.codeBlocks,
        headings: extracted.headings
      })
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error)
    }
  })
  
  return searchableContent
}

// Get section from file path
function getSectionFromPath(path: string): string {
  if (path.includes('getting-started') || path.includes('installation')) {
    return 'Getting Started'
  } else if (path.includes('dynamic-contracts') || path.includes('hooks') || path.includes('wallets')) {
    return 'Core Concepts'
  } else if (path.includes('examples')) {
    return 'Examples'
  } else if (path.includes('troubleshooting') || path.includes('api-reference')) {
    return 'Reference'
  } else {
    return 'Guides'
  }
}

// Get category from file path
function getCategoryFromPath(path: string): 'guide' | 'example' | 'reference' | 'tutorial' {
  if (path.includes('examples')) {
    return 'example'
  } else if (path.includes('troubleshooting') || path.includes('api-reference')) {
    return 'reference'
  } else if (path.includes('getting-started')) {
    return 'tutorial'
  } else {
    return 'guide'
  }
}

// Get difficulty from content
function getDifficultyFromContent(content: string): 'beginner' | 'intermediate' | 'advanced' {
  const lowerContent = content.toLowerCase()
  
  if (lowerContent.includes('beginner') || lowerContent.includes('getting started') || lowerContent.includes('quick start')) {
    return 'beginner'
  } else if (lowerContent.includes('advanced') || lowerContent.includes('complex') || lowerContent.includes('expert')) {
    return 'advanced'
  } else {
    return 'intermediate'
  }
}
