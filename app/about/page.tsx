import Header from '@/components/Header'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="about-page">
        <section className="about-hero">
          <Image
            src="/images/cleaning-hero.jpg"
            alt="Happy cleaner holding supplies"
            width={800}
            height={400}
            className="about-hero-img"
          />
        </section>

        <section className="about-content">
          <h1>About Us</h1>
          <p>
            At <strong>Lary&apos;s Cleaning Services</strong>, we believe a clean home is a happy home.
            Based in Washington State, we bring professionalism, care, and a personal touch to every job we do.
          </p>
          <p>
            Founded by Lary herself, our company is built on integrity, reliability, and love for the community.
            Whether it&apos;s a one-time deep clean or recurring service, we treat your home like our own.
          </p>
          <p>
            Our mission is simple: deliver top-tier cleaning with a smile. When you book with us, you&apos;re supporting
            a small, woman-owned business that puts family and customer satisfaction first.
          </p>

          <div className="lary-quote">
            <p className="quote">"I started this business to help families like mine feel proud of their homes again. A clean space makes room for happiness." </p>
            <p className="quote-author">— Lary, Founder</p>
          </div>
        </section>
      </main>
    </>
  )
}
