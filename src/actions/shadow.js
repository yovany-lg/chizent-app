import mqtt from 'mqtt';

import { receiveSensorsData } from './sensors-actions';
import { receiveMotorsData } from './motors-actions';
import { receiveTaskData } from './process-actions';
import { fetchingDeviceStatus, receiveDeviceStatus, resetDevice } from './device-actions';
import { resetView } from './view-actions';
import { receiveCalibration } from './calibrate-actions';

window.client = undefined;

const receiveShadow = ({ reported, desired, metadata }, dispatch) => {
  if (reported && reported.sensors !== undefined) {
    dispatch(receiveSensorsData(reported.sensors, metadata.reported.sensors));
  }
  if (reported && reported.motors !== undefined) {
    dispatch(receiveMotorsData(reported.motors, metadata.reported.motors));
  }
  if (reported && reported.task !== undefined) {
    // console.log('Task:', reported.task);
    dispatch(receiveTaskData(reported.task));
    if (reported.task.calibrate) {
      dispatch(receiveCalibration(reported.task.calibrate));
    }
  }
  // if (reported && reported.task !== undefined && reported.task.calibrate) {
  //   // console.log('Task:', reported.task);
  //   dispatch(receiveCalibration(reported.task.calibrate));
  // }
};

const connect = (host, deviceName, dispatch) => new Promise((resolve, reject) => {
  window.client = mqtt.connect({ host, port: 1884, protocol: 'ws' });
  window.client.on('connect', () => {
    console.log('MQTT window.Client connected');
    window.client.subscribe(`${deviceName}/shadow/update/accepted`, { qos: 1 });
    window.client.subscribe(`${deviceName}/shadow/get/accepted`, { qos: 1 });
    resolve(true);
    // resolve(true);
  });

  setTimeout(() => {
    if (!window.client && !window.client.connected) {
      window.client.end();
      window.client = undefined;
      dispatch(resetDevice());
      reject(new Error('SuperToi MQTT server offline'));
    }
  }, 3000);

  window.client.on('offline', () => {
    if (window.client) {
      window.client.end();
      window.client = undefined
    }
    dispatch(resetDevice());
    dispatch(resetView());
    console.log('MQTT Server offline');
  });
  window.client.on('error', () => {
    if (window.client) {
      window.client.end();
      window.client = undefined
    }
    dispatch(resetDevice());
    dispatch(resetView());
    console.log('MQTT Server Error');
  });
  window.client.on('close', () => {
    if (window.client) {
      window.client.end();
      window.client = undefined
    }
    dispatch(resetDevice());
    dispatch(resetView());
    console.log('MQTT Server Close');
  });
});

export const fetchDeviceStatus = (deviceName) => {
  if (window.client && window.client.connected) {
    window.client.publish(`${deviceName}/shadow/get`, '', { qos: 1 });
  }
};

const deviceShadow = (host, deviceName) => (dispatch) => {
  connect(host, deviceName, dispatch)
    .then(() => {
      window.client.on('message', (topic, message) => {
        const jsonState = JSON.parse(message.toString());
        // console.log('jsonState:', jsonState);
        // console.log('MQTT Message, jsonState:', jsonState);
        receiveShadow(jsonState, dispatch);
        if (topic.endsWith('get/accepted')) {
          dispatch(receiveDeviceStatus());
        }
      });
      return true;
    })
    .then(() => {
      dispatch(fetchingDeviceStatus());
      window.client.publish(`${deviceName}/shadow/get`, '{}', { qos: 1 });
    })
    .catch(() => {
      dispatch(resetDevice());
    });
};

export default deviceShadow;
