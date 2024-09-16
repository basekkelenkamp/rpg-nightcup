// /app/cup/[title]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { Cup } from '@/types';
import { FaMapMarkedAlt, FaUserTie, FaCalendarAlt, FaImage } from 'react-icons/fa';
import TopThree from '@/components/TopThree';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CupPage() {
  const { title } = useParams();
  const { data } = useData() as { data: Cup[] | null };


  if (!data) {
    return <LoadingSpinner />;
  }

  // Find the specific cup by its title
  const cup = data.find(cup => cup.title.replace(/#/g, '-').replace(/\s+/g, '').toLowerCase() === title);

  if (!cup) {
    return <div className="my-8 text-center">Cup not found</div>;
  }

  // Format the date
  const formattedDate = new Date(cup.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // Extract Map ID from the Map URL
  let mapId: string | null = null;
  let screenshotUrl = null; // No default image

  if (cup.map.url) {
    const mapIdMatch = cup.map.url.match(/\/(?:maps|tracks|s\/tr)\/(\d+)/);
    mapId = mapIdMatch ? mapIdMatch[1] : null;

    if (mapId) {
      screenshotUrl = `https://tm.mania-exchange.com/maps/screenshot/normal/${mapId}`;
    }

    if (cup.map.url.includes('tmnf')) {
      mapId = cup.map.url.split('/').pop() || null;
      screenshotUrl = `https://tmnf.exchange/trackshow/${mapId}/screen/1`;
    }
  }

  // Helper function to check if a URL is a YouTube link
  const isYouTubeLink = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null; // Return the video ID if matched
  };

  return (
    <div className="container mx-auto my-12 p-6 bg-base-200 rounded-2xl shadow-3xl">
      {/* Cup Title */}
      <h1 className="text-5xl font-extrabold text-accent mb-6">{cup.title}</h1>

      {/* Date, Map, and Admin */}
      <div className="flex flex-col md:flex-row mb-8">
        <div className="flex-1 space-y-4">
          {/* Date */}
          <div className="flex items-center space-x-2 text-lg">
            <FaCalendarAlt className="text-primary" />
            <span>{formattedDate}</span>
          </div>

          {/* Map Name and Author */}
          <div className="flex items-center space-x-2 text-lg">
            <FaMapMarkedAlt className="text-primary" />
            {cup.map.url ? (
              <>
                <a
                  href={cup.map.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary text-2xl font-bold"
                >
                  {cup.map.name}
                </a>
                <span className="text-xl">by {cup.map.author}</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold">
                  {cup.map.name || 'Unknown Map'}
                </span>
                <span className="text-xl">
                  {cup.map.author ? `by ${cup.map.author}` : 'Author Unknown'}
                </span>
              </>
            )}
          </div>

          {/* Admin */}
          <div className="flex items-center space-x-2 text-lg">
            <FaUserTie className="text-primary" />
            <span>{cup.admin}</span>
          </div>
        </div>

        {/* Map Image or Placeholder */}
        <div className="relative w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
          <div className="relative w-full h-64">
            {screenshotUrl ? (
              <img
                src={screenshotUrl}
                alt={cup.map.name || 'Map Image'}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
              />
            ) : (
              <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-xl flex items-center justify-center">
                <FaImage className="text-gray-500 text-6xl" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top 3 Players */}
      <div className="my-8">
        <TopThree players={cup.top_3} />
      </div>

      {/* Stages Section */}
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cup.stages.map((stage, stageIndex) => (
          <div key={stageIndex} className="bg-base-100 p-6 rounded-xl shadow-md relative overflow-hidden group">
            <h3 className="text-2xl font-semibold mb-4">{`Stage ${stageIndex + 1}: ${stage.mode}`}</h3>
            <ul className="space-y-1 relative z-10">
              {stage.players.map((player, playerIndex) => (
                <li key={playerIndex} className="text-lg flex items-center">
                  <span className="text-primary mr-2">{playerIndex + 1}.</span> {player}
                </li>
              ))}
            </ul>
            {/* Futuristic glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-600 rounded-xl transition duration-300"></div>
          </div>
        ))}
      </div>

      {/* VODs Section */}
      <div className="my-12">
        <h2 className="text-3xl font-bold mb-4 text-accent">Watch VODs</h2>
        {cup.stages.map((stage, stageIndex) => {
          const youtubeId = isYouTubeLink(stage.vod_url || '');
          return (
            youtubeId ? (
              <div key={stageIndex} className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">{`VOD #${stageIndex + 1} by ${stage.vod_author}`}</h3>
                <iframe
                  width="100%"
                  height="820"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md shadow-lg mb-4"
                ></iframe>
              </div>
            ) : stage.vod_url ? (
              <div key={stageIndex} className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">{`Stage ${stageIndex + 1} VOD`}</h3>
                <a
                  href={stage.vod_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent mb-4"
                >
                  Watch VOD
                </a>
              </div>
            ) : null
          );
        })}
      </div>
    </div>
  );
}
