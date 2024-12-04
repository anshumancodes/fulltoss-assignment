import  { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero";
import { useUserContext } from "./context/UserContext";

// Lazy loading components
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Shop = lazy(() => import("./components/Shop"));

function App() {
  const { user } = useUserContext();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={user?.name ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
