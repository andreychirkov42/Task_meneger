import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onRemove }) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
      {tasks.length === 0 && (
        <li className="muted">Ничего не найдено по фильтру/поиску.</li>
      )}
    </ul>
  );
}
