# Task Manager + Redux

В проекте локальное состояние заменено на Redux Toolkit: добавлены `store` и `tasksSlice`, а компоненты переведены на `useSelector` и `dispatch`.

Редьюсеры: `addTask`, `toggleTaskStatus`, `removeTask`, `clearCompletedTasks`, `setTaskQuery`, `setTaskFilter`.

Селекторы: `selectAllTasks`, `selectActiveTasks`, `selectCompletedTasks`, `selectTaskQuery`, `selectTaskFilter`, `selectTasksByFilter`, `selectVisibleTasks`, `selectTaskStats`, `selectHasCompletedTasks`.
