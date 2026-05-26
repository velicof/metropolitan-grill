import Link from 'next/link'

const QUALITY_BADGES = [
  'Fără ingrediente congelate',
  'Carne livrată zilnic',
  'Cartofi tăiați în fiecare dimineață',
  'Sosuri preparate în casă',
  'Rețete autentice de familie',
] as const

export default function OurStorySection() {
  return (
    <section className="py-14 max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-brand-yellow text-xs font-semibold uppercase tracking-widest mb-3">
            POVESTEA NOASTRĂ
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
            Gătit cu suflet, în familia noastră
          </h2>
          <div className="space-y-4 text-zinc-400 text-sm md:text-base leading-relaxed">
            <p>
              Metropolitan Grill s-a născut dintr-o pasiune simplă: mâncarea bună, făcută cinstit. Nu
              avem rețete din fabrică. Avem rețete de familie, perfectate în timp.
            </p>
            <p>
              Folosim cartofi proaspeți, tăiați în fiecare dimineață. Carnea vine zilnic — berbecuț,
              pui, mixt — și ajunge direct pe grătar. Sosurile le preparăm noi, după rețete proprii.
            </p>
            <p>
              Suntem la Prelungirea Ghencea nr. 323. Veniți să gustați diferența.
            </p>
          </div>
          <Link href="/meniu" className="btn-primary inline-flex mt-8 text-base py-4 px-8">
            🌯 Vezi meniul complet
          </Link>
        </div>

        <div
          className="rounded-xl overflow-hidden"
          style={{ background: '#111', borderTop: '3px solid #F5C518' }}
        >
          {QUALITY_BADGES.map((badge, i) => (
            <div
              key={badge}
              className={`flex items-center gap-3 px-5 py-4 ${
                i < QUALITY_BADGES.length - 1 ? 'border-b border-zinc-800' : ''
              }`}
            >
              <span className="text-brand-yellow font-bold flex-shrink-0">✓</span>
              <span className="text-white/70 text-sm">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
