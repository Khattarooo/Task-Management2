import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="top-0 left-0 mt-4 fixed right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-5 flex items-center justify-between z-50 mx-4 rounded-full shadow-lg">
      <div className="font-bold text-xl">LOGO</div>
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-200">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-200">
          About
        </Link>
        <Link
          href="/contact"
          className="px-4 py-2 bg-white text-purple-600 rounded-full hover:bg-gray-200"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
