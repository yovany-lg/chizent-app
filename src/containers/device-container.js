import { connect } from 'react-redux';
import DeviceStatus from '../components/device';
import { findDevice, getDeviceStatus } from '../actions/device-actions';
import { requestNewTask, requestStopTask } from '../actions/process-actions';

const mapStateToProps = ({ device, task }) => ({
  online: device.ip !== undefined,
  isFetching: device.isFetching,
  requestNewTask,
  task,
});

const mapDispatchToProps = {
  findDevice,
  // requestNewTask,
  requestStopTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatus);
