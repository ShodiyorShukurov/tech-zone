import { prisma } from '@/lib/prisma'
import { MessageSquare, Package, Users, TrendingUp, ArrowUpRight, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [leadCount, productCount, newLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.product.count(),
    prisma.lead.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' }
    })
  ])

  const stats = [
    { name: 'Total Leads', value: leadCount, icon: MessageSquare, trend: '+12%', color: 'from-blue-600/20 to-blue-600/5' },
    { name: 'Inventory Count', value: productCount, icon: Package, trend: '+3', color: 'from-green-600/20 to-green-600/5' },
    { name: 'Active Sessions', value: '1,234', icon: Users, trend: '+18%', color: 'from-purple-600/20 to-purple-600/5' },
    { name: 'Conversion Rate', value: '3.2%', icon: TrendingUp, trend: '-0.4%', color: 'from-orange-600/20 to-orange-600/5' },
  ]

  return (
    <div className="space-y-12">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="group relative p-8 rounded-[2.5rem] bg-surface-2 border border-white/5 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-text-3">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    {stat.trend}
                </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-3">{stat.name}</p>
              <h2 className="font-jetbrains text-4xl font-black text-text-1 tracking-tighter">{stat.value}</h2>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
        {/* Recent Leads Activity */}
        <div className="rounded-[3rem] bg-surface-2 border border-white/5 overflow-hidden shadow-2xl">
          <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-syne text-xl font-bold">Recent Inquiries</h3>
            <Link href="/admin/leads" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent-2 transition-all flex items-center gap-2 group">
                Full Log <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {newLeads.map((lead) => (
              <div key={lead.id} className="px-10 py-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-surface border border-white/5 flex items-center justify-center text-text-3 font-bold group-hover:text-primary transition-colors">
                        {lead.name ? lead.name[0] : 'A'}
                    </div>
                    <div>
                      <p className="font-bold text-text-1 group-hover:text-primary transition-colors">{lead.name || 'Anonymous'}</p>
                      <p className="font-jetbrains text-xs text-text-3">{lead.phone}</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-primary">{lead.type}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2 text-text-3">
                    <Clock className="h-3 w-3" />
                    <span className="text-[10px] font-medium">{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {newLeads.length === 0 && (
             <div className="py-20 text-center opacity-30 italic">No recent leads found.</div>
          )}
        </div>

        {/* System Health / Analytics Mini Widget */}
        <div className="space-y-8">
            <div className="p-10 rounded-[3rem] bg-gradient-to-br from-surface to-surface-2 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[80px] pointer-events-none" />
                <h3 className="font-syne text-lg font-bold mb-8 relative z-10">Real-time Performance</h3>
                <div className="flex items-center justify-center py-10">
                    <div className="relative h-48 w-48">
                        <svg className="h-full w-full -rotate-90 transform">
                            <circle cx="96" cy="96" r="88" className="stroke-white/5" strokeWidth="12" fill="none" />
                            <circle cx="96" cy="96" r="88" className="stroke-primary shadow-[0_0_20px_rgba(79,142,247,0.5)]" strokeWidth="12" strokeDasharray="552" strokeDashoffset="120" strokeLinecap="round" fill="none" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-jetbrains text-4xl font-black text-text-1">92%</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-text-3">Service Health</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 pt-8 relative z-10">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-text-3">
                        <span>Lead Processing</span>
                        <span className="text-primary">Stellar</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-primary" />
                    </div>
                </div>
            </div>
            
            <div className="p-10 rounded-[3rem] bg-surface-2 border border-white/5">
                <h3 className="font-syne text-lg font-bold mb-6">Partner Integration</h3>
                <div className="grid grid-cols-2 gap-4">
                    {['ZoodPay', 'Anorbank', 'Uzum', 'Click'].map((partner) => (
                        <div key={partner} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                            <span className="text-xs font-bold text-text-2">{partner}</span>
                            <div className="mt-2 flex items-center justify-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                <span className="text-[10px] text-text-3 uppercase tracking-tighter">Active</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
