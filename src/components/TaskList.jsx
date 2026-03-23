import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { selectAllTasks, selectVisibleTasks } from "../tasksSlice";

export default function TaskList() {
  const tasks = useSelector(selectVisibleTasks);
  const allTasks = useSelector(selectAllTasks);

  return (
    <ul className="list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {tasks.length === 0 && (
        <li className="muted">
          {allTasks.length === 0
            ? "Пока нет задач. Добавьте первую выше."
            : "Ничего не найдено по фильтру или поиску."}
        </li>
      )}
    </ul>
  );
}
