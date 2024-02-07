import "./App.css";
import Login from "./components/Login";
import PlayerScreen from "./components/PlayerScreen";
import StateManager from "./components/StateMananger";
import useStore from "./store";

function App() {
  const currentPlayerId = useStore((state) => state.currentPlayerId);
  const state = useStore();

  return (
    <>
      <button
        className="bg-[#099] px-3 py-2 rounded"
        onClick={() => {
          state.setState({
            ...state,
            activePlayerIds: [],
            currentPlayerId: null,
            playerDirectory: {},
            playerIdQueue: [],
            leaderBoard: {},
            matchData: {},
          });
        }}
      >
        Clear Storage
      </button>
      <br />
      {currentPlayerId ? <PlayerScreen /> : <Login />}
      <StateManager />
    </>
  );
}

export default App;
