import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Left Side */}
        <div className="hero-text">
          <h2>Professional Cleaning Services</h2>
          <p>Reliable, affordable, and spotless — just how you like it.</p>
          <a href="#booking" className="hero-button">
            Book Now
          </a>

          <div className="trust-badges">
            <div className="badge">⭐ Top Rated</div>
            <div className="badge">💬 5-Star Service</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-image">
          <Image
            src="/images/hero-cleaner.png"
            alt="Cleaning professional smiling with spray bottle"
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  )
}
