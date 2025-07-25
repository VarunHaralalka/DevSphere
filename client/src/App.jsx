import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useUserStore } from "./stores/userStore";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { user } = useUserStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* this will render Navbar for every page */}
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route path="/user/:id" element={<ProfilePage />} />
        </Routes>
      </main>
      {/* this will render Footer for every page */}
      <Footer />
    </div>
  );
}

export default App;
