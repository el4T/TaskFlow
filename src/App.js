import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import CalendarView from "./pages/CalendarView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getLoggedUser, logoutUser } from "./utils/auth";
import { loadTasks, saveTasks } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [view, setView] = useState("home");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(getLoggedUser());
  const [showRegister, setShowRegister] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => saveTasks(tasks), [tasks]);
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addTask = (task) => setTasks((prev) => [task, ...prev]);
  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));
  const updateTask = (id, partial) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...partial } : t))
    );

  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login
        onSwitchToRegister={() => setShowRegister(true)}
        onLoginSuccess={(u) => setUser(u)}
      />
    );
  }

  return (
    <div className="App">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={theme === "dark"}
        toggleDarkMode={() => setTheme(theme === "light" ? "dark" : "light")}
        user={user}
        onLogout={() => {
          logoutUser();
          setUser(null);
        }}
      />

      <div className="top-bar">
        <img src="TaskFlowLogo.png" alt="Taskflow logo" class="top-logo"></img>
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <h1>TaskFlow</h1>
      </div>

      <div className="view-toggle">
        <button
          onClick={() => setView("home")}
          className={view === "home" ? "active" : ""}
        >
          📝 List View
        </button>
        <button
          onClick={() => setView("calendar")}
          className={view === "calendar" ? "active" : ""}
        >
          📅 Calendar View
        </button>
      </div>

      {view === "home" ? (
        <Home
          tasks={tasks}
          onAdd={addTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      ) : (
        <CalendarView tasks={tasks} />
      )}
    </div>
  );
}

export default App;