import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      {isOpen ? (
        <span className="cross" onClick={toggleIsOpen}>
          &times;
        </span>
      ) : (
        <button onClick={toggleIsOpen}>Начать</button>
      )}

      {isOpen && (
        <>
          <h1>Vite + React = {count >= 3 ? "Love" : ""}</h1>

          <div className="logo-container">
            <img
              src="/vite.svg"
              className={`logo ${count >= 1 ? "active" : ""}`}
              alt="Vite logo"
            />
            <p>+</p>
            <img
              src="/react.svg"
              className={`logo ${count >= 2 ? "active" : ""}`}
              alt="React logo"
            />
            <p>=</p>
            <img
              src="/love.svg"
              className={`logo ${count >= 3 ? "active" : ""}`}
              alt="Love logo"
            />
          </div>

          <hr />

          <div className="card">
            <p className="count-paragraph">count is {count}</p>
            <div className="increment-buttons">
              <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
              <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
              <button onClick={() => setCount(0)}>Reset</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
