import {
  CALIBRATE_NEXT_STEP,
  CALIBRATE_RESET,
  CALIBRATE_REQUEST_CALPOINT,
  CALIBRATE_RECEIVE_CALPOINT,
} from '../actions/calibrate-actions';

export const stepName = ['ph7', 'ph4', 'ph10'];

const initialState = {
  step: 0,
  calPoint: undefined,
  fetching: false,
  completed: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALIBRATE_NEXT_STEP:
      return {
        step: state.step < 3 ? state.step + 1 : 0,
        calPoint: stepName[state.step],
        fetching: false,
        completed: false,
      };
    case CALIBRATE_RESET:
      return {
        ...initialState,
      };
    case CALIBRATE_REQUEST_CALPOINT:
      return {
        ...state,
        fetching: true,
      };
    case CALIBRATE_RECEIVE_CALPOINT:
      return {
        ...state,
        fetching: false,
        completed: true,
      };
    default:
      return state;
  }
};

export default mainReducer;
