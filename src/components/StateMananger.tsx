import { useEffect } from "react";
import useStore from "../store";

function StateManager() {
  const state = useStore();

  useEffect(() => {
    const restore = () => {
      try {
        const localState = JSON.parse(
          localStorage.getItem("rps-state") || "{}"
        );
        delete localState["currentPlayerId"];
        state.setState(localState);
      } catch {}
    };
    restore();
    window.addEventListener("storage", () => {
      restore();
    });
  }, []);

  useEffect(() => {
    const stateForStorage = { ...state };
    stateForStorage.currentPlayerId = null;
    localStorage.setItem("rps-state", JSON.stringify(stateForStorage));
  }, [state]);

  return <></>;
}

export default StateManager;
