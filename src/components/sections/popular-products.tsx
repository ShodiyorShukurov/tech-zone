import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/ui/product-card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export async function PopularProducts() {
  const products = await prisma.product.findMany({
    where: { popular: true },
    take: 8,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <h2 className="font-syne text-4xl font-bold tracking-tight text-text-1">Popular Picks</h2>
            <p className="text-text-2 font-dm-sans">Trending devices requested by our community.</p>
          </div>
          <Link href="/catalog" className="group flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-accent-2 transition-colors">
            View All <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="fade-up">
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
      </div>
    </section>
  )
}
