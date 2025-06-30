// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useBet } from "../context/BetContext";
import Toast from "../components/Toast"; // ✅ Import toast

export default function Dashboard() {
  const { bets, clearBets, updateBetsWithResult } = useBet();
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(""); // ✅ Toast state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userBets = user
    ? bets.filter((bet) => bet.userEmail === user.email)
    : [];

  const simulateResults = () => {
    userBets.forEach((bet) => {
      const outcomes = ["home", "draw", "away"];
      const randomResult = outcomes[Math.floor(Math.random() * 3)];
      updateBetsWithResult(bet.matchId, randomResult);
    });

    setToastMessage("Results updated 🔁"); // ✅ Toast on simulate
  };

  useEffect(() => {
    if (userBets.length > 0) {
      simulateResults();
    }
  }, [user?.email]);

  const totalWon = userBets.filter((b) => b.result === "won").length;
  const totalLost = userBets.filter((b) => b.result === "lost").length;
  const totalStake = userBets.reduce((acc, b) => acc + b.stake, 0);
  const totalWinnings = userBets
    .filter((b) => b.result === "won")
    .reduce((acc, b) => acc + b.stake, 0);

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 shadow rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600">🔥 Your Bets</h2>
          {userBets.length > 0 && (
            <button
              onClick={simulateResults}
              className="text-sm bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              🔁 Refresh Results
            </button>
          )}
        </div>

        {userBets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
            <div className="p-4 bg-green-50 rounded shadow">
              <p>
                ✅ Total Won:{" "}
                <span className="font-bold text-green-600">{totalWon}</span>
              </p>
              <p>
                💰 Total Winnings:{" "}
                <span className="font-bold text-green-700">₦{totalWinnings}</span>
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded shadow">
              <p>
                ❌ Total Lost:{" "}
                <span className="font-bold text-red-600">{totalLost}</span>
              </p>
              <p>
                🧾 Total Stake:{" "}
                <span className="font-bold text-red-700">₦{totalStake}</span>
              </p>
            </div>
          </div>
        )}

        {userBets.length === 0 ? (
          <p className="text-gray-500">No bets placed yet.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {userBets.map((bet) => {
                const result = bet.result || "pending";
                const statusColor =
                  result === "won"
                    ? "text-green-600"
                    : result === "lost"
                    ? "text-red-600"
                    : "text-yellow-600";

                return (
                  <li key={bet.id} className="border p-4 rounded shadow-sm bg-gray-50">
                    <div className="text-base sm:text-lg font-semibold text-gray-800">
                      {bet.home} vs {bet.away}
                    </div>
                    <div className="text-sm text-gray-600">
                      Prediction:{" "}
                      <span className="font-medium text-black">{bet.prediction}</span>
                    </div>
                    <div className="text-sm text-gray-600">Stake: ₦{bet.stake}</div>
                    <div className="text-sm text-gray-600">League: {bet.league}</div>
                    <div className={`text-sm font-medium ${statusColor}`}>
                      Status:{" "}
                      {result === "pending"
                        ? "⏳ Pending"
                        : result === "won"
                        ? "✅ Won"
                        : "❌ Lost"}
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => {
                clearBets();
                setToastMessage("All bets cleared 🧹"); // ✅ Toast on clear
              }}
              className="mt-8 w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Clear My Bets
            </button>
          </>
        )}
      </div>

      {/* ✅ Toast message display */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}
