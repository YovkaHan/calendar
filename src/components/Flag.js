/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'
import {compareSelected} from  './Day'

class Flag extends Component {
  static propTypes = {
    configs: PropTypes.object.isRequired,
    now:  PropTypes.bool.isRequired,
    toogle: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    legend: PropTypes.bool.isRequired
  }

  constructor(props){
    super(props);
    this.state = {value: 'off', selected: this.props.state.selected};
    this.changeValue = this.changeValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!compareSelected(this.props.state, nextProps.state)){
      if(this.state.value === 'off' && nextProps.state.selected.all){
        this.setState({value: 'on'})
      } else if(this.state.value === 'on' && !nextProps.state.selected.all) {
        this.setState({value: 'off'})
      }
    }
  }

  changeValue() {
    this.setState({value: this.state.value === 'on'? 'off': 'on'});
  }

  render () {
    let legend = this.props.legend ? <span className="flag__name">{this.props.configs.name.toUpperCase()}</span> : null;
    return (
      <div className="flag" onClick={() => this.props.toogle(this.props.configs, this.state.value, this.changeValue)}>
        {legend}
        <Cell propClass={`cell--flag flag${this.state.value === 'on'? "--full": this.props.state.selected.part ? "--selected":""}`}/>
      </div>
    )
  }
}

export default Flag
