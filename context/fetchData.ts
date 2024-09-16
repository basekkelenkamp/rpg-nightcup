export async function fetchData(): Promise<Cup[]> {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Check if baseUrl is defined or fallback to a default
  const res = await fetch(`${baseUrl}/api/nightcup-sheet-data`, {
    next: { revalidate: baseUrl.includes('localhost') ? 2 : 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}
