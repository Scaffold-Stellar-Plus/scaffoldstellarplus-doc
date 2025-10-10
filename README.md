# Scaffold Stellar Plus Documentation

Professional documentation website for [Scaffold Stellar Plus](https://github.com/Scaffold-Stellar-Plus/scaffoldstellarplus) - an enhanced, production-ready fullstack boilerplate for building Stellar Soroban smart contracts.

## 🎯 Features

### Landing Page
- **Hero Section** - Gradient animations, call-to-action buttons
- **Feature Highlights** - 4 key features with icons and hover effects
- **Code Examples** - Interactive code snippets showcasing the API
- **Responsive Design** - Mobile-first, works on all devices

### Documentation
- **MDX Support** - Write docs in Markdown with React components
- **Sidebar Navigation** - Organized structure with collapsible sections
- **Mobile Navigation** - Slide-in menu for mobile devices
- **Search Functionality** - Fast, keyboard-navigable search (⌘K)
- **Dark/Light Mode** - Automatic theme switching with system preference
- **Syntax Highlighting** - Beautiful code blocks with proper formatting

### Navigation
- **Responsive Navbar** - Links to Home, Docs, Examples, GitHub
- **Theme Toggle** - Switch between dark and light modes
- **Search Bar** - Quick access to documentation
- **Mobile Menu** - Hamburger menu for smaller screens

### Footer
- **Resource Links** - Documentation, Examples, External links
- **Community Links** - GitHub, Issues, License
- **Professional Layout** - Clean, organized footer design

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: Tailwind CSS v4
- **Content**: MDX for documentation pages
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **TypeScript**: Full type safety throughout
- **Fonts**: Inter font family

## 📁 Project Structure

```
scaffoldstellarplusdoc/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with theme provider
│   │   ├── page.tsx             # Landing page
│   │   ├── docs/
│   │   │   ├── layout.tsx       # Docs layout with sidebar
│   │   │   ├── page.mdx         # Introduction
│   │   │   ├── installation/page.mdx
│   │   │   ├── getting-started/page.mdx
│   │   │   ├── dynamic-contracts/page.mdx
│   │   │   ├── hooks/page.mdx
│   │   │   ├── wallets/page.mdx
│   │   │   ├── commands/page.mdx
│   │   │   ├── troubleshooting/page.mdx
│   │   │   └── examples/
│   │   │       ├── reading/page.mdx
│   │   │       └── writing/page.mdx
│   │   ├── examples/
│   │   │   └── page.tsx         # Examples overview
│   │   └── globals.css
│   ├── components/
│   │   ├── navbar.tsx           # Top navigation bar
│   │   ├── footer.tsx           # Footer with links
│   │   ├── button.tsx           # Button component
│   │   ├── theme-provider.tsx   # Dark/light theme provider
│   │   ├── docs-sidebar.tsx     # Desktop sidebar navigation
│   │   ├── docs-mobile-nav.tsx  # Mobile sidebar navigation
│   │   └── docs-search.tsx      # Search component
│   └── lib/
│       ├── utils.ts             # Utility functions (cn)
│       └── docs-config.ts       # Documentation navigation config
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── package.json
├── tsconfig.json
├── next.config.ts               # Next.js config with MDX
├── mdx-components.tsx           # MDX components config
└── README.md
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Lint

```bash
# Run ESLint
npm run lint
```

## 📖 Documentation Structure

### Getting Started
1. **Introduction** - Overview and key features
2. **Installation** - Setup prerequisites and steps
3. **Quick Start** - First contract interaction

### Core Concepts
1. **Dynamic Contract System** - Auto-detection explained
2. **Unified Hook System** - Using callReadMethod/callWriteMethod
3. **Multi-Wallet Support** - Wallet integration

### Guides
1. **Using Hooks** - Detailed hook usage
2. **CLI Commands** - All available commands
3. **Troubleshooting** - Common issues and solutions

### Examples
1. **Reading Contract Data** - Query examples
2. **Writing to Contracts** - Transaction examples

## 🔍 Search Functionality

The search component provides:
- **Keyboard Shortcut**: ⌘K (Mac) or Ctrl+K (Windows/Linux)
- **Real-time Results**: Instant search as you type
- **Keyboard Navigation**: Arrow keys to navigate results
- **ESC to Close**: Quick dismissal
- **Responsive Modal**: Works on all screen sizes

## 🌓 Dark Mode

Theme switching features:
- **System Preference**: Automatically matches OS theme
- **Manual Toggle**: Button in navbar
- **Persistent**: Remembers user preference
- **Smooth Transitions**: No flash on page load



