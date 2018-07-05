import moment from 'moment';

export const RECEIVE_SENSOR_DATA = 'sensors/receive';
export const FETCH_SENSORS_DATA = 'sensors/fetch';

let client;

const receiveSensorData = (sensor, data) => ({
  type: RECEIVE_SENSOR_DATA,
  sensor,
  data,
});

export const fetchSensorsData = () => ({
  type: FETCH_SENSORS_DATA,
});

const timeFormat = timestamp => moment(timestamp).format('HH:mm:ss');

export const receiveSensorsData = (sensors, metadata) => dispatch =>
  Object.keys(sensors)
    .map(key =>
      dispatch(receiveSensorData(key, { value: sensors[key], label: timeFormat(metadata[key]) })));

const sensorData = (data) => {
  const newData = {
    value: [],
    label: [],
  };
  for (let i = 0; i < data.length; i++) {
    newData.value.push(data[i].value);
    newData.label.push(data[i].timestamp);
  }
  return newData;
};

export const getSensorsData = ({ sensors }) => (dispatch) => {
  if (!sensors) {
    return;
  }
  Object.keys(sensors).map((key) => {
    // const topic = `superToi/sensors/${key}/update`;
    const action = receiveSensorData(key, sensorData(sensors[key]));
    return dispatch(action);
  });
};

export const initClient = (mqttClient) => {
  client = mqttClient;
};
