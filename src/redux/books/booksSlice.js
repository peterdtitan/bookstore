import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: {},
  status: 'idle',
  error: null
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${process.env.REACT_APP_BOOKS_API}/books`);
  return response;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const response = await axios.post(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${process.env.REACT_APP_BOOKS_API}/books`, book);
  if(response){
    return book
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    removeBook: (state, action) => {
      const { payload: id } = action;
      state.books = state.books.filter((book) => book.id !== id);
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchBooks.fulfilled]: (state, action) => {
      console.log(action)
      state.status = 'succeeded';
      state.books = action.payload.data;
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addBook.fulfilled]: (state, action) => {
      state.books.push(action.payload);
    },
  },
});

export const { removeBook } = booksSlice.actions;

export default booksSlice.reducer;
