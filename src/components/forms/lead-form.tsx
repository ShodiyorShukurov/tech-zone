'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface LeadFormProps {
  type: 'CALLBACK' | 'INSTALLMENT' | 'PRODUCT'
  productName?: string
  className?: string
  onSuccess?: () => void
}

export function LeadForm({ type, productName, className, onSuccess }: LeadFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      type,
      name: formData.get('name'),
      phone: formData.get('phone'),
      productName,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      utm: {
        source: new URLSearchParams(window.location.search).get('utm_source'),
        medium: new URLSearchParams(window.location.search).get('utm_medium'),
        campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      }
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to submit form')

      setSuccess(true)
      if (onSuccess) setTimeout(onSuccess, 2000)
      
      // GTM Event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({
          event: 'form_submit',
          form_type: type,
          product_name: productName || 'General',
        })
      }
    } catch (err) {
      setError('Произошла ошибка. Пожалуйста, попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Спасибо!</h3>
        <p className="text-muted-foreground">Ваша заявка принята. Менеджер свяжется с вами в ближайшее время.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Ваше имя</label>
        <Input name="name" placeholder="Алексей" disabled={loading} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Телефон *</label>
        <Input 
          name="phone" 
          type="tel" 
          required 
          placeholder="+998 90 123 45 67" 
          disabled={loading} 
        />
      </div>
      
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
      
      <p className="text-xs text-muted-foreground italic">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
      </p>
      
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </Button>
    </form>
  )
}
