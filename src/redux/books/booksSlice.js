import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: {},
  status: 'idle',
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${process.env.REACT_APP_BOOKS_API}/books`);
  return response;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const { itemId } = book;
  const { title, author, category } = book;
  const payload = {
    item_id: itemId, title, author, category,
  };
  await axios.post(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${process.env.REACT_APP_BOOKS_API}/books`, payload);
  return book;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await axios.delete(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${process.env.REACT_APP_BOOKS_API}/books/${id}`);
  return id;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBooks.pending]: (state) => ({
      ...state,
      status: 'loading',
    }),
    [fetchBooks.fulfilled]: (state, action) => {
      const newBooks = action.payload.data;
      return { ...state, books: newBooks, status: 'succeeded' };
    },
    [fetchBooks.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
    }),
    [addBook.fulfilled]: (state, action) => {
      const book = action.payload;
      return {
        ...state,
        books: {
          ...state.books,
          [book.itemId]: [{
            author: book.author,
            title: book.title,
            category: book.category,
          }],
        },
      };
    },
    [deleteBook.fulfilled]: (state, action) => {
      const { payload: id } = action;
      const newBooks = { ...state.books };
      delete newBooks[id];
      return { ...state, books: newBooks };
    },
  },
});

export const { removeBook } = booksSlice.actions;

export default booksSlice.reducer;
