import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import CalendarView from "./pages/CalendarView";
import { loadTasks, saveTasks } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [page, setPage] = useState("home");
  const [isLightMode, setIsLightMode] = useState(false); // dark default

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const toggleTheme = () => setIsLightMode(prev => !prev);

  const addTask = task => setTasks(prev => [task, ...prev]);
  const deleteTask = id => setTasks(prev => prev.filter(t => t.id !== id));
  const updateTask = (id, partial) =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...partial } : t)));

  return (
    <div className={`App ${isLightMode ? "light" : "dark"}`}>
      <h1>TaskFlow</h1>

      <button className="theme_button" onClick={toggleTheme}>
        {isLightMode ? "Dark Mode" : "Light Mode"}
      </button>

      <div className="nav">
        <button onClick={() => setPage("home")}>List</button>
        <button onClick={() => setPage("calendar")}>Calendar</button>
      </div>

      {page === "home" ? (
        <Home tasks={tasks} onAdd={addTask} onDelete={deleteTask} onUpdate={updateTask} />
      ) : (
        <CalendarView tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
      )}
    </div>
  );
}

export default App;
