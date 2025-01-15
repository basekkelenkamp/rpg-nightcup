// /components/CupCard.tsx
'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import TopThree from './TopThree';
import { Cup } from '@/types';
import {
  FaMapMarkedAlt,
  FaUserTie,
  FaCalendarAlt,
  FaImage,
} from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const CupCard = ({ cup }: { cup: Cup }) => {
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
      screenshotUrl = `https://tm.mania-exchange.com/mapimage/${mapId}/1`;
    }

    if (cup.map.url.includes('tmnf')) {
      mapId = cup.map.url.split('/').pop() || null;
      screenshotUrl = `https://tmnf.exchange/trackshow/${mapId}/screen/1`;
    }
  }

  // Extract all available VOD URLs
  const vods = cup.stages
    .filter(stage => stage.vod_url)
    .map(stage => ({
      url: stage.vod_url,
      author: stage.vod_author,
      mode: stage.mode,
    }));

  // Use state to handle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="card bg-base-200 p-6 transform transition duration-500 hover:scale-[1.002] hover:bg-base-300 rounded-2xl shadow-3xl border border-gray-700 relative z-30">
      <div className="flex flex-col md:flex-row relative z-20">
        {/* Map Image and Actions */}
        <div className="w-full md:w-1/3 md:mr-6 flex flex-col items-center">
          {/* Map Image or Placeholder */}
          <div className="relative w-full" style={{ paddingBottom: '72.5%' }}>
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

          {/* Actions */}
          <div className="flex space-x-4 mt-4 relative z-30">
            <Link
              href={`/cup/${encodeURIComponent(
                cup.title.replace(/#/g, '-').replace(/\s+/g, '').toLowerCase()
              )}`}
              className="btn btn-primary"
            >
              View Details
            </Link>

            {/* Watch VOD Button */}
            {vods.length > 1 ? (
            <div className="relative z-30" ref={dropdownRef}>
              <button
                className={`btn btn-accent dropdown-toggle`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Watch VOD
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Render the dropdown using a portal */}
              {isDropdownOpen &&
                dropdownRef.current &&
                createPortal(
                  <ul
                    className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 mt-2 absolute z-50"
                    style={{
                      position: 'absolute',
                      top: `${dropdownRef.current.getBoundingClientRect().bottom + window.scrollY}px`,
                      left: `${dropdownRef.current.getBoundingClientRect().left + window.scrollX}px`,
                    }}
                  >
                    {vods.map((vod, index) => (
                      <li key={index}>
                        <a
                          href={vod.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base-content"
                        >
                          {vod.mode} by {vod.author}
                        </a>
                      </li>
                    ))}
                  </ul>,
                  document.body // Render directly to the body
                )}
            </div>
          ) : (
            vods.length === 1 && (
              <a
                href={vods[0].url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                Watch VOD
              </a>
            )
          )}
          </div>
        </div>

        {/* Cup Info */}
        <div className="flex-1 space-y-4 mt-6 md:mt-0">
          {/* Cup Title */}
          <h2 className="text-4xl font-extrabold text-accent">
            {cup.title}
          </h2>

          {/* Cup Details */}
          <div className="space-y-2 text-lg">
            {/* Date */}
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-primary" />
              <span>{formattedDate}</span>
            </div>

            {/* Map Name and Author */}
            <div className="flex items-center space-x-2">
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
            <div className="flex items-center space-x-2">
              <FaUserTie className="text-primary" />
              <span>{cup.admin}</span>
            </div>
          </div>

          {/* Top 3 Players */}
          <div className="mt-8">
            <TopThree players={cup.top_3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupCard;
