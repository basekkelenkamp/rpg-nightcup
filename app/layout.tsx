// app/layout.tsx
import { ReactNode } from 'react';
import { DataProvider } from '../context/DataContext';
import { fetchData } from '../context/fetchData';

export const metadata = {
  title: 'My Next.js App',
  description: 'An app with global data fetching and caching.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Fetch data at build time or server-side with revalidation
  const initialData = await fetchData();

  return (
    <html lang="en">
      <body>
        <DataProvider initialData={initialData}>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
