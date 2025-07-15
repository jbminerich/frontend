// app/layout.tsx
import '../styles/globals.css';
import Footer from '@/components/Footer'


export const metadata = {
  title: 'Larys Cleaning Services',
  description: 'Professional house cleaning in Washington State.',
  icons: {
    icon: '/favicon.ico', // or '/favicon.png'
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
