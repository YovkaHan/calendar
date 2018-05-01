/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createObject, fetchData} from '../actions'
import Day from './Day'

class Week extends Component {
  static propTypes = {
    selectedSet: PropTypes.string.isRequired,
    selectedSetObject: PropTypes.object.isRequired,
    simpleObjects: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {created: false}
  }

  componentDidMount() {
    this.props.dispatch(fetchData());
    this.props.dispatch(createObject(this.props.selectedSet));
  }

  componentWillReceiveProps() {
    this.setState({created: true});
  }

  render() {
    return (
      <div className="week">
        {this.state.created? this.props.selectedSetObject.data.map( (day, index) => <Day key={index} name={day.name}/> ): null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {selectedSet, selectedSetObject, simpleObjects} = state;

  return {
    selectedSet,
    selectedSetObject,
    simpleObjects
  }
};

export default connect(
  mapStateToProps
)(Week)
