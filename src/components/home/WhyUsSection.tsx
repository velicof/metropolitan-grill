const CARDS = [
  {
    icon: '🥔',
    title: 'Cartofi proaspeți zilnic',
    text: 'Nu folosim cartofi congelați. Tăiem și prăjim zilnic, de dimineață.',
  },
  {
    icon: '🥩',
    title: 'Carne proaspătă',
    text: 'Carne livrată zilnic, pregătită la grătar în fața ta. Niciun compromis.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Afacere de familie',
    text: 'Știm că mâncarea bună se face cu grijă. Fiecare preparat e gătit ca acasă.',
  },
  {
    icon: '🫙',
    title: 'Sosuri preparate în casă',
    text: 'Rețetele noastre de sosuri sunt ale familiei. Nu găsești altundeva.',
  },
] as const

export default function WhyUsSection() {
  return (
    <section className="py-14 max-w-6xl mx-auto px-4">
      <h2 className="section-title text-center mb-2">
        De ce aleg clienții Metropolitan Grill?
      </h2>
      <div className="gradient-line w-24 mx-auto mb-10" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {CARDS.map(card => (
          <div
            key={card.title}
            className="rounded-lg transition-all duration-200 hover:translate-x-1 hover:border-l-[#FFE566]"
            style={{
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              borderLeft: '3px solid #F5C518',
              padding: '1.5rem',
            }}
          >
            <span className="text-3xl mb-2 block" aria-hidden>
              {card.icon}
            </span>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">
              {card.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
