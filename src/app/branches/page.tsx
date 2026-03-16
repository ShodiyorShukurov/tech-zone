import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BranchesPage() {
  const branches = [
    {
      name: 'Main Flagship Showroom',
      address: '108 Amir Temur Ave, Tashkent',
      orientation: 'Landmark: Badamzar Metro Station',
      phone: '+998 90 123 45 67',
      hours: 'Mon-Sat: 09:00 - 20:00, Sun: 10:00 - 18:00',
    },
    {
      name: 'Malika Digital Hub',
      address: 'Malika Shopping Center, Block B, Tashkent',
      orientation: 'Landmark: Boutique B-23',
      phone: '+998 90 987 65 43',
      hours: 'Daily: 10:00 - 19:00',
    },
    {
      name: 'Abu Sakhiy Branch',
      address: 'Abu Sakhiy Trading Center, Tashkent',
      orientation: 'Landmark: Electronics Row, Shop #15',
      phone: '+998 90 333 22 11',
      hours: 'Tue-Sun: 08:00 - 17:00 (Mon Closed)',
    }
  ]

  return (
    <div className="bg-[#0A0A0F] min-h-screen text-text-1">
      <div className="container py-24 space-y-20">
        <header className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Luxury Retail Network</span>
          </div>
          <h1 className="font-syne text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
            Our <span className="bg-gradient-to-r from-primary to-accent-2 bg-clip-text text-transparent">Spaces.</span>
          </h1>
          <p className="font-dm-sans text-xl text-text-2 max-w-2xl leading-relaxed">
            Visit our premium locations to experience the latest technology first-hand and receive expert consultations from our tech specialists.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">
          <div className="min-h-[600px] rounded-[3.5rem] bg-surface-2 border border-white/5 overflow-hidden relative group">
             {/* Interactive Map Placeholder Frame */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,142,247,0.05)_0%,transparent_70%)]" />
             <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="glass p-12 rounded-[2.5rem] border border-white/10 shadow-2xl text-center max-w-sm backdrop-blur-2xl">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-levitate shadow-[0_0_30px_rgba(79,142,247,0.2)]">
                        <MapPin className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="font-syne text-2xl font-bold text-text-1 mb-4">Interactive Map</h4>
                    <p className="font-dm-sans text-text-2 text-sm leading-relaxed mb-8">
                       Explore our network across Tashkent. High-performance Yandex/Google Maps API integration ready for deployment.
                    </p>
                    <Button variant="outline" className="rounded-full h-12 px-8 border-white/10">Expand Experience</Button>
                </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 h-40 w-40 bg-accent/10 blur-[100px]" />
             <div className="absolute bottom-0 left-0 h-40 w-40 bg-accent-2/10 blur-[100px]" />
          </div>

          <div className="space-y-8">
            <h3 className="font-syne text-sm font-bold uppercase tracking-[0.3em] text-text-3 mb-4">Explore Branches</h3>
            {branches.map((branch, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-surface border border-white/5 transition-all duration-500 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <h3 className="font-syne text-2xl font-bold text-text-1 mb-6 group-hover:text-primary transition-colors">{branch.name}</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-2xl bg-surface-2 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-dm-sans text-text-1 font-bold text-sm leading-snug mb-1">{branch.address}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-3">{branch.orientation}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 shrink-0 rounded-2xl bg-surface-2 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors">
                        <Phone className="h-5 w-5" />
                    </div>
                    <span className="font-jetbrains text-base font-bold text-text-1">{branch.phone}</span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 shrink-0 rounded-2xl bg-surface-2 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors">
                        <Clock className="h-5 w-5" />
                    </div>
                    <span className="font-dm-sans text-xs font-bold text-text-2">{branch.hours}</span>
                  </div>
                </div>

                <div className="mt-8">
                   <Button variant="secondary" className="w-full rounded-2xl h-12 text-xs uppercase tracking-widest font-black" asChild>
                      <Link href={`https://yandex.com/maps/?text=${encodeURIComponent(branch.address)}`} target="_blank">
                        Get Directions <Navigation className="ml-2 h-4 w-4" />
                      </Link>
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
