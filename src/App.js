import { useState } from "react";
import "./App.css";
import Emoji from "./Option/Emoji";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {open ? "이모지 닫기" : "이모지 열기"}
      </button>

      {open && <Emoji />}
    </>
  );
}

export default App;
