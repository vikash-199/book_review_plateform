import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slices/bookSlice";
import BookCard from "../components/BookCard";

const Home = () => {
  const dispatch = useDispatch();
  const { items: books, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Featured Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          {books.slice(0, 4).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
