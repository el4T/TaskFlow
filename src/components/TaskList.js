
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onUpdate, onEdit }) {
  if (!tasks.length) return <p className="empty">No tasks yet. Add your first task above.</p>;

  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onEdit={() => onEdit(t)}
        />
      ))}
    </ul>
  );
}