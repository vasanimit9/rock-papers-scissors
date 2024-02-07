import { create } from "zustand";
import { v4 as uuidV4 } from "uuid";

interface IState {
  currentPlayerId: string | null;
  activePlayerIds: string[];
  playerIdQueue: string[];
  playerDirectory: { [id: string]: { name: string; id: string } };
  addPlayer: (name: string) => void;
  leaderBoard: { [key: string]: number };
  setState: (state: IState) => void;
  matchData: { [id: string]: string };
  setMatchData: (id: string, choice: string) => void;
  clearMatchData: () => void;
  leaveGame: () => void;
  updateLeaderBoard: (id: string, points: number) => void;
}

let localState = {};
try {
  localState = JSON.parse(localStorage.getItem("rps-state") || "{}");
} catch {}

const useStore = create<IState>((set) => ({
  currentPlayerId: null,
  activePlayerIds: [],
  playerIdQueue: [],
  playerDirectory: {},
  leaderBoard: {},
  updateLeaderBoard: (id, points) =>
    set((state) => {
      const newLeaderBoard = { ...state.leaderBoard };
      newLeaderBoard[id] ??= 0;
      newLeaderBoard[id] += points;
    }),
  matchData: {},
  clearMatchData: () => set(() => ({ matchData: {} })),
  leaveGame: () =>
    set((state) => {
      const newQueue = [...state.playerIdQueue];
      const newActivePlayer = newQueue.splice(0, 1)[0];

      return {
        playerIdQueue: newQueue,
        activePlayerIds: newActivePlayer
          ? [
              ...state.activePlayerIds.filter(
                (id) => id !== state.currentPlayerId
              ),
              newActivePlayer,
            ]
          : state.activePlayerIds.filter((id) => id !== state.currentPlayerId),
        currentPlayerId: null,
      };
    }),
  setMatchData: (id, choice) =>
    set((state) => {
      const { matchData } = state;
      return {
        matchData: { ...matchData, [id]: choice },
      };
    }),
  addPlayer: (name: string) =>
    set((state) => {
      const {
        activePlayerIds,
        playerIdQueue,
        currentPlayerId,
        playerDirectory,
      } = state;
      if (currentPlayerId) {
        return {};
      }
      const newPlayerId = uuidV4();
      const newPlayer = {
        id: newPlayerId,
        name,
      };
      if (activePlayerIds.length < 2) {
        return {
          activePlayerIds: [...activePlayerIds, newPlayerId],
          currentPlayerId: newPlayerId,
          playerDirectory: {
            ...playerDirectory,
            [newPlayerId]: newPlayer,
          },
        };
      }

      return {
        currentPlayerId: newPlayerId,
        playerIdQueue: [...playerIdQueue, newPlayerId],
        playerDirectory: {
          ...playerDirectory,
          [newPlayerId]: newPlayer,
        },
      };
    }),
  setState: (state) => set(() => state),
  ...localState,
}));

export default useStore;
