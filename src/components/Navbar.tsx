import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="top-0 left-0 mt-4 fixed right-0 bg-gradient-to-r to-purple-600 from-pink-600 text-white py-3 px-5 flex items-center justify-between z-50 mx-4 rounded-full shadow-lg">
      <div className="font-bold text-xl">LOGO</div>
      <div className="space-x-4">
        <Link href="/" className="px-3 py-2  text-white rounded-full hover:border-white hover:border-2" >
          Home
        </Link>
        <Link href="/about" className="px-3 py-2  text-white rounded-full hover:border-white hover:border-2">
          About
        </Link>
        <Link
          href="/contact"
          className="px-3 py-2  text-white rounded-full hover:border-white hover:border-2"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
