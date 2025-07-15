import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={footerStyles.wrapper}>
      <div style={footerStyles.container}>
        <div style={footerStyles.section}>
          <h3 style={footerStyles.title}>Lary’s Cleaning Services</h3>
          <p>📞 <a href="tel:+14255004931" style={footerStyles.link}>+1 (425) 500-4931</a></p>
          <p>📧 <a href="mailto:laryscleaningservices@gmail.com" style={footerStyles.link}>laryscleaningservices@gmail.com</a></p>
        </div>

        <div style={footerStyles.section}>
          <h4>Quick Links</h4>
          <ul style={footerStyles.list}>
            <li><Link href="/" style={footerStyles.link}>Home</Link></li>
            <li><Link href="/about" style={footerStyles.link}>About</Link></li>
            <li><Link href="/testimonials" style={footerStyles.link}>Testimonials</Link></li>
            <li><a href="/#booking" style={footerStyles.link}>Book Now</a></li>
          </ul>
        </div>

        <div style={footerStyles.section}>
          <h4>Follow Us</h4>
          <p>
            <a href="https://www.facebook.com/profile.php?id=100084818367969" target="_blank" style={footerStyles.link}>Facebook</a> ·{' '}
            <a href="https://www.instagram.com/larycleaningservices" target="_blank" style={footerStyles.link}>Instagram</a>
          </p>
        </div>
      </div>

      <div style={footerStyles.bottom}>
        <p>&copy; {new Date().getFullYear()} Lary’s Cleaning Services. All rights reserved.</p>
      </div>
    </footer>
  )
}

const footerStyles = {
  wrapper: {
    backgroundColor: '#fef6fb',
    color: '#444',
    paddingTop: '2rem',
    paddingBottom: '1rem',
    borderTop: '1px solid #eee',
    marginTop: '3rem',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 1rem',
    gap: '2rem',
  },
  section: {
    flex: '1 1 250px',
  },
  title: {
    color: '#cc2e6d',
    marginBottom: '0.5rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#cc2e6d',
  },
  bottom: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.85rem',
  },
}
