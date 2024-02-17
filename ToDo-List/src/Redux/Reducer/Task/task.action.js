// redux type
import {
  CREATE_TASK,
  DELETE_TASK,
  FETCH_TASK,
  STATUS_TASK,
  UPDATE_TASK,
} from "./task.type";

// Action for task creating
export const createTask = (taskData) => async (dispatch) => {
  try {
    const newTaskData = { ...taskData, id: Date.now(), isCompleted: false };
    // Get existing tasks from localStorage or initialize an empty array
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Add the new task to the beginning of the array
    existingTasks.unshift(newTaskData);

    // Save the updated tasks back to localStorage
    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    return dispatch({ type: CREATE_TASK, payload: taskData });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// Action for task fetching
export const getTask = () => async (dispatch) => {
  try {
    // Get tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Dispatch action to update Redux store
    dispatch({ type: FETCH_TASK, payload: tasks });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};

// Action for updating task
export const updateTask = (data, id) => async (dispatch) => {
  try {
    // Get existing tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the index of the task to be updated
    const index = existingTasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      // Update the task
      existingTasks[index] = { ...existingTasks[index], ...data };

      // Save the updated tasks back to localStorage
      localStorage.setItem("tasks", JSON.stringify(existingTasks));

      // Dispatch action to update Redux store
      dispatch({ type: UPDATE_TASK, payload: existingTasks[index] });
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
// Action for the status completion
export const updateTaskStatus = (data, id) => async (dispatch) => {
  try {
    // Call updateTask action to update task status
    dispatch(updateTask(data, id));

    // Dispatch action to update Redux store
    dispatch({ type: STATUS_TASK, payload: data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// Action for deleting task
export const deleteTask = (id) => async (dispatch) => {
  try {
    // Get existing tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Filter out the task to be deleted
    const updatedTasks = existingTasks.filter((task) => task.id !== id);

    // Save the updated tasks back to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return dispatch({ type: DELETE_TASK, payload: updatedTasks });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};
