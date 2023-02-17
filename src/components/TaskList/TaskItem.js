import { useContext, useRef, useState } from "react";
import TaskContext from "../../store/TaskProvider";
import classes from "./TaskItem.module.css";

function TaskItem({ task }) {
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(!!task.completeDate);
  const [toggleActions, setToggleActions] = useState(false);
  const taskCtx = useContext(TaskContext);
  const taskRef = useRef();
  const checkedTaskHandler = (event) => {
    taskCtx.checkedDoneTask(task.id);
  };
  const deleteTaskHandler = (event) => {
    event.stopPropagation();
    taskCtx.removeTask(task.id);
  };

  const editTaskHandler = (event) => {
    event.stopPropagation();
    setEdit(true);
  };
  const onChangeStatus = (event) => {
    setDone(!!event.target.value);
  };
  const toggleActionsHandler = (event) => {
    event.stopPropagation();
    setToggleActions((prev) => !prev);
  };
  const updateTaskHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const taskValue = taskRef.current.value;
    if (!taskValue) {
      return alert("Cannot leave task name empty!");
    }
    setEdit(false);
    setToggleActions(false);
    taskCtx.updateTask(task.id, { name: taskValue, done: done });
  };

  return (
    <>
      {!edit && (
        <li
          className={`${classes.item} ${task.completeDate ? classes.done : ""}`}
          onClick={checkedTaskHandler}
        >
          <p>{task.name}</p>

          <div className={classes["actions-control"]}>
            {toggleActions && (
              <>
                <button onClick={deleteTaskHandler} className="btn btn-danger">
                  Xoá
                </button>
                <button onClick={editTaskHandler} className="btn btn-info">
                  Chỉnh sửa
                </button>
              </>
            )}
            <i class="fa-solid fa-bars" onClick={toggleActionsHandler}></i>
          </div>
        </li>
      )}
      {edit && (
        <li className={`${classes.item} ${classes.update}`}>
          <form className={`${classes.form}`} onSubmit={updateTaskHandler}>
            <input
              type={"text"}
              placeholder={"Cập nhật nhiệm vụ"}
              defaultValue={task.name}
              ref={taskRef}
              className="form-control"
            />
            <select name="checked" onChange={onChangeStatus}>
              <option value={"true"} selected={!!task.completeDate}>
                Đã hoàn thành
              </option>
              <option value={""} selected={task.completeDate ? false : true}>
                Chưa hoàn thành
              </option>
            </select>
            <button type="submit" className="btn btn-secondary">
              Cập nhật
            </button>
          </form>
        </li>
      )}
    </>
  );
}

export default TaskItem;
