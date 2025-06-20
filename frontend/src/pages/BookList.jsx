import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slices/bookSlice";
import BookCard from "../components/BookCard";

const BookList = () => {
  const dispatch = useDispatch();
  // const { books, loading } = useSelector((state) => state.books);
  const { items: books, loading } = useSelector((state) => state.books);

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">All Books</h1>
      <input
        type="text"
        placeholder="Search by title..."
        className="border p-2 mb-4 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
