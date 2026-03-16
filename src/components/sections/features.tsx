import { ShieldCheck, Truck, CreditCard, RotateCcw } from 'lucide-react'

const features = [
  {
    title: 'Official Warranty',
    description: 'We provide full manufacturer warranty on every genuine product we sell.',
    icon: ShieldCheck,
  },
  {
    title: 'Express Delivery',
    description: 'Tashkent delivery in 2 hours. Global Uzbekistan shipping within 24 hours.',
    icon: Truck,
  },
  {
    title: '0% Installment',
    description: 'Tech now, pay later. Up to 12 months with no interest or hidden fees.',
    icon: CreditCard,
  },
  {
    title: 'Trade-In Program',
    description: 'Upgrade to the latest tech with up to 70% value for your old device.',
    icon: RotateCcw,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-start gap-6 p-8 rounded-[2.5rem] bg-surface-2 border border-white/5 transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-white/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-accent-2">
                <feature.icon className="h-8 w-8" />
                <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-3">
                <h3 className="font-syne text-xl font-bold text-text-1">{feature.title}</h3>
                <p className="font-dm-sans text-sm text-text-2 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
