/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import * from '../actions'
import CalendarView from './CalendarView';
import CalendarControls from './CalendarControls'

class CalendarContainer extends Component {
  // static propTypes = {
  //   selectedSubreddit: PropTypes.string.isRequired,
  //   posts: PropTypes.array.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   lastUpdated: PropTypes.number,
  //   dispatch: PropTypes.func.isRequired
  // }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  render() {
    return (
      <div>
        <CalendarView/>
        <CalendarControls/>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   const { selectedSubreddit, postsBySubreddit } = state
//   const {
//     isFetching,
//     lastUpdated,
//     items: posts
//   } = postsBySubreddit[selectedSubreddit] || {
//     isFetching: true,
//     items: []
//   }
//
//   return {
//     selectedSubreddit,
//     posts,
//     isFetching,
//     lastUpdated
//   }
// };
//
// const mapDispatchToProps = dispatch => ({
//   toggleTodo: id => dispatch(toggleTodo(id))
// })
//
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Calendar)
export default CalendarContainer;
