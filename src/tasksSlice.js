import { createSelector, createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "task-manager:v1";
const FILTERS = new Set(["all", "active", "done"]);

function loadTasks() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistTasks(tasks) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Ignore localStorage write errors to keep the UI responsive.
  }
}

const initialState = {
  items: loadTasks(),
  query: "",
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      prepare({ text, tags = [] }) {
        return {
          payload: {
            id: crypto.randomUUID(),
            text,
            done: false,
            createdAt: new Date().toISOString(),
            tags,
          },
        };
      },
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
    },
    toggleTaskStatus(state, action) {
      const task = state.items.find((item) => item.id === action.payload);

      if (task) {
        task.done = !task.done;
      }
    },
    removeTask(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCompletedTasks(state) {
      state.items = state.items.filter((item) => !item.done);
    },
    setTaskQuery(state, action) {
      state.query = action.payload;
    },
    setTaskFilter(state, action) {
      state.filter = FILTERS.has(action.payload) ? action.payload : "all";
    },
  },
});

export const {
  addTask,
  toggleTaskStatus,
  removeTask,
  clearCompletedTasks,
  setTaskQuery,
  setTaskFilter,
} = tasksSlice.actions;

const selectTasksState = (state) => state.tasks;

export const selectAllTasks = (state) => selectTasksState(state).items;
export const selectTaskQuery = (state) => selectTasksState(state).query;
export const selectTaskFilter = (state) => selectTasksState(state).filter;

export const selectActiveTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => !task.done)
);

export const selectCompletedTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.done)
);

export const selectTasksByFilter = createSelector(
  [
    selectTaskFilter,
    selectAllTasks,
    selectActiveTasks,
    selectCompletedTasks,
  ],
  (filter, allTasks, activeTasks, completedTasks) => {
    if (filter === "active") {
      return activeTasks;
    }

    if (filter === "done") {
      return completedTasks;
    }

    return allTasks;
  }
);

export const selectVisibleTasks = createSelector(
  [selectTasksByFilter, selectTaskQuery],
  (tasks, query) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return tasks;
    }

    return tasks.filter((task) => {
      const matchesText = task.text.toLowerCase().includes(normalizedQuery);
      const matchesTag = (task.tags ?? []).some((tag) =>
        tag.toLowerCase().includes(normalizedQuery)
      );

      return matchesText || matchesTag;
    });
  }
);

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => {
  const total = tasks.length;
  const done = tasks.filter((task) => task.done).length;
  const active = total - done;

  return { total, active, done };
});

export const selectHasCompletedTasks = createSelector(
  [selectCompletedTasks],
  (tasks) => tasks.length > 0
);

export default tasksSlice.reducer;
