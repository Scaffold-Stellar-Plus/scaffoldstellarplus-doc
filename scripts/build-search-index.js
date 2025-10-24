#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// This script generates a search index from all documentation files
// Run with: node scripts/build-search-index.js

const docsDir = path.join(__dirname, '../src/app/docs')
const outputFile = path.join(__dirname, '../src/lib/generated-search-index.ts')

console.log('🔍 Building search index...')

// Advanced JSX content extraction using sophisticated regex patterns
function extractContentFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Extract title from JSX - more sophisticated pattern
    const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                      content.match(/<title[^>]*>([^<]+)<\/title>/i) ||
                      content.match(/export\s+default\s+function\s+(\w+)/i)
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled'
    
    // Extract headings with better regex patterns
    const headingMatches = content.matchAll(/<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/gi)
    const headings = Array.from(headingMatches).map(match => ({
      level: parseInt(match[1]),
      text: match[2].trim(),
      id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }))
    
    // Extract code blocks with better pattern matching
    const codeBlockMatches = content.matchAll(/<pre[^>]*><code[^>]*class="[^"]*language-(\w+)[^"]*"[^>]*>([^<]+)<\/code><\/pre>/gi)
    const codeBlocks = Array.from(codeBlockMatches).map(match => ({
      language: match[1],
      content: match[2].trim()
    }))
    
    // Extract JSX text content
    const jsxTextMatches = content.matchAll(/<[^>]+>([^<]+)<\/[^>]+>/gi)
    const jsxTexts = Array.from(jsxTextMatches)
      .map(match => match[1].trim())
      .filter(text => text.length > 3)
    
    // Extract string literals from JSX attributes and content
    const stringMatches = content.matchAll(/"([^"]{10,})"/g)
    const strings = Array.from(stringMatches)
      .map(match => match[1].trim())
      .filter(text => text.length > 10)
    
    // Extract template literals
    const templateMatches = content.matchAll(/`([^`]{10,})`/g)
    const templates = Array.from(templateMatches)
      .map(match => match[1].trim())
      .filter(text => text.length > 10)
    
    // Combine all text content intelligently
    const allTexts = [
      ...jsxTexts,
      ...strings,
      ...templates
    ].filter(text => text.length > 5)
    
    // Remove JSX tags but preserve content
    const cleanContent = content
      .replace(/<[^>]+>/g, ' ') // Remove HTML/JSX tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[{}]/g, ' ') // Remove JSX braces
      .replace(/import\s+.*?from\s+['"][^'"]+['"];?/g, ' ') // Remove imports
      .replace(/export\s+.*?;/g, ' ') // Remove exports
      .replace(/const\s+\w+\s*=\s*[^;]+;/g, ' ') // Remove variable declarations
      .replace(/function\s+\w+\s*\([^)]*\)\s*{[^}]*}/g, ' ') // Remove function declarations
      .trim()
    
    // Combine with extracted texts
    const fullContent = [cleanContent, ...allTexts]
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
    
    return {
      title,
      content: fullContent,
      headings,
      codeBlocks
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
    return null
  }
}


// Get all documentation files
function getAllDocFiles(dir) {
  const files = []
  
  function traverseDir(currentDir) {
    const items = fs.readdirSync(currentDir)
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        traverseDir(fullPath)
      } else if (item.endsWith('.tsx') && item !== 'layout.tsx') {
        files.push(fullPath)
      }
    }
  }
  
  traverseDir(dir)
  return files
}

// Generate search index
function generateSearchIndex() {
  const files = getAllDocFiles(docsDir)
  const searchableContent = []
  
  files.forEach((filePath, index) => {
    const extracted = extractContentFromFile(filePath)
    if (extracted) {
      const relativePath = filePath.replace(docsDir, '').replace('.tsx', '')
      
      // Determine section and category
      let section = 'Guides'
      let category = 'guide'
      
      if (relativePath.includes('getting-started') || relativePath.includes('installation')) {
        section = 'Getting Started'
        category = 'tutorial'
      } else if (relativePath.includes('dynamic-contracts') || relativePath.includes('hooks') || relativePath.includes('wallets')) {
        section = 'Core Concepts'
        category = 'guide'
      } else if (relativePath.includes('examples')) {
        section = 'Examples'
        category = 'example'
      } else if (relativePath.includes('troubleshooting') || relativePath.includes('api-reference')) {
        section = 'Reference'
        category = 'reference'
      }
      
      // Extract tags from content
      const tags = []
      const content = extracted.content.toLowerCase()
      
      if (content.includes('deployment')) tags.push('deployment')
      if (content.includes('contract')) tags.push('contract')
      if (content.includes('wallet')) tags.push('wallet')
      if (content.includes('hook')) tags.push('hook')
      if (content.includes('mainnet')) tags.push('mainnet')
      if (content.includes('testnet')) tags.push('testnet')
      if (content.includes('troubleshooting')) tags.push('troubleshooting')
      if (content.includes('example')) tags.push('example')
      if (content.includes('tutorial')) tags.push('tutorial')
      if (content.includes('api')) tags.push('api')
      if (content.includes('cli')) tags.push('cli')
      if (content.includes('yarn')) tags.push('yarn')
      if (content.includes('typescript')) tags.push('typescript')
      if (content.includes('react')) tags.push('react')
      if (content.includes('nextjs')) tags.push('nextjs')
      if (content.includes('stellar')) tags.push('stellar')
      if (content.includes('soroban')) tags.push('soroban')
      
      // Extract keywords
      const keywords = []
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
      
      technicalTerms.forEach(term => {
        if (content.includes(term.toLowerCase())) {
          keywords.push(term)
        }
      })
      
      // Determine difficulty
      let difficulty = 'intermediate'
      if (content.includes('beginner') || content.includes('getting started') || content.includes('quick start')) {
        difficulty = 'beginner'
      } else if (content.includes('advanced') || content.includes('complex') || content.includes('expert')) {
        difficulty = 'advanced'
      }
      
      searchableContent.push({
        id: `doc-${index}`,
        title: extracted.title,
        href: `/docs${relativePath}`,
        excerpt: extracted.content.substring(0, 200) + '...',
        content: extracted.content,
        section,
        tags,
        category,
        difficulty,
        lastModified: new Date(),
        popularity: Math.floor(Math.random() * 100),
        keywords,
        codeBlocks: extracted.codeBlocks,
        headings: extracted.headings
      })
    }
  })
  
  return searchableContent
}

// Generate the search index
const searchableContent = generateSearchIndex()

// Create the TypeScript file
const tsContent = `// Auto-generated search index
// Generated on: ${new Date().toISOString()}
// Do not edit this file manually

export const generatedSearchableContent = ${JSON.stringify(searchableContent, null, 2)};
`

// Write the file
fs.writeFileSync(outputFile, tsContent)

console.log(`✅ Search index generated with ${searchableContent.length} items`)
console.log(`📁 Output: ${outputFile}`)
console.log('🚀 Search index is ready!')
