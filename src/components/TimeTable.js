/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Item from './Item'

class TimeTable extends Component {
  static propTypes = {
    schedule: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    itemClick: PropTypes.func.isRequired,
    mouseUp: PropTypes.func.isRequired,
    mouseMove: PropTypes.func.isRequired,
    legend: PropTypes.bool.isRequired,
    dayName: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.legendCount = this.legendCount.bind(this);
  }

  legendCount(index) {
    const list = [0, 3, 6, 9, 12, 15, 18, 21];

    return (list.indexOf(index) >= 0)
  }

  render() {
    return (
      <div className="timetable">
        {this.props.data.map((item, index) =>
          <Item
            key={index}
            id={item.id}
            legend={this.props.legend && this.legendCount(index)}
            dayName={this.props.dayName}
            click={this.props.itemClick}
            mouseUp={this.props.mouseUp}
            mouseMove={this.props.mouseMove}
          />)}
      </div>
    )
  }
}

export default connect()(TimeTable)
