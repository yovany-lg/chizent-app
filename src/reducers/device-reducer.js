import {
  FETCH_DEVICE,
  RECEIVE_DEVICE,
  FETCH_DEVICE_STATUS,
  RECEIVE_DEVICE_STATUS,
  RESET_DEVICE,
  RECEIVE_AVAILABLE_WIFIS,
  REQUEST_AVAILABLE_WIFIS,
  RESET_WIFI,
  SELECTED_WIFI,
} from '../actions/device-actions';

const initialState = {
  ip: undefined,
  isFetching: false,
  isFetchingStatus: false,
  wifiConfig: {
    isFetching: false,
    selectedWifi: undefined,
    wifis: [],
  },
};

const wifiReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_AVAILABLE_WIFIS:
      return {
        isFetching: true,
        wifis: [],
        selectedWifi: undefined,
      };
    case RECEIVE_AVAILABLE_WIFIS:
      return {
        isFetching: false,
        wifis: action.wifis,
        selectedWifi: undefined,
      };
    case SELECTED_WIFI:
      return {
        ...state,
        selectedWifi: action.wifi,
      };
    case RESET_WIFI:
      return {
        ...state,
        selectedWifi: undefined,
      };
    default:
      return state;
  }
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEVICE:
      return {
        ...initialState,
        isFetching: true,
      };
    case RESET_DEVICE:
      return {
        ...initialState,
        isFetching: false,
      };
    case RECEIVE_DEVICE:
      return {
        ...state,
        ...action.deviceInfo,
        isFetching: false,
        isFetchingStatus: false,
      };
    case FETCH_DEVICE_STATUS:
      return {
        ...state,
        isFetchingStatus: true,
      };
    case RECEIVE_DEVICE_STATUS:
      return {
        ...state,
        isFetchingStatus: false,
      };
    case REQUEST_AVAILABLE_WIFIS:
    case RECEIVE_AVAILABLE_WIFIS:
    case SELECTED_WIFI:
    case RESET_WIFI:
      return {
        ...state,
        wifiConfig: wifiReducer(state.wifiConfig, action),
      };
    default:
      return state;
  }
};

export default mainReducer;
