import { useEffect, useState } from "react";
import "./App.css";

import CurrentDay from "./CurrentDate";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [count, setCount] = useState(0);
  const [dupllicateError, setDuplicate] = useState("");
  const [errors, setError] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      setTime(
        currentDate.getHours().toString().padStart(2, '0') +
        ":" +
        currentDate.getMinutes().toString().padStart(2, '0') +
        ":" +
        currentDate.getSeconds().toString().padStart(2, '0')
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const deleteitem = (item) => {
    setToDos(toDos.filter((obj) => obj.id !== item));
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">ToDo List</h1>
        <CurrentDay />
        <p className="clock">{time}</p>
      </div>

      <div className="input-container">
        <input
          className="todo-input"
          value={toDo}
          onChange={(e) => {
            setToDo(e.target.value);
            setError("");
            setDuplicate("");
          }}
          type="text"
          placeholder="🖊️ Add item..."
        />

        <button
          className="add-button"
          type="button"
          onClick={() => {
            const duplicate = toDos.some((obj) => obj.text === toDo);
            if (duplicate || toDo.trim() === "") {
              if (toDo.trim() === "") setError("Please input ToDo");
              if (duplicate) setDuplicate("The ToDo already exists");
            } else {
              setToDos([
                ...toDos,
                { id: Date.now(), text: toDo, status: false },
              ]);
              setCount(count + 1);
              setError("");
              setDuplicate("");
              setToDo("");
            }
          }}
        >
          +
        </button>
      </div>

      <p className="count">Tasks: {count}</p>
      <p className="error">{errors || dupllicateError}</p>

      <div className="todo-list">
        {toDos.map((obj) => (
          <div className="todo-item" key={obj.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={obj.status}
                onChange={(e) => {
                  setToDos(
                    toDos.map((obj2) =>
                      obj2.id === obj.id
                        ? { ...obj2, status: e.target.checked }
                        : obj2
                    )
                  );
                }}
              />
              <p className={obj.status ? "completed-text" : "todo-text"}>{obj.text}</p>
            </div>
            <div className="right">
              <i
                className="fas fa-times delete-icon"
                onClick={() => {
                  deleteitem(obj.id);
                  setCount(count - 1);
                  setError("");
                  setDuplicate("");
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>

      <div className="completed-list">
        {toDos.map(
          (obj, i) =>
            obj.status && (
              <div className="completed-item" key={i}>
                <h3>{obj.text}</h3>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default App;