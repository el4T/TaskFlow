// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { loadTasks, saveTasks } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => setTasks((prev) => [task, ...prev]);
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const updateTask = (id, partial) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...partial } : t)));

  return (
    <div className="App">
      <h1>TaskFlow</h1>
      <Home tasks={tasks} onAdd={addTask} onDelete={deleteTask} onUpdate={updateTask} />
    </div>
  );
}

export default App;
