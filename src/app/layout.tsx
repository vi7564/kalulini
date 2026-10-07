import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kaluliniboys.ac.ke'),
  title: 'Kalulini Boys High School | Official Website & Management System',
  description: 'Official institutional portal and school management platform for Kalulini Boys High School, Makueni County, Kenya. Academic excellence, admissions, KCSE performance, student portal, and administration.',
  keywords: [
    'Kalulini Boys High School',
    'Kalulini High School Makueni',
    'Kenya Secondary Schools',
    'KCSE Performance',
    'Form 1 Admissions Kenya',
    'School Management System'
  ],
  authors: [{ name: 'Kalulini Boys High School' }],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Kalulini Boys High School — Strive for Excellence, Integrity and Service',
    description: 'Premier Extra-County Boys High School in Makueni County, Kenya.',
    url: 'https://kaluliniboys.ac.ke',
    siteName: 'Kalulini Boys High School',
    locale: 'en_KE',
    type: 'website',
    images: [{
      url: '/image1.webp',
      width: 1442,
      height: 1091,
      alt: 'Kalulini Boys High School campus and students',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalulini Boys High School',
    description: 'Official website of Kalulini Boys High School in Kibwezi, Makueni County, Kenya.',
    images: ['/image1.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 antialiased">
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
