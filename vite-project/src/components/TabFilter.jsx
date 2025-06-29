// src/components/TabFilter.jsx

export default function TabFilter({ activeTab, onTabChange, selectedLeague, onLeagueChange, availableLeagues }) {
  const tabs = ["All", "Upcoming", "Finished"];

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* League Dropdown */}
      <div>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={selectedLeague}
          onChange={(e) => onLeagueChange(e.target.value)}
        >
          <option value="All">All Leagues</option>
          {availableLeagues.map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
