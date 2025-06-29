import { useState } from "react";
import { useBet } from "../context/BetContext";

export default function FloatingBetSlip() {
  const [isOpen, setIsOpen] = useState(false);
  const { bets, removeBet, clearBets } = useBet();

  const totalStake = bets.reduce((acc, bet) => acc + bet.stake, 0);
  const estimatedWinnings = (totalStake * 1.5).toFixed(2); // simple logic

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-yellow-400 text-black font-bold py-2 px-4 rounded-full shadow-lg z-50"
      >
        🧾 My Bets ({bets.length})
      </button>

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">My Bet Slip</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-600 hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[85%]">
          {bets.length === 0 ? (
            <p className="text-gray-500 text-center">No bets placed yet.</p>
          ) : (
            <ul className="space-y-4">
              {bets.map((bet) => (
                <li
                  key={bet.id}
                  className="border rounded p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold">{bet.home} vs {bet.away}</div>
                    <div className="text-sm text-gray-600">
                      Stake: ₦{bet.stake}<br />
                      Prediction: <strong>{bet.prediction}</strong>
                    </div>
                  </div>
                  <button
                    onClick={() => removeBet(bet.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                    title="Remove Bet"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {bets.length > 0 && (
          <div className="p-4 border-t space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Total Stake:</span>
              <span className="font-bold">₦{totalStake}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Estimated Winnings:</span>
              <span className="font-bold text-green-600">₦{estimatedWinnings}</span>
            </div>
            <button
              onClick={clearBets}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500"
            >
              Clear All Bets
            </button>
          </div>
        )}
      </div>
    </>
  );
}
