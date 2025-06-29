import { createContext, useContext, useState, useEffect } from "react";

const BetContext = createContext();

export function BetProvider({ children }) {
  const [bets, setBets] = useState(() => {
    const saved = localStorage.getItem("bets");
    return saved ? JSON.parse(saved) : [];
  });

  // Save bets to localStorage when they change
  useEffect(() => {
    localStorage.setItem("bets", JSON.stringify(bets));
  }, [bets]);

  // ✅ Place a new bet, linked to current user
  const placeBet = (match, stake) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) return;

    const newBet = {
      id: Date.now(),
      userEmail: loggedInUser.email, // ✅ save who placed it
      matchId: match.id,
      home: match.home,
      away: match.away,
      prediction: match.prediction,
      stake: Number(stake),
      league: match.league,
      status: match.status,
    };

    setBets((prev) => [...prev, newBet]);
  };

  // Remove a single bet by ID
  const removeBet = (id) => {
    setBets((prev) => prev.filter((bet) => bet.id !== id));
  };

  // ✅ Clear only bets placed by the current user
  const clearBets = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) return;

    setBets((prev) => prev.filter((bet) => bet.userEmail !== loggedInUser.email));
  };

  return (
    <BetContext.Provider value={{ bets, placeBet, removeBet, clearBets }}>
      {children}
    </BetContext.Provider>
  );
}

export function useBet() {
  return useContext(BetContext);
}
