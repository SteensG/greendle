'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

const BOXES = [
  {
    id: 'seed',
    name: 'The Seed Box',
    tagline: '2–3 meals · 1–2 people',
    price: '£34',
    perMeal: '≈ £5.67 per meal',
    emoji: '🌱',
    color: '#C4D9B8',
  },
  {
    id: 'grove',
    name: 'The Grove Box',
    tagline: '3–4 meals · 2–4 people',
    price: '£49',
    perMeal: '≈ £4.08 per meal',
    emoji: '🌿',
    color: '#7EA86B',
    popular: true,
  },
  {
    id: 'harvest',
    name: 'The Harvest Box',
    tagline: '4–5 meals · 3–5 people',
    price: '£64',
    perMeal: '≈ £3.56 per meal',
    emoji: '🍃',
    color: '#4D7C3A',
  },
]

function GetStartedForm() {
  const searchParams = useSearchParams()
  const initialBox = searchParams.get('box') ?? 'grove'
  const [selectedBox, setSelectedBox] = useState(
    BOXES.find(b => b.id === initialBox) ? initialBox : 'grove'
  )
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#1C3A1C',
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 60% 40%,rgba(46,107,46,0.45) 0%,transparent 60%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 520 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#2E6B2E,#4D7C3A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 28px',
              boxShadow: '0 8px 32px rgba(46,107,46,0.35)',
            }}
          >
            ✓
          </div>
          <h1
            className="heading-xl"
            style={{ color: '#FDFBF5', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: 16 }}
          >
            You&apos;re on the list.
          </h1>
          <p
            className="body-text"
            style={{ color: 'rgba(253,251,245,0.75)', fontSize: '1.125rem', marginBottom: 40 }}
          >
            We&apos;ll be in touch within 24 hours with your first delivery date and a welcome
            discount.
          </p>
          <Link
            href="/"
            className="btn-ghost-white"
            style={{ fontSize: '0.9375rem', padding: '14px 32px' }}
          >
            Back to Greendle
          </Link>
        </div>
      </div>
    )
  }

  const box = BOXES.find(b => b.id === selectedBox)!

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FDFBF5',
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 90% 10%,rgba(126,168,107,0.12) 0%,transparent 55%)',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#1C3A1C',
          backgroundImage:
            'radial-gradient(ellipse 80% 100% at 50% 0%,rgba(46,107,46,0.50) 0%,transparent 60%)',
          padding: '80px 24px 64px',
          textAlign: 'center',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg,#2E6B2E,#4D7C3A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            🌿
          </div>
          <span
            style={{
              fontFamily: "'Raleway',sans-serif",
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#FDFBF5',
              letterSpacing: '-0.02em',
            }}
          >
            Greendle
          </span>
        </Link>
        <div className="label-text mb-4" style={{ color: '#7EA86B' }}>
          Get Started
        </div>
        <h1
          className="heading-xl"
          style={{ color: '#FDFBF5', fontSize: 'clamp(2rem,4vw,3.25rem)', marginBottom: 12 }}
        >
          Choose your box
        </h1>
        <p
          className="body-text"
          style={{ color: 'rgba(253,251,245,0.70)', fontSize: '1.0625rem', maxWidth: 420, margin: '0 auto' }}
        >
          Pause, skip, or cancel any week. First box arrives in 3–5 days.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6" style={{ padding: '60px 24px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: 16,
            maxWidth: 860,
            margin: '0 auto 56px',
          }}
        >
          {BOXES.map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBox(b.id)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                borderRadius: 20,
                border: `2px solid ${selectedBox === b.id ? '#2E6B2E' : 'rgba(28,58,28,0.10)'}`,
                backgroundColor: selectedBox === b.id ? 'rgba(46,107,46,0.06)' : '#FDFBF5',
                padding: '24px',
                position: 'relative',
                transition: 'border-color 0.2s ease, background-color 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                transform: selectedBox === b.id ? 'translateY(-3px)' : 'none',
                boxShadow: selectedBox === b.id
                  ? '0 4px 16px rgba(46,107,46,0.15), 0 16px 40px rgba(46,107,46,0.10)'
                  : '0 2px 8px rgba(28,58,28,0.05)',
                textAlign: 'left',
              }}
            >
              {b.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg,#2E6B2E,#4D7C3A)',
                    color: '#FDFBF5',
                    fontFamily: "'Raleway',sans-serif",
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '4px 14px',
                    borderRadius: 100,
                    whiteSpace: 'nowrap',
                  }}
                >
                  ✦ Most Popular ✦
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `linear-gradient(135deg,${b.color}40,${b.color}20)`,
                    border: `1px solid ${b.color}60`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  {b.emoji}
                </div>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${selectedBox === b.id ? '#2E6B2E' : 'rgba(28,58,28,0.20)'}`,
                    backgroundColor: selectedBox === b.id ? '#2E6B2E' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  {selectedBox === b.id && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#FDFBF5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <div
                className="heading-md"
                style={{ fontSize: '1.1rem', color: '#1C3A1C', marginBottom: 4 }}
              >
                {b.name}
              </div>
              <div
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '0.8125rem',
                  color: '#6B5235',
                  marginBottom: 14,
                }}
              >
                {b.tagline}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontFamily: "'Raleway',sans-serif",
                    fontWeight: 800,
                    fontSize: '1.6rem',
                    color: '#1C3A1C',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {b.price}
                </span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: '#6B5235' }}>
                  /week
                </span>
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: '0.75rem',
                    color: '#7EA86B',
                    fontWeight: 500,
                    marginLeft: 4,
                  }}
                >
                  {b.perMeal}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          action="https://submit-form.com/RYANPrRzp"
          method="POST"
          onSubmit={() => setSubmitted(true)}
          style={{
            maxWidth: 560,
            margin: '0 auto',
            backgroundColor: '#FDFBF5',
            border: '1px solid rgba(28,58,28,0.08)',
            borderRadius: 28,
            padding: '40px',
            boxShadow: '0 4px 16px rgba(28,58,28,0.06), 0 16px 48px rgba(28,58,28,0.08)',
          }}
        >
          <input type="hidden" name="_redirect" value="false" />
          <input type="hidden" name="box" value={box.name} />

          <h2
            className="heading-md"
            style={{ fontSize: '1.375rem', color: '#1C3A1C', marginBottom: 6 }}
          >
            Your details
          </h2>
          <p
            className="body-text"
            style={{ color: '#6B5235', fontSize: '0.9rem', marginBottom: 28 }}
          >
            Selected: <strong style={{ color: '#2E6B2E' }}>{box.name}</strong> · {box.price}/week
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>First name</label>
              <input
                type="text"
                name="first_name"
                placeholder="Tom"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Last name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Ashfield"
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Delivery postcode</label>
            <input
              type="text"
              name="postcode"
              placeholder="SW1A 1AA"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Delivery frequency</label>
            <select name="frequency" required style={{ ...inputStyle, appearance: 'none' as const }}>
              <option value="weekly">Every week</option>
              <option value="fortnightly">Every two weeks</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px 24px' }}>
            Reserve my {box.name}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>

          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(28,58,28,0.45)',
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            No payment taken now. We&apos;ll confirm availability in your area first.
          </p>
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Inter',sans-serif",
  fontWeight: 600,
  fontSize: '0.8125rem',
  color: '#1C3A1C',
  marginBottom: 6,
  letterSpacing: '0.01em',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 16px',
  borderRadius: 12,
  border: '1.5px solid rgba(28,58,28,0.15)',
  backgroundColor: '#fff',
  fontFamily: "'Inter',sans-serif",
  fontSize: '0.9375rem',
  color: '#1C3A1C',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
}

export default function GetStartedPage() {
  return (
    <Suspense>
      <GetStartedForm />
    </Suspense>
  )
}
