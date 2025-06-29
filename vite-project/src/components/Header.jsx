import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "./Toast"; // ✅ import the Toast component

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(""); // ✅ toast state
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setToastMessage("Logged out successfully ✅"); // ✅ show toast
    navigate("/"); // ✅ go to homepage
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ⚽ Beti
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Login
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                👤 {user.username || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline text-sm font-medium"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col px-4 py-2 space-y-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 border-b text-gray-700 hover:bg-gray-100">
              Home
            </Link>

            {!user ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2 border-b text-gray-700 hover:bg-gray-100">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="py-2 border-b text-gray-700 hover:bg-gray-100">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="py-2 text-sm text-gray-600">👤 {user.username || user.email}</div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-left w-full py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}

      {/* ✅ Toast Message */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </header>
  );
}
