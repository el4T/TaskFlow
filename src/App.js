// App.js - CU FIREBASE
import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import CalendarView from "./pages/CalendarView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getCurrentUser, logoutUser } from "./utils/auth";
import { subscribeToTasks, addTask, updateTask, deleteTask } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("home");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verifică dacă user-ul este logat
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  // Ascultă pentru task-uri în timp real
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToTasks(user.uid, (newTasks) => {
        setTasks(newTasks);
      });
      return () => unsubscribe();
    } else {
      setTasks([]);
    }
  }, [user]);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleAddTask = async (task) => {
    const result = await addTask(task, user.uid);
    if (!result.success) {
      alert("Error adding task: " + result.error);
    }
  };

  const handleDeleteTask = async (id) => {
    const result = await deleteTask(id);
    if (!result.success) {
      alert("Error deleting task: " + result.error);
    }
  };

  const handleUpdateTask = async (id, partial) => {
    const result = await updateTask(id, partial);
    if (!result.success) {
      alert("Error updating task: " + result.error);
    }
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setUser(null);
      setTasks([]);
    } else {
      alert("Error logging out: " + result.error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

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
        onLogout={handleLogout}
      />

      <div className="top-bar">
        <img src="TaskFlowLogo.png" alt="Taskflow logo" className="top-logo" />
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
          onAdd={handleAddTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      ) : (
        <CalendarView tasks={tasks} />
      )}
    </div>
  );
}

export default App;