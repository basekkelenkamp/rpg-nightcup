// /components/Header.tsx
'use client';

import Link from 'next/link';
import { FaHome, FaChartBar, FaInfoCircle, FaDiscord } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="navbar h-24 bg-gradient-to-r from-secondary via-secondary to-neutral px-4 shadow-lg">
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-3xl text-accent hover:bg-secondary hover:text-warning font-extrabold tracking-wide font-montserrat"
        >
          {/* Custom logo image */}
          <img
            src="/nightcup-logo-transparent.png"
            alt="RPG Nightcup Logo"
            className="h-12 w-12 mr-2 inline-block"
          />
          RPG Nightcup
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-1">
          <li>
            <Link
              href="/"
              className="btn btn-ghost btn-sm rounded-btn text-lg font-medium text-base-content hover:bg-secondary hover:text-warning transition duration-200 ease-in-out transform hover:-translate-y-0.5"
            >
              <FaHome className="h-5 w-5 mr-1" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/stats"
              className="btn btn-ghost btn-sm rounded-btn text-lg font-medium text-base-content hover:bg-secondary hover:text-warning transition duration-200 ease-in-out transform hover:-translate-y-0.5"
            >
              <FaChartBar className="h-5 w-5 mr-1" />
              Stats
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="btn btn-ghost btn-sm rounded-btn text-lg font-medium text-base-content hover:bg-secondary hover:text-warning transition duration-200 ease-in-out transform hover:-translate-y-0.5"
            >
              <FaInfoCircle className="h-5 w-5 mr-1" />
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        <Link
          href="https://discord.gg/BFdPG2ZCXb"
          className="btn btn-accent text-lg font-medium text-base-content"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord className="h-5 w-5 mr-1" />
          Join the Discord
        </Link>
      </div>
      {/* Mobile Menu */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost text-base-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-neutral bg-opacity-90 rounded-box w-52"
          >
            <li>
              <Link
                href="/"
                className="btn btn-ghost btn-sm rounded-btn text-lg font-medium text-base-content hover:bg-secondary hover:text-accent"
              >
                <FaHome className="h-5 w-5 mr-1" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/stats"
                className="btn btn-ghost btn-sm rounded-btn text-lg font-medium text-base-content hover:bg-secondary hover:text-accent"
              >
                <FaChartBar className="h-5 w-5 mr-1" />
                Stats
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="btn btn-ghost btn-sm rounded-btn text-lg font-medium text-base-content hover:bg-secondary hover:text-accent"
              >
                <FaInfoCircle className="h-5 w-5 mr-1" />
                About
              </Link>
            </li>
            <li>
              <Link
                href="https://discord.gg/BFdPG2ZCXb"
                className="btn btn-accent btn-sm text-lg font-medium text-base-content"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord className="h-5 w-5 mr-1" />
                Join the Discord
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;