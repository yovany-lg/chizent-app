export const CALIBRATE_NEXT_STEP = 'calibrate/next_step';
export const CALIBRATE_REQUEST_CALPOINT = 'calibrate/request/calPoint';
export const CALIBRATE_RECEIVE_CALPOINT = 'calibrate/receive/calPoint';
export const CALIBRATE_RESET = 'calibrate/reset';

export const nextStep = () => ({
  type: CALIBRATE_NEXT_STEP,
});

export const reset = () => ({
  type: CALIBRATE_RESET,
});

const requestCal = calPoint => ({
  type: CALIBRATE_REQUEST_CALPOINT,
  calPoint,
});

const receiveCal = (calPoint, completed) => ({
  type: CALIBRATE_RECEIVE_CALPOINT,
  calPoint,
  completed,
});

export const receiveCalibration = ({ calPoint, completed }) => dispatch =>
  dispatch(receiveCal(calPoint, completed));

export const requestCalibration = calPoint => (dispatch) => {
  dispatch(requestCal(calPoint));
  if (window.client && window.client.connected) {
    const jsonState = {
      desired: {
        calibrate: {
          calPoint,
          request: true,
        },
      },
    };
    window.client.publish('superToi/shadow/update', JSON.stringify(jsonState), { qos: 1 });
  }
};

// export const calibrationNextStep = () =>
