import useStore from "../store";
import GameScreen from "./GameScreen";

function PlayerScreen() {
  const currentPlayerId = useStore((state) => state.currentPlayerId);
  const activePlayerIds = useStore((state) => state.activePlayerIds);
  if (!currentPlayerId) {
    return <></>;
  }
  const isActivePlayer = activePlayerIds.includes(currentPlayerId);
  console.log({ isActivePlayer, activePlayerIds, currentPlayerId });

  if (isActivePlayer) {
    return <GameScreen />;
  }
  return <>Please wait! You are in queue!</>;
}

export default PlayerScreen;
