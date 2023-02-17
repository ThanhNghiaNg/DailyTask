import { useContext } from "react";
import TaskContext from "../../store/TaskProvider";
import classes from "./TaskList.module.css";
import TaskItem from "./TaskItem";
import cardClasses from "../UI/Card.module.css";

function TaskList() {
  const taskCtx = useContext(TaskContext);
  let taskListContent = <p className="fs-3 text-center fw-bold">You have no task!</p>;
  // console.log(taskCtx.tasks);
  if (taskCtx.tasks.length > 0) {
    taskListContent = taskCtx.tasks.map((task, id) => (
      <TaskItem key={id} task={task} />
    ));
  }
  return (
    <ul className={`${cardClasses.card} ${classes.list}`}>{taskListContent}</ul>
  );
}

export default TaskList;
