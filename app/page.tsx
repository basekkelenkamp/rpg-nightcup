// /app/page.tsx
'use client';

import CupCard from '@/components/CupCard';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import { useData } from '@/context/DataContext';
import { Cup } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const { data } = useData() as { data: Cup[] | null };

  // Announcement Data
  const announcementTitle = 'Special Double 30th Edition!';
  const announcementText = `
    After the success of the previous cup, we are BACK with a special edition for the 30th RPG Nightcup. (Also, welcome to the brand new RPG Nightcup website!)\n
    This edition will feature a double Nightcup with two dates, with just one week between them. The full map will be released from the start.
    There will be a big easter egg discovery event, so make sure to join the server and participate for a free qualification spot!\n
    Let me know if you wish to contribute to the prizepool. Thank you all the support throughout the years. <3\n
    basbaas
  `;
  const announcementDetails = {
    'Date pt1': 'Saturday, October 19, 2024',
    'Date pt2': 'Saturday, October 26, 2024',
    'Time': '20:00 CEST',
    'Format': 'Time Attack & Knockout Rounds',
    'Map release': 'Saturday, October 12, 2024',
  };

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold my-8 text-center text-accent">
        Welcome to RPG Nightcup
      </h1>

      {/* Announcement Banner */}
      <AnnouncementBanner
        title={announcementTitle}
        text={announcementText}
        details={announcementDetails}
      />

      <div className="w-full max-w-5xl space-y-8">
        {data.map((cup, index) => (
          <CupCard key={index} cup={cup} />
        ))}
      </div>
    </div>
  );
}
