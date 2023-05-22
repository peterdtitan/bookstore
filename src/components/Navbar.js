import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed h-20 w-full flex justify-between items-center bg-white p-10 border-b-[0.5px] border-slate-400">
      <div className="flex justify-between items-center gap-16">
        <h1 className="text-xl md:text-3xl font-medium font-montserrat text-blue-500">Bookstore CMS</h1>
        <div className="hidden md:flex justify-between items-center gap-20">
          <Link to="/" className="text-sm font-medium font-montserrat text-black">BOOKS</Link>
          <Link to="/categories" className="text-sm font-medium font-montserrat text-gray-400">CATEGORIES</Link>
        </div>
      </div>
      <div className="hidden md:flex rounded-full border-[0.5px] border-slate-300 p-3">
        <FaUserAlt className="text-lg text-blue-500" />
      </div>
      <div ref={menuRef} className="md:hidden">
        <button type="button" aria-label="Menu" onClick={() => setShowMenu(!showMenu)}><AiOutlineMenu className="text-2xl text-blue-500" /></button>
        {showMenu && (
          <div className="absolute top-20 right-0 w-40 p-2 bg-white rounded-md shadow-md">
            <div className="flex flex-col justify-between items-center gap-6 p-4">
              <div className=" flex items-center justify-center gap-2 text-sm font-montserrat font-medium">
                <FaUserAlt className="text-lg rounded-full border-[0.5px] border-slate-300 text-blue-500 p-1" />
                <p>PROFILE</p>
              </div>
              <Link to="/" className="text-sm font-medium font-montserrat text-black">BOOKS</Link>
              <Link to="/categories" className="text-sm font-medium font-montserrat text-gray-400">CATEGORIES</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
