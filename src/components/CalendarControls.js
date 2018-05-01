/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import ControllButton from './ControlButton'
import PropTypes from 'prop-types'

class CalendarControls extends Component {
  static PropTypes = {
    clearable: PropTypes.object.isRequired,
    scheduleData:PropTypes.object.isRequired,
  }
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="controls">
        <ControllButton action="clear" classProp="clear--btn" enable={this.props.clearable}>
          Clear
        </ControllButton>
        <ControllButton action="save" classProp="save--btn" enable={true} scheduleData={this.props.scheduleData}>
          Save Changes
        </ControllButton>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const { simpleObjects, schedule } = state;
  let clearable = false;

  for(let i in simpleObjects) {
    if(simpleObjects[i].hasOwnProperty('selected')){
      clearable = simpleObjects[i].selected;
    }
    if(clearable)
      break;
  }

  return ({
    clearable,
    scheduleData : schedule.data
  })
}

export default connect(
  mapStateToProps
)(CalendarControls)
