import {
  RECEIVE_TASK,
  RESET_TASK,
  REQUEST_TASK,
} from '../actions/process-actions';

const initialState = {
  running: false,
  iFetching: false,
};

const mainReducer = (state = initialState, action) => {
  // console.log('Task reducer:', action);
  switch (action.type) {
    case RECEIVE_TASK:
      return {
        running: action.running,
        phValue: action.phValue,
        tempValue: action.tempValue,
        time: action.time,
        iFetching: false,
      };
    case REQUEST_TASK:
      return {
        ...state,
        iFetching: true,
      };
    case RESET_TASK:
      return { ...initialState };
    default:
      return state;
  }
};

export default mainReducer;
