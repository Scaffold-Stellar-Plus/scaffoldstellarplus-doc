import { DocsSidebar } from '@/components/docs-sidebar'
import { DocsMobileNav } from '@/components/docs-mobile-nav'
import { Footer } from '@/components/footer'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DocsSidebar />
      <DocsMobileNav />
      <div className="lg:pl-64">
        <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 pb-0">
          {children}
        </article>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </div>
  )
}
