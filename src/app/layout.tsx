import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import AICoachButton from '@/components/AICoachButton';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Whoop Plus Prototype',
  description: 'Prototype UI built with Next.js + Tailwind CSS'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-black text-white antialiased">
        <AppProvider>
          <Navbar />
          {children}
          <AICoachButton />
        </AppProvider>
      </body>
    </html>
  );
}


