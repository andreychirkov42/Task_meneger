import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import Toolbar from "./components/Toolbar";
import Stats from "./components/Stats";
import TaskList from "./components/TaskList";
import "./styles.css";

const STORAGE_KEY = "task-manager:v1";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask({ text, tags }) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      done: false,
      createdAt: new Date().toISOString(),
      tags: tags ?? [],
    };

    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleDone(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tasks.filter((t) => {
      const matchesQuery =
        !q ||
        t.text.toLowerCase().includes(q) ||
        (t.tags || []).some((tag) => tag.toLowerCase().includes(q));

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !t.done) ||
        (filter === "done" && t.done);

      return matchesQuery && matchesFilter;
    });
  }, [tasks, query, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const active = total - done;
    return { total, active, done };
  }, [tasks]);

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Менеджер задач</h1>

        <TaskForm onAdd={addTask} />

        <Toolbar
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          hasCompleted={stats.done > 0}
        />

        <Stats {...stats} />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleDone}
          onRemove={removeTask}
        />

        {tasks.length === 0 && (
          <p className="muted">Задачи не найдены</p>
        )}
      </div>
    </div>
  );
}
