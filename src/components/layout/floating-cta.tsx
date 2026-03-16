'use client'

import { useState } from 'react'
import { Phone, Send, MessageSquare } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { LeadForm } from '@/components/forms/lead-form'

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
        <div className="flex flex-col gap-3">
          <a
            href="https://t.me/sardorsobidjonov"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-lg transition-transform hover:scale-110"
          >
            <Send className="h-6 w-6" />
          </a>
          <a
            href="tel:+998901234567"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
          >
            <Phone className="h-6 w-6" />
          </a>
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform hover:scale-110 hover:rotate-12"
          >
            <MessageSquare className="h-7 w-7" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Заказать звонок"
      >
        <LeadForm 
          type="CALLBACK" 
          onSuccess={() => setIsOpen(false)} 
        />
      </Modal>
    </>
  )
}
