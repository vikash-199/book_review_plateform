import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../store/slices/bookSlice";
import ReviewForm from "../components/ReviewForm";

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBook, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
  }, [id, dispatch]);

  if (loading) return <p>Loading book...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedBook) return <p>No book found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{selectedBook.title}</h1>
      <p className="text-gray-600">{selectedBook.author}</p>
      <img
        src={selectedBook.image}
        alt={selectedBook.title}
        className="w-64 my-4"
      />
      <p>{selectedBook.description}</p>
      <ReviewForm bookId={selectedBook._id} />
    </div>
  );
};

export default BookDetails;
