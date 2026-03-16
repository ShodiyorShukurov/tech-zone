import { Button } from '@/components/ui/button'
import { LeadForm } from '@/components/forms/lead-form'
import { CheckCircle2, CreditCard, ShieldCheck, Zap } from 'lucide-react'

export default function InstallmentPage() {
  const steps = [
    { title: 'Select Device', description: 'Find the perfect piece of technology in our curated catalog.' },
    { title: 'Fill Application', description: 'Complete the short digital form with your basic details.' },
    { title: 'Instant Review', description: 'Our partners review your request in less than 15 minutes.' },
    { title: 'Receive Tech', description: 'Get your device delivered to your door within 24 hours.' },
  ]

  const benefits = [
    { icon: CheckCircle2, title: '0% Interest', desc: 'Transparent installments with absolutely no hidden fees.' },
    { icon: CreditCard, title: 'Up to 12 Months', desc: 'Flexible payment schedules tailored to your lifestyle.' },
    { icon: ShieldCheck, title: 'Passport Only', desc: 'Hassle-free application with minimal documentation.' },
    { icon: Zap, title: 'Fast Approval', desc: 'Secure your future tech with lightning-fast approval times.' },
  ]

  return (
    <div className="bg-[#0A0A0F] min-h-screen text-text-1">
      <div className="container py-24 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Financial Freedom</span>
          </div>
          <h1 className="font-syne text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
            Own the future. <br /><span className="bg-gradient-to-r from-primary to-accent-2 bg-clip-text text-transparent">Pay later.</span>
          </h1>
          <p className="font-dm-sans text-xl text-text-2 max-w-2xl mx-auto leading-relaxed">
            Experience premium technology today without the immediate financial burden. Flexible installments via our world-class partners.
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-surface-2 border border-white/5 flex flex-col items-center text-center space-y-6 transition-all duration-500 hover:border-primary/30 hover:-translate-y-2">
              <div className="relative p-4 rounded-2xl bg-surface border border-white/5 text-primary group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                <benefit.icon className="h-10 w-10 transition-colors duration-500 group-hover:text-accent-2" />
                <div className="absolute inset-x-0 -bottom-4 h-8 w-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-3">
                <h3 className="font-syne text-xl font-bold text-text-1">{benefit.title}</h3>
                <p className="font-dm-sans text-sm text-text-2 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Workflow Section */}
        <section className="relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-surface to-surface-2 border border-white/5 p-12 md:p-24 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center">
            <div className="space-y-12">
              <h2 className="font-syne text-4xl md:text-5xl font-bold">How it Works</h2>
              <div className="space-y-10">
                {steps.map((step, i) => (
                  <div key={i} className="group flex gap-8">
                    <div className="relative shrink-0">
                        <div className="h-14 w-14 rounded-full bg-surface-2 border border-white/5 flex items-center justify-center font-jetbrains text-xl font-black text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(79,142,247,0.5)]">
                            {i + 1}
                        </div>
                        {i < steps.length - 1 && (
                            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-b from-primary/50 to-transparent" />
                        )}
                    </div>
                    <div>
                      <h4 className="font-syne text-xl font-bold mb-2 group-hover:text-primary transition-colors">{step.title}</h4>
                      <p className="font-dm-sans text-text-2 text-base leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="fade-up">
              <div className="p-8 md:p-12 rounded-[3.5rem] bg-surface border border-white/10 shadow-[var(--shadow-cta)] backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent-2 to-primary opacity-50" />
                <h3 className="font-syne text-3xl font-bold mb-8 text-center bg-gradient-to-r from-text-1 to-text-3 bg-clip-text text-transparent">Digital Application</h3>
                <LeadForm type="INSTALLMENT" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
