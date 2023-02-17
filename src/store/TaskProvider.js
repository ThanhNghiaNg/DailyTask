import React, { useReducer } from "react";

const initState = {
  tasks: JSON.parse(localStorage.getItem("TASKS")) || [],
  autoId: JSON.parse(localStorage.getItem("AUTO_ID")) || 0,
};
const TaskContext = React.createContext({
  tasks: [],
  autoId: 0,
  addTask: (task) => {},
  removeTask: (id) => {},
  updateTask: (id, info) => {},
  checkedDoneTask: (id) => {},
});

const taskReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTasks = [...state.tasks];
    updatedTasks.push({
      id: state.autoId,
      name: action.task,
      createdDate: new Date(),
      completeDate: null,
    });
    const updatedAutoId = state.autoId + 1;
    localStorage.setItem("TASKS", JSON.stringify(updatedTasks));
    localStorage.setItem("AUTO_ID", JSON.stringify(updatedAutoId));
    return { tasks: updatedTasks, autoId: updatedAutoId };
  }

  if (action.type === "REMOVE") {
    const updatedTasks = state.tasks.filter((task) => task.id !== action.id);
    localStorage.setItem("TASKS", JSON.stringify(updatedTasks));
    return { tasks: updatedTasks, autoId: state.autoId };
  }
  // Keep
  if (action.type === "UPDATE") {
    return { ...state };
  }
  //
  if (action.type === "DONE") {
    const updatedTasks = [...state.tasks];
    const idx = updatedTasks.findIndex(
      (task) => Number(task.id) === Number(action.id)
    );
    
    updatedTasks[idx].completeDate =
      updatedTasks[idx].completeDate === null
        ? new Date()
        : updatedTasks[idx].completeDate;
    
    localStorage.setItem("TASKS", JSON.stringify(updatedTasks));
    return { tasks: updatedTasks, autoId: state.autoId };
  }
  return { ...state };
};

export function TaskProvider(props) {
  const [tasks, dispatch] = useReducer(taskReducer, initState);

  const addTaskHandler = (task) => {
    dispatch({ type: "ADD", task });
  };
  const removeTaskHandler = (id) => {
    dispatch({ type: "REMOVE", id });
  };
  const updateTaskHandler = (id, info) => {
    dispatch({ type: "UPDATE", id, info });
  };
  const checkedDoneTaskHandler = (id) => {
    dispatch({ type: "DONE", id });
  };

  const value = {
    tasks: tasks.tasks,
    autoId: tasks.autoId,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    updateTask: updateTaskHandler,
    checkedDoneTask: checkedDoneTaskHandler,
  };
  return (
    <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>
  );
}

export default TaskContext;
