import TaskForm from "./components/TaskForm";
import Toolbar from "./components/Toolbar";
import Stats from "./components/Stats";
import TaskList from "./components/TaskList";
import "./styles.css";

export default function App() {
  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Менеджер задач</h1>
        <TaskForm />
        <Toolbar />
        <Stats />
        <TaskList />
      </div>
    </div>
  );
}
