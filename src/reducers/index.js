import { combineReducers } from 'redux';
import device from './device-reducer';
import sensors from './sensors-reducer';
import motors from './motors-reducer';
import task from './process-reducer';
import view from './view-reducer';
import calibrate from './calibrate-reducer';

const allReducers = combineReducers({
  device,
  sensors,
  motors,
  task,
  view,
  calibrate,
});

export default allReducers;
