import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ padding: '64px 0 40px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid rgba(253,251,245,0.08)' }}>
          <div className="md:col-span-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2E6B2E,#4D7C3A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🌿</div>
              <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#FDFBF5', letterSpacing: '-0.02em' }}>Greendle</span>
            </div>
            <p className="body-text mb-6" style={{ color: 'rgba(253,251,245,0.50)', fontSize: '0.9rem', maxWidth: 280 }}>Farm-to-door meal kits and groceries. Zero waste. Locally sourced. Carbon-neutral delivery.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['📘','📸','🐦'].map((icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(253,251,245,0.08)', border: '1px solid rgba(253,251,245,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', textDecoration: 'none' }}>{icon}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.875rem', color: '#FDFBF5', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Company</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><a href="#" style={{ fontSize: '0.875rem', color: 'rgba(253,251,245,0.50)', textDecoration: 'none', fontFamily: "'Inter',sans-serif" }}>About Us</a></li>
              <li><Link href="/farms" style={{ fontSize: '0.875rem', color: '#A0C490', textDecoration: 'none', fontFamily: "'Inter',sans-serif", fontWeight: 500 }}>Our Farms</Link></li>
              <li><Link href="/recipes" style={{ fontSize: '0.875rem', color: 'rgba(253,251,245,0.50)', textDecoration: 'none', fontFamily: "'Inter',sans-serif" }}>This Week&apos;s Menu</Link></li>
              <li><a href="#" style={{ fontSize: '0.875rem', color: 'rgba(253,251,245,0.50)', textDecoration: 'none', fontFamily: "'Inter',sans-serif" }}>Impact Report</a></li>
              <li><a href="#" style={{ fontSize: '0.875rem', color: 'rgba(253,251,245,0.50)', textDecoration: 'none', fontFamily: "'Inter',sans-serif" }}>Careers</a></li>
            </ul>
          </div>
          <div>
            <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.875rem', color: '#FDFBF5', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Support</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Help Centre','Delivery Areas','Privacy Policy'].map(t => (
                <li key={t}><a href="#" style={{ fontSize: '0.875rem', color: 'rgba(253,251,245,0.50)', textDecoration: 'none', fontFamily: "'Inter',sans-serif" }}>{t}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 28 }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(253,251,245,0.30)', fontFamily: "'Inter',sans-serif" }}>© 2026 Greendle Ltd. Registered in England &amp; Wales. B-Corp Certified.</p>
          <span style={{ fontSize: '0.8rem', color: 'rgba(253,251,245,0.30)', fontFamily: "'Inter',sans-serif" }}>🌱 Carbon neutral since 2023</span>
        </div>
      </div>
    </footer>
  )
}
