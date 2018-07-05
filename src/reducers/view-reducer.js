import { CHANGE_VIEW, RESET_VIEW } from '../actions/view-actions';

const initialState = {
  view: 'main',
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        view: action.view,
      };
    case RESET_VIEW:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default mainReducer;
