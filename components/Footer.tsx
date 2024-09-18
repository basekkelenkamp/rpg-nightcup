'use client';

import Link from 'next/link';


const Footer = () => {
    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <nav>
                <h6 className="footer-title">Made by Bas Ekkelenkamp</h6>
                <a className="link link-hover" target="_blank" href='https://www.linkedin.com/in/bas-ekkelenkamp-a83903166/'>LinkedIn</a>
                <a className="link link-hover" target="_blank" href='https://www.instagram.com/_333ak_/'>Instagram</a>
            </nav>
            <nav>
                <h6 className="footer-title">RPG Nightcup</h6>
                <a className="link link-hover" href='/stats' target="_blank">Stats</a>
                <a className="link link-hover" href='/submit-maps' target="_blank">Submit Maps</a>
                <a className="link link-hover" href='https://discord.gg/BFdPG2ZCXb' target="_blank">Join Discord</a>
                <a className="link link-hover" href='https://www.paypal.com/paypalme/333akbeats' target="_blank">Donate</a>
            </nav>
        </footer>
    );
}

export default Footer;