'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-[#0A0A0F]">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-2/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,142,247,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="container relative z-10 pt-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            {/* Delivery Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 mb-8 backdrop-blur-md">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary shadow-[0_0_10px_rgba(79,142,247,0.5)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-text-1">
                Fast delivery across Uzbekistan
              </span>
            </div>

            <h1 className="font-syne text-[clamp(44px,8vw,80px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-text-1 mb-8">
              Future of <br />
              <span className="bg-gradient-to-r from-primary to-accent-2 bg-clip-text text-transparent">Electronics.</span>
            </h1>

            <p className="max-w-[520px] font-dm-sans text-lg md:text-xl text-text-2 leading-relaxed mb-10">
              Discover a curated collection of world-class technology. Premium service, official warranty, and flexible installments for the savvy customer.
            </p>

            <div className="flex flex-wrap gap-5 mb-16">
              <Button variant="gradient" size="lg" className="rounded-full shadow-cta group" asChild>
                <Link href="/catalog" className="flex items-center gap-2">
                  View Catalog <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/10 text-text-1 hover:bg-white/5" asChild>
                <Link href="/installment">Installment Plan</Link>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-12 py-6 border-t border-white/5">
              {[
                { label: 'Original Products', value: '2.5k+' },
                { label: 'Happy Clients', value: '15k+' },
                { label: 'Store Branches', value: '12' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-jetbrains text-xl font-bold text-text-1 tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-text-3">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Luxury Product Frame */}
            <div className="relative animate-levitate">
              <div className="relative z-10 h-[600px] w-[420px] rounded-[3.5rem] bg-surface-2 border border-white/10 shadow-[var(--glow-product)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent z-10 pointer-events-none" />
                <Image 
                  src="/assets/images/hero_laptop.png" 
                  alt="Premium Tech Showcase" 
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute bottom-12 inset-x-0 text-center z-20">
                    <span className="text-text-1 font-syne text-sm font-bold tracking-[0.3em] uppercase opacity-50">Experimental Tech</span>
                </div>
              </div>
              {/* Floating Accents */}
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-[80px]" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent-2/10 blur-[80px]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-3">Explore</span>
        <ChevronDown className="h-5 w-5 text-primary" />
      </motion.div>
    </section>
  )
}
