import Header from '@/components/Header'

const testimonials = [
  {
    name: 'Jessica R.',
    feedback:
      'Lary’s Cleaning Services was a game-changer for my busy family. Our house has never looked better!',
  },
  {
    name: 'Michael T.',
    feedback:
      'On time, respectful, and incredibly thorough. Highly recommend for anyone in the area.',
  },
  {
    name: 'Anna W.',
    feedback:
      'I loved coming home to a spotless kitchen and fresh-smelling rooms. They do magic!',
  },
]

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main className="testimonials-page">
        <h1 className="testimonials-title">What Our Clients Say</h1>
        <p className="testimonials-intro">
          We&apos;re proud of the relationships we&apos;ve built and the homes we've transformed. Here&apos;s what some
          of our happy clients have to say:
        </p>

        <section className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">“{t.feedback}”</p>
              <p className="testimonial-name">— {t.name}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
