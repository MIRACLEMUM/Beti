// src/components/MatchCard.jsx

export default function MatchCard({ match, onClick }) {
  return (
    <div
      onClick={() => onClick(match)}
      className="bg-white shadow rounded-xl p-4 border border-gray-200 w-full max-w-xl mx-auto cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg text-gray-800">
          {match.home} vs {match.away}
        </div>
        <div className="text-sm text-gray-500">{match.status}</div>
      </div>

      <div className="grid grid-cols-3 text-center text-sm text-gray-600 mb-2">
        <div>
          <div className="font-semibold text-gray-700">1</div>
          <div>{match.probabilities[0]}%</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700">X</div>
          <div>{match.probabilities[1]}%</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700">2</div>
          <div>{match.probabilities[2]}%</div>
        </div>
      </div>

      <div className="text-sm text-center">
        <span className="bg-yellow-300 px-2 py-1 rounded text-black font-medium">
          Prediction: {match.prediction}
        </span>
      </div>
    </div>
  );
}
