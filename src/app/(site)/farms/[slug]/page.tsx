import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity'
import { farmBySlugQuery, farmSlugsQuery } from '@/lib/queries'

export const revalidate = 3600

interface Params { slug: string }
interface FarmDetail {
  _id: string
  name: string
  slug: { current: string }
  location: string
  tagline: string
  heroImage?: { asset: { _ref: string } }
  farmerNames?: string
  partnerSince?: number
  acreage?: number
  familyGenerations?: number
  harvestToGreendle?: string
  heroStats?: { value: string; label: string }[]
  storyQuote?: string
  storyBody?: { _type: string; children?: { text: string }[] }[]
  produceTags?: string[]
  inSeasonProduce?: { name: string; description: string; seasonStatus: string; image?: { asset: { _ref: string } } }[]
  certifications?: { icon: string; title: string; detail: string; featured?: boolean }[]
  interviewQA?: { question: string; answer: string; speaker: string; dark?: boolean }[]
  seoDescription?: string
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await client.fetch(farmSlugsQuery)
    return slugs.map(s => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const farm: FarmDetail = await client.fetch(farmBySlugQuery, { slug })
    if (!farm) return {}
    return {
      title: farm.name,
      description: farm.seoDescription || farm.tagline,
    }
  } catch {
    return {}
  }
}

// Fallback for ashfield-organics so the page works before Sanity data is entered
const ASHFIELD_FALLBACK: FarmDetail = {
  _id: 'fallback',
  name: 'Ashfield Organics',
  slug: { current: 'ashfield-organics' },
  location: 'Gloucestershire',
  tagline: '22 acres of certified organic land in the Cotswold foothills, farmed with care for six generations.',
  farmerNames: 'Priya & Daniel Nair',
  partnerSince: 2020,
  acreage: 22,
  familyGenerations: 4,
  harvestToGreendle: '100%',
  heroStats: [
    { value: '22', label: 'Acres of Organic Land' },
    { value: '6', label: 'Years with Greendle' },
    { value: '100%', label: 'Harvest to Greendle' },
    { value: '4 gen.', label: 'Family History on Land' },
  ],
  storyQuote: '"The day Greendle called, we\'d just decided to stop supplying supermarkets. Best timing of our lives."',
  produceTags: ['Wild Garlic', 'Organic Greens', 'Salad Leaves', 'Certified Organic'],
  inSeasonProduce: [
    { name: 'Wild Garlic Leaves', description: 'Hand-picked weekly, March–May only', seasonStatus: 'In Season Now' },
    { name: 'Young Nettles', description: 'Blanched within hours of picking', seasonStatus: 'In Season Now' },
    { name: 'Purple Sprouting Broccoli', description: 'Cut to order on harvest day', seasonStatus: 'In Season Now' },
    { name: 'Mixed Salad Leaves', description: 'Five varieties, picked Tuesday AM', seasonStatus: 'In Season Now' },
    { name: 'Bunched Spring Onions', description: 'Grown under fleece, available year-round', seasonStatus: 'In Season Now' },
    { name: 'Land Cress & Mustard Greens', description: 'Peppery, hand-washed, 24hr from field', seasonStatus: 'Coming Soon' },
  ],
  certifications: [
    { icon: '🌱', title: 'Soil Association Organic', detail: 'Certified 2019 · No. SBOR 12847' },
    { icon: '✅', title: 'Greendle Verified Partner', detail: 'Annually audited since 2020', featured: true },
    { icon: '🏞️', title: 'Cotswolds AONB Farm', detail: 'Operates within protected landscape' },
    { icon: '🏆', title: 'GCC Food Champion', detail: 'Gloucestershire County Council · 2023' },
  ],
  interviewQA: [
    { question: 'Why organic, even when margins are tight?', answer: '"Because non-organic food is borrowing from tomorrow to pay for today. We don\'t want to borrow. We want to leave more than we found."', speaker: 'Priya Nair, March 2026', dark: false },
    { question: 'What changed when you joined Greendle?', answer: '"The first time a subscriber wrote to us directly — just to say the wild garlic was the best she\'d ever tasted — I cried. You don\'t get that from a supermarket invoice."', speaker: 'Daniel Nair, March 2026', dark: true },
  ],
  seoDescription: 'Ashfield Organics — a 22-acre certified organic farm in Gloucestershire, growing wild garlic, nettles, and seasonal greens for Greendle since 2020.',
}

export default async function FarmDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  let farm: FarmDetail | null = null

  try {
    farm = await client.fetch(farmBySlugQuery, { slug })
  } catch {
    // Sanity unavailable
  }

  // Use fallback for ashfield before Sanity is populated
  if (!farm) {
    if (slug === 'ashfield-organics') {
      farm = ASHFIELD_FALLBACK
    } else {
      notFound()
    }
  }

  const heroImg = farm.heroImage
    ? urlFor(farm.heroImage).width(1920).height(1080).url()
    : `https://picsum.photos/seed/${slug}/1920/1080`

  const storyImg = farm.heroImage
    ? urlFor(farm.heroImage).width(720).height(520).url()
    : `https://picsum.photos/seed/${slug}story/720/520`

  return (
    <>
      {/* BREADCRUMB */}
      <div style={{ backgroundColor: '#F5EFE0', paddingTop: 80 }}>
        <div className="max-w-7xl mx-auto px-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, paddingBottom: 14, borderBottom: '1px solid rgba(28,58,28,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/farms" className="farm-story-link" style={{ fontSize: '0.85rem' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 7H2M6 3L2 7l4 4" /></svg>
              Our Farms
            </Link>
            <span style={{ color: 'rgba(28,58,28,0.25)', fontSize: '0.8rem' }}>·</span>
            <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#1C3A1C' }}>{farm.name}</span>
          </div>
          <span style={{ background: 'linear-gradient(135deg,#2E6B2E,#4D7C3A)', color: '#FDFBF5', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100 }}>Partner Spotlight</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ minHeight: '90vh', backgroundColor: '#1C3A1C', backgroundImage: 'radial-gradient(ellipse 80% 60% at 70% 40%,rgba(46,107,46,0.45) 0%,transparent 60%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '80px 0' }}>
        <div className="hero-image-wrap"><img src={heroImg} alt="" /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="badge mb-6"><span className="badge-dot" />Certified Organic · {farm.location}</div>
            <h1 className="heading-xl text-white mb-3" style={{ fontSize: 'clamp(3rem,6vw,5.5rem)' }}>
              {farm.name.split(' ').slice(0, -1).join(' ')}<br />
              <span style={{ color: '#A0C490' }}>{farm.name.split(' ').slice(-1)}</span>
            </h1>
            <p className="body-text text-white mb-8" style={{ fontSize: '1.125rem', maxWidth: 520, opacity: 0.82 }}>{farm.tagline}</p>
            {farm.heroStats && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {farm.heroStats.map(s => (
                  <span key={s.label} className="stat-chip">📊 {s.value} {s.label}</span>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link href="/#boxes" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 30px' }}>
                Get This Week&apos;s Box
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
              </Link>
              <Link href="/recipes" className="btn-ghost-white" style={{ fontSize: '1rem', padding: '14px 30px' }}>Recipes from This Farm</Link>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(253,251,245,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* STATS BAR */}
      {farm.heroStats && (
        <div style={{ background: '#FDFBF5', borderBottom: '1px solid rgba(28,58,28,0.08)', padding: '32px 0' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-2 md:grid-cols-${farm.heroStats.length} gap-8 text-center`}>
              {farm.heroStats.map(s => (
                <div key={s.label}>
                  <div className="heading-lg" style={{ fontSize: '2.25rem', color: '#2E6B2E' }}>{s.value}</div>
                  <div style={{ fontSize: '0.825rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FARM STORY */}
      <section style={{ padding: '100px 0', backgroundColor: '#FDFBF5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3" style={{ position: 'relative' }}>
              <div style={{ borderRadius: 24, overflow: 'hidden' }}>
                <img src={storyImg} alt={`${farm.farmerNames} at ${farm.name}`} style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,58,28,0.45) 0%,transparent 55%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(185,125,42,0.12)', mixBlendMode: 'multiply' }} />
              </div>
              {farm.partnerSince && (
                <div style={{ position: 'absolute', bottom: -24, right: -20, background: '#FDFBF5', borderRadius: 18, padding: '22px 26px', boxShadow: '0 4px 16px rgba(28,58,28,0.10),0 16px 40px rgba(28,58,28,0.10)', border: '1px solid rgba(28,58,28,0.08)', minWidth: 180 }}>
                  <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.8rem', color: '#1C3A1C', marginBottom: 4 }}>Partner Since</div>
                  <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 900, fontSize: '2.25rem', color: '#2E6B2E', letterSpacing: '-0.04em', lineHeight: 1 }}>{farm.partnerSince}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", marginTop: 6 }}>{new Date().getFullYear() - farm.partnerSince} seasons growing for Greendle</div>
                </div>
              )}
            </div>
            <div className="md:col-span-2" style={{ paddingTop: 16 }}>
              <div className="label-text mb-5" style={{ color: '#2E6B2E' }}>Farm Story</div>
              {farm.storyQuote && (
                <blockquote style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '1.5rem', color: '#1C3A1C', letterSpacing: '-0.02em', lineHeight: 1.3, fontStyle: 'italic', margin: '0 0 20px' }}>{farm.storyQuote}</blockquote>
              )}
              {farm.farmerNames && (
                <>
                  <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#2E6B2E', marginBottom: 2 }}>{farm.farmerNames}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", marginBottom: 28 }}>{farm.name} · {farm.location}</div>
                </>
              )}
              {farm.storyBody ? (
                <div className="body-text mb-6" style={{ color: '#6B5235', fontSize: '0.9375rem' }}>
                  {farm.storyBody.map((block, i) => (
                    <p key={i} style={{ marginBottom: 16 }}>{block.children?.map(c => c.text).join('')}</p>
                  ))}
                </div>
              ) : null}
              {farm.produceTags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                  {farm.produceTags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              )}
              <a href="#interview" className="btn-secondary">Read Full Interview</a>
            </div>
          </div>
        </div>
      </section>

      {/* IN SEASON */}
      {farm.inSeasonProduce && farm.inSeasonProduce.length > 0 && (
        <section style={{ padding: '80px 0', backgroundColor: '#F5EFE0' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="label-text mb-4" style={{ color: '#2E6B2E' }}>What&apos;s Growing Now</div>
              <h2 className="heading-lg" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', color: '#1C3A1C' }}>In season this week</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {farm.inSeasonProduce.map((item) => (
                <div key={item.name} style={{ background: '#FDFBF5', borderRadius: 16, border: '1px solid rgba(28,58,28,0.08)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(28,58,28,0.04)' }}>
                  <div style={{ position: 'relative', height: 100, overflow: 'hidden' }}>
                    <img src={item.image ? urlFor(item.image).width(320).height(100).url() : `https://picsum.photos/seed/${item.name.replace(/\s/g,'').toLowerCase()}/320/100`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,58,28,0.35) 0%,transparent 60%)' }} />
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.975rem', color: '#1C3A1C', marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", lineHeight: 1.5, marginBottom: 10 }}>{item.description}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.seasonStatus === 'In Season Now' ? '#2E6B2E' : '#D4973E' }} />
                      <span style={{ fontSize: '0.7rem', fontFamily: "'Inter',sans-serif", fontWeight: 500, color: item.seasonStatus === 'In Season Now' ? '#2E6B2E' : '#B97D2A' }}>{item.seasonStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {farm.certifications && farm.certifications.length > 0 && (
        <section style={{ padding: '60px 0', backgroundColor: '#FDFBF5' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="label-text mb-3" style={{ color: '#2E6B2E' }}>Verified Credentials</div>
              <h2 className="heading-md" style={{ fontSize: '1.75rem', color: '#1C3A1C' }}>Certifications &amp; standards</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {farm.certifications.map((cert) => (
                <div key={cert.title} className="pillar-card" style={cert.featured ? { padding: 24, textAlign: 'center', background: 'linear-gradient(145deg,#2E6B2E,#1C3A1C)', borderColor: 'rgba(255,255,255,0.08)' } : { padding: 24, textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: cert.featured ? 'rgba(253,251,245,0.12)' : 'rgba(46,107,46,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 14px' }}>{cert.icon}</div>
                  <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.9rem', color: cert.featured ? '#FDFBF5' : '#1C3A1C', marginBottom: 4 }}>{cert.title}</div>
                  <div style={{ fontSize: '0.75rem', color: cert.featured ? 'rgba(253,251,245,0.60)' : '#6B5235', fontFamily: "'Inter',sans-serif" }}>{cert.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INTERVIEW */}
      {farm.interviewQA && farm.interviewQA.length > 0 && (
        <section id="interview" style={{ padding: '80px 0', backgroundColor: '#F5EFE0' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="label-text mb-3" style={{ color: '#2E6B2E' }}>In Their Own Words</div>
              <h2 className="heading-lg" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', color: '#1C3A1C' }}>The {farm.name} interview</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {farm.interviewQA.map((qa, i) => (
                <div key={i} style={qa.dark
                  ? { background: '#1C3A1C', borderRadius: 20, padding: 36, border: '1px solid rgba(255,255,255,0.06)', borderLeft: '4px solid #7EA86B' }
                  : { background: '#FDFBF5', borderRadius: 20, padding: 36, border: '1px solid rgba(28,58,28,0.08)', borderLeft: '4px solid #2E6B2E', boxShadow: '0 2px 8px rgba(28,58,28,0.05)' }
                }>
                  <div className="label-text mb-3" style={{ color: qa.dark ? '#A0C490' : '#2E6B2E' }}>{qa.question}</div>
                  <blockquote style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '1.25rem', color: qa.dark ? '#FDFBF5' : '#1C3A1C', letterSpacing: '-0.02em', lineHeight: 1.4, fontStyle: 'italic', margin: '0 0 16px' }}>{qa.answer}</blockquote>
                  <div style={{ fontSize: '0.8rem', color: qa.dark ? 'rgba(253,251,245,0.55)' : '#6B5235', fontFamily: "'Inter',sans-serif", fontWeight: 500 }}>— {qa.speaker}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section" style={{ padding: '80px 0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="label-text mb-4" style={{ color: '#A0C490' }}>Support Real Farmers</div>
          <h2 className="heading-lg text-white mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.25rem)' }}>Every box goes directly back to farms like {farm.name}.</h2>
          <p className="body-text mb-10" style={{ color: 'rgba(253,251,245,0.75)', maxWidth: 460, margin: '0 auto 40px' }}>No middlemen. No anonymous warehouses. Your subscription funds the next season&apos;s seeds.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <Link href="/#boxes" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 30px' }}>
              Choose Your Box
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
            </Link>
            <Link href="/farms" className="btn-ghost-white" style={{ fontSize: '1rem', padding: '14px 30px' }}>Meet More Farms</Link>
          </div>
        </div>
      </section>
    </>
  )
}
