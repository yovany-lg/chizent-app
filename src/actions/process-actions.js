export const RECEIVE_TASK = 'task/receive';
export const RESET_TASK = 'task/reset';

const receiveTask = (running, phValue, tempValue, time) => ({
  type: RECEIVE_TASK,
  running,
  phValue,
  tempValue,
  time,
});

const resetTask = () => ({
  type: RESET_TASK,
});

export const receiveTaskData = task =>
  dispatch => dispatch(receiveTask(task.running, task.phValue, task.tempValue, task.time));

export const requestNewTask = (phValue, tempValue, time) => {
  if (window.client && window.client.connected) {
    const jsonState = {
      desired: {
        task: {
          running: true,
          phValue,
          tempValue,
          time,
        },
      },
    };
    // console.log(jsonState);
    window.client.publish('superToi/shadow/update', JSON.stringify(jsonState), { qos: 1 });
  }
};

export const requestStopTask = () => (dispatch) => {
  if (window.client && window.client.connected) {
    const jsonState = {
      desired: {
        task: {
          running: false,
        },
      },
    };
    window.client.publish('superToi/shadow/update', JSON.stringify(jsonState));
    dispatch(resetTask);
  }
};
