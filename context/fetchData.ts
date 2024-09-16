import { Cup } from '@/types';

export async function fetchData(): Promise<Cup[]> {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 2 : 7200;

  const res = await fetch(`/api/nightcup-sheet-data`, {
    next: { revalidate: revalidateTime },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}
