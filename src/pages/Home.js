// src/pages/Home.js
import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home({ tasks, onAdd, onDelete, onUpdate }) {
  return (
    <div className="container">
      <TaskForm onAdd={onAdd} />
      <TaskList tasks={tasks} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
}
