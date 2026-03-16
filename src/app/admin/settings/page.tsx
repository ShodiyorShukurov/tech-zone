import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shield, Settings, Database, Save, RotateCcw } from 'lucide-react'

export default function AdminSettings() {
  return (
    <div className="max-w-5xl space-y-12">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">System Configuration</span>
        </div>
        <h2 className="font-syne text-4xl font-bold tracking-tight">Settings</h2>
        <p className="font-dm-sans text-text-3">Manage your global platform parameters, contact details, and third-party integrations.</p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {/* Contact Information */}
        <section className="p-10 rounded-[3rem] bg-surface-2 border border-white/5 space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 blur-[80px] pointer-events-none" />
          <div className="flex items-center gap-4 border-b border-white/5 pb-8 relative z-10">
            <div className="h-10 w-10 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Settings className="h-5 w-5" />
            </div>
            <h3 className="font-syne text-xl font-bold">Public Presence</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-3 px-1">Support Hotline</label>
              <Input defaultValue="+998 90 123 45 67" className="rounded-2xl h-14 bg-surface border-white/5" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-3 px-1">Social Handle (Telegram)</label>
              <Input defaultValue="techzone_admin" className="rounded-2xl h-14 bg-surface border-white/5" />
            </div>
            <div className="space-y-4 md:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-3 px-1">Showroom Address</label>
              <Input defaultValue="108 Amir Temur Ave, Tashkent" className="rounded-2xl h-14 bg-surface border-white/5" />
            </div>
          </div>
        </section>

        {/* CRM Integration */}
        <section className="p-10 rounded-[3rem] bg-surface-2 border border-white/5 space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-40 w-40 bg-accent-2/5 blur-[80px] pointer-events-none" />
          <div className="flex items-center gap-4 border-b border-white/5 pb-8 relative z-10">
            <div className="h-10 w-10 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-accent-2 group-hover:bg-accent-2 group-hover:text-white transition-all duration-500">
                <Database className="h-5 w-5" />
            </div>
            <h3 className="font-syne text-xl font-bold">amoCRM Infrastructure</h3>
          </div>

          <div className="p-8 rounded-[2rem] bg-surface border border-white/5 space-y-8 relative z-10 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent-2 to-primary opacity-20" />
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-3 px-1">CRM Subdomain</label>
              <Input placeholder="your-domain.amocrm.ru" className="rounded-2xl h-14 bg-surface-2 border-white/5" />
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-3">Secure Access Token</label>
                    <span className="text-[8px] font-black uppercase tracking-widest text-green-500 flex items-center gap-1">
                        <Shield className="h-3 w-3" /> Encrypted
                    </span>
                </div>
              <Input type="password" placeholder="••••••••••••••••••••••••••••••••" className="rounded-2xl h-14 bg-surface-2 border-white/5 font-jetbrains" />
              <p className="text-[9px] font-bold uppercase tracking-widest text-text-3/50 px-1 italic">Long-lived integration token from your amoCRM developer console.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-3 px-1">Pipeline ID</label>
                <Input placeholder="123456" className="rounded-2xl h-14 bg-surface-2 border-white/5 font-jetbrains" />
              </div>
               <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-3 px-1">Active Stage ID</label>
                <Input placeholder="987654" className="rounded-2xl h-14 bg-surface-2 border-white/5 font-jetbrains" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between gap-6 pt-12 border-t border-white/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-3 italic">Last Sync: Oct 24, 2023 - 14:02</p>
        <div className="flex gap-4">
            <Button variant="outline" className="rounded-full h-14 px-8 border-white/10">
                <RotateCcw className="h-4 w-4 mr-2" /> Reset
            </Button>
            <Button variant="gradient" className="rounded-full h-14 px-12 shadow-cta">
                <Save className="h-4 w-4 mr-2" /> Commit Changes
            </Button>
        </div>
      </div>
    </div>
  )
}
