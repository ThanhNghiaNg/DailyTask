import { useContext, useRef } from "react";
import TaskContext from "../../store/TaskProvider";
import classes from "./AddTaskForm.module.css";

function AddTaskForm() {
  const taskRef = useRef();
  const taskCtx = useContext(TaskContext);
  const onAddTaskHandler = () => {
    const task = taskRef.current.value;
    if (!task) {
      alert("You must not leave the task empty!");
    }
    taskCtx.addTask(task);
  };
  return (
    <form className={classes.form} onSubmit={onAddTaskHandler}>
      <input type={"text"} placeholder={"Thêm nhiệm vụ"} ref={taskRef} />
      <button type="submit">Thêm</button>
    </form>
  );
}

export default AddTaskForm;
