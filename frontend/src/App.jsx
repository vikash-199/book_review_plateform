// import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Home from "./pages/Home";
// import BookList from "./pages/BookList";
// import BookDetails from "./pages/BookDetails";
// import Profile from "./pages/Profile";
// // import Header from "../components/Header";
// // import Login from "../pages/Login";
// // import Register from "../pages/Register";
// import axios from "axios";
// import Header from "./components/Header";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const name = localStorage.getItem("name");
//     const role = localStorage.getItem("role");
//     const loggedIn = !!token;
//     setIsAuthenticated(loggedIn);
//     if (loggedIn && name && role) {
//       setUser({ name, role });
//     }
//   }, [location]);

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/login" replace />;
//   };

//   return (
//     <>
//       <Header
//         user={user}
//         setUser={setUser}
//         setIsAuthenticated={setIsAuthenticated}
//       />
//       <main className="p-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/books" element={<BookList />} />
//           <Route path="/books/:id" element={<BookDetails />} />
//           <Route
//             path="/profile"
//             element={<PrivateRoute element={<Profile />} />}
//           />
//           <Route
//             path="/login"
//             element={
//               <Login
//                 setUser={setUser}
//                 setIsAuthenticated={setIsAuthenticated}
//               />
//             }
//           />
//           <Route
//             path="/register"
//             element={
//               <Register
//                 setUser={setUser}
//                 setIsAuthenticated={setIsAuthenticated}
//               />
//             }
//           />
//         </Routes>
//         {!user && (
//           <div className="text-center mt-4">
//             <p>
//               Don't have an account?{" "}
//               <Link to="/register" className="text-blue-600 underline">
//                 Register
//               </Link>
//             </p>
//           </div>
//         )}
//       </main>
//     </>
//   );
// }

// export default App;
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { loginSuccess, logout } from "./store/slices/authSlice";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (token && name && role) {
      dispatch(loginSuccess({ name, role }));
    } else {
      dispatch(logout());
    }
  }, [location, dispatch]);

  const PrivateRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" replace />;
  };

  return (
    <>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {!user && (
          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 underline">
                Register
              </Link>
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
