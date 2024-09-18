'use client';

import { FaMedal } from 'react-icons/fa';

const medalColors = ['text-yellow-400', 'text-gray-400', 'text-amber-600'];

const TopThree = ({ players }: { players: string[] }) => {
  return (
    <div className="flex flex-wrap items-end justify-center mt-8 space-x-6 sm:space-x-4 max-w-full overflow-hidden">
      {/* Second Place */}
      <div className="flex flex-col items-center transform transition duration-500 hover:scale-110 w-24 sm:w-32 md:w-36">
        <div className="bg-base-300 p-2 rounded-t-lg text-center w-full border border-gray-500">
          <span className="text-lg font-semibold">{players[1]}</span>
        </div>
        <div className="bg-base-200 w-full h-6 rounded-b-lg flex items-center justify-center border-x border-b border-gray-500">
          <span className="text-sm">2nd</span>
        </div>
        <FaMedal className={`h-10 w-10 ${medalColors[1]}`} />
      </div>

      {/* First Place */}
      <div className="flex flex-col items-center transform transition duration-500 hover:scale-110 w-28 sm:w-40 md:w-42">
        <div className="bg-base-300 p-2 rounded-t-lg text-center w-full border border-yellow-400">
          <span className="text-xl font-bold">{players[0]}</span>
        </div>
        <div className="bg-base-200 w-full h-8 rounded-b-lg flex items-center justify-center border-x border-b border-yellow-400">
          <span className="text-sm">1st</span>
        </div>
        <FaMedal className={`h-12 w-12 ${medalColors[0]}`} />
      </div>

      {/* Third Place */}
      <div className="flex flex-col items-center transform transition duration-500 hover:scale-110 w-20 sm:w-28 md:w-32">
        <div className="bg-base-300 p-2 rounded-t-lg text-center w-full border border-amber-600">
          <span className="text-lg font-semibold">{players[2]}</span>
        </div>
        <div className="bg-base-200 w-full h-4 rounded-b-lg flex items-center justify-center border-x border-b border-amber-600">
          <span className="text-sm">3rd</span>
        </div>
        <FaMedal className={`h-8 w-8 ${medalColors[2]}`} />
      </div>
    </div>
  );
};

export default TopThree;
