// /app/layout.tsx

import { ReactNode } from 'react';
import { DataProvider } from '../context/DataContext';
import Header from '../components/Header';
import '../styles/globals.css';
import { Montserrat } from 'next/font/google';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Trackmania RPG Competitions',
  description: 'Competition website for the RPG Trackmania2 community.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="mycustomtheme" className={montserrat.variable}>
      <body className="bg-fixed bg-gradient-to-br from-[#043442] via-[#0b3d4e] to-[#043442] text-base font-montserrat">
        {/* Wrap in DataProvider but don't pass initial data yet */}
        <DataProvider initialData={null}>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
        </DataProvider>
        <Footer />
      </body>
    </html>
  );
}
