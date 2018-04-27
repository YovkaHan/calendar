/**
 * Created by Jordan3D on 4/25/2018.
 */
import { connect } from 'react-redux';
import Button from './Button';

const mapStateToProps = (state, ownProps) => ({
  //success: ownProps.action === state.actionHavePerfomed
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  //onClick: () => dispatch(controlsAction(ownProps.action))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
