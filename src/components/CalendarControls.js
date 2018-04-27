/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import ControllButton from './ControlButton'

class CalendarControls extends Component {
  render() {
    return (
      <div className="controls">
        <ControllButton action="clear" classProp="clear--btn" success={false}>
          Clear
        </ControllButton>
        <ControllButton action="save" classProp="save--btn" success={false}>
          Save Changes
        </ControllButton>
      </div>
    )
  }
}
export default CalendarControls;
