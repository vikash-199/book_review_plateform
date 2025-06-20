// store/slices/bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await axios.get("http://localhost:5000/api/books");
  return res.data;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Book not found"
      );
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    selectedBook: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.selectedBook = null;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
