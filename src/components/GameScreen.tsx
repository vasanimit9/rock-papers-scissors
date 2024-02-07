import useStore from "../store";
import { points } from "../utils/calculateResult";
import ResultScreen from "./ResultScreen";

function GameScreen() {
  const activePlayerIds = useStore((state) => state.activePlayerIds);
  const currentPlayerId = useStore((state) => state.currentPlayerId);
  const playerDirectory = useStore((state) => state.playerDirectory);
  const opponentId = activePlayerIds.find((id) => id !== currentPlayerId);
  const setMatchData = useStore((state) => state.setMatchData);
  const matchData = useStore((state) => state.matchData);

  if (!currentPlayerId) {
    return <></>;
  }

  if (!opponentId) {
    return <>Waiting for an opponent</>;
  }

  if (matchData[currentPlayerId]) {
    if (matchData[opponentId]) {
      return <ResultScreen />;
    }
    return <>Waiting for opponent to choose</>;
  }

  const setChoice = (choice: string) => setMatchData(currentPlayerId, choice);
  return (
    <div className="">
      <div className="flex flex-col items-center">
        Your Oppoonent is {playerDirectory[opponentId].name}
        <br />
        Choose:
        <div className="flex">
          <button
            onClick={() => setChoice("rock")}
            className="mx-2 py-2 px-3 bg-[#099] text-white rounded"
          >
            Rock
          </button>
          <button
            onClick={() => setChoice("paper")}
            className="mx-2 py-2 px-3 bg-[#099] text-white rounded"
          >
            Paper
          </button>
          <button
            onClick={() => setChoice("scissors")}
            className="mx-2 py-2 px-3 bg-[#099] text-white rounded"
          >
            Scissors
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
