import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../tasksSlice";

export default function TaskForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [tagsText, setTagsText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    dispatch(addTask({ text: trimmedText, tags }));
    setText("");
    setTagsText("");
  }

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input
        className="input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Введите задачу..."
      />

      <input
        className="input"
        value={tagsText}
        onChange={(event) => setTagsText(event.target.value)}
        placeholder="Теги через запятую, например: учеба, дом"
      />

      <button className="btn" type="submit">
        Добавить
      </button>
    </form>
  );
}
