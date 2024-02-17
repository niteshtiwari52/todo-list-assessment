import { combineReducers } from "redux";

// // reducers or storage units
import task from "./Reducer/Task/task.reducer";

const rootReducer = combineReducers({
  task,
});

export default rootReducer;
