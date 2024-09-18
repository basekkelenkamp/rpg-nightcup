'use client';

import { useState, useEffect } from 'react';
import { Stats } from '@/types';
import { fetchStatsData } from '@/context/fetchData';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function StatsPage() {
  const [statsData, setStatsData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStatsData();
        setStatsData(data as Stats);
      } catch (error) {
        console.error('Error fetching stats data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!statsData) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const renderLeaderboard = (title: string, data: [string, number][], maxEntries: number | null = null) => {
    const topThree = data.slice(0, 3);
    const others = maxEntries ? data.slice(3, maxEntries) : data.slice(3);
    
    return (
      <div className="bg-base-100 p-6 rounded-xl shadow-md relative group overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-4 text-accent">{title}</h2>
        
        <ul className="relative z-10">
          {topThree.map((player, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 mb-2 rounded-md shadow-lg ${
                index === 0 ? 'bg-yellow-300 text-black' : index === 1 ? 'bg-gray-500 text-white' : 'bg-brown-400 text-white'
              }`}
            >
              <span className="text-xl font-bold text-primary">{index + 1}.</span>
              <span className="text-xl font-semibold">{player[0]}</span>
              <span className="text-xl">{player[1]}</span>
            </li>
          ))}
          {others.map((player, index) => (
            <li key={index} className="flex justify-between items-center p-2 mb-2 rounded-md bg-base-200">
              <span className="text-lg">{index + 4}.</span>
              <span className="text-lg">{player[0]}</span>
              <span className="text-lg">{player[1]}</span>
            </li>
          ))}
        </ul>

        {/* Futuristic glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-600 rounded-xl transition duration-300"></div>
      </div>
    );
  };

  return (
    <div className="container mx-auto my-12 p-6 bg-base-200 rounded-2xl shadow-3xl">
      <h1 className="text-5xl font-bold text-center text-accent mb-12">Stats</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Victories (Top Left) */}
        {renderLeaderboard('Most Victories', statsData.most_victories, 10)}

        {/* Most Podiums (Top Right) */}
        {renderLeaderboard('Most Podiums', statsData.most_podiums, 10)}

        {/* Most Qualifications (Bottom Left) */}
        {renderLeaderboard('Most Qualifications', statsData.most_qualifications)}

        {/* Most Appearances (Bottom Right) */}
        {renderLeaderboard('Most Appearances', statsData.most_appearances)}
      </div>
    </div>
  );
}
