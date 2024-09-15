// /components/AnnouncementBanner.tsx
import { FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

interface AnnouncementButton {
  text: string;
  href: string;
  style?: 'primary' | 'secondary' | 'accent'; // You can add more styles as needed
}

interface AnnouncementBannerProps {
  title: string;
  text: string;
  details: { [key: string]: string };
  buttons?: AnnouncementButton[];
}

const AnnouncementBanner = ({ title, text, details, buttons }: AnnouncementBannerProps) => {
  return (
    <div className="w-full max-w-6xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-2xl shadow-2xl p-8 mx-auto mb-16">
      <div className="flex flex-col md:flex-row items-center">
        {/* Section One: Announcement */}
        <div className="flex-1 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4 flex items-center">
            <FaInfoCircle className="text-accent mr-2" />
            {title}
          </h2>
          <p className="text-lg leading-relaxed">
            {text}
          </p>
        </div>

        {/* Section Two: Details */}
        <div className="w-full md:w-1/3 bg-base-200 bg-opacity-90 text-base-content p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCalendarAlt className="text-primary mr-2" />
            Event Details
          </h3>
          <ul className="space-y-2">
            {Object.entries(details).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <a
              href="maniaplanet://#join=nightcup@RPG@tmrpg"
              className="btn btn-primary btn-block text-lg font-medium"
            >
              Enter Server Directly
            </a>
            <a
              href="https://discord.gg/BFdPG2ZCXb"
              className="btn btn-secondary btn-block text-lg font-medium mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
