import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';
import { fetchAvailableWifis } from '../actions/device-actions';
import { changeView, resetView } from '../actions/view-actions';

const mapStateToProps = ({ device, view: { view } }) => ({
  online: device.ip !== undefined,
  view,
});

const mapDispatchToProps = dispatch => ({
  fetchAvailableWifis,
  changeView: view => dispatch(changeView(view)),
  resetView: () => dispatch(resetView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
