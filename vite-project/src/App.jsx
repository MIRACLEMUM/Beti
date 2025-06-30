import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FloatingBetSlip from "./components/FloatingBetSlip";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer"; // ✅ Footer import

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header always at the top */}
        <Header />

        {/* Main content below header */}
        <main className="flex-1 pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* ✅ Footer added here */}
        <Footer />

        {/* Floating Bet Slip stays fixed */}
        <FloatingBetSlip />
      </div>
    </Router>
  );
}
