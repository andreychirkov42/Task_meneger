import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [tagsText, setTagsText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onAdd({ text, tags });
    setText("");
    setTagsText("");
  }

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу…"
      />

      <input
        className="input"
        value={tagsText}
        onChange={(e) => setTagsText(e.target.value)}
        placeholder="Теги (через запятую), напр. учеба,дом"
      />

      <button className="btn" type="submit">
        Добавить
      </button>
    </form>
  );
}
