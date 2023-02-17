import "./App.css";
import Layout from "./components/Layout/Layout";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import TaskList from "./components/TaskList/TaskList";

function App() {
  return (
    <Layout>
      <AddTaskForm />
      <TaskList />
    </Layout>
  );
}

export default App;
