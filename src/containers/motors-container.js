import { connect } from 'react-redux';
import Motors from '../components/motors';

const mapStateToProps = ({ motors, device: { isFetchingStatus } }) => ({
  isFetchingStatus,
  ...motors,
});

export default connect(mapStateToProps)(Motors);
