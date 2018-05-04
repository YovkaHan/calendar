/**
 * Created by Jordan3D on 4/25/2018.
 */
import { connect } from 'react-redux';
import { controlsAction } from '../actions'
import Button from './Button';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(controlsAction(ownProps.action, ownProps.scheduleData)),
  dispatch
});

export default connect(
  null,
  mapDispatchToProps
)(Button)
