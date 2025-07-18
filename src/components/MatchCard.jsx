// src/components/MatchCard.jsx
import React from "react";

export default function MatchCard({ match, onClick }) {
  return (
    <div
      onClick={() => onClick(match)}
      className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 w-full max-w-2xl mx-auto cursor-pointer hover:shadow-lg transition duration-300"
    >
      {/* Match Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-1">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          {match.home} vs {match.away}
        </h3>
        <span className="text-xs sm:text-sm text-gray-500">{match.status}</span>
      </div>

      {/* Probabilities */}
      <div className="grid grid-cols-3 gap-3 text-center text-sm sm:text-base text-gray-700 mb-3">
        <div>
          <p className="font-semibold">1</p>
          <p>{match.probabilities[0]}%</p>
        </div>
        <div>
          <p className="font-semibold">X</p>
          <p>{match.probabilities[1]}%</p>
        </div>
        <div>
          <p className="font-semibold">2</p>
          <p>{match.probabilities[2]}%</p>
        </div>
      </div>

      {/* Prediction */}
      <div className="text-sm sm:text-base text-center">
        <span className="bg-yellow-300 px-3 py-1 rounded-full font-medium text-black inline-block">
          Prediction: {match.prediction}
        </span>
      </div>
    </div>
  );
}
