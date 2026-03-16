'use client'

import Link from 'next/link'
import { Search, User, Menu, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Каталог', href: '/catalog' },
    { name: 'Рассрочка', href: '/installment' },
    { name: 'Филиалы', href: '/branches' },
    { name: 'Контакты', href: '/contacts' },
  ]

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "h-[68px] glass border-b border-white/5 bg-bg/80" : "h-[80px] bg-transparent"
    )}>
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent-2 bg-clip-text text-transparent transition-all group-hover:opacity-80">
              TECH-ZONE
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="relative text-sm font-medium text-text-2 hover:text-text-1 transition-colors after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 text-sm font-semibold text-text-2">
            <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center border border-border">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <a href="tel:+998901234567" className="hover:text-text-1 transition-colors">+998 90 123 45 67</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-text-2 hover:text-text-1 transition-all">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-text-2 hover:text-text-1 transition-all">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="gradient" size="md" className="hidden md:flex rounded-full px-8">
              Оставить заявку
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-text-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-[60px] z-50 bg-bg/95 backdrop-blur-xl lg:hidden transition-all duration-500",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="container py-12 flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-4xl font-bold hover:text-primary transition-all"
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-8 border-t border-border mt-auto">
            <p className="text-text-2 mb-4">Наш телефон:</p>
            <a href="tel:+998901234567" className="text-3xl font-bold text-text-1">
              +998 90 123 45 67
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
