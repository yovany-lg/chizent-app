import { RECEIVE_TASK, RESET_TASK } from '../actions/process-actions';

const initialState = {
  running: false,
};

const initialSensorState = {
  current: 'value',
  values: [],
  labels: [], // timestamps
};

const mergeSensorData = (prevData = initialSensorState, { value, label }) => {
  const result = {};
  const values = prevData ? prevData.values.concat(value) : [...value];
  result.values = values.length <= 100 ? values : values.slice(values.length - 100, values.length);
  const labels = prevData ? prevData.labels.concat(label) : [...label];
  result.labels = labels.length <= 100 ? labels : labels.slice(labels.length - 100, labels.length);
  return result;
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
      };
    case RESET_TASK:
      return { ...initialState };
    default:
      return state;
  }
};

export default mainReducer;
