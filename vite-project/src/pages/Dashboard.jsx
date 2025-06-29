// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useBet } from "../context/BetContext";

export default function Dashboard() {
  const { bets, clearBets } = useBet();
  const [user, setUser] = useState(null);
  const [simulatedBets, setSimulatedBets] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Filter only current user's bets
  const userBets = user
    ? bets.filter((bet) => bet.userEmail === user.email)
    : [];

  // Function to simulate random results
  const simulateResults = () => {
    const simulated = userBets.map((bet) => ({
      ...bet,
      simulatedStatus: Math.random() < 0.5 ? "Won" : "Lost",
    }));
    setSimulatedBets(simulated);
  };

  // Auto simulate on first load
  useEffect(() => {
    const timeout = setTimeout(() => {
      simulateResults();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [userBets]);

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white shadow rounded">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-600">🔥 Your Bets</h2>
        {userBets.length > 0 && (
          <button
            onClick={simulateResults}
            className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            🔁 Refresh Results
          </button>
        )}
      </div>

      {userBets.length === 0 ? (
        <p className="text-gray-500">No bets placed yet.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {userBets.map((bet) => {
              const sim = simulatedBets.find((b) => b.id === bet.id);
              const status = sim?.simulatedStatus || "Pending";
              const statusColor =
                status === "Won"
                  ? "text-green-600"
                  : status === "Lost"
                  ? "text-red-600"
                  : "text-yellow-600";

              return (
                <li key={bet.id} className="border p-4 rounded shadow-sm">
                  <div className="text-lg font-semibold text-gray-800">
                    {bet.home} vs {bet.away}
                  </div>
                  <div className="text-sm text-gray-600">
                    Prediction:{" "}
                    <span className="font-medium text-black">
                      {bet.prediction}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Stake: ₦{bet.stake}
                  </div>
                  <div className="text-sm text-gray-600">
                    League: {bet.league}
                  </div>
                  <div className={`text-sm font-medium ${statusColor}`}>
                    Status:{" "}
                    {status === "Pending"
                      ? "⏳ Pending"
                      : status === "Won"
                      ? "✅ Won"
                      : "❌ Lost"}
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            onClick={clearBets}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear My Bets
          </button>
        </>
      )}
    </div>
  );
}
