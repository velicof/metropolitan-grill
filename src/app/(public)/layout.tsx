import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import MobileBottomBar from '@/components/layout/MobileBottomBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-[80px] md:pb-0">{children}</main>
      <Footer />
      <CartDrawer />
      <MobileBottomBar />
    </>
  )
}
