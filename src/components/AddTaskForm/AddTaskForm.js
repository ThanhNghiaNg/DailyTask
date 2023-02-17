import { useContext, useRef, useState } from "react";
import TaskContext from "../../store/TaskProvider";
import classes from "./AddTaskForm.module.css";
import cardClasses from "../UI/Card.module.css";

function AddTaskForm() {
  const [taskName, setTaskName] = useState("");
  const taskCtx = useContext(TaskContext);
  const changeTaskNameHandler = (event) => {
    setTaskName(event.target.value);
  };
  const onAddTaskHandler = (event) => {
    event.preventDefault();
    if (!taskName) {
      return alert("You must not leave the task empty!");
    }
    taskCtx.addTask(taskName);
    setTaskName("");
  };
  return (
    <form
      className={`${cardClasses.card} ${classes.form}`}
      onSubmit={onAddTaskHandler}
    >
      <input
        type={"text"}
        placeholder={"Thêm nhiệm vụ"}
        value={taskName}
        onChange={changeTaskNameHandler}
        className="form-control"
      />
      <button type="submit" className="btn btn-success">
        Thêm
      </button>
    </form>
  );
}

export default AddTaskForm;
