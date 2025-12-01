
// src/pages/CalendarView.js
import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // funcție care transformă data în cheie (ex: "Mon Nov 11 2025")
  const dateKey = (d) => new Date(d).toDateString();

  // pre-calculăm ce zile au task-uri (pentru buline)
  const daysWithTasks = useMemo(() => {
    const set = new Set();
    tasks.forEach((t) => {
      if (t.deadline) {
        set.add(dateKey(t.deadline));
      }
    });
    return set;
  }, [tasks]);

  // task-urile pentru ziua selectată
  const tasksForDay = tasks.filter((t) => {
    if (!t.deadline) return false;
    return dateKey(t.deadline) === dateKey(selectedDate);
  });

  return (
    <div className="calendar-view">
      <h2>📅 Task Calendar</h2>

      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          // aici adăugăm bulina
          tileContent={({ date, view }) => {
            if (view !== "month") return null; // doar în view lunar
            if (daysWithTasks.has(dateKey(date))) {
              return <div className="task-dot" />;
            }
            return null;
          }}
        />
      </div>

      <div className="task-list-day">
        <h3>Tasks for {selectedDate.toDateString()}</h3>
        {tasksForDay.length === 0 ? (
          <p>No tasks for this date.</p>
        ) : (
          <ul>
            {tasksForDay.map((t) => (
              <li
                key={t.id}
                style={{
                  borderLeft: `6px solid ${t.color}`,

                  marginBottom: 8,
                  paddingLeft: 8,
                }}
              >
                <strong>{t.title}</strong> — {t.priority} Priority
                {t.description && (
                  <>
                    <br />
                    <small>{t.description}</small>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}