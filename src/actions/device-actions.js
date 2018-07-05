import axios from 'axios';
// import { deviceStatus, deviceFinder } from '../api/device';
import { getConnected } from '../api/discover-kits';
// import { fetchSensorsData, getSensorsData } from './sensors-actions';
// import { getMotorsData } from './motors-actions';
import { resetView } from './view-actions';
import deviceShadow, { fetchDeviceStatus } from './shadow';

export const FETCH_DEVICE = 'device/fetch';
export const RECEIVE_DEVICE = 'device/receive';
export const FETCH_DEVICE_STATUS = 'device/status/fetch';
export const RECEIVE_DEVICE_STATUS = 'device/status/receive';
export const RESET_DEVICE = 'device/reset';
export const RECEIVE_AVAILABLE_WIFIS = 'RECEIVE_AVAILABLE_WIFIS';
export const REQUEST_AVAILABLE_WIFIS = 'REQUEST_AVAILABLE_WIFIS';
export const RESET_WIFI = 'RESET_WIFI';
export const SELECTED_WIFI = 'SELECTED_WIFI';

/*
Action Generators
 */
const fetchingDevice = () => ({
  type: FETCH_DEVICE,
});

const receiveDevice = deviceInfo => ({
  type: RECEIVE_DEVICE,
  deviceInfo,
});

export const resetDevice = () => ({
  type: RESET_DEVICE,
});

export const fetchingDeviceStatus = () => ({
  type: FETCH_DEVICE_STATUS,
});

export const receiveDeviceStatus = () => ({
  type: RECEIVE_DEVICE_STATUS,
});

export const getDeviceStatus = ({ ip, hostname }) => (dispatch) => {
  return dispatch(deviceShadow(ip, hostname));
};

export const findDevice = () => (dispatch) => {
  dispatch(fetchingDevice());
  return getConnected()
    .then((connected) => {
      // console.log('connected:', connected);
      if (connected.length > 0) {
        dispatch(receiveDevice(connected[0]));
        return dispatch(getDeviceStatus(connected[0]));
      }
      dispatch(resetDevice());
    });
};

const requestAvailableWifis = () => ({
  type: REQUEST_AVAILABLE_WIFIS,
});

const receiveAvailableWifis = wifis => ({
  type: RECEIVE_AVAILABLE_WIFIS,
  wifis,
});

export const fetchAvailableWifis = ip => (dispatch) => {
  dispatch(requestAvailableWifis());
  return axios({
    method: 'get',
    url: `http://${ip}:8082/wifi/all`,
  })
    .then((res) => {
      const { data: { networks } } = res;
      // console.log('networks:', res);
      dispatch(receiveAvailableWifis(networks));
    })
    .catch((error) => {
      console.error(error);
    });
};

export const selectWifi = wifi => ({
  type: SELECTED_WIFI,
  wifi,
});

export const resetWifi = () => ({
  type: RESET_WIFI,
});

export const connectWifi = (ip, wifi) => dispatch =>
  axios({
    method: 'post',
    // baseURL: 'http://192.168.1.75:8082',
    url: `http://${ip}:8082/wifi/connect`,
    data: { ...wifi },
  })
    .then((response) => {
      // console.log(response);
      dispatch(resetWifi());
      dispatch(resetView());
      dispatch(resetDevice());
    })
    .catch((error) => {
      console.error(error);
    });

export const createAP = ip => dispatch =>
  axios({
    method: 'get',
    url: `http://${ip}:8082/wifi/start-ap`,
  })
    .then((response) => {
      // console.log(response);
      dispatch(resetView());
      dispatch(resetDevice());
    })
    .catch((error) => {
      console.error(error);
    });

export const shutdown = ip => dispatch =>
  axios({
    method: 'get',
    url: `http://${ip}:8082/shutdown`,
  })
    .then((response) => {
      // console.log(response);
      dispatch(resetView());
      dispatch(resetDevice());
    })
    .catch((error) => {
      console.error(error);
    });
