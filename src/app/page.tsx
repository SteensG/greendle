import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Greendle — Farm to Door, Guilt-Free',
  description: 'Seasonal meal kits & groceries from certified organic farms, delivered carbon-neutral to your door.',
}

export default function HomePage() {
  return (
    <>
      <ScrollReveal />

      {/* HERO */}
      <section
        className="hero"
        style={{
          padding: '140px 0 80px',
          minHeight: '100vh',
          backgroundColor: '#1C3A1C',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 70% 40%,rgba(46,107,46,0.45) 0%,transparent 60%),radial-gradient(ellipse 50% 70% at 15% 80%,rgba(77,124,58,0.30) 0%,transparent 55%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="hero-image-wrap">
          <img src="https://placehold.co/1920x1080/2E6B2E/4D7C3A?text=." alt="" />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(126,168,107,0.18) 0%,transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '5%',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(77,124,58,0.22) 0%,transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl hero-content">
            <div className="badge mb-6">
              <span className="badge-dot" />
              Now delivering in 12 cities
            </div>
            <h1
              className="heading-xl text-white mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            >
              Farm to door.<br />
              <span style={{ color: '#A0C490' }}>Guilt&#8209;free.</span>
            </h1>
            <p
              className="body-text text-white mb-10"
              style={{ fontSize: '1.125rem', maxWidth: '520px', opacity: 0.82 }}
            >
              Greendle delivers zero-waste meal kits and groceries from local farms straight to your
              door — with 100% compostable packaging and carbon-neutral delivery.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="#boxes"
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '16px 32px' }}
              >
                Choose Your Box{' '}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="btn-ghost-white"
                style={{ fontSize: '1rem', padding: '15px 31px' }}
              >
                See How It Works
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div style={{ display: 'flex' }}>
                  <span style={{ fontSize: '0.7rem' }}>⭐⭐⭐⭐⭐</span>
                </div>
                <span
                  style={{
                    fontSize: '0.825rem',
                    color: 'rgba(253,251,245,0.75)',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  4.9 from 2,400+ reviews
                </span>
              </div>
              <div
                style={{
                  width: '1px',
                  height: '16px',
                  background: 'rgba(253,251,245,0.2)',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.8rem' }}>🌱</span>
                <span
                  style={{
                    fontSize: '0.825rem',
                    color: 'rgba(253,251,245,0.75)',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  B-Corp Certified
                </span>
              </div>
              <div
                style={{
                  width: '1px',
                  height: '16px',
                  background: 'rgba(253,251,245,0.2)',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.8rem' }}>📦</span>
                <span
                  style={{
                    fontSize: '0.825rem',
                    color: 'rgba(253,251,245,0.75)',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  100% plastic-free packaging
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
          className="scroll-indicator"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(253,251,245,0.45)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" data-reveal>
              <div
                className="heading-lg"
                style={{ fontSize: '2.25rem', color: '#2E6B2E' }}
              >
                180+
              </div>
              <div
                style={{
                  fontSize: '0.825rem',
                  color: '#6B5235',
                  fontFamily: "'Inter',sans-serif",
                  marginTop: '4px',
                }}
              >
                Local Farm Partners
              </div>
            </div>
            <div className="text-center" data-reveal data-delay="150">
              <div
                className="heading-lg"
                style={{ fontSize: '2.25rem', color: '#2E6B2E' }}
              >
                840k
              </div>
              <div
                style={{
                  fontSize: '0.825rem',
                  color: '#6B5235',
                  fontFamily: "'Inter',sans-serif",
                  marginTop: '4px',
                }}
              >
                Meals Delivered
              </div>
            </div>
            <div className="text-center" data-reveal data-delay="300">
              <div
                className="heading-lg"
                style={{ fontSize: '2.25rem', color: '#2E6B2E' }}
              >
                0%
              </div>
              <div
                style={{
                  fontSize: '0.825rem',
                  color: '#6B5235',
                  fontFamily: "'Inter',sans-serif",
                  marginTop: '4px',
                }}
              >
                Plastic Packaging
              </div>
            </div>
            <div className="text-center" data-reveal data-delay="400">
              <div
                className="heading-lg"
                style={{ fontSize: '2.25rem', color: '#2E6B2E' }}
              >
                12t
              </div>
              <div
                style={{
                  fontSize: '0.825rem',
                  color: '#6B5235',
                  fontFamily: "'Inter',sans-serif",
                  marginTop: '4px',
                }}
              >
                CO₂ Offset Monthly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GREENDLE */}
      <section id="mission" style={{ padding: '100px 0', backgroundColor: '#F5EFE0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-reveal>
            <div className="label-text mb-4" style={{ color: '#2E6B2E' }}>
              Our Promise
            </div>
            <h2
              className="heading-lg"
              style={{
                fontSize: 'clamp(2rem,4vw,3.25rem)',
                color: '#1C3A1C',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              Good for you.<br />Good for the planet.
            </h2>
            <p
              className="body-text mt-4"
              style={{ color: '#6B5235', maxWidth: '480px', margin: '12px auto 0' }}
            >
              Every decision we make — from supplier to doorstep — is guided by one question: is
              this the most sustainable way?
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="pillar-card" data-reveal>
              <div
                className="pillar-icon"
                style={{
                  background: 'rgba(46,107,46,0.10)',
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '20px',
                }}
              >
                🌾
              </div>
              <div
                className="heading-md mb-3"
                style={{ fontSize: '1.375rem', color: '#1C3A1C' }}
              >
                Locally Sourced
              </div>
              <p
                className="body-text"
                style={{ color: '#6B5235', fontSize: '0.9375rem' }}
              >
                Every ingredient travels less than 150 miles from farm to your kitchen. We work
                directly with 180+ regional growers — no middlemen, no cold-chain waste.
              </p>
              <div className="leaf-divider mt-6 mb-4">
                <span style={{ fontSize: '0.65rem' }}>🍃</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="tag">150mi radius</span>
                <span className="tag">180+ farms</span>
                <span className="tag">Seasonal menus</span>
              </div>
            </div>
            <div
              className="pillar-card"
              data-reveal
              data-delay="150"
              style={{
                background: 'linear-gradient(145deg,#2E6B2E,#1C3A1C)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="pillar-icon"
                style={{
                  background: 'rgba(253,251,245,0.12)',
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '20px',
                }}
              >
                ♻️
              </div>
              <div
                className="heading-md mb-3"
                style={{ fontSize: '1.375rem', color: '#FDFBF5' }}
              >
                Zero-Waste Packaging
              </div>
              <p
                className="body-text"
                style={{ color: 'rgba(253,251,245,0.75)', fontSize: '0.9375rem' }}
              >
                Every box, insert, and ice-pack is 100% compostable or returnable. We've eliminated
                plastic entirely — and we'll prove it with a full materials report in every delivery.
              </p>
              <div
                style={{ margin: '24px 0', height: '1px', background: 'rgba(253,251,245,0.12)' }}
              />
              <div className="flex flex-wrap gap-2">
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(160,196,144,0.20)',
                    color: '#A0C490',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    border: '1px solid rgba(160,196,144,0.30)',
                  }}
                >
                  Compostable
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(160,196,144,0.20)',
                    color: '#A0C490',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    border: '1px solid rgba(160,196,144,0.30)',
                  }}
                >
                  Returnable
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(160,196,144,0.20)',
                    color: '#A0C490',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    border: '1px solid rgba(160,196,144,0.30)',
                  }}
                >
                  Plastic-free
                </span>
              </div>
            </div>
            <div className="pillar-card" data-reveal data-delay="300">
              <div
                className="pillar-icon"
                style={{
                  background: 'rgba(185,125,42,0.12)',
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '20px',
                }}
              >
                🚲
              </div>
              <div
                className="heading-md mb-3"
                style={{ fontSize: '1.375rem', color: '#1C3A1C' }}
              >
                Carbon-Neutral Delivery
              </div>
              <p
                className="body-text"
                style={{ color: '#6B5235', fontSize: '0.9375rem' }}
              >
                Our last-mile fleet runs on electric cargo bikes and EVs. For routes that can't go
                electric yet, we offset 150% of emissions through verified reforestation projects.
              </p>
              <div className="leaf-divider mt-6 mb-4">
                <span style={{ fontSize: '0.65rem' }}>🌍</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="tag">EV fleet</span>
                <span className="tag">150% offset</span>
                <span className="tag">Verified carbon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '100px 0', backgroundColor: '#FDFBF5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-reveal>
            <div className="label-text mb-4" style={{ color: '#2E6B2E' }}>
              Simple Process
            </div>
            <h2
              className="heading-lg"
              style={{ fontSize: 'clamp(2rem,4vw,3.25rem)', color: '#1C3A1C' }}
            >
              From field to fork<br />in three steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div
              className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px"
              style={{
                background:
                  'linear-gradient(90deg,transparent,rgba(46,107,46,0.20),transparent)',
              }}
            />
            <div data-reveal style={{ position: 'relative', paddingTop: '24px' }}>
              <span
                className="step-number"
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontWeight: 900,
                  fontSize: '4.5rem',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  color: 'rgba(28,58,28,0.08)',
                  position: 'absolute',
                  top: '-10px',
                  left: '-8px',
                }}
              >
                01
              </span>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background:
                    'linear-gradient(135deg,rgba(46,107,46,0.12),rgba(77,124,58,0.08))',
                  border: '1px solid rgba(46,107,46,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '20px',
                  boxShadow: '0 2px 8px rgba(46,107,46,0.10)',
                }}
              >
                🛒
              </div>
              <div
                className="heading-md mb-3"
                style={{ fontSize: '1.25rem', color: '#1C3A1C' }}
              >
                Pick your box
              </div>
              <p
                className="body-text"
                style={{ color: '#6B5235', fontSize: '0.9125rem' }}
              >
                Choose from our seasonal meal kits or flexible grocery bundles. Set your household
                size, dietary preferences, and delivery day.
              </p>
            </div>
            <div
              data-reveal
              data-delay="200"
              style={{ position: 'relative', paddingTop: '24px' }}
            >
              <span
                className="step-number"
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontWeight: 900,
                  fontSize: '4.5rem',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  color: 'rgba(28,58,28,0.08)',
                  position: 'absolute',
                  top: '-10px',
                  left: '-8px',
                }}
              >
                02
              </span>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background:
                    'linear-gradient(135deg,rgba(46,107,46,0.12),rgba(77,124,58,0.08))',
                  border: '1px solid rgba(46,107,46,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '20px',
                }}
              >
                🌿
              </div>
              <div
                className="heading-md mb-3"
                style={{ fontSize: '1.25rem', color: '#1C3A1C' }}
              >
                We harvest &amp; pack
              </div>
              <p
                className="body-text"
                style={{ color: '#6B5235', fontSize: '0.9125rem' }}
              >
                Our farm partners harvest the morning before delivery. Everything is packed in
                compostable insulation within hours — nothing sits in a warehouse.
              </p>
            </div>
            <div
              data-reveal
              data-delay="400"
              style={{ position: 'relative', paddingTop: '24px' }}
            >
              <span
                className="step-number"
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontWeight: 900,
                  fontSize: '4.5rem',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  color: 'rgba(28,58,28,0.08)',
                  position: 'absolute',
                  top: '-10px',
                  left: '-8px',
                }}
              >
                03
              </span>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background:
                    'linear-gradient(135deg,rgba(46,107,46,0.12),rgba(77,124,58,0.08))',
                  border: '1px solid rgba(46,107,46,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '20px',
                }}
              >
                🚲
              </div>
              <div
                className="heading-md mb-3"
                style={{ fontSize: '1.25rem', color: '#1C3A1C' }}
              >
                Door-to-door delivery
              </div>
              <p
                className="body-text"
                style={{ color: '#6B5235', fontSize: '0.9125rem' }}
              >
                Our carbon-neutral fleet delivers to your door with live tracking. Leave a note,
                choose a safe spot, or pick up from a local hub — your call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOXES */}
      <section id="boxes" style={{ padding: '100px 0', backgroundColor: '#F5EFE0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-reveal>
            <div className="label-text mb-4" style={{ color: '#2E6B2E' }}>
              What&apos;s In The Box
            </div>
            <h2
              className="heading-lg"
              style={{
                fontSize: 'clamp(2rem,4vw,3.25rem)',
                color: '#1C3A1C',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              A box for every kind of kitchen
            </h2>
            <p
              className="body-text mt-4"
              style={{ color: '#6B5235', maxWidth: '440px', margin: '12px auto 0' }}
            >
              Pause, skip, or cancel any week. No lock-in, no drama.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Seed Box */}
            <div className="box-card" data-reveal>
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img
                  src="https://placehold.co/480x220/C4D9B8/2E6B2E?text=The+Seed+Box"
                  alt="Seed Box"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top,rgba(28,58,28,0.55) 0%,transparent 60%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                  <span
                    className="tag"
                    style={{
                      background: 'rgba(253,251,245,0.20)',
                      color: '#FDFBF5',
                      borderColor: 'rgba(253,251,245,0.30)',
                    }}
                  >
                    Starter
                  </span>
                </div>
              </div>
              <div style={{ padding: '28px' }}>
                <div
                  className="heading-md mb-1"
                  style={{ fontSize: '1.375rem', color: '#1C3A1C' }}
                >
                  The Seed Box
                </div>
                <div
                  style={{
                    fontSize: '0.825rem',
                    color: '#6B5235',
                    fontFamily: "'Inter',sans-serif",
                    marginBottom: '16px',
                  }}
                >
                  2–3 meals · 1–2 people
                </div>
                <p
                  className="body-text mb-6"
                  style={{ color: '#6B5235', fontSize: '0.9rem' }}
                >
                  Perfect for couples or solo cooks exploring seasonal, local eating for the first
                  time.
                </p>
                <ul className="check-list mb-6">
                  <li>3 seasonal recipes per week</li>
                  <li>All ingredients pre-portioned</li>
                  <li>Compostable packaging</li>
                  <li>Recipe cards with farm stories</li>
                </ul>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span
                      style={{
                        fontFamily: "'Raleway',sans-serif",
                        fontWeight: 800,
                        fontSize: '2rem',
                        color: '#1C3A1C',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      £34
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: '#6B5235',
                        fontFamily: "'Inter',sans-serif",
                      }}
                    >
                      /week
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#7EA86B',
                      fontFamily: "'Inter',sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    ≈ £5.67 per meal
                  </div>
                </div>
                <a
                  href="#"
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
                >
                  Choose Seed Box
                </a>
              </div>
            </div>

            {/* Grove Box */}
            <div
              className="box-card featured"
              data-reveal
              data-delay="150"
              style={{ marginTop: '-12px' }}
            >
              <div
                style={{
                  background: 'linear-gradient(90deg,#2E6B2E,#4D7C3A)',
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '0.75rem' }}>✦</span>
                <span
                  style={{
                    fontFamily: "'Raleway',sans-serif",
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#FDFBF5',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  Most Popular
                </span>
                <span style={{ fontSize: '0.75rem' }}>✦</span>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img
                  src="https://placehold.co/480x220/7EA86B/1C3A1C?text=The+Grove+Box"
                  alt="Grove Box"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top,rgba(28,58,28,0.55) 0%,transparent 60%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                  <span
                    className="tag"
                    style={{
                      background: 'rgba(253,251,245,0.20)',
                      color: '#FDFBF5',
                      borderColor: 'rgba(253,251,245,0.30)',
                    }}
                  >
                    Best Value
                  </span>
                </div>
              </div>
              <div style={{ padding: '28px' }}>
                <div
                  className="heading-md mb-1"
                  style={{ fontSize: '1.375rem', color: '#1C3A1C' }}
                >
                  The Grove Box
                </div>
                <div
                  style={{
                    fontSize: '0.825rem',
                    color: '#6B5235',
                    fontFamily: "'Inter',sans-serif",
                    marginBottom: '16px',
                  }}
                >
                  4–5 meals · 2–4 people
                </div>
                <p
                  className="body-text mb-6"
                  style={{ color: '#6B5235', fontSize: '0.9rem' }}
                >
                  Our most loved box — enough variety for a full family week with rotating seasonal
                  menus.
                </p>
                <ul className="check-list mb-6">
                  <li>5 recipes + 1 bonus snack kit</li>
                  <li>Priority farm-fresh selection</li>
                  <li>Free delivery every week</li>
                  <li>Access to exclusive recipes</li>
                  <li>Monthly farm visit invites</li>
                </ul>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span
                      style={{
                        fontFamily: "'Raleway',sans-serif",
                        fontWeight: 800,
                        fontSize: '2rem',
                        color: '#1C3A1C',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      £62
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: '#6B5235',
                        fontFamily: "'Inter',sans-serif",
                      }}
                    >
                      /week
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#7EA86B',
                      fontFamily: "'Inter',sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    ≈ £3.10 per meal
                  </div>
                </div>
                <a
                  href="#"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
                >
                  Choose Grove Box
                </a>
              </div>
            </div>

            {/* Harvest Box */}
            <div className="box-card" data-reveal data-delay="300">
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img
                  src="https://placehold.co/480x220/4D7C3A/F5EFE0?text=The+Harvest+Box"
                  alt="Harvest Box"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top,rgba(28,58,28,0.55) 0%,transparent 60%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                  <span
                    className="tag"
                    style={{
                      background: 'rgba(253,251,245,0.20)',
                      color: '#FDFBF5',
                      borderColor: 'rgba(253,251,245,0.30)',
                    }}
                  >
                    Premium
                  </span>
                </div>
              </div>
              <div style={{ padding: '28px' }}>
                <div
                  className="heading-md mb-1"
                  style={{ fontSize: '1.375rem', color: '#1C3A1C' }}
                >
                  The Harvest Box
                </div>
                <div
                  style={{
                    fontSize: '0.825rem',
                    color: '#6B5235',
                    fontFamily: "'Inter',sans-serif",
                    marginBottom: '16px',
                  }}
                >
                  6–7 meals · 4–6 people
                </div>
                <p
                  className="body-text mb-6"
                  style={{ color: '#6B5235', fontSize: '0.9rem' }}
                >
                  For large households or serious home cooks who want the full farm-to-table
                  experience.
                </p>
                <ul className="check-list mb-6">
                  <li>7 full recipes + extras</li>
                  <li>Chef-curated seasonal menus</li>
                  <li>Artisan add-ons available</li>
                  <li>Dedicated account manager</li>
                </ul>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span
                      style={{
                        fontFamily: "'Raleway',sans-serif",
                        fontWeight: 800,
                        fontSize: '2rem',
                        color: '#1C3A1C',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      £98
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: '#6B5235',
                        fontFamily: "'Inter',sans-serif",
                      }}
                    >
                      /week
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#7EA86B',
                      fontFamily: "'Inter',sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    ≈ £2.33 per meal
                  </div>
                </div>
                <a
                  href="#"
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
                >
                  Choose Harvest Box
                </a>
              </div>
            </div>
          </div>
          <p
            className="text-center mt-8"
            style={{
              fontSize: '0.825rem',
              color: '#6B5235',
              fontFamily: "'Inter',sans-serif",
            }}
          >
            All boxes include free delivery · Pause or cancel anytime · First box 25% off with
            code{' '}
            <strong style={{ color: '#2E6B2E' }}>GREENFIRST</strong>
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: '100px 0', backgroundColor: '#FDFBF5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-reveal>
            <div className="label-text mb-4" style={{ color: '#2E6B2E' }}>
              What People Say
            </div>
            <h2
              className="heading-lg"
              style={{ fontSize: 'clamp(2rem,4vw,3.25rem)', color: '#1C3A1C' }}
            >
              Real kitchens.<br />Real stories.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div
              className="testimonial-card"
              data-reveal
              style={{
                backgroundColor: '#FDFBF5',
                border: '1px solid rgba(28,58,28,0.08)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow:
                  '0 2px 8px rgba(28,58,28,0.04),0 8px 24px rgba(28,58,28,0.06)',
              }}
            >
              <div
                style={{ display: 'flex', gap: '2px', marginBottom: '16px', fontSize: '0.9rem' }}
              >
                ⭐⭐⭐⭐⭐
              </div>
              <p
                className="body-text mb-6"
                style={{ color: '#3D2E1A', fontSize: '0.9375rem', fontStyle: 'italic' }}
              >
                &quot;Switching to Greendle genuinely changed how our family thinks about food. We
                actually know which farm our carrots came from. The packaging goes straight in our
                compost — zero guilt.&quot;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="https://placehold.co/44x44/C4D9B8/2E6B2E?text=SR"
                  alt="Sarah R."
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Raleway',sans-serif",
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#1C3A1C',
                    }}
                  >
                    Sarah R.
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#6B5235',
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    Grove Box · Manchester
                  </div>
                </div>
              </div>
            </div>
            <div
              className="testimonial-card"
              data-reveal
              data-delay="150"
              style={{
                background: 'linear-gradient(145deg,#1C3A1C,#265426)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow:
                  '0 2px 8px rgba(28,58,28,0.04),0 8px 24px rgba(28,58,28,0.06)',
              }}
            >
              <div
                style={{ display: 'flex', gap: '2px', marginBottom: '16px', fontSize: '0.9rem' }}
              >
                ⭐⭐⭐⭐⭐
              </div>
              <p
                className="body-text mb-6"
                style={{
                  color: 'rgba(253,251,245,0.82)',
                  fontSize: '0.9375rem',
                  fontStyle: 'italic',
                }}
              >
                &quot;I&apos;ve tried every meal kit on the market. Greendle is the only one where
                the food actually tastes like it was picked this morning — because it was. Plus the
                recipes are genuinely exciting.&quot;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="https://placehold.co/44x44/4D7C3A/F5EFE0?text=MP"
                  alt="Marcus P."
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Raleway',sans-serif",
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#FDFBF5',
                    }}
                  >
                    Marcus P.
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(253,251,245,0.55)',
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    Harvest Box · London
                  </div>
                </div>
              </div>
            </div>
            <div
              className="testimonial-card"
              data-reveal
              data-delay="300"
              style={{
                backgroundColor: '#FDFBF5',
                border: '1px solid rgba(28,58,28,0.08)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow:
                  '0 2px 8px rgba(28,58,28,0.04),0 8px 24px rgba(28,58,28,0.06)',
              }}
            >
              <div
                style={{ display: 'flex', gap: '2px', marginBottom: '16px', fontSize: '0.9rem' }}
              >
                ⭐⭐⭐⭐⭐
              </div>
              <p
                className="body-text mb-6"
                style={{ color: '#3D2E1A', fontSize: '0.9375rem', fontStyle: 'italic' }}
              >
                &quot;The carbon-neutral delivery was the thing that sealed it for me. My kids can
                see the bike courier arrive. They&apos;re proud of the choice we&apos;ve made as a
                family. That matters.&quot;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="https://placehold.co/44x44/C4D9B8/2E6B2E?text=LT"
                  alt="Lena T."
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Raleway',sans-serif",
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#1C3A1C',
                    }}
                  >
                    Lena T.
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#6B5235',
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    Grove Box · Bristol
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <div
              className="label-text mb-8"
              style={{ color: 'rgba(28,58,28,0.35)' }}
            >
              As seen in
            </div>
            <div className="flex flex-wrap items-center justify-center gap-10">
              <span
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'rgba(28,58,28,0.20)',
                  letterSpacing: '-0.02em',
                }}
              >
                The Guardian
              </span>
              <span
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'rgba(28,58,28,0.20)',
                  letterSpacing: '-0.02em',
                }}
              >
                WIRED
              </span>
              <span
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'rgba(28,58,28,0.20)',
                  letterSpacing: '-0.02em',
                }}
              >
                Olive Magazine
              </span>
              <span
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'rgba(28,58,28,0.20)',
                  letterSpacing: '-0.02em',
                }}
              >
                BBC Good Food
              </span>
              <span
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'rgba(28,58,28,0.20)',
                  letterSpacing: '-0.02em',
                }}
              >
                Positive News
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{ padding: '100px 0' }}>
        <div
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
          data-reveal
        >
          <div
            className="badge mb-8"
            style={{ margin: '0 auto 32px', display: 'inline-flex' }}
          >
            <span className="badge-dot" />
            Limited spots available this week
          </div>
          <h2
            className="heading-xl text-white mb-6"
            style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}
          >
            Start eating better,<br />
            <span style={{ color: '#A0C490' }}>this Thursday.</span>
          </h2>
          <p
            className="body-text mb-10"
            style={{
              color: 'rgba(253,251,245,0.75)',
              fontSize: '1.0625rem',
              maxWidth: '460px',
              margin: '0 auto 40px',
            }}
          >
            Enter your postcode to check availability and lock in your first box at 25% off.
          </p>
          <form
            action="https://submit-form.com/RYANPrRzp"
            method="POST"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                className="email-input"
                type="email"
                name="email"
                placeholder="Your email address"
                style={{ flex: 1, minWidth: '200px' }}
                required
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ whiteSpace: 'nowrap', border: 'none', cursor: 'pointer' }}
              >
                Get 25% Off
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </button>
            </div>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'rgba(253,251,245,0.45)',
                fontFamily: "'Inter',sans-serif",
              }}
            >
              No spam, ever. Unsubscribe anytime. 25% off your first box, applied at checkout.
            </p>
          </form>
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(253,251,245,0.65)',
                fontSize: '0.825rem',
                fontFamily: "'Inter',sans-serif",
              }}
            >
              <span>🔒</span> No commitment
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(253,251,245,0.65)',
                fontSize: '0.825rem',
                fontFamily: "'Inter',sans-serif",
              }}
            >
              <span>📦</span> Skip or cancel anytime
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(253,251,245,0.65)',
                fontSize: '0.825rem',
                fontFamily: "'Inter',sans-serif",
              }}
            >
              <span>💚</span> Freshness guaranteed
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
