/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Week from './Week'

const getCalendarViews = (currentView) => {
  switch (currentView.toUpperCase()) {
    case 'WEEK':
      return (
        <Week/>
      );
    default:
      throw new Error('Unknown view: ' + currentView)
  }
}

class CalendarView extends Component {
  static propTypes = {
    selectedSet: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        {getCalendarViews(this.props.selectedSet)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedSet } = state;

  return {
    selectedSet
  }
};

export default connect(
  mapStateToProps
)(CalendarView)
