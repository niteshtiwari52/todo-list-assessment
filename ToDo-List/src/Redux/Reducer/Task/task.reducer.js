import {
  CREATE_TASK,
  DELETE_TASK,
  FETCH_TASK,
  STATUS_TASK,
  UPDATE_TASK,
} from "./task.type";

const initialState = {};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: action.payload,
      };

    case FETCH_TASK:
      return {
        ...state,
        tasks: action.payload,
      };

    case UPDATE_TASK:
      return {
        ...state,
        ...action.payload,
      };
    case STATUS_TASK:
      return {
        ...state,
        ...action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default taskReducer;
