import Link from 'next/link'
import { LayoutDashboard, Package, Tag, Settings, LogOut } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin/produse',  label: 'Produse',   Icon: Package },
  { href: '/admin/categorii',label: 'Categorii', Icon: Tag },
  { href: '/admin/setari',   label: 'Setări',    Icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-darker flex">

      {/* Sidebar */}
      <aside className="w-60 bg-brand-dark border-r border-white/5 flex flex-col fixed left-0 top-0 bottom-0">
        {/* Logo */}
        <div className="px-4 py-5 border-b border-white/5">
          <Link href="/admin/produse" className="flex items-center gap-2">
            <span className="text-xl">🌯</span>
            <div>
              <p className="font-bold text-sm text-white">Metropolitan Grill</p>
              <p className="text-xs text-white/40">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors group"
            >
              <Icon size={18} className="group-hover:text-brand-orange transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout + back to site */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            ← Înapoi la site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 p-6 min-h-screen">
        {children}
      </main>
    </div>
  )
}
