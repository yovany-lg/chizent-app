import { RECEIVE_MOTORS_DATA, FETCH_MOTORS_DATA } from '../actions/motors-actions';

const initialState = {};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOTORS_DATA:
      return {
        ...initialState,
      };
    case RECEIVE_MOTORS_DATA:
      return {
        ...state,
        [action.motor]: action.value,
      };
    default:
      return state;
  }
};

export default mainReducer;
