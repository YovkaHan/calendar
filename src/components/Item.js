/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Cell from './Cell'
import {inInterval} from '../reducers'

class Item extends Component {
  static propTypes = {
    simpleObjects: PropTypes.object.isRequired,
    scheduleDay: PropTypes.array.isRequired,
    self: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
    mouseUp: PropTypes.func.isRequired,
    mouseEnter: PropTypes.func.isRequired,
    mouseLeave: PropTypes.func.isRequired,
    legend: PropTypes.bool.isRequired,
    dayName: PropTypes.string.isRequired,
    fetched: PropTypes.bool.isRequired
  };

  constructor(props){
    super(props);
    this.state = {afterFetch: false};
  }

  componentWillReceiveProps (newProps) {
    if(newProps.fetched && !this.state.afterFetch){
      this.setState({afterFetch: true});
      if(inInterval(newProps.scheduleDay, newProps.self.interval)){
        newProps.click(newProps.id, newProps.simpleObjects, false)
      }
    }
  }

  render () {
    let legend =
      this.props.legend ?
        <span className="time">
          {`${(this.props.self.interval[0]/60)<10? ("0"+(this.props.self.interval[0]/60)):(this.props.self.interval[0]/60)}:00`}
        </span> :
        null;
    return (
      <div
        className={`item ${this.props.simpleObjects[this.props.id].selected? 'item--selected':''}`}
        onMouseDown={() => this.props.click(this.props.id, this.props.simpleObjects, true)}
        onMouseUp={() => this.props.mouseUp()}
        onMouseEnter={() => this.props.mouseEnter(this.props.id, this.props.simpleObjects)}
        onMouseLeave={() => this.props.mouseLeave(this.props.id, this.props.simpleObjects)}
      >
        {legend}
        <Cell/>
      </div>
    )
  }
}

// Item.propTypes = {
//
// }
const mapStateToProps = (state, ownProps) => {
  const { simpleObjects, schedule } = state;

  return {
    simpleObjects,
    self: schedule.intervals[ownProps.id],
    scheduleDay: schedule[ownProps.dayName],
    fetched: schedule.fetched
  }
};

// const mapDispatchToProps = dispatch => ({
//
// });


export default connect(
  mapStateToProps
)(Item)
