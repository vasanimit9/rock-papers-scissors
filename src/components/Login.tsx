import { useCallback, useState } from "react";
import useStore from "../store";

function Login() {
  const [name, setName] = useState<string>();
  const addPlayer = useStore((state) => state.addPlayer);
  const onButtonClick = useCallback(() => {
    if (!name) {
      alert("Enter your name to continue");
      return;
    }
    addPlayer(name);
  }, [addPlayer, name]);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-40 w-80 rounded-lg border flex flex-col justify-center">
        <h1 className="text-lg">Enter your Name:</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          className="outline-none mx-2 border mt-1 rounded px-3 py-2"
        />
        <button
          onClick={onButtonClick}
          className="bg-[#009090] px-3 py-2 w-min mx-auto text-white rounded mt-1"
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default Login;
