import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = {
      id: books.length + 1,
      title,
      author,
      category: 'Fiction',
      progress: 0,
    };
    dispatch(addBook(book));
    setTitle('');
    setAuthor('');
  };

  return (
    <div className="border-t-[0.5px] border-slate-400 py-8 mt-10 flex flex-col">
      <p className="text-[#888888] text-xl font-montserrat font-semibold">ADD NEW BOOK</p>
      <form className="flex w-full justify-between items-center mt-6" id="add-book">
        <input className="w-[55%] h-10 p-2 border-[0.5px] border-slate-300 rounded-sm focus:outline-none" placeholder="Book" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-[25%] h-10 p-2 border-[0.5px] border-slate-300 rounded-sm focus:outline-none" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 font-normal" type="submit" onClick={(e) => handleSubmit(e)}>ADD BOOK</button>
      </form>
    </div>
  );
}
