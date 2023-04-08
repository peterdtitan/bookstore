import React from 'react';
import BookCard from './BookCard';
import { books } from '../data/dummy';
import AddBook from './AddBook';

export default function Home() {
  return (
    <div>
      <div className="bg-gray-50 p-10 flex-col gap-y-20">
        {books.map((book) => (
          <div className="mt-4" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
      <AddBook />
    </div>
  );
}
