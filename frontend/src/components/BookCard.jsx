import { Link } from "react-router-dom";

const BookCard = ({ book }) => (
  <div className="border p-4 rounded shadow-sm bg-white">
    <img
      src={book.image}
      alt={book.title}
      className="h-40 w-full object-cover mb-2"
    />
    <h2 className="font-bold text-lg mb-1">{book.title}</h2>
    <p className="text-sm text-gray-600">{book.author}</p>
    <Link to={`/books/${book._id}`} className="text-blue-500 text-sm">
      View Details
    </Link>
  </div>
);

export default BookCard;
