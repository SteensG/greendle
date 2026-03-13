import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity'
import { recipeBySlugQuery, recipeSlugsQuery } from '@/lib/queries'

export const revalidate = 3600

interface Params { slug: string }
interface RecipeDetail {
  _id: string
  title: string
  subtitle?: string
  slug: { current: string }
  heroImage?: { asset: { _ref: string } }
  description?: string
  isChefsPick?: boolean
  season?: string
  weekOf?: string
  prepTime?: number
  cookTime?: number
  servings?: string
  difficulty?: string
  dietary?: string[]
  calories?: number
  mealKit?: string
  sourceFarms?: { name: string; slug: { current: string }; location: string }[]
  additionalSources?: string
  ingredientGroups?: { groupName: string; items: { quantity: string; item: string }[] }[]
  steps?: { title: string; duration?: string; body: string; isFinale?: boolean }[]
  chefNotes?: { emoji: string; title: string; body: string }[]
  tags?: string[]
  seoDescription?: string
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await client.fetch(recipeSlugsQuery)
    return slugs.map(s => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const recipe: RecipeDetail = await client.fetch(recipeBySlugQuery, { slug })
    if (!recipe) return {}
    const description = recipe.seoDescription || recipe.description || ''
    const ogImage = recipe.heroImage ? urlFor(recipe.heroImage).width(1200).height(630).url() : '/og-image.png'
    return {
      title: recipe.title,
      description,
      openGraph: { title: recipe.title, description, images: [{ url: ogImage, width: 1200, height: 630 }] },
      twitter: { card: 'summary_large_image', title: recipe.title, description, images: [ogImage] },
    }
  } catch {
    return {}
  }
}

// Fallback for the wild garlic recipe
const WILD_GARLIC_FALLBACK: RecipeDetail = {
  _id: 'fallback',
  title: 'Wild Garlic & Nettle Linguine',
  subtitle: 'with Toasted Hazelnuts',
  slug: { current: 'wild-garlic-linguine' },
  description: 'A stunning spring pasta using freshly picked wild garlic leaves and blanched nettle tips.',
  isChefsPick: true,
  season: 'Spring',
  weekOf: '9–15 March 2026',
  prepTime: 15,
  cookTime: 25,
  servings: '2–4',
  difficulty: 'Easy',
  dietary: ['Vegetarian'],
  calories: 480,
  mealKit: 'Grove Box',
  sourceFarms: [{ name: 'Ashfield Organics', slug: { current: 'ashfield-organics' }, location: 'Gloucestershire' }],
  additionalSources: 'Pasta: Bakers Mill, North Yorkshire',
  ingredientGroups: [
    {
      groupName: 'Pasta & base',
      items: [
        { quantity: '200g', item: 'dried linguine (Bakers Mill heritage wheat)' },
        { quantity: '60g', item: 'fresh wild garlic leaves, washed' },
        { quantity: '60g', item: 'young nettles, tips only, washed' },
      ],
    },
    {
      groupName: 'Sauce & finish',
      items: [
        { quantity: '3 tbsp', item: 'extra-virgin olive oil' },
        { quantity: '2', item: 'shallots, finely sliced' },
        { quantity: '2 cloves', item: 'garlic, minced' },
        { quantity: '1', item: 'unwaxed lemon, zest and juice' },
        { quantity: '40g', item: 'Parmesan (or vegetarian hard cheese), finely grated' },
        { quantity: '30g', item: 'whole hazelnuts, skin-on' },
        { quantity: '—', item: 'Flaky sea salt & black pepper' },
        { quantity: 'handful', item: 'flat-leaf parsley, to finish' },
      ],
    },
  ],
  steps: [
    { title: 'Toast the hazelnuts', duration: '5 min', body: 'Place the hazelnuts in a dry frying pan over medium heat. Toast, tossing frequently, for 4–5 minutes until golden and fragrant. Tip onto a board, allow to cool slightly, then roughly crush with the flat of a knife. Set aside.' },
    { title: 'Blanch the nettles', duration: '3 min', body: 'Fill a large pot with well-salted water and bring to a rolling boil. Drop the nettle tips in for exactly 30 seconds. Remove with a slotted spoon into iced water. Squeeze out excess water, roughly chop. Keep the boiling water for your pasta.' },
    { title: 'Wilt the wild garlic', duration: '4 min', body: 'Heat 1 tbsp olive oil in a wide sauté pan over medium-low heat. Add the shallots and a pinch of salt. Cook gently for 3–4 minutes until softened. Add the minced garlic for 1 minute. Add the wild garlic leaves and toss until just wilted — 60 to 90 seconds. Remove from heat.' },
    { title: 'Cook the linguine', duration: '9–11 min', body: 'Add the linguine to the boiling water. Cook according to packet instructions minus 1 minute. Reserve 150ml of pasta water before draining.' },
    { title: 'Bring it together', duration: '4 min', body: 'Return the wild garlic pan to low heat. Add the drained linguine, chopped nettles, remaining olive oil, and a splash of pasta water. Toss vigorously for 2 minutes. Add lemon zest, a squeeze of lemon juice, and half the Parmesan. Toss again.' },
    { title: 'Plate and finish', duration: '', body: 'Divide between warmed bowls. Top with crushed hazelnuts, remaining Parmesan, a crack of black pepper, flat-leaf parsley, and a final drizzle of olive oil. Serve immediately.', isFinale: true },
  ],
  chefNotes: [
    { emoji: '💧', title: 'Pasta water is your sauce', body: "Don't skip reserving it. The starchy water is what makes the sauce coat the pasta rather than pool at the bottom." },
    { emoji: '📅', title: 'Wild garlic season is short', body: 'Peak harvest is mid-March to late April. Outside this window, substitute with 2 cloves garlic and a handful of baby spinach.' },
    { emoji: '🧤', title: 'Nettles without fear', body: 'Use tongs or rubber gloves to handle raw nettles. Once blanched for 30 seconds they are completely safe and taste wonderfully earthy.' },
  ],
  tags: ['Vegetarian', 'Spring Special', 'Grove Box'],
  seoDescription: 'Wild Garlic & Nettle Linguine with Toasted Hazelnuts — a spring pasta from Ashfield Organics. 40 minutes, vegetarian.',
}

export default async function RecipeDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  let recipe: RecipeDetail | null = null

  try {
    recipe = await client.fetch(recipeBySlugQuery, { slug })
  } catch {
    // Sanity unavailable
  }

  if (!recipe) {
    if (slug === 'wild-garlic-linguine') {
      recipe = WILD_GARLIC_FALLBACK
    } else {
      notFound()
    }
  }

  const heroImg = recipe.heroImage
    ? urlFor(recipe.heroImage).width(1920).height(1080).url()
    : `https://picsum.photos/seed/${slug}/1920/1080`

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <>
      {/* BREADCRUMB */}
      <div style={{ backgroundColor: '#F5EFE0', paddingTop: 80 }}>
        <div className="max-w-7xl mx-auto px-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, paddingBottom: 14, borderBottom: '1px solid rgba(28,58,28,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/recipes" className="farm-story-link" style={{ fontSize: '0.85rem' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 7H2M6 3L2 7l4 4" /></svg>
              This Week&apos;s Menu
            </Link>
            <span style={{ color: 'rgba(28,58,28,0.25)', fontSize: '0.8rem' }}>·</span>
            <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#1C3A1C' }}>{recipe.title}</span>
          </div>
          {recipe.isChefsPick && (
            <span style={{ background: 'linear-gradient(135deg,rgba(212,151,62,0.95),rgba(185,125,42,0.95))', color: '#FDFBF5', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100 }}>✦ Chef&apos;s Pick · {recipe.season}</span>
          )}
        </div>
      </div>

      {/* HERO */}
      <section style={{ minHeight: '88vh', backgroundColor: '#1C3A1C', backgroundImage: 'radial-gradient(ellipse 75% 65% at 65% 35%,rgba(46,107,46,0.45) 0%,transparent 60%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '80px 0' }}>
        <div className="hero-image-wrap"><img src={heroImg} alt="" /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            {recipe.isChefsPick && recipe.weekOf && (
              <div className="badge mb-6"><span className="badge-dot" />Chef&apos;s Pick · Week of {recipe.weekOf}</div>
            )}
            <h1 className="heading-xl text-white mb-2" style={{ fontSize: 'clamp(2.75rem,5.5vw,5rem)' }}>{recipe.title}</h1>
            {recipe.subtitle && (
              <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '1.375rem', color: '#A0C490', marginBottom: 28, letterSpacing: '-0.01em' }}>{recipe.subtitle}</div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {totalTime > 0 && <span className="stat-chip">⏱ {totalTime} min total</span>}
              {recipe.servings && <span className="stat-chip">👥 Serves {recipe.servings}</span>}
              {recipe.dietary?.[0] && <span className="stat-chip">🌱 {recipe.dietary[0]}</span>}
              {recipe.mealKit && <span className="stat-chip">📦 {recipe.mealKit}</span>}
            </div>
            {recipe.sourceFarms && recipe.sourceFarms.length > 0 && (
              <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '0.825rem', color: 'rgba(253,251,245,0.65)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                🌿 {recipe.sourceFarms.map((f, i) => (
                  <span key={f.slug.current}>
                    {i > 0 && ' · '}
                    <Link href={`/farms/${f.slug.current}`} style={{ color: '#A0C490', textDecoration: 'none' }}>{f.name}, {f.location}</Link>
                  </span>
                ))}
                {recipe.additionalSources && <span> · {recipe.additionalSources}</span>}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a href="#method" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 30px' }}>
                View Full Recipe
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
              </a>
              <Link href="/#boxes" className="btn-ghost-white" style={{ fontSize: '1rem', padding: '14px 30px' }}>Get This Week&apos;s Box</Link>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(253,251,245,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* META BAR */}
      <div style={{ background: '#FDFBF5', borderBottom: '1px solid rgba(28,58,28,0.08)', padding: '32px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
            {[
              { icon: '⏱', val: `${recipe.prepTime || 0} min`, label: 'Prep time' },
              { icon: '🔥', val: `${recipe.cookTime || 0} min`, label: 'Cook time' },
              { icon: '👥', val: recipe.servings || '2–4', label: 'Serves' },
              { icon: '📊', val: recipe.difficulty || 'Easy', label: 'Difficulty' },
              { icon: '🌱', val: recipe.dietary?.[0] || 'Vegetarian', label: 'Dietary' },
              { icon: '⚡', val: recipe.calories ? `${recipe.calories} kcal` : '—', label: 'Per serving' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(46,107,46,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', margin: '0 auto 8px' }}>{item.icon}</div>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '1rem', color: '#2E6B2E' }}>{item.val}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INGREDIENTS + IMAGE */}
      {recipe.ingredientGroups && recipe.ingredientGroups.length > 0 && (
        <section style={{ padding: '100px 0', backgroundColor: '#F5EFE0' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-3" style={{ position: 'relative' }}>
                <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
                  <img src={recipe.heroImage ? urlFor(recipe.heroImage).width(720).height(520).url() : `https://picsum.photos/seed/${slug}detail/720/520`} alt={recipe.title} style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,58,28,0.40) 0%,transparent 55%)' }} />
                </div>
                {recipe.tags && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                    {recipe.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    {recipe.sourceFarms?.map(f => (
                      <span key={f.slug.current} style={{ display: 'inline-block', background: 'rgba(185,125,42,0.12)', color: '#B97D2A', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', padding: '4px 10px', borderRadius: 100, border: '1px solid rgba(185,125,42,0.22)' }}>
                        🌿 {f.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <div className="label-text mb-5" style={{ color: '#2E6B2E' }}>Ingredients</div>
                {recipe.ingredientGroups.map((group) => (
                  <div key={group.groupName} style={{ marginBottom: 24 }}>
                    <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.825rem', color: '#1C3A1C', marginBottom: 8, paddingBottom: 6, borderBottom: '2px solid rgba(46,107,46,0.15)' }}>{group.groupName}</div>
                    {group.items.map((item) => (
                      <div key={item.item} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(28,58,28,0.06)' }}>
                        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#2E6B2E', minWidth: 52, flexShrink: 0 }}>{item.quantity}</span>
                        <span style={{ fontSize: '0.875rem', color: '#3D2E1A', fontFamily: "'Inter',sans-serif" }}>{item.item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* METHOD */}
      {recipe.steps && recipe.steps.length > 0 && (
        <section id="method" style={{ padding: '80px 0', backgroundColor: '#FDFBF5' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="label-text mb-4" style={{ color: '#2E6B2E' }}>Step by Step</div>
              <h2 className="heading-lg" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', color: '#1C3A1C' }}>Method</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recipe.steps.map((step, i) => (
                <div key={i} className="step-card" style={step.isFinale ? { border: '2px solid rgba(212,151,62,0.25)', background: 'rgba(240,221,176,0.15)' } : {}}>
                  <span className="step-num-bg" style={step.isFinale ? { color: 'rgba(185,125,42,0.10)' } : {}}>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: step.isFinale ? 'linear-gradient(135deg,#D4973E,#B97D2A)' : '#2E6B2E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.7rem', color: '#FDFBF5' }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="heading-md" style={{ fontSize: '1rem', color: '#1C3A1C' }}>{step.title}</div>
                    {step.duration && (
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '3px 8px', marginLeft: 'auto' }}>{step.duration}</span>
                    )}
                  </div>
                  <p className="body-text" style={{ color: '#6B5235', fontSize: '0.9rem' }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CHEF NOTES */}
      {recipe.chefNotes && recipe.chefNotes.length > 0 && (
        <section style={{ padding: '60px 0', backgroundColor: '#F5EFE0' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div style={{ background: '#1C3A1C', borderRadius: 24, padding: 48 }}>
              <div className="label-text mb-3" style={{ color: '#A0C490' }}>Chef&apos;s Notes</div>
              <div className="heading-md mb-10 text-white" style={{ fontSize: '1.5rem' }}>A few things that make the difference</div>
              <div className="grid md:grid-cols-3 gap-5">
                {recipe.chefNotes.map(note => (
                  <div key={note.title} style={{ background: 'rgba(253,251,245,0.07)', borderRadius: 16, padding: 22, border: '1px solid rgba(253,251,245,0.08)' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{note.emoji}</div>
                    <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#FDFBF5', marginBottom: 8 }}>{note.title}</div>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(253,251,245,0.65)', fontFamily: "'Inter',sans-serif", lineHeight: 1.6 }}>{note.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PROVENANCE */}
      {recipe.sourceFarms && recipe.sourceFarms.length > 0 && (
        <section style={{ padding: '80px 0', backgroundColor: '#FDFBF5' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="label-text mb-3" style={{ color: '#2E6B2E' }}>Where This Comes From</div>
              <h2 className="heading-lg" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', color: '#1C3A1C' }}>The farm behind this dish</h2>
            </div>
            {recipe.sourceFarms.map(farm => (
              <div key={farm.slug.current} style={{ background: '#F5EFE0', borderRadius: 24, padding: '36px 40px', border: '1px solid rgba(28,58,28,0.08)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                <div>
                  <div className="label-text mb-2" style={{ color: '#2E6B2E' }}>Farm Partner</div>
                  <div className="heading-md mb-1" style={{ fontSize: '1.5rem', color: '#1C3A1C' }}>{farm.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6B5235', fontFamily: "'Inter',sans-serif" }}>{farm.location}</div>
                </div>
                <Link href={`/farms/${farm.slug.current}`} className="btn-secondary">
                  Visit Farm Page
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section" style={{ padding: '80px 0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="label-text mb-4" style={{ color: '#A0C490' }}>Cook It This Week</div>
          <h2 className="heading-lg text-white mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.25rem)' }}>Get all the ingredients, pre-measured.</h2>
          <p className="body-text mb-10" style={{ color: 'rgba(253,251,245,0.75)', maxWidth: 460, margin: '0 auto 40px' }}>This recipe is included in the Grove Box this week. Everything you need, delivered Tuesday or Thursday.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <Link href="/#boxes" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 30px' }}>
              Get the Grove Box
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
            </Link>
            <Link href="/recipes" className="btn-ghost-white" style={{ fontSize: '1rem', padding: '14px 30px' }}>More Recipes</Link>
          </div>
        </div>
      </section>
    </>
  )
}
