import { useEffect } from "react";
import useStore from "../store";
import { points } from "../utils/calculateResult";

function ResultScreen() {
  const activePlayerIds = useStore((state) => state.activePlayerIds);
  const currentPlayerId = useStore((state) => state.currentPlayerId);
  const opponentId = activePlayerIds.find((id) => id !== currentPlayerId);
  const clearMatchData = useStore((state) => state.clearMatchData);
  const leaveGame = useStore((state) => state.leaveGame);
  const matchData = useStore((state) => state.matchData);

  useEffect(() => {
    if (!currentPlayerId || !opponentId) {
      return;
    }
  }, [matchData]);

  if (!currentPlayerId) {
    return <></>;
  }

  if (!opponentId) {
    return <>Waiting for an opponent</>;
  }

  let output = "";

  if (matchData[currentPlayerId]) {
    if (matchData[opponentId]) {
      const matchPoints =
        points[matchData[currentPlayerId]][matchData[opponentId]];
      if (matchPoints === 0) {
        output = "You have lost!";
      }
      if (matchPoints === 0.5) {
        output = "You have tied.";
      }
      if (matchPoints === 1) {
        output = "You have won!";
      }
      return (
        <div className="flex flex-col">
          {output}
          <div className="flex">
            <button
              onClick={() => {
                clearMatchData();
              }}
              className="bg-[#099] mx-2 my-1 px-3 py-2"
            >
              Play another
            </button>
            <button
              onClick={() => {
                clearMatchData();
                leaveGame();
              }}
              className="bg-[#099] mx-2 my-1 px-3 py-2"
            >
              Leave
            </button>
          </div>
        </div>
      );
    }
    return <>Waiting for opponent to choose</>;
  }
}

export default ResultScreen;
