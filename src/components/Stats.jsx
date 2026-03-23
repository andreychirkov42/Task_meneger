import { useSelector } from "react-redux";
import { selectTaskStats } from "../tasksSlice";

export default function Stats() {
  const { total, active, done } = useSelector(selectTaskStats);

  return (
    <div className="stats">
      <div className="pill">
        Всего: <b>{total}</b>
      </div>
      <div className="pill">
        Активных: <b>{active}</b>
      </div>
      <div className="pill">
        Выполненных: <b>{done}</b>
      </div>
    </div>
  );
}
