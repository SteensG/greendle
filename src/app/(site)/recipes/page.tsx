import type { Metadata } from 'next'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { recipesListQuery } from '@/lib/queries'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: "This Week's Menu",
  description: "This week's seasonal recipes from Greendle. Farm-fresh, chef-designed, delivered to your door.",
}

export const revalidate = 3600

interface Recipe {
  _id: string
  title: string
  subtitle?: string
  slug: { current: string }
  heroImage?: { asset: { _ref: string } }
  description?: string
  isChefsPick?: boolean
  season?: string
  prepTime?: number
  cookTime?: number
  servings?: string
  difficulty?: string
  dietary?: string[]
  calories?: number
  mealKit?: string
  tags?: string[]
  sourceFarms?: { name: string; slug: { current: string }; location: string }[]
}

const FALLBACK_RECIPES = [
  { slug: 'wild-garlic-linguine', title: 'Wild Garlic & Nettle Linguine', subtitle: 'with Toasted Hazelnuts', time: '40 min', serves: '2–4', dietary: 'V', dietaryColor: '#7EA86B', isChefsPick: true, tags: ['Vegetarian','Spring Special','Grove Box'], farm: 'Ashfield Organics', image: 'https://picsum.photos/seed/pastaspring/640/260' },
  { slug: '', title: 'Rhubarb & Ginger Upside-Down Cake', subtitle: '', time: '55 min', serves: '8', dietary: 'V', dietaryColor: '#7EA86B', isChefsPick: false, tags: ['Vegetarian','Dessert','Harvest Box'], farm: 'Pennine Free Range', image: 'https://picsum.photos/seed/rhubarb/640/260' },
  { slug: '', title: 'Spring Green Frittata', subtitle: 'with Herb Salad', time: '25 min', serves: '2', dietary: 'V', dietaryColor: '#7EA86B', isChefsPick: false, tags: ['Vegetarian','Quick','Seed Box'], farm: 'Cwm Uchaf Herbs', image: 'https://picsum.photos/seed/frittata/640/260' },
  { slug: '', title: 'Slow-Roasted Heritage Carrots', subtitle: 'with Dukkah & Yoghurt', time: '70 min', serves: '4', dietary: 'VG', dietaryColor: '#4D7C3A', isChefsPick: false, tags: ['Vegan','Sides','Grove Box'], farm: 'Meadowbrook Farm', image: 'https://picsum.photos/seed/carrots/640/260' },
  { slug: '', title: 'PSB with Anchovy Butter', subtitle: 'Purple Sprouting Broccoli', time: '15 min', serves: '2', dietary: 'F', dietaryColor: '#B97D2A', isChefsPick: false, tags: ['Pescatarian','Quick','Seed Box'], farm: 'Ashfield Organics', image: 'https://picsum.photos/seed/broccoli/640/260' },
  { slug: '', title: 'Kale & Stilton Tart', subtitle: 'with Walnut Pastry', time: '65 min', serves: '6', dietary: 'V', dietaryColor: '#7EA86B', isChefsPick: false, tags: ['Vegetarian','Weekend','Harvest Box'], farm: 'Meadowbrook Farm', image: 'https://picsum.photos/seed/kale/640/260' },
]

const MARQUEE_ITEMS = ['🥬 Purple Sprouting Broccoli','🧅 Spring Onions','🌿 Wild Garlic','🫛 Broad Beans (early)','🍓 Forced Rhubarb','🥕 Heritage Carrots','🌰 Stored Squash','🥦 Kale & Greens']

export default async function RecipesPage() {
  let recipes: Recipe[] = []
  try {
    recipes = await client.fetch(recipesListQuery)
  } catch {
    // Fallback
  }

  const hasSanityRecipes = recipes.length > 0
  const chefsPick = hasSanityRecipes ? recipes.find(r => r.isChefsPick) || recipes[0] : null

  return (
    <>
      <ScrollReveal />

      {/* HERO */}
      <section style={{ minHeight: '100vh', backgroundColor: '#1C3A1C', backgroundImage: 'radial-gradient(ellipse 75% 65% at 65% 35%,rgba(46,107,46,0.45) 0%,transparent 60%),radial-gradient(ellipse 45% 65% at 10% 75%,rgba(77,124,58,0.30) 0%,transparent 55%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '140px 0 80px' }}>
        <div className="hero-image-wrap"><img src="https://picsum.photos/seed/springvegetables/1920/1080" alt="" /></div>
        <div style={{ position: 'absolute', top: '18%', right: '6%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(185,125,42,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="badge mb-6"><span className="badge-dot" />Week of 9–15 March 2026</div>
            <h1 className="heading-xl text-white mb-6" style={{ fontSize: 'clamp(2.75rem,5.5vw,5rem)' }}>
              This week&apos;s menu.<br /><span style={{ color: '#D4973E' }}>Spring is early.</span>
            </h1>
            <p className="body-text text-white mb-10" style={{ fontSize: '1.125rem', maxWidth: 540, opacity: 0.82 }}>
              Our chefs and farm partners design each week&apos;s recipes around what&apos;s at peak ripeness right now. No out-of-season compromise.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/#boxes" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 32px' }}>
                Get This Week&apos;s Box
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(253,251,245,0.50)', fontSize: '0.825rem', fontFamily: "'Inter',sans-serif" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="6" /><path d="M7 4v3l2 2" /></svg>
              Menus rotate every Monday · Next update in 4 days
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(253,251,245,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* SEASONAL MARQUEE */}
      <div style={{ backgroundColor: '#F0DDB0', padding: '18px 0', overflow: 'hidden', borderBottom: '1px solid rgba(185,125,42,0.15)' }}>
        <style>{`
          .marquee-track { display:flex; gap:20px; animation:marquee 30s linear infinite; width:max-content; }
          @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        `}</style>
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '0.875rem', color: '#3D2E1A', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                {i % 1 === 0 && i > 0 ? <span style={{ color: 'rgba(61,46,26,0.30)' }}>·</span> : null}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED RECIPE */}
      {(chefsPick || !hasSanityRecipes) && (
        <section style={{ padding: '100px 0', backgroundColor: '#F5EFE0' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12" data-reveal>
              <div className="label-text mb-4" style={{ color: '#2E6B2E' }}>Chef&apos;s Pick</div>
              <h2 className="heading-lg" style={{ fontSize: 'clamp(2rem,4vw,3.25rem)', color: '#1C3A1C' }}>This week&apos;s star dish</h2>
            </div>
            <div className="box-card" style={{ borderRadius: 28, overflow: 'hidden' }} data-reveal>
              <div className="grid md:grid-cols-2">
                <div style={{ position: 'relative', minHeight: 440 }}>
                  <img
                    src={chefsPick?.heroImage ? urlFor(chefsPick.heroImage).width(640).height(480).url() : 'https://picsum.photos/seed/pastaspring/640/480'}
                    alt={chefsPick?.title || 'Wild Garlic & Nettle Linguine'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,58,28,0.45) 0%,transparent 50%)' }} />
                  <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 8 }}>
                    <span className="tag" style={{ background: 'rgba(253,251,245,0.90)', color: '#1C3A1C', borderColor: 'rgba(28,58,28,0.15)' }}>
                      {chefsPick ? `${(chefsPick.prepTime || 0) + (chefsPick.cookTime || 0)} min` : '40 min'}
                    </span>
                    <span className="tag" style={{ background: 'rgba(253,251,245,0.90)', color: '#1C3A1C', borderColor: 'rgba(28,58,28,0.15)' }}>
                      Serves {chefsPick?.servings || '2–4'}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                    <span style={{ background: 'linear-gradient(135deg,rgba(212,151,62,0.95),rgba(185,125,42,0.95))', color: '#FDFBF5', fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 100 }}>✦ Chef&apos;s Pick · Spring</span>
                  </div>
                </div>
                <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '0.825rem', color: '#2E6B2E', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                    🌿 Wild garlic from Ashfield Organics, Glos. · Pasta from Bakers Mill, Yorkshire
                  </div>
                  <h3 className="heading-lg mb-6" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.25rem)', color: '#1C3A1C' }}>
                    {chefsPick?.title || 'Wild Garlic & Nettle Linguine with Toasted Hazelnuts'}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", lineHeight: 1.6, marginBottom: 24 }}>
                    {chefsPick?.description || 'A stunning spring pasta using freshly picked wild garlic leaves and blanched nettle tips, finished with crushed Kentish hazelnuts and aged parmesan.'}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                    {(chefsPick?.tags || ['Vegetarian', 'Spring Special', '30–40 min', 'Grove Box']).map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Link href={chefsPick ? `/recipes/${chefsPick.slug.current}` : '/recipes/wild-garlic-linguine'} className="btn-primary">
                      Cook This Recipe
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RECIPE GRID */}
      <section style={{ padding: '0 0 100px', backgroundColor: '#F5EFE0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="label-text mb-8" style={{ color: '#2E6B2E' }}>All This Week</div>
          <div className="grid md:grid-cols-3 gap-6">
            {hasSanityRecipes ? recipes.map(recipe => (
              <div key={recipe._id} className="recipe-card" style={{ borderRadius: 24 }} data-reveal>
                <div style={{ position: 'relative', height: 260 }}>
                  {recipe.heroImage ? (
                    <img src={urlFor(recipe.heroImage).width(640).height(260).url()} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={`https://picsum.photos/seed/${recipe.slug.current}/640/260`} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,58,28,0.60) 0%,transparent 55%)' }} />
                  {recipe.dietary?.[0] && (
                    <div className="dietary-badge">{recipe.dietary[0].slice(0,2).toUpperCase()}</div>
                  )}
                  {recipe.isChefsPick && (
                    <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                      <span style={{ background: 'linear-gradient(135deg,rgba(212,151,62,0.95),rgba(185,125,42,0.95))', color: '#FDFBF5', fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100 }}>✦ Chef&apos;s Pick</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: 28 }}>
                  <div style={{ fontSize: '0.775rem', color: '#2E6B2E', fontFamily: "'Inter',sans-serif", fontWeight: 500, marginBottom: 8 }}>
                    {(recipe.prepTime || 0) + (recipe.cookTime || 0)} min · Serves {recipe.servings} · {recipe.dietary?.[0] || 'Vegetarian'}
                  </div>
                  <div className="heading-md mb-3" style={{ fontSize: '1.25rem', color: '#1C3A1C' }}>{recipe.title}</div>
                  <p style={{ fontSize: '0.875rem', color: '#6B5235', fontFamily: "'Inter',sans-serif", lineHeight: 1.6, marginBottom: 20 }}>{recipe.description}</p>
                  <Link href={`/recipes/${recipe.slug.current}`} className="btn-primary" style={{ fontSize: '0.875rem' }}>
                    Cook This Recipe <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                  </Link>
                </div>
              </div>
            )) : FALLBACK_RECIPES.map(recipe => (
              <div key={recipe.title} className="recipe-card" style={{ borderRadius: 24 }} data-reveal>
                <div style={{ position: 'relative', height: 260 }}>
                  <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,58,28,0.60) 0%,transparent 55%)' }} />
                  <div className="dietary-badge" style={{ background: recipe.dietaryColor }}>{recipe.dietary}</div>
                  {recipe.isChefsPick && (
                    <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                      <span style={{ background: 'linear-gradient(135deg,rgba(212,151,62,0.95),rgba(185,125,42,0.95))', color: '#FDFBF5', fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100 }}>✦ Chef&apos;s Pick</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: 28 }}>
                  <div style={{ fontSize: '0.775rem', color: '#2E6B2E', fontFamily: "'Inter',sans-serif", fontWeight: 500, marginBottom: 8 }}>{recipe.time} · Serves {recipe.serves}</div>
                  <div className="heading-md mb-3" style={{ fontSize: '1.25rem', color: '#1C3A1C' }}>{recipe.title}{recipe.subtitle ? ` ${recipe.subtitle}` : ''}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {recipe.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {recipe.slug ? (
                    <Link href={`/recipes/${recipe.slug}`} className="btn-primary" style={{ fontSize: '0.875rem' }}>
                      Cook This Recipe <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                    </Link>
                  ) : (
                    <Link href="/#boxes" className="btn-secondary" style={{ fontSize: '0.875rem' }}>Get This Box</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{ padding: '80px 0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10" data-reveal>
          <div className="label-text mb-4" style={{ color: '#A0C490' }}>Get These Recipes Delivered</div>
          <h2 className="heading-lg text-white mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.25rem)' }}>Every ingredient, pre-measured and ready to cook.</h2>
          <p className="body-text mb-10" style={{ color: 'rgba(253,251,245,0.75)', maxWidth: 460, margin: '0 auto 40px' }}>All this week&apos;s recipes come in the Grove Box. Delivered Tuesday or Thursday.</p>
          <Link href="/#boxes" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 30px' }}>
            Choose Your Box
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
