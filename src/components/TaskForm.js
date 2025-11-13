/* src/components/TaskForm.js
import React, { useState } from "react";
import { generateId } from "../utils/storage";

const PRIORITIES = ["High", "Medium", "Low"];

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [color, setColor] = useState("#3f51b5");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const task = {
      id: generateId(),
      title: title.trim(),
      description: desc.trim(),
      deadline: deadline || null, // "YYYY-MM-DDTHH:MM"
      color,
      priority,                    // High | Medium | Low
      status: "Upcoming",          // default, vom ajusta Overdue automat la afișare
      createdAt: new Date().toISOString(),
    };

    onAdd(task);

    setTitle(""); setDesc(""); setDeadline("");
    setColor("#3f51b5"); setPriority("Medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="row">
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={3}
      />

      <div className="row">
        <label className="color-picker">
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p} Priority</option>
          ))}
        </select>

        <button type="submit">Add Task</button>
      </div>
    </form>
  );
}

*/

import React, { useEffect, useState } from "react";
import { generateId } from "../utils/storage";

const PRIORITIES = ["High", "Medium", "Low"];

export default function TaskForm({ mode = "add", initialTask, onSubmit, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [color, setColor] = useState("#3f51b5");
  const [priority, setPriority] = useState("Medium");

  // când intrăm în modul edit, precompletăm câmpurile
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDesc(initialTask.description || "");
      setDeadline(initialTask.deadline || "");
      setColor(initialTask.color || "#3f51b5");
      setPriority(initialTask.priority || "Medium");
    } else {
      // reset la modul add
      setTitle(""); setDesc(""); setDeadline(""); setColor("#3f51b5"); setPriority("Medium");
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const base = {
      title: title.trim(),
      description: desc.trim(),
      deadline: deadline || null,
      color,
      priority,
    };

    if (mode === "add") {
      const nowISO = new Date().toISOString();
      const status = deadline && new Date(deadline).getTime() < Date.now() ? "Overdue" : "Upcoming";
      onSubmit({
        id: generateId(),
        ...base,
        status,
        createdAt: nowISO,
      });
      setTitle(""); setDesc(""); setDeadline(""); setColor("#3f51b5"); setPriority("Medium");
    } else {
      // edit -> returnăm doar câmpurile ce se schimbă; status-ul rămâne cum e
      onSubmit(base);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="row">
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={deadline || ""}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={3}
      />

      <div className="row">
        <label className="color-picker">
          Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p} Priority</option>
          ))}
        </select>

        <button type="submit">{mode === "edit" ? "Save changes" : "Add Task"}</button>
        {mode === "edit" && (
          <button type="button" className="ghost" onClick={onCancelEdit}>
            Cancel edit
          </button>
        )}
      </div>
    </form>
  );
}