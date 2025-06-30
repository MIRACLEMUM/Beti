// src/components/TabFilter.jsx

export default function TabFilter({
  activeTab,
  onTabChange,
  selectedLeague,
  onLeagueChange,
  availableLeagues,
}) {
  const tabs = ["All", "Upcoming", "Finished"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? "bg-yellow-400 text-black"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* League Dropdown */}
      <div className="w-full sm:w-56">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
