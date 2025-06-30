import { useState } from "react";
import { useBet } from "../context/BetContext";

export default function MatchDetailsModal({ match, onClose }) {
  const [showBetForm, setShowBetForm] = useState(false);
  const [stake, setStake] = useState("");
  const { placeBet } = useBet();

  if (!match) return null;

  const handleBetSubmit = () => {
    if (!stake || isNaN(stake)) {
      alert("Please enter a valid amount.");
      return;
    }

    placeBet(match, stake);
    alert(`✅ Bet placed on ${match.home} vs ${match.away} with ₦${stake}`);
    setStake("");
    setShowBetForm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-6">
      <div className="bg-white rounded-lg p-5 sm:p-6 w-full max-w-md sm:max-w-lg relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Match Heading */}
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
          {match.home} vs {match.away}
        </h2>

        {/* Match Info */}
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p><strong>Status:</strong> {match.status}</p>
          <p><strong>League:</strong> {match.league}</p>
        </div>

        {/* Probabilities */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm sm:text-base mb-4">
          <div>
            <div className="font-semibold text-gray-800">1</div>
            <div>{match.probabilities[0]}%</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">X</div>
            <div>{match.probabilities[1]}%</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">2</div>
            <div>{match.probabilities[2]}%</div>
          </div>
        </div>

        {/* Prediction */}
        <div className="text-center mb-4">
          <span className="bg-yellow-300 px-3 py-1 rounded-full text-sm sm:text-base font-medium text-black">
            Prediction: {match.prediction}
          </span>
        </div>

        {/* Bet Form */}
        {showBetForm ? (
          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter stake amount"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3 text-sm sm:text-base"
            />
            <button
              onClick={handleBetSubmit}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
            >
              Confirm Bet
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowBetForm(true)}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded"
          >
            Place Bet
          </button>
        )}
      </div>
    </div>
  );
}
