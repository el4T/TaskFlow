import React, { useState, useMemo } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home({ tasks, onAdd, onDelete, onUpdate }) {
  const [editingTask, setEditingTask] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOption, setSortOption] = useState("dateAsc");

  // Submit pentru TaskForm
  const handleSubmit = (data) => {
    if (editingTask) {
      onUpdate(editingTask.id, data);
      setEditingTask(null);
    } else {
      onAdd(data);
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...tasks];

    if (statusFilter !== "All") {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== "All") {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    switch (sortOption) {
      case "dateAsc":
        result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case "dateDesc":
        result.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        break;
      case "alphaAsc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alphaDesc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [tasks, statusFilter, priorityFilter, sortOption]);

  return (
    <div>
      {/* FILTRE */}
      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Overdue">Overdue</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="dateAsc">Deadline ↑</option>
          <option value="dateDesc">Deadline ↓</option>
          <option value="alphaAsc">A → Z</option>
          <option value="alphaDesc">Z → A</option>
        </select>
      </div>

      {/* FORMULAR */}
      <TaskForm
        mode={editingTask ? "edit" : "add"}
        initialTask={editingTask}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingTask(null)}
      />

      {/* LISTA */}
      <TaskList
        tasks={filteredAndSorted}
        onEdit={(task) => setEditingTask(task)}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
}