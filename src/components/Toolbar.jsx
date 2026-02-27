export default function Toolbar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}) {
  return (
    <div className="toolbar">
      <input
        className="input"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Поиск по тексту или тегам…"
      />

      <div className="toolbarRight">
        <select
          className="select"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="done">Выполненные</option>
        </select>

        <button
          className="btn btnGhost"
          onClick={onClearCompleted}
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
