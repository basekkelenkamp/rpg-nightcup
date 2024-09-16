// /context/DataContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchData } from './fetchData'; // Import fetch function

interface DataContextType {
  data: any | null;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
  initialData: any; // You can set a more specific type if needed
}

export function DataProvider({ children, initialData }: DataProviderProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Fetch data client-side
    if (!data) {
      fetchData().then(setData).catch(console.error);
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
