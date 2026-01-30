import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Counter: {count}</h1>
      <div className="button-container">
        <button onClick={() => setCount(count + 1)}>
          +
        </button>
        <button onClick={() => setCount(count - 1)}>
          -
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
