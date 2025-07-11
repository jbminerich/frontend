// app/layout.tsx
import '../styles/globals.css';

export const metadata = {
  title: 'Larys Cleaning Services',
  description: 'Professional house cleaning in Washington State.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
