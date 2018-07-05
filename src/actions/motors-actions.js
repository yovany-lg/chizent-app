export const RECEIVE_MOTORS_DATA = 'motors/receive';
export const FETCH_MOTORS_DATA = 'motors/fetch';

const receiveMotorData = (motor, value) => ({
  type: RECEIVE_MOTORS_DATA,
  motor,
  value,
});

export const fetchMotorsData = () => ({
  type: FETCH_MOTORS_DATA,
});

export const receiveMotorsData = (motors, metadata) => dispatch =>
  Object.keys(motors)
    .map(key => dispatch(receiveMotorData(key, motors[key])));
