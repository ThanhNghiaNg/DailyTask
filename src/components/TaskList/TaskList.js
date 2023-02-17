import { useContext } from "react";
import TaskContext from "../../store/TaskProvider";
import classes from "./TaskList.module.css";
import TaskItem from "./TaskItem";

function TaskList() {
  const taskCtx = useContext(TaskContext);
  let taskListContent = <div>You have no task!</div>;
  // console.log(taskCtx.tasks);
  if (taskCtx.tasks.length > 0) {
    taskListContent = taskCtx.tasks.map((task, id) => (
      <TaskItem key={id} task={task} />
    ));
  }
  return <ul className={classes.list}>{taskListContent}</ul>;
}

export default TaskList;
