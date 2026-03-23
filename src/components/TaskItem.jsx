import { useDispatch } from "react-redux";
import { removeTask, toggleTaskStatus } from "../tasksSlice";

function formatDate(iso) {
  const date = new Date(iso);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function TaskItem({ task }) {
  const dispatch = useDispatch();

  return (
    <li className={`item ${task.done ? "done" : ""}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch(toggleTaskStatus(task.id))}
        />
        <span />
      </label>

      <div className="content">
        <div className="text">{task.text}</div>

        <div className="meta">
          <span className="badge">
            {task.done ? "✓ выполнено" : "○ не выполнено"}
          </span>
          <span className="date">{formatDate(task.createdAt)}</span>

          {task.tags?.length > 0 && (
            <span className="tags">
              {task.tags.map((tag) => (
                <span className="tag" key={tag}>
                  #{tag}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>

      <button
        className="iconBtn"
        onClick={() => dispatch(removeTask(task.id))}
        title="Удалить"
        type="button"
      >
        ✕
      </button>
    </li>
  );
}
