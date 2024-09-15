export async function fetchData(): Promise<Cup[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/nightcup-sheet-data`, {
    next: { revalidate: baseUrl.includes('localhost') ? 2 : 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}
