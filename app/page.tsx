// /app/page.tsx
'use client';

import CupCard from '@/components/CupCard';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import { useData } from '@/context/DataContext';
import { Cup } from '@/types';

export default function Home() {
  const { data } = useData() as { data: Cup[] };

  // Announcement Data
  const announcementTitle = 'Special Double 30th Edition!';
  const announcementText = `
    We are thrilled to announce the upcoming RPG Nightcup! Join us for an exciting
    competition featuring challenging maps and the best players from around the world.
    Whether you're a seasoned veteran or new to the scene, this event promises fun and
    excitement for all. Don't miss out on this incredible opportunity to showcase your
    skills and connect with the community!
  `;
  const announcementDetails = {
    'Date pt1': 'Saturday, October 19, 2024',
    'Date pt2': 'Saturday, October 26, 2024',
    'Time': '20:00 CEST',
    'Format': 'Time Attack & Knockout Rounds',
    'Map release': 'Saturday, October 12, 2024',
  };

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
