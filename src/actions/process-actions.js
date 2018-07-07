import { resetView } from './view-actions';

export const RECEIVE_TASK = 'task/receive';
export const RESET_TASK = 'task/reset';
export const REQUEST_TASK = 'task/request';

const receiveTask = (running, phValue, time) => ({
  type: RECEIVE_TASK,
  running,
  phValue,
  time,
});

const resetTask = () => ({
  type: RESET_TASK,
});

const requestTask = () => ({
  type: RESET_TASK,
});

export const receiveTaskData = task => (dispatch) => {
  dispatch(resetView());
  dispatch(receiveTask(task.running, task.phValue, task.time));
};

export const requestNewTask = (phValue, time) => (dispatch) => {
  dispatch(requestTask());
  dispatch(resetView());
  if (window.client && window.client.connected) {
    const jsonState = {
      desired: {
        task: {
          running: true,
          phValue,
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
