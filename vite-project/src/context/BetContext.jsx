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
      userEmail: loggedInUser.email,
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

  // ✅ Simulate match result and update bets as won/lost
  const updateBetsWithResult = (matchId, result) => {
    setBets((prev) =>
      prev.map((bet) => {
        if (bet.matchId !== matchId) return bet;

        let won = false;
        if (
          (result === "home" && bet.prediction === bet.home) ||
          (result === "away" && bet.prediction === bet.away) ||
          (result === "draw" && bet.prediction.toLowerCase() === "draw")
        ) {
          won = true;
        }

        return {
          ...bet,
          result: won ? "won" : "lost",
        };
      })
    );
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
    <BetContext.Provider
      value={{
        bets,
        placeBet,
        removeBet,
        clearBets,
        updateBetsWithResult, // ✅ Added this
      }}
    >
      {children}
    </BetContext.Provider>
  );
}

export function useBet() {
  return useContext(BetContext);
}
