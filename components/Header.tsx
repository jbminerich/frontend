import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
      {/* Top bar for contact and socials */}
      <div
        style={{
          background: '#fef6fb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.4rem 1rem',
          fontSize: '0.9rem',
          color: '#cc2e6d',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>📞 <a href="tel:+14255004931" style={{ color: '#cc2e6d', textDecoration: 'none' }}>+1 (425) 500-4931</a></span>
          <span>📧 <a href="mailto:laryscleaningservices@gmail.com" style={{ color: '#cc2e6d', textDecoration: 'none' }}>laryscleaningservices@gmail.com</a></span>
        </div>
        <div>
          <span>Follow us:</span>
          <a href="https://www.facebook.com/profile.php?id=100084818367969" target="_blank" rel="noreferrer" style={{ marginLeft: '0.5rem', color: '#cc2e6d' }}>Facebook</a>
          <a href="https://www.instagram.com/larycleaningservices" target="_blank" rel="noreferrer" style={{ marginLeft: '0.5rem', color: '#cc2e6d' }}>Instagram</a>
        </div>
      </div>

      {/* Main header section */}
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.8rem 1rem',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '1rem' }}>
          <Image
            src="/images/logo.png"
            alt="Lary's Cleaning Services"
            width={80}
            height={80}
            style={{ animation: 'slideInLeft 0.6s ease-out' }}
          />
          <h1 style={{ fontSize: '1.6rem', color: '#cc2e6d', fontFamily: 'Georgia, serif', margin: 0 }}>Lary&apos;s Cleaning Services</h1>
        </Link>

        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="/#services" className="nav-link">Services</a>
          <a href="/#booking" className="nav-link">Book Now</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/testimonials" className="nav-link">Testimonials</a>
        </nav>
      </div>
    </header>
  )
}
