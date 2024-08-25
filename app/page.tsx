'use client';

import { useData } from '../context/DataContext';

export default function Home() {
  const { data } = useData();

  return (
    <div>
      <h1>Homepage</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
