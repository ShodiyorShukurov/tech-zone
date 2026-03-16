export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { ExternalLink, Filter, Download, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AdminLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Inquiry Management</span>
            </div>
            <h2 className="font-syne text-4xl font-bold tracking-tight">Leads Registry</h2>
            <p className="font-dm-sans text-text-3">Comprehensive log of all customer applications and synchronization status.</p>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-full border-white/5 bg-surface-2 h-12">
                <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button variant="gradient" className="rounded-full h-12">
                <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
        </div>
      </div>

      <div className="rounded-[3rem] bg-surface-2 border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface border-b border-white/5">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-3">Timestamp</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-3">Client Profile</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-3">Type</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-3">Product Context</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-3">Sync Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-3">amoCRM Bridge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6 whitespace-nowrap font-jetbrains text-xs text-text-3">
                    {new Date(lead.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-text-1 group-hover:text-primary transition-colors">{lead.name || 'Anonymous'}</div>
                    <div className="font-jetbrains text-[10px] text-text-3 mt-1 tracking-tighter">{lead.phone}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-text-2">
                      {lead.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 max-w-[240px]">
                    <div className="text-sm font-medium text-text-2 truncate group-hover:text-text-1 transition-colors">
                        {lead.productName || <span className="opacity-20">—</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {lead.status === 'SYNCED' ? (
                      <span className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        Synced
                      </span>
                    ) : lead.status === 'ERROR' ? (
                      <span className="flex items-center gap-2 text-destructive font-bold text-xs uppercase tracking-widest" title={lead.errorMessage || ''}>
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                        Failure
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-accent-2 font-bold text-xs uppercase tracking-widest">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent-2 shadow-[0_0_8px_rgba(167,139,250,0.6)] animate-pulse" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {lead.amoDealId ? (
                      <a href={`https://yourdomain.amocrm.ru/leads/detail/${lead.amoDealId}`} target="_blank" className="inline-flex items-center gap-2 text-primary hover:text-accent-2 transition-all font-jetbrains text-xs font-bold">
                        Deal #{lead.amoDealId}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-3/50">Not Linked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
             <div className="py-32 text-center">
                 <div className="h-20 w-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-6 opacity-20">
                    <MessageSquare className="h-10 w-10 text-text-3" />
                 </div>
                 <p className="font-syne text-xl font-medium text-text-3 italic">Registry is currently empty.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
