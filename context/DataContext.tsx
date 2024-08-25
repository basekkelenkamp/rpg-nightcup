'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataContextType {
  data: any | null;
  setData: React.Dispatch<React.SetStateAction<any>>; // Adjust type based on your data structure
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
  initialData: any; // Adjust type based on your data structure
}

export function DataProvider({ children, initialData }: DataProviderProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (!data && initialData) {
      setData(initialData);
    }
  }, [data, initialData]);

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
