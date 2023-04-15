import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import AddBook from './AddBook';
import { deleteBook } from '../redux/books/booksSlice';
import 'react-circular-progressbar/dist/styles.css';

export default function Home() {
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const randomProgress = [54, 70, 23, 16, 34, 87, 90, 100, 62, 46, 9];

  function getProg() {
    const randomIndex = Math.floor(Math.random() * randomProgress.length);
    const randomNumber = randomProgress[randomIndex];
    const percentText = `${randomNumber}`;
    return { number: randomNumber, string: percentText };
  }

  return (
    <div>
      {Object.keys(books).length === 0 ? (
        <div className="bg-gray-50 p-10">
          <p className="text-center text-lg text-gray-500">No books found.</p>
        </div>
      ) : (
        <div className="bg-gray-50 p-10 flex-col gap-y-20">
          {Object.keys(books).map((key) => (
            books[key].map((book) => {
              const prog = getProg();
              return (
                <div className="mt-4" key={key}>
                  <div className="flex border-[0.5px] border-slate-200 rounded-md bg-white p-8 justify-between">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-sm font-medium font-montserrat text-slate-400">{book.category}</h1>
                      <h1 className="text-2xl font-medium text-black">{book.title}</h1>
                      <p className="text-sm font-normal text-blue-400">{book.author}</p>
                      <div className="flex gap-4 mt-6 text-sm font-normal text-blue-400">
                        <p>Comments</p>
                        <button type="button" onClick={() => { dispatch(deleteBook(key)); }}>Remove</button>
                        <p>Edit</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex items-center justify-center gap-4 ">
                        <CircularProgress variant="determinate" value={prog.number} size={70} />
                        <div className="flex flex-col items-start justify-center pr-8 border-r-[0.5px] border-slate-300">
                          <p className="text-4xl font-normal font-montserrat text-black">
                            {prog.string}
                            %
                          </p>
                          <p className="text-sm font-normal text-slate-400 font-montserrat">Completed</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pl-8 items-start">
                        <p className="text-sm font-normal text-slate-400">CURRENT CHAPTER</p>
                        <p className="text-sm font-thin text-black">Chapter 17</p>
                        <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 font-thin" type="button">UPDATE PROGRESS</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ))}
        </div>
      )}
      <AddBook />
    </div>
  );
}
