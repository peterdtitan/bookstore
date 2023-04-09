import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className="h-20 w-full flex justify-between items-center bg-white p-10 border-b-[0.5px] border-slate-400">
      <div className="flex justify-between items-center gap-16">
        <h1 className="text-3xl font-medium font-montserrat text-blue-500">Bookstore CMS</h1>
        <div className="flex justify-between items-center gap-20">
          <Link to="/" className="text-sm font-medium font-montserrat text-black">BOOKS</Link>
          <Link to="/categories" className="text-sm font-medium font-montserrat text-gray-400">CATEGORIES</Link>
        </div>
      </div>
      <div className="rounded-full border-[0.5px] border-slate-300 p-3">
        <FaUserAlt className="text-lg text-blue-500" />
      </div>
    </div>
  );
}
