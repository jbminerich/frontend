import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ padding: '1rem', background: '#fff', borderBottom: '1px solid #eee' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
          <Image
            src="/images/logo.png"
            alt="Lary's Cleaning Services"
            width={100}
            height={100}
            style={{animation: 'slideInLeft 0.6s ease-out',}}
          />
        </Link>
        <nav style={{ display: 'flex', gap: '1rem' }}>
  <a
    href="#services"
    className="nav-link"
    style={{ animation: 'fadeInUp 0.5s ease-out 0.4s both' }}
  >
    Services
  </a>
  <a
    href="#booking"
    className="nav-link"
    style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }}
  >
    Contact
  </a>
</nav>
      </div>
    </header>
  );
}
