import type { Metadata } from 'next'
import { Phone, MapPin, Clock, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { getSettings } from '@/lib/data'
import {
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_URL,
  RESTAURANT_ADDRESS,
  RESTAURANT_NAME,
  RESTAURANT_PHONE,
  RESTAURANT_PHONE_TEL,
  WHATSAPP_URL,
} from '@/lib/demoData'

export const metadata: Metadata = {
  title: 'Contact & Locație',
  description: `Metropolitan Grill — ${RESTAURANT_ADDRESS}. Telefon, WhatsApp, program.`,
}

const SOCIAL_PLACEHOLDER = [
  { name: 'TikTok', icon: '🎵' },
  { name: 'Facebook', icon: Facebook },
  { name: 'Instagram', icon: Instagram },
]

export default async function ContactPage() {
  const settings = await getSettings()
  const phone = settings.phone || RESTAURANT_PHONE
  const whatsapp = settings.whatsapp || WHATSAPP_URL.replace('https://wa.me/', '')
  const address = settings.address || RESTAURANT_ADDRESS
  const mapsUrl = settings.google_maps_url || GOOGLE_MAPS_URL
  const phoneHref = `tel:${phone.replace(/\s/g, '') || RESTAURANT_PHONE_TEL}`

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">{RESTAURANT_NAME}</h1>
        <p className="text-white/50">Contact & locație</p>
        <div className="gradient-line w-24 mt-2" />
      </div>

      <p className="text-zinc-400 text-sm italic text-center max-w-md mx-auto mb-4">
        Suntem o afacere de familie la Prelungirea Ghencea nr. 323. Veniți să ne cunoașteți sau
        comandați rapid pe WhatsApp — răspundem în câteva minute.
      </p>

      <div className="bg-brand-charcoal rounded-2xl p-2 border border-white/5 mb-6 overflow-hidden">
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          width="100%"
          height={260}
          style={{ border: 0, borderRadius: 12 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Harta Metropolitan Grill"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-brand-charcoal rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-yellow/20 rounded-xl flex items-center justify-center">
                <Phone size={20} className="text-brand-yellow" />
              </div>
              <h2 className="font-bold text-lg text-white">Telefon</h2>
            </div>
            <a href={phoneHref} className="text-2xl font-black text-white hover:text-brand-yellow transition-colors block mb-3">
              {phone}
            </a>
            <a href={phoneHref} className="btn-primary w-full py-3 justify-center">
              <Phone size={18} />
              Sună acum
            </a>
          </div>

          <div className="bg-brand-charcoal rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#25D366]/20 rounded-xl flex items-center justify-center">
                <MessageCircle size={20} className="text-[#25D366]" />
              </div>
              <h2 className="font-bold text-lg text-white">WhatsApp</h2>
            </div>
            <p className="text-white/60 text-sm mb-3">Trimite comanda sau pune orice întrebare.</p>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full py-3 justify-center"
            >
              <MessageCircle size={18} />
              Comandă pe WhatsApp
            </a>
          </div>

          <div className="bg-brand-charcoal rounded-2xl p-5 border border-white/5 opacity-60">
            <h2 className="font-bold text-lg text-white mb-4">Social media</h2>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_PLACEHOLDER.map(s => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-white/40 text-sm cursor-not-allowed"
                >
                  {typeof s.icon === 'string' ? s.icon : <s.icon size={16} />}
                  {s.name} · În curând
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-brand-charcoal rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} className="text-brand-yellow" />
              <h2 className="font-bold text-lg text-white">Adresă</h2>
            </div>
            <p className="text-white/70 text-sm mb-4 flex items-start gap-2">
              <MapPin size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" />
              <span>{address}</span>
            </p>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full py-3 justify-center">
              <MapPin size={18} />
              Deschide în Google Maps
            </a>
          </div>

          <div className="bg-brand-charcoal rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Clock size={20} className="text-brand-yellow" />
              <h2 className="font-bold text-lg text-white">Program</h2>
            </div>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 text-white/70">Luni – Duminică</td>
                  <td className="py-2.5 text-right text-brand-yellow font-semibold">10:00 – 23:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
