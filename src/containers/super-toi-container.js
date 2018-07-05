import { connect } from 'react-redux';
import SuperToi from '../components/SuperToi';
import {
  fetchAvailableWifis,
  selectWifi,
  connectWifi,
  resetWifi,
  createAP,
  shutdown,
} from '../actions/device-actions';
import {
  nextStep,
  reset,
} from '../actions/calibrate-actions';

const mapStateToProps = ({ device: { wifiConfig, ip }, calibrate }) => ({
  ...wifiConfig,
  ip,
  calibrate,
});

const mapDispatchToProps = ({
  fetchWifis: fetchAvailableWifis,
  selectWifi,
  changePwd: selectWifi,
  connectWifi,
  resetWifi,
  createAP,
  shutdown,
  calibrateReset: reset,
  calibrateNextStep: nextStep,
});

const KitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuperToi);

export default KitContainer;
