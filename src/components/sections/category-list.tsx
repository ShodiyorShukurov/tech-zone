import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export async function CategoryList() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  })

  const imageMap: Record<string, string> = {
    'iphone': '/assets/images/category_iphones.png',
    'macbook': '/assets/images/category_macbooks.png',
    'accessories': '/assets/images/category_accessories.png',
  }

  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <h2 className="font-syne text-4xl font-bold tracking-tight text-text-1">Explore Categories</h2>
            <p className="text-text-2 font-dm-sans">Find the perfect tech for your lifestyle.</p>
          </div>
          <Link href="/catalog" className="group flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-accent-2 transition-colors">
            Full Catalog <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => {
            const displayImage = imageMap[category.slug] || '/assets/images/hero_laptop.png'
            return (
              <Link
                key={category.id}
                href={`/catalog?category=${category.slug}`}
                className="group relative flex flex-col items-center gap-6 rounded-[2rem] bg-surface-2 p-8 text-center border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-hover)] hover:border-primary/30"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-surface border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/5 overflow-hidden">
                  <img 
                    src={displayImage} 
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" 
                  />
                  <div className="absolute inset-x-0 -bottom-4 h-8 w-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-text-1 mb-1">{category.name}</h3>
                  <p className="font-jetbrains text-[10px] uppercase tracking-widest text-text-3 font-bold">{category._count.products} Products</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
