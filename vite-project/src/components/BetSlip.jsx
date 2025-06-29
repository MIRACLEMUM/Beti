import { useBet } from "../context/BetContext";

export default function BetSlip() {
  const { bets, removeBet, clearBets } = useBet();

  // Simple total stake and prediction-based payout (fake logic)
  const totalStake = bets.reduce((acc, bet) => acc + bet.stake, 0);
  const estimatedWinnings = (totalStake * 1.5).toFixed(2); // fake multiplier

  if (bets.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow max-w-md mx-auto mt-6 text-center text-gray-500">
        No bets placed yet.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">🎫 Bet Slip</h2>

      <ul className="space-y-3">
        {bets.map((bet) => (
          <li
            key={bet.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{bet.home} vs {bet.away}</div>
              <div className="text-sm text-gray-600">
                Prediction: <strong>{bet.prediction}</strong> <br />
                Stake: ₦{bet.stake}
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

      <div className="mt-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Total Stake:</span>
          <span className="font-bold">₦{totalStake}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Winnings:</span>
          <span className="font-bold text-green-600">₦{estimatedWinnings}</span>
        </div>
      </div>

      <button
        onClick={clearBets}
        className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-500"
      >
        Clear All Bets
      </button>
    </div>
  );
}
