// src/components/CardContainer.jsx

import { useState } from "react";
import MatchCard from "./MatchCard";
import TabFilter from "./TabFilter";
import MatchDetailsModal from "./MatchDetailsModal";
import matches from "../data/matches.json";

export default function CardContainer() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const availableLeagues = [...new Set(matches.map((m) => m.league))];

  const filteredMatches = matches.filter((m) => {
    const matchStatus = activeTab === "All" || m.status.toLowerCase() === activeTab.toLowerCase();
    const matchLeague = selectedLeague === "All" || m.league === selectedLeague;
    return matchStatus && matchLeague;
  });

  const visibleMatches = filteredMatches.slice(0, visibleCount);

  return (
    <div className="space-y-4 mt-6">
      <TabFilter
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setVisibleCount(3);
        }}
        selectedLeague={selectedLeague}
        onLeagueChange={(league) => {
          setSelectedLeague(league);
          setVisibleCount(3);
        }}
        availableLeagues={availableLeagues}
      />

      {visibleMatches.length > 0 ? (
        visibleMatches.map((match) => (
          <MatchCard key={match.id} match={match} onClick={setSelectedMatch} />
        ))
      ) : (
        <p className="text-gray-500 text-center">No matches found.</p>
      )}

      {visibleCount < filteredMatches.length && (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-full"
          >
            Load More
          </button>
        </div>
      )}

      {/* Match Details Modal */}
      <MatchDetailsModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
}
