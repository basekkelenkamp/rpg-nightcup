// /components/LoadingSpinner.tsx
'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg z-50">
      <motion.div
        className="flex flex-col items-center justify-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Rotating Squares */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md animate-pulse"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-md animate-pulse"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-white text-lg font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          Loading Nightcup data, please wait...
        </motion.p>
      </motion.div>
    </div>
  );
}
