import type { Metadata } from 'next'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { farmsListQuery } from '@/lib/queries'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Our Farms',
  description: 'Meet the 180+ certified organic farms behind every Greendle box. Locally sourced, sustainably grown, verified by us.',
}

// Revalidate every hour
export const revalidate = 3600

interface Farm {
  _id: string
  name: string
  slug: { current: string }
  location: string
  tagline: string
  heroImage?: { asset: { _ref: string } }
  farmerNames: string
  partnerSince: number
  acreage?: number
  produceTags?: string[]
  certifications?: { icon: string; title: string; detail: string }[]
  isFeatured?: boolean
}

// Hardcoded fallback farms (shown when Sanity has no data yet)
const FALLBACK_FARMS: (Omit<Farm, '_id' | 'slug' | 'heroImage'> & { slug: string; image: string; distanceMiles: number; emoji: string })[] = [
  { name: 'Meadowbrook Farm', slug: '', location: 'Somerset', farmerNames: 'Tom & Claire Albright', partnerSince: 2018, tagline: 'Specialising in heritage varieties of carrot, parsnip, and beetroot grown in rich Somerset clay. No-dig methods since 2018.', produceTags: ['Root Veg', 'Heritage Varieties', 'No-dig'], image: 'https://picsum.photos/seed/farmvegetables/480/220', distanceMiles: 42, emoji: '🥕' },
  { name: 'Ashfield Organics', slug: 'ashfield-organics', location: 'Gloucestershire', farmerNames: 'Priya & Daniel Nair', partnerSince: 2020, tagline: '22 acres of certified organic land in the Cotswold foothills. Wild garlic, nettles, and seasonal greens.', produceTags: ['Wild Garlic', 'Organic Greens', 'Certified Organic'], image: 'https://picsum.photos/seed/organicfarm/480/220', distanceMiles: 67, emoji: '🌿', isFeatured: true },
  { name: 'Rivendale Dairy', slug: '', location: 'Derbyshire', farmerNames: 'The Whitmore Family', partnerSince: 2019, tagline: 'Pasture-raised Jersey cows on limestone hills. Known for the creamiest full-fat milk in the Peaks.', produceTags: ['Milk', 'Cheese', 'Butter'], image: 'https://picsum.photos/seed/dairyfarm/480/220', distanceMiles: 89, emoji: '🧀' },
  { name: 'Blackthorn Fruit Farm', slug: '', location: 'Kent', farmerNames: 'Sophie &amp; James Mercer', partnerSince: 2021, tagline: 'Soft fruit specialists. PYO heritage apple orchard. Twenty varieties of strawberry grown without pesticides.', produceTags: ['Strawberries', 'Apples', 'Soft Fruit'], image: 'https://picsum.photos/seed/fruitfarm/480/220', distanceMiles: 55, emoji: '🍓' },
  { name: 'Pennine Free Range', slug: '', location: 'Yorkshire', farmerNames: 'Dave Thorpe', partnerSince: 2020, tagline: 'Free-range hens on 30 acres of Yorkshire moorland. Genuinely pasture-raised, not just barn-raised.', produceTags: ['Eggs', 'Pasture-raised', 'Free Range'], image: 'https://picsum.photos/seed/freerangeeggs/480/220', distanceMiles: 112, emoji: '🥚' },
  { name: 'Cwm Uchaf Herbs', slug: '', location: 'Powys, Wales', farmerNames: 'Mared & Huw Evans', partnerSince: 2022, tagline: 'Specialist herb growers in the Brecon Beacons. Unusual varieties you won\'t find in a supermarket.', produceTags: ['Herbs', 'Edible Flowers', 'Welsh Grown'], image: 'https://picsum.photos/seed/herbgarden/480/220', distanceMiles: 94, emoji: '🌿' },
]

export default async function FarmsPage() {
  let farms: Farm[] = []
  try {
    farms = await client.fetch(farmsListQuery)
  } catch {
    // Sanity not yet populated — use fallback
  }

  const hasSanityFarms = farms.length > 0

  return (
    <>
      <ScrollReveal />

      {/* HERO */}
      <section style={{ minHeight: '100vh', backgroundColor: '#1C3A1C', backgroundImage: 'radial-gradient(ellipse 80% 60% at 70% 40%,rgba(46,107,46,0.45) 0%,transparent 60%),radial-gradient(ellipse 50% 70% at 15% 80%,rgba(77,124,58,0.30) 0%,transparent 55%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '140px 0 80px' }}>
        <div className="hero-image-wrap">
          <img src="https://picsum.photos/seed/farmlandaerial/1920/1080" alt="" />
        </div>
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle,rgba(126,168,107,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="badge mb-6"><span className="badge-dot" />180+ Verified Farm Partners</div>
            <h1 className="heading-xl text-white mb-6" style={{ fontSize: 'clamp(2.75rem,5.5vw,5rem)' }}>
              Rooted in the land<br /><span style={{ color: '#A0C490' }}>you live on.</span>
            </h1>
            <p className="body-text text-white mb-10" style={{ fontSize: '1.125rem', maxWidth: 540, opacity: 0.82 }}>
              Every ingredient in your Greendle box comes from a named farm within 150 miles. No anonymous supply chains. Meet the growers behind your meals.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <a href="#farm-grid" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 32px' }}>
                Explore Our Farms
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </a>
              <a href="#partner-cta" className="btn-ghost-white" style={{ fontSize: '1rem', padding: '15px 31px' }}>Become a Partner</a>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: '0.8rem' }}>📅</span><span style={{ fontSize: '0.825rem', color: 'rgba(253,251,245,0.75)', fontFamily: "'Inter',sans-serif" }}>Avg. 8.4 years partnership</span></div>
              <div style={{ width: 1, height: 16, background: 'rgba(253,251,245,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: '0.8rem' }}>✅</span><span style={{ fontSize: '0.825rem', color: 'rgba(253,251,245,0.75)', fontFamily: "'Inter',sans-serif" }}>100% audited annually</span></div>
              <div style={{ width: 1, height: 16, background: 'rgba(253,251,245,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: '0.8rem' }}>💰</span><span style={{ fontSize: '0.825rem', color: 'rgba(253,251,245,0.75)', fontFamily: "'Inter',sans-serif" }}>Fair-price guarantee</span></div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(253,251,245,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[['180+','Local Farm Partners'],['150mi','Max Sourcing Radius'],['£4.2M','Paid to Growers in 2025'],['100%','Independently Audited']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="heading-lg" style={{ fontSize: '2.25rem', color: '#2E6B2E' }}>{val}</div>
                <div style={{ fontSize: '0.825rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FARM GRID */}
      <section id="farm-grid" style={{ padding: '100px 0', backgroundColor: '#F5EFE0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-reveal>
            <div className="label-text mb-4" style={{ color: '#2E6B2E' }}>Our Network</div>
            <h2 className="heading-lg" style={{ fontSize: 'clamp(2rem,4vw,3.25rem)', color: '#1C3A1C' }}>Meet the growers</h2>
            <p className="body-text mt-4" style={{ color: '#6B5235', maxWidth: 460, margin: '12px auto 0' }}>Every farm is visited in person before joining our network. No exceptions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {hasSanityFarms ? farms.map((farm) => (
              <div key={farm._id} className={`box-card${farm.isFeatured ? ' featured' : ''}`} data-reveal>
                <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
                  {farm.heroImage ? (
                    <img src={urlFor(farm.heroImage).width(480).height(220).url()} alt={farm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={`https://picsum.photos/seed/${farm.slug.current}/480/220`} alt={farm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,58,28,0.60) 0%,transparent 55%)' }} />
                  {farm.isFeatured && (
                    <div style={{ position: 'absolute', top: 14, right: 14 }}>
                      <span style={{ background: 'linear-gradient(135deg,#2E6B2E,#4D7C3A)', color: '#FDFBF5', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 100 }}>Partner Spotlight</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: 24 }}>
                  <div className="heading-md mb-1" style={{ fontSize: '1.125rem', color: '#1C3A1C' }}>{farm.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", marginBottom: 10 }}>{farm.farmerNames} · {farm.location}</div>
                  <p style={{ fontSize: '0.875rem', color: '#6B5235', lineHeight: 1.6, marginBottom: 14 }}>{farm.tagline}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {farm.produceTags?.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <Link href={`/farms/${farm.slug.current}`} className="farm-story-link">
                    View farm story <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h8M6 2l4 4-4 4" /></svg>
                  </Link>
                </div>
              </div>
            )) : FALLBACK_FARMS.map((farm) => (
              <div key={farm.name} className={`box-card${farm.isFeatured ? ' featured' : ''}`} data-reveal>
                <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
                  <img src={farm.image} alt={farm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,58,28,0.60) 0%,transparent 55%)' }} />
                  {farm.isFeatured && (
                    <div style={{ position: 'absolute', top: 14, right: 14 }}>
                      <span style={{ background: 'linear-gradient(135deg,#2E6B2E,#4D7C3A)', color: '#FDFBF5', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 100 }}>Partner Spotlight</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 14, left: 16, display: 'flex', gap: 6 }}>
                    <span className="tag" style={{ background: 'rgba(253,251,245,0.18)', color: '#FDFBF5', borderColor: 'rgba(253,251,245,0.28)' }}>{farm.distanceMiles} miles</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 14, right: 16, fontSize: '1.2rem' }}>{farm.emoji}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div className="heading-md mb-1" style={{ fontSize: '1.125rem', color: '#1C3A1C' }}>{farm.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: `${farm.farmerNames} · ${farm.location}` }} />
                  <p style={{ fontSize: '0.875rem', color: '#6B5235', lineHeight: 1.6, marginBottom: 14 }}>{farm.tagline}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {farm.produceTags?.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {farm.slug ? (
                    <Link href={`/farms/${farm.slug}`} className="farm-story-link">
                      View farm story <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h8M6 2l4 4-4 4" /></svg>
                    </Link>
                  ) : (
                    <span className="farm-story-link" style={{ opacity: 0.4, cursor: 'default' }}>Story coming soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section id="partner-cta" className="cta-section" style={{ padding: '80px 0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10" data-reveal>
          <div className="label-text mb-4" style={{ color: '#A0C490' }}>Grow With Greendle</div>
          <h2 className="heading-lg text-white mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.25rem)' }}>Are you a local farm or grower?</h2>
          <p className="body-text mb-10" style={{ color: 'rgba(253,251,245,0.75)', maxWidth: 460, margin: '0 auto 40px' }}>We&apos;re always expanding our network. If you grow sustainably within 150 miles, we&apos;d love to talk.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <a href="mailto:farms@greendle.co.uk" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 30px' }}>Get in Touch</a>
            <Link href="/" className="btn-ghost-white" style={{ fontSize: '1rem', padding: '14px 30px' }}>Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  )
}
