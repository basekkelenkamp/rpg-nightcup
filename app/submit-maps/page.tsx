'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function SubmitMaps() {
  const images = ['/pics/screen1.jpeg', '/pics/screen2.jpeg', '/pics/screen3.jpeg', '/pics/screen4.jpeg'];

  // State to track the current image
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="container mx-auto my-12 p-6 bg-base-200 rounded-2xl shadow-3xl">
      <h1 className="text-5xl font-bold text-center text-accent mb-12">Submit Your RPG Maps</h1>

      {/* Introduction Section (Full Width) */}
      <div className="w-full">
        <p className="text-lg mb-6">
          We're always excited to see new RPG maps! Whether you have a brand-new creation or a work-in-progress that you believe would be a perfect fit for the RPG Nightcup, we’d love to check it out.
        </p>
        <p className="text-lg">
          To submit your map, send a message on Discord to <b>basbaas333ak</b>. Let’s bring your map into the RPG Nightcup!
        </p>
      </div>

      {/* Carousel and Requirements Section */}
      <div className="flex flex-col md:flex-row mt-12">
        {/* Carousel Section (1.5x larger) */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="relative w-full h-96 md:w-[36rem] rounded-lg overflow-hidden shadow-lg">
            {/* Previous Button */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 opacity-80 hover:opacity-100 transition duration-300"
              onClick={prevSlide}
            >
              &#10094;
            </button>

            {/* Next Button */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 opacity-80 hover:opacity-100 transition duration-300"
              onClick={nextSlide}
            >
              &#10095;
            </button>

            {/* Image */}
            <Image
              src={images[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              width={3840}
              height={2160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Requirements Section */}
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
          <h2 className="text-3xl font-bold text-accent mb-4">Map Requirements</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Maps should be between 3-7 minutes long.</li>
            <li>Nightcup maps tend to be slightly more challenging than traditional RPG maps.</li>
            <li>Maps must maintain a balance between creativity and playability.</li>
            <li>Ensure your map doesn’t rely on luck-based mechanics.</li>
            <li>We encourage both new and experienced mappers to submit their work!</li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <p className="text-xl mb-4">Do you have a map that meets these requirements, or any questions?</p>
        <p className="text-xl mb-4 font-bold">Send your map submission to <span className="text-primary">basbaas333ak</span> on Discord!</p>
      </div>
    </div>
  );
}
