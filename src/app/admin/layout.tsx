import Link from 'next/link'
import { LayoutDashboard, Package, MessageSquare, Settings, LogOut, Home, Search, Bell } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Products', icon: Package, href: '/admin/products' },
    { label: 'Leads', icon: MessageSquare, href: '/admin/leads' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ]

  return (
    <div className="flex min-h-screen bg-[#0A0A0F] text-text-1">
      {/* Admin Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-surface hidden lg:block sticky top-0 h-screen">
        <div className="flex h-24 items-center px-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary shadow-[0_0_15px_rgba(79,142,247,0.4)]" />
            <span className="font-syne text-xl font-bold tracking-tight uppercase">Tech Admin</span>
          </Link>
        </div>
        
        <nav className="p-6 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-3 px-4 mb-4">Management</div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-bold text-text-2 transition-all hover:bg-white/5 hover:text-text-1"
            >
              <item.icon className="h-5 w-5 text-text-3 group-hover:text-primary transition-colors" />
              {item.label}
            </Link>
          ))}
          
          <div className="pt-8 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-3 px-4 mb-4">System</div>
            <Link
              href="/"
              className="flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-bold text-text-2 transition-all hover:bg-white/5 hover:text-text-1"
            >
              <Home className="h-5 w-5 text-text-3" />
              Live Site
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-6">
            <div className="p-6 rounded-[2rem] bg-surface-2 border border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-3 mb-4 text-center">Admin Profile</p>
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
                    <div className="text-center">
                        <p className="text-sm font-bold">Chief Admin</p>
                        <p className="text-[10px] text-text-3 uppercase tracking-tighter">System Access: Root</p>
                    </div>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-24 border-b border-white/5 bg-surface/50 backdrop-blur-xl px-12 flex items-center justify-between sticky top-0 z-20">
          <h1 className="font-syne text-2xl font-bold tracking-tight">System Overview</h1>
          
          <div className="flex items-center gap-8">
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-3" />
                <input 
                    placeholder="Search logs..." 
                    className="bg-surface-2 border border-white/5 rounded-full pl-10 pr-4 h-10 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>
            <button className="relative text-text-3 hover:text-text-1 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
            </button>
            <button className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-text-3 hover:bg-destructive hover:text-white transition-all">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="p-12">
          {children}
        </main>
      </div>
    </div>
  )
}
