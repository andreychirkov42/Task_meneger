export default function Stats({ total, active, done }) {
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
