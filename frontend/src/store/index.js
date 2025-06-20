import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/bookSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    user: userReducer,
  },
});

export default store;
