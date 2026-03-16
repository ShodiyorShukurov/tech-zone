import { Phone, Mail, MapPin, Instagram, Facebook, Send, Clock } from 'lucide-react'
import { LeadForm } from '@/components/forms/lead-form'

export default function ContactsPage() {
  const contactInfo = [
    { icon: Phone, title: 'Phone Support', value: '+998 90 123 45 67', sub: 'General Sales Department' },
    { icon: Mail, title: 'Email Address', value: 'info@techzone.uz', sub: 'For inquiries and partnership' },
    { icon: MapPin, title: 'Headquarters', value: '108 Amir Temur Ave, Tashkent', sub: 'Badamzar Metro Station' },
    { icon: Clock, title: 'Working Hours', value: 'Mon-Sat: 09:00 - 20:00', sub: 'Sunday: 10:00 - 18:00' },
  ]

  const socials = [
    { icon: Instagram, label: 'Instagram', link: '#' },
    { icon: Facebook, label: 'Facebook', link: '#' },
    { icon: Send, label: 'Telegram', link: '#' },
  ]

  return (
    <div className="bg-[#0A0A0F] min-h-screen text-text-1">
      <div className="container py-24 space-y-24">
        {/* Header Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Get in Touch</span>
          </div>
          <h1 className="font-syne text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
            Connect with <br /><span className="bg-gradient-to-r from-primary to-accent-2 bg-clip-text text-transparent">Excellence.</span>
          </h1>
          <p className="font-dm-sans text-xl text-text-2 max-w-2xl mx-auto leading-relaxed">
            Our specialists are standing by to assist with any technical inquiries or service requests. Choose your preferred method of communication.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="group flex items-start gap-6 p-8 rounded-[2.5rem] bg-surface-2 border border-white/5 transition-all duration-500 hover:border-primary/30">
                  <div className="relative p-4 rounded-2xl bg-surface border border-white/5 text-primary group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                    <item.icon className="h-6 w-6 transition-colors duration-500 group-hover:text-accent-2" />
                    <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-text-3 mb-2">{item.title}</h3>
                    <p className="font-jetbrains text-xl font-bold text-text-1 mb-1">{item.value}</p>
                    <p className="font-dm-sans text-xs text-text-3 font-medium">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 rounded-[2.5rem] bg-surface-2 border border-white/5 space-y-8">
              <h3 className="font-syne text-sm font-bold uppercase tracking-[0.3em] text-text-3">Social Ecosystem</h3>
              <div className="flex gap-6">
                {socials.map((social, i) => (
                  <a key={i} href={social.link} className="h-16 w-16 rounded-2xl border border-white/5 bg-surface flex items-center justify-center text-text-2 hover:bg-primary hover:text-white hover:shadow-[0_0_25px_rgba(79,142,247,0.4)] hover:-translate-y-2 transition-all duration-500">
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky top-32 fade-up">
            <div className="p-10 md:p-16 rounded-[4rem] bg-gradient-to-br from-surface to-surface-2 border border-white/10 shadow-[var(--shadow-cta)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none" />
                <div className="relative z-10">
                    <h2 className="font-syne text-4xl font-bold mb-4">Send a Message</h2>
                    <p className="font-dm-sans text-text-2 mb-10 leading-relaxed max-w-md">Have a specific inquiry? Fill out the secure form below and our team will respond within 2 hours.</p>
                    <LeadForm type="CALLBACK" className="grid grid-cols-1 md:grid-cols-2 gap-8 space-y-0" />
                </div>
                <div className="mt-12 flex items-center gap-4 py-8 border-t border-white/5">
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-text-3">Average response time: 14 minutes</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
