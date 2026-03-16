import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/ui/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react'

interface CatalogPageProps {
  searchParams: {
    category?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    q?: string
  }
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { category, minPrice, maxPrice, sort, q } = searchParams

  const categories = await prisma.category.findMany()

  const products = await prisma.product.findMany({
    where: {
      categoryId: category ? {
        equals: (await prisma.category.findUnique({ where: { slug: category } }))?.id
      } : undefined,
      price: {
        gte: minPrice ? parseFloat(minPrice) : undefined,
        lte: maxPrice ? parseFloat(maxPrice) : undefined,
      },
      OR: q ? [
        { name: { contains: q } },
        { description: { contains: q } }
      ] : undefined
    },
    orderBy: sort === 'price_asc' ? { price: 'asc' } : sort === 'price_desc' ? { price: 'desc' } : { createdAt: 'desc' }
  })

  return (
    <div className="bg-[#0A0A0F] min-h-screen text-text-1">
      <div className="container py-20">
        {/* Header Section */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between mb-16">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-3 hover:text-primary transition-colors">
              <ArrowLeft className="h-3 w-3" /> Back to Home
            </Link>
            <h1 className="font-syne text-5xl md:text-7xl font-bold tracking-tight">Catalog</h1>
            <p className="font-dm-sans text-text-2">Discover our curated selection of {products.length} premium devices</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-3 group-focus-within:text-primary transition-colors" />
              <Input placeholder="Search devices..." className="pl-12 rounded-full h-14 bg-surface-2 border-white/5 focus-visible:ring-primary/20" />
            </div>
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 border-white/10 hover:bg-white/5 lg:hidden">
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block space-y-12">
            <div className="space-y-6">
              <h3 className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-text-3">Categories</h3>
              <div className="flex flex-col gap-4">
                <Link
                  href="/catalog"
                  className={cn(
                    "text-base font-medium transition-all hover:translate-x-1",
                    !category ? "text-primary font-bold" : "text-text-2 hover:text-text-1"
                  )}
                >
                  All Tech
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/catalog?category=${cat.slug}`}
                    className={cn(
                      "text-base font-medium transition-all hover:translate-x-1",
                      category === cat.slug ? "text-primary font-bold" : "text-text-2 hover:text-text-1"
                    )}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-text-3">Price Range (USD)</h3>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                   <Input type="number" placeholder="Min" className="h-12 bg-surface-2 border-white/5 font-jetbrains text-sm" />
                </div>
                <div className="w-2 h-[1px] bg-text-3" />
                <div className="relative flex-1">
                   <Input type="number" placeholder="Max" className="h-12 bg-surface-2 border-white/5 font-jetbrains text-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-text-3">Sort By</h3>
              <select className="flex h-12 w-full rounded-[var(--radius-md)] border border-white/5 bg-surface-2 px-4 py-2 text-base font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 transition-all appearance-none cursor-pointer text-text-1">
                <option value="newest">Latest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
            
            <Button variant="gradient" className="w-full h-14 rounded-full">Apply Filters</Button>
          </aside>

          {/* Product Grid */}
          <div className="min-h-[400px]">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, i) => (
                  <div key={product.id} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      slug={product.slug}
                      price={product.price}
                      installmentPrice={product.installmentPrice}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] bg-surface-2 border border-white/5 border-dashed">
                <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                   <Search className="h-10 w-10 text-text-3" />
                </div>
                <p className="text-xl font-bold text-text-1 mb-2">No devices found</p>
                <p className="text-text-2 mb-8">Try adjusting your filters or search query.</p>
                <Button variant="outline" className="rounded-full h-12 px-8" asChild>
                  <Link href="/catalog">Reset All Filters</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ')
}
