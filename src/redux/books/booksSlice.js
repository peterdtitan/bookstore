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
  await axios.post(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${process.env.REACT_APP_BOOKS_API}/books`, book);
  return book;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (item_id) => {
  await axios.delete(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${process.env.REACT_APP_BOOKS_API}/books/${item_id}`);
  return item_id;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.books = action.payload.data;
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addBook.fulfilled]: (state, action) => {
      const book = action.payload;
      state.books[book.item_id] = [{
        author: book.author,
        title: book.title,
        category: book.category,
      }];
    },
    [deleteBook.fulfilled]: (state, action) => {
      const { payload: item_id } = action;
      delete state.books[item_id];
    },
  },
});

export const { removeBook } = booksSlice.actions;

export default booksSlice.reducer;