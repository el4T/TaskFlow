// Importăm React și hooks: useEffect pentru efecte secundare și useState pentru state intern
import React, { useEffect, useState } from "react";
// generateId este o funcție custom din utilități pentru a crea ID-uri unice la task-uri
import { generateId } from "../utils/storage";

// Un array constant cu opțiunile de prioritate
const PRIORITIES = ["High", "Medium", "Low"];

// Componenta principală TaskForm — folosită atât pentru "add", cât și pentru "edit"
export default function TaskForm({ mode = "add", initialTask, onSubmit, onCancelEdit }) {

  // Declarăm state pentru toate câmpurile formularului
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [color, setColor] = useState("#3f51b5"); // culoarea default
  const [priority, setPriority] = useState("Medium"); // default medium

  // useEffect rulează când se schimbă `initialTask`
  useEffect(() => {
    if (initialTask) {
      // Dacă edităm, precompletăm câmpurile cu datele taskului
      setTitle(initialTask.title || "");
      setDesc(initialTask.description || "");
      setDeadline(initialTask.deadline || "");
      setColor(initialTask.color || "#3f51b5");
      setPriority(initialTask.priority || "Medium");
    } else {
      // Dacă adăugăm un task nou, resetăm toate câmpurile
      setTitle(""); setDesc(""); setDeadline(""); setColor("#3f51b5"); setPriority("Medium");
    }
  }, [initialTask]); // se re-execută numai dacă initialTask se schimbă

  // Funcția apelată când userul apasă submit pe formular
  const handleSubmit = (e) => {
    e.preventDefault(); // prevenim refresh-ul paginii

    // Dacă titlul este gol sau doar spații, nu facem submit
    if (!title.trim()) return;

    // Structura comună pentru add/edit
    const base = {
      title: title.trim(),
      description: desc.trim(),
      deadline: deadline || null, // dacă nu există, punem null
      color,
      priority,
    };

    if (mode === "add") {
      // Data creării taskului
      const nowISO = new Date().toISOString();

      // Status-ul taskului depinde de deadline comparat cu timpul curent
      const status = deadline && new Date(deadline).getTime() < Date.now() ? "Overdue" : "Upcoming"; // deadline viitor sau lipsă

      // Apelăm onSubmit cu toate datele necesare pt un task nou
      onSubmit({
        id: generateId(), // generăm un ID unic
        ...base, // adăugăm titlu, descriere, deadline, etc
        status,
        createdAt: nowISO,
      });

      // Resetăm câmpurile după adăugare
      setTitle(""); setDesc(""); setDeadline(""); setColor("#3f51b5"); setPriority("Medium");
    } else {
      // În modul edit: întoarcem doar câmpurile modificate; status-ul rămâne cum e
      onSubmit(base);
    }
  };

  return (
    // Formularul principal
    <form className="task-form" onSubmit={handleSubmit}>

      <div className="row"> 
        
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required // nu permite submit fără titlu
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