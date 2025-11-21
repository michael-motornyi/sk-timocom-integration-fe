import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | TIMOCOM Integration',
    default: 'TIMOCOM Integration Dashboard',
  },
  description: 'Freight and Vehicle Space Management Dashboard with TIMOCOM API integration',
  keywords: ['TIMOCOM', 'freight', 'logistics', 'transportation', 'cargo'],
  authors: [{ name: 'Your Company' }],
  creator: 'Your Company',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'TIMOCOM Integration Dashboard',
    description: 'Freight and Vehicle Space Management Dashboard',
    siteName: 'TIMOCOM Integration',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TIMOCOM Integration Dashboard',
    description: 'Freight and Vehicle Space Management Dashboard',
  },
  robots: {
    index: false, // Set to true in production
    follow: false, // Set to true in production
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
