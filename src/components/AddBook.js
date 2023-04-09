import React from 'react';

export default function AddBook() {
  return (
    <div className="border-t-[0.5px] border-slate-400 py-8 mt-10 flex flex-col">
      <p className="text-[#888888] text-xl font-montserrat font-semibold">ADD NEW BOOK</p>
      <form className="flex w-full justify-between items-center mt-6">
        <input className="w-[55%] h-10 p-2 border-[0.5px] border-slate-300 rounded-sm focus:outline-none" placeholder="Book" />
        <input className="w-[25%] h-10 p-2 border-[0.5px] border-slate-300 rounded-sm focus:outline-none" placeholder="Author" />
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 font-normal" type="button">ADD BOOK</button>
      </form>
    </div>
  );
}
