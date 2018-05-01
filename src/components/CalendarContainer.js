/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import CalendarView from './CalendarView';
import CalendarControls from './CalendarControls'

class CalendarContainer extends Component {

  render() {
    return (
      <div>
        <CalendarView/>
        <CalendarControls/>
      </div>
    )
  }
}
export default CalendarContainer;
