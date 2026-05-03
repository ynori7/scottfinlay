import type { Metadata } from 'next';
import { config } from '@fortawesome/fontawesome-svg-core';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Scott Finlay - Software Developer',
  description:
    'The personal web page of Scott Finlay, software developer and penetration tester.',
  openGraph: {
    title: 'Scott Finlay - Software Developer',
    siteName: 'Scott Finlay',
    url: 'http://www.scottfinlay.xyz',
    images: [{ url: 'http://www.scottfinlay.xyz/img/shareImage.png' }],
  },
  alternates: {
    canonical: 'http://www.scottfinlay.xyz',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
