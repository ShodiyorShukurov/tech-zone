'use client'

import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Truck, CreditCard, ChevronRight, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { LeadForm } from '@/components/forms/lead-form'

interface ProductDetailProps {
  product: any
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [modalType, setModalType] = useState<'PRODUCT' | 'INSTALLMENT' | null>(null)
  const [activeTab, setActiveTab] = useState<'DESC' | 'SPECS'>('DESC')
  const [count, setCount] = useState(1)

  const productImages: Record<string, string> = {
    'iPhone 15 Pro Max': '/assets/images/iphone_15.png',
    'MacBook Pro 14" M3': '/assets/images/macbook_pro.png',
  }

  const primaryImage = productImages[product.name] || '/assets/images/hero_laptop.png'
  const specs = product.specs ? JSON.parse(product.specs) : {}

  return (
    <div className="bg-[#0A0A0F] text-text-1">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start mb-24">
        {/* Premium Gallery */}
        <div className="space-y-6 top-24 lg:sticky">
          <div className="aspect-[4/5] rounded-[3rem] bg-surface-2 flex items-center justify-center overflow-hidden border border-white/5 shadow-[var(--glow-product)] group relative">
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
             <img 
               src={primaryImage} 
               alt={product.name} 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-surface border border-white/5 flex items-center justify-center cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5 overflow-hidden group">
                <img 
                  src={primaryImage} 
                  alt={`${product.name} View ${i}`} 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 group">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{product.category?.name}</span>
            </div>
            <h1 className="font-syne text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
                {product.name}
            </h1>
            
            <div className="flex items-center gap-8 mb-10 pb-8 border-b border-white/5">
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-text-3">Full Price</span>
                <span className="font-jetbrains text-4xl font-black text-primary tracking-tighter">
                    {formatPrice(product.price)}
                </span>
              </div>
              {product.installmentPrice && (
                <div className="p-4 rounded-2xl bg-surface-2 border border-white/5 space-y-1">
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-accent-2">Installment Plan</span>
                  <span className="font-jetbrains text-xl font-bold text-text-1">
                    from {formatPrice(product.installmentPrice)} <span className="text-sm font-medium text-text-3">/mo</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            <div className="flex items-center gap-6">
                <div className="inline-flex items-center gap-4 bg-surface-2 border border-white/5 p-1 rounded-full">
                    <button 
                        onClick={() => setCount(Math.max(1, count - 1))}
                        className="h-12 w-12 rounded-full flex items-center justify-center text-text-2 hover:bg-white/5 hover:text-text-1 transition-colors"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-jetbrains text-lg font-bold w-6 text-center">{count}</span>
                    <button 
                        onClick={() => setCount(count + 1)}
                        className="h-12 w-12 rounded-full flex items-center justify-center text-text-2 hover:bg-white/5 hover:text-text-1 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                <Button variant="gradient" size="lg" className="flex-1 rounded-full h-14 shadow-cta" onClick={() => setModalType('PRODUCT')}>
                    Leave Request
                </Button>
            </div>
            <Button variant="outline" size="lg" className="w-full rounded-full h-14 border-white/10" onClick={() => setModalType('INSTALLMENT')}>
                Apply for Installment
            </Button>
          </div>

          {/* Quick Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-y border-white/5">
            <div className="flex flex-col gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-text-3">1 Year Warranty</span>
            </div>
            <div className="flex flex-col gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-text-3">Fast Delivery</span>
            </div>
            <div className="flex flex-col gap-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-text-3">Trade-In OK</span>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="space-y-8">
            <div className="flex items-center gap-8 border-b border-white/5">
                {[
                    { id: 'DESC', label: 'Description' },
                    { id: 'SPECS', label: 'Specifications' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "pb-4 text-xs font-bold uppercase tracking-widest transition-all relative",
                            activeTab === tab.id ? "text-primary" : "text-text-3 hover:text-text-1"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(79,142,247,0.5)]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="min-h-[200px]">
              {activeTab === 'DESC' ? (
                <div className="font-dm-sans text-text-2 leading-relaxed text-lg">
                  {product.description}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-4 border-b border-white/5 group">
                      <span className="text-sm font-medium text-text-3 uppercase tracking-widest transition-colors group-hover:text-text-2">{key}</span>
                      <span className="text-base font-bold text-text-1">{String(value)}</span>
                    </div>
                  ))}
                  {Object.keys(specs).length === 0 && (
                     <p className="text-text-3 italic text-sm">No specialized hardware specifications listed.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        title={modalType === 'INSTALLMENT' ? 'Apply for Installment' : 'Leave Request'}
      >
        <LeadForm 
          type={modalType || 'PRODUCT'} 
          productName={product.name}
          onSuccess={() => setModalType(null)} 
        />
      </Modal>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
