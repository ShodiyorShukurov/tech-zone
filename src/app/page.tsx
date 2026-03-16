import { Hero } from "@/components/sections/hero";
import { CategoryList } from "@/components/sections/category-list";
import { PopularProducts } from "@/components/sections/popular-products";
import { Features } from "@/components/sections/features";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <CategoryList />
      <PopularProducts />
      <Features />
      
      <section className="py-24 bg-[#0A0A0F]">
        <div className="container">
           <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-surface to-surface-2 border border-white/5 p-12 md:p-20 text-center">
             {/* Glow Accent */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none" />
             
             <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="font-syne text-4xl md:text-6xl font-bold mb-8 text-text-1">Installment. <br /><span className="text-primary">Zero compromise.</span></h2>
                <p className="font-dm-sans text-lg md:text-xl text-text-2 mb-12 opacity-80 leading-relaxed">
                  Get the technology you desire today and pay later. Interest-free installments for up to 12 months with instant approval.
                </p>
                
                <div className="grid grid-cols-3 gap-8 md:gap-12 text-center mb-12">
                  <div className="space-y-2">
                    <span className="font-jetbrains block text-3xl md:text-5xl font-black text-text-1">0%</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-text-3">Prepayment</span>
                  </div>
                  <div className="space-y-2">
                    <span className="font-jetbrains block text-3xl md:text-5xl font-black text-text-1">12</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-text-3">Months</span>
                  </div>
                  <div className="space-y-2">
                    <span className="font-jetbrains block text-3xl md:text-5xl font-black text-text-1">15</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-text-3">Min Approval</span>
                  </div>
                </div>

                <Button variant="gradient" size="lg" className="rounded-full shadow-cta h-14 px-12" asChild>
                  <Link href="/installment">Apply Now</Link>
                </Button>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
