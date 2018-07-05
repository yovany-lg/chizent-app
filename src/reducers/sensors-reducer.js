import { RECEIVE_SENSOR_DATA, FETCH_SENSORS_DATA } from '../actions/sensors-actions';

const initialState = {};

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
  let sensorData;
  switch (action.type) {
    case FETCH_SENSORS_DATA:
      return {
        ...initialState,
      };
    case RECEIVE_SENSOR_DATA:
      sensorData = mergeSensorData(state[action.sensor], action.data);
      return {
        ...state,
        [action.sensor]: {
          ...sensorData,
          current: sensorData.values[sensorData.values.length - 1],
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
