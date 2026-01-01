import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Using Inter for both heading and body for now
// You can replace with DM Sans or similar later
const heading = Inter({
  subsets: ['latin'],
  variable: '--font-diatype',
  display: 'swap',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'GRAPHII—GRAPHY Studio',
    template: '%s | GRAPHII—GRAPHY',
  },
  description: 'Brand, digital contents, and event design studio specializing in identity, graphic, and printed work.',
  keywords: ['design studio', 'branding', 'graphic design', 'identity', 'digital contents', 'event design'],
  authors: [{ name: 'GRAPHII—GRAPHY' }],
  creator: 'GRAPHII—GRAPHY Studio',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://graphii-graphy-portfolio.vercel.app',
    siteName: 'GRAPHII—GRAPHY',
    title: 'GRAPHII—GRAPHY Studio',
    description: 'Brand, digital contents, and event design studio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GRAPHII—GRAPHY Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GRAPHII—GRAPHY Studio',
    description: 'Design portfolio showcasing brand, digital contents, and event work',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${heading.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        {modal}
        <Footer />
      </body>
    </html>
  );
}
