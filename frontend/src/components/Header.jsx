import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, loginSuccess } from "../store/slices/authSlice";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (name && role) {
      dispatch(loginSuccess({ name, role }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Book Review
      </Link>
      <nav className="space-x-4">
        <Link to="/books" className="text-blue-600 hover:underline">
          Books
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin/add-book" className="text-blue-600 hover:underline">
            Add Book
          </Link>
        )}
        {user ? (
          <>
            <Link to="/profile" className="text-blue-600 hover:underline">
              {user.name}
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
