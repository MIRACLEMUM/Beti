// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchCard from "../components/MatchCard";
import MatchDetailsModal from "../components/MatchDetailsModal";
import matchesData from "../data/matches.json";
import Toast from "../components/Toast"; // Optional: if you want feedback on subscribe

export default function HomePage() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [leagueFilter, setLeagueFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
      navigate("/login");
      return;
    }

    setUser(userData);

    if (userData.subscribed) {
      setMatches(matchesData);
    } else {
      setMatches(matchesData.slice(0, 2));
    }
  }, []);

  useEffect(() => {
    let filtered = matches;
    if (statusFilter !== "All") {
      filtered = filtered.filter((match) => match.status === statusFilter);
    }
    if (leagueFilter !== "All") {
      filtered = filtered.filter((match) => match.league === leagueFilter);
    }
    setFilteredMatches(filtered);
  }, [matches, statusFilter, leagueFilter]);

  const handleSubscribe = () => {
    const updatedUser = { ...user, subscribed: true };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMatches(matchesData);
    setToastMessage("🎉 Subscription successful! Enjoy full access.");
  };

  const statusOptions = ["All", "Upcoming", "Finished"];
  const leagueOptions = ["All", ...Array.from(new Set(matchesData.map((m) => m.league)))];

  return (
    <div className="mt-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        {user?.username ? `Welcome, ${user.username}` : "Football Predictions"}
      </h1>

      {user && !user.subscribed && (
        <div className="text-center">
          <p className="mb-2 text-gray-700">You’re viewing limited predictions.</p>
          <button
            onClick={handleSubscribe}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Subscribe for Full Access
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Status Filter */}
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        {/* League Filter */}
        <select
          className="border p-2 rounded"
          value={leagueFilter}
          onChange={(e) => setLeagueFilter(e.target.value)}
        >
          {leagueOptions.map((league) => (
            <option key={league} value={league}>{league}</option>
          ))}
        </select>
      </div>

      {/* Match List */}
      <div className="grid gap-4">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} onClick={setSelectedMatch} />
        ))}
      </div>

      {/* Match Modal */}
      {selectedMatch && (
        <MatchDetailsModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}

      {/* Toast */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}
