import { connect } from 'react-redux';
import Sensors from '../components/sensors';

const mapStateToProps = ({ sensors, device: { isFetchingStatus } }) => ({
  isFetchingStatus,
  ...sensors,
});

export default connect(mapStateToProps)(Sensors);
