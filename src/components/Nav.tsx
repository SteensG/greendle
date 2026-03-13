'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const logoTextRef = useRef<HTMLSpanElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const nav = navRef.current
    const logoText = logoTextRef.current
    if (!nav || !logoText) return

    const isDetailPage = pathname.split('/').filter(Boolean).length >= 2

    const onScroll = () => {
      const scrolled = isDetailPage || window.scrollY > 40
      nav.classList.toggle('scrolled', scrolled)
      logoText.style.color = scrolled ? '#1C3A1C' : '#FDFBF5'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav id="main-nav" ref={navRef}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2E6B2E,#4D7C3A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(46,107,46,0.40)' }}>🌿</div>
          <span ref={logoTextRef} style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#FDFBF5', letterSpacing: '-0.02em', transition: 'color 0.3s' }}>Greendle</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="nav-link">How It Works</Link>
          <Link href="/#boxes" className="nav-link">Meal Kits</Link>
          <Link href="/farms" className={`nav-link${isActive('/farms') ? ' active' : ''}`}>Our Farms</Link>
          <Link href="/recipes" className={`nav-link${isActive('/recipes') ? ' active' : ''}`}>This Week&apos;s Menu</Link>
        </div>
        <Link href="/#boxes" className="btn-primary" style={{ fontSize: '0.875rem', padding: '11px 22px' }}>
          Get Started
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
        </Link>
      </div>
    </nav>
  )
}
