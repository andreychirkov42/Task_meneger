import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { persistTasks } from "./tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

let previousTasks = store.getState().tasks.items;

store.subscribe(() => {
  const currentTasks = store.getState().tasks.items;

  if (currentTasks === previousTasks) {
    return;
  }

  previousTasks = currentTasks;
  persistTasks(currentTasks);
});
