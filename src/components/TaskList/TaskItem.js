import { useContext } from "react";
import TaskContext from "../../store/TaskProvider";
import classes from "./TaskItem.module.css";

function TaskItem({ task }) {
  const taskCtx = useContext(TaskContext);
  const checkedTaskHandler = (event) => {
    taskCtx.checkedDoneTask(task.id);
  };
  const deleteTaskHandler = (event) => {
    taskCtx.removeTask(task.id);
  };

  const updateTaskHandler = (event) => {};

  return (
    <li className={`${classes.item} ${task.completeDate ? classes.done : ""}`}>
      <p onClick={checkedTaskHandler}>{task.name}</p>
      <div className={classes["actions-control"]}>
        <button onClick={deleteTaskHandler}>Delete</button>
        <button onClick={updateTaskHandler}>Edit</button>
      </div>
    </li>
  );
}

export default TaskItem;
