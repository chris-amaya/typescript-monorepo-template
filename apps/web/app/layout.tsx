import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Store',
  description: 'a website to find deals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
