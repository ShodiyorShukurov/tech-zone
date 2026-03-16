import Link from 'next/link'
import { Instagram, Facebook, Send, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-bg pt-20 pb-12 overflow-hidden">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tighter text-text-1">
              TECH-ZONE
            </Link>
            <p className="text-base text-text-2 leading-relaxed">
              Ваш премиальный партнер в мире электроники. Поставляем только лучшее для тех, кто не идет на компромиссы.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Send, href: '#' }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-2 hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-text-3">Каталог</h3>
            <ul className="space-y-3 text-base text-text-2">
              <li><Link href="/catalog" className="hover:text-primary transition-colors">iPhone</Link></li>
              <li><Link href="/catalog" className="hover:text-primary transition-colors">MacBook</Link></li>
              <li><Link href="/catalog" className="hover:text-primary transition-colors">iPad</Link></li>
              <li><Link href="/catalog" className="hover:text-primary transition-colors">Аксессуары</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-text-3">Информация</h3>
            <ul className="space-y-3 text-base text-text-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">О компании</Link></li>
              <li><Link href="/installment" className="hover:text-primary transition-colors">Рассрочка</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Доставка</Link></li>
              <li><Link href="/guarantee" className="hover:text-primary transition-colors">Гарантия</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-text-3">Связь</h3>
            <ul className="space-y-4 text-base text-text-1">
              <li className="flex items-start gap-3 group">
                <div className="h-8 w-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <MapPin className="h-4 w-4" />
                </div>
                <span className="text-text-2">г. Ташкент, ул. Амира Темура, 108</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+998901234567" className="hover:text-primary transition-colors font-bold">+998 90 123 45 67</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:info@techzone.uz" className="hover:text-primary transition-colors">info@techzone.uz</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-text-3 tracking-widest uppercase">
          <p>© {currentYear} TECH-ZONE. WORLD CLASS TECHNOLOGY RETAILER.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-text-2 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-text-2 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
