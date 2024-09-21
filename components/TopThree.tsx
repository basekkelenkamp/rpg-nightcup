'use client';

import { FaMedal } from 'react-icons/fa';

const medalColors = ['text-yellow-400', 'text-gray-400', 'text-amber-600'];

const TopThree = ({ players }: { players: string[] }) => {
  return (
    <div className="flex flex-col sm:flex-row items-end justify-center mt-8 space-y-6 sm:space-y-0 sm:space-x-6 max-w-full">
      {/* Second Place */}
      <div className="flex flex-col items-center w-full sm:w-32 md:w-36 transform transition duration-500 hover:scale-110">
        <div className="bg-base-300 p-2 rounded-t-lg text-center w-full border border-gray-500">
          <span className="text-lg font-semibold truncate">{players[1]}</span>
        </div>
        <div className="bg-base-200 w-full h-6 rounded-b-lg flex items-center justify-center border-x border-b border-gray-500">
          <span className="text-sm">2nd</span>
        </div>
        <FaMedal className={`h-10 w-10 ${medalColors[1]}`} />
      </div>

      {/* First Place - 1.5x bold outline */}
      <div className="flex flex-col items-center w-full sm:w-40 md:w-42 transform transition duration-500 hover:scale-110">
        <div className="bg-base-300 p-2 rounded-t-lg text-center w-full border border-yellow-400" style={{ borderWidth: '2px' }}>
          <span className="text-xl font-bold truncate">{players[0]}</span>
        </div>
        <div className="bg-base-200 w-full h-8 rounded-b-lg flex items-center justify-center border-x border-b border-yellow-400" style={{ borderWidth: '3px' }}>
          <span className="text-sm">1st</span>
        </div>
        <FaMedal className={`h-12 w-12 ${medalColors[0]}`} />
      </div>

      {/* Third Place */}
      <div className="flex flex-col items-center w-full sm:w-28 md:w-32 transform transition duration-500 hover:scale-110">
        <div className="bg-base-300 p-2 rounded-t-lg text-center w-full border border-amber-600">
          <span className="text-lg font-semibold truncate">{players[2]}</span>
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
