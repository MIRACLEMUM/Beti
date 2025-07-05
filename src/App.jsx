import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Don’t forget this import!

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SubscribePage from "./pages/SubscribePage"; // ✅ Already imported

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header always at the top */}
        <Header />

        {/* Main content */}
        <main className="flex-1 pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <Routes>
            {/* 🔒 Protect homepage */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/subscribe" element={<SubscribePage />} />
          </Routes>
        </main>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}
