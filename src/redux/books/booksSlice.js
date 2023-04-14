import { createSlice } from '@reduxjs/toolkit';
import books from '../../data/dummy';

const initialState = {
  books,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, { payload }) => {
      state.books.push(payload);
    },
    removeBook: (state, action) => {
      const { payload: id } = action;
      const books = state.books.filter((book) => book.id !== id);
      return { ...state, books };
    },
  },
});

export const { addBook, removeBook } = booksSlice.actions;

export default booksSlice.reducer;
