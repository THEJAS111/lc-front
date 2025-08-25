import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import Homepage from "./pages/homepage.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import { checkAuth } from "./authsilce.js";
import { useDispatch, useSelector } from "react-redux";
import ProblemPage from "./pages/problempage.jsx";
import Admin from "./pages/admin.jsx";
import AdminPanel from "./components/admincreate.jsx";
import AdminDelete from "./components/admindelete.jsx";
import Startingpage from "./pages/startingpage.jsx";
import Profile from "./pages/profilepage.jsx";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Default landing page */}
        <Route path="/" element={<Startingpage />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/homepage" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/homepage" /> : <Signup />}
        />

        {/* Homepage (after login) */}
        <Route
          path="/homepage"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}
        />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/create"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <AdminPanel />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/delete"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <AdminDelete />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Problems */}
        <Route path="/problem/:problemId" element={<ProblemPage />} />
      </Routes>
    </>
  );
}

export default App;
