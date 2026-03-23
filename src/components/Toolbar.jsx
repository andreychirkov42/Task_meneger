import { useDispatch, useSelector } from "react-redux";
import {
  clearCompletedTasks,
  selectHasCompletedTasks,
  selectTaskFilter,
  selectTaskQuery,
  setTaskFilter,
  setTaskQuery,
} from "../tasksSlice";

export default function Toolbar() {
  const dispatch = useDispatch();
  const query = useSelector(selectTaskQuery);
  const filter = useSelector(selectTaskFilter);
  const hasCompleted = useSelector(selectHasCompletedTasks);

  return (
    <div className="toolbar">
      <input
        className="input"
        value={query}
        onChange={(event) => dispatch(setTaskQuery(event.target.value))}
        placeholder="Поиск по тексту или тегам..."
      />

      <div className="toolbarRight">
        <select
          className="select"
          value={filter}
          onChange={(event) => dispatch(setTaskFilter(event.target.value))}
        >
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="done">Выполненные</option>
        </select>

        <button
          className="btn btnGhost"
          onClick={() => dispatch(clearCompletedTasks())}
          disabled={!hasCompleted}
          type="button"
          title="Удалить все выполненные"
        >
          Очистить выполненные
        </button>
      </div>
    </div>
  );
}
