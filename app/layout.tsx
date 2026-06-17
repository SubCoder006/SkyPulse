import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkyPulse — Weather at a Glance',
  description: 'Modern dark-themed weather dashboard with real-time conditions, forecasts, and animated visuals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}