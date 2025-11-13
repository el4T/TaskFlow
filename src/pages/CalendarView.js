// src/pages/CalendarView.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TaskItem from "../components/TaskItem";

export default function CalendarView({ tasks, onUpdate, onDelete }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // verifică dacă există taskuri pe o anumită dată
  const hasTaskOnDate = (date) => {
    return tasks.some((task) => {
      if (!task.deadline) return false;
      const taskDate = new Date(task.deadline);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // taskurile pentru ziua selectată
  const filteredTasks = tasks.filter((task) => {
    if (!task.deadline) return false;
    const taskDate = new Date(task.deadline);
    return (
      taskDate.getDate() === selectedDate.getDate() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="calendar-page">
      <h2>Calendar View</h2>

      <Calendar
        value={selectedDate}
        onClickDay={setSelectedDate}
        tileContent={({ date, view }) =>
          view === "month" && hasTaskOnDate(date) ? (
            <div
              style={{
                height: "6px",
                width: "6px",
                backgroundColor: "#3f51b5",
                borderRadius: "50%",
                margin: "0 auto",
                marginTop: "2px",
              }}
            ></div>
          ) : null
        }
      />

      <h3>Tasks on {selectedDate.toLocaleDateString()}:</h3>

      {filteredTasks.length === 0 ? (
        <p className="empty">No tasks on this date.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
