// src/components/MatchDetailsModal.jsx
export default function MatchDetailsModal({ match, onClose }) {
  if (!match) return null;

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
      </div>
    </div>
  );
}
