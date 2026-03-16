'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  installmentPrice?: number | null
  image?: string
}

export function ProductCard({ name, slug, price, installmentPrice, image }: ProductCardProps) {
  const displayImage = image || (name.includes('iPhone') ? '/assets/images/iphone_15.png' : name.includes('Mac') ? '/assets/images/macbook_pro.png' : '/assets/images/hero_laptop.png')

  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-surface-2 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-hover)] hover:border-primary/30">
      {/* Subtle Glow Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent-2/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl transition duration-500 pointer-events-none" />
      
      <Link href={`/catalog/${slug}`} className="relative z-10 block">
        <div className="relative mb-6 aspect-square overflow-hidden rounded-[2rem] bg-surface border border-white/5">
          <Image 
            src={displayImage} 
            alt={name} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Top Selection Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-[0.2em] text-primary border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Premium Choice
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-syne line-clamp-1 font-bold text-xl text-text-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex flex-col">
            <span className="font-jetbrains text-2xl font-black tracking-tight text-text-1">
              {formatPrice(price)}
            </span>
            {installmentPrice && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-3 mt-1">
                от {formatPrice(installmentPrice)} <span className="text-primary">/ мес</span>
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="relative z-10 mt-6 flex gap-3">
        <Button variant="gradient" size="sm" className="w-full rounded-xl h-11 font-bold shadow-lg" onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/${slug}`;
        }}>
          Заказать
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-xl h-11 font-bold border-white/5 hover:bg-white/5" asChild>
          <Link href={`/catalog/${slug}`}>Инфо</Link>
        </Button>
      </div>
    </div>
  )
}
