// src/components/TaskItem.js
import React, { useMemo } from "react";

function badgeColor(status) {
  switch (status) {
    case "Completed": return "#2e7d32";
    case "Canceled":  return "#616161";
    case "Overdue":   return "#c62828";
    default:          return "#1565c0"; // Upcoming
  }
}

export default function TaskItem({ task, onDelete, onUpdate }) {
  const isOverdue = useMemo(() => {
    if (!task.deadline) return false;
    const due = new Date(task.deadline).getTime();
    return due < Date.now() && !["Completed", "Canceled"].includes(task.status);
  }, [task.deadline, task.status]);

  const effectiveStatus = isOverdue ? "Overdue" : task.status;

  return (
    <li className="task-item" style={{ borderLeft: `8px solid ${task.color}` }}>
      <div className="task-main">
        <div className="title-row">
          <h3>{task.title}</h3>
          <span className="badge" style={{ background: badgeColor(effectiveStatus) }}>
            {effectiveStatus}
          </span>
        </div>

        {task.description && <p className="desc">{task.description}</p>}

        <div className="meta">
          {task.deadline && <span>Deadline: {new Date(task.deadline).toLocaleString()}</span>}
          <span>Priority: {task.priority}</span>
        </div>
      </div>

      <div className="actions">
        {task.status !== "Completed" && (
          <button onClick={() => onUpdate(task.id, { status: "Completed" })}>
            Mark Completed
          </button>
        )}
        {task.status !== "Canceled" && (
          <button className="ghost" onClick={() => onUpdate(task.id, { status: "Canceled" })}>
            Cancel
          </button>
        )}
        <button className="danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
