export default function Hero() {
    return (
      <section style={{ background: '#e0f7fa', padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Professional Cleaning Services</h2>
        <p>Reliable, affordable, and spotless — just how you like it.</p>
        <a
            href="#booking"
            style={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--primary-pink)',
                color: '#fff',
                borderRadius: '5px',
                fontWeight: 'bold',
            }}
            >
            Book Now
        </a>
      </section>
    );
  }
  