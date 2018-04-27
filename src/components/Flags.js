/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Flag from './Flag'

class Flags extends Component {
  static propTypes = {
    flags: PropTypes.array.isRequired,
    toogle: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    legend: PropTypes.bool.isRequired
  }
  render () {
    return (
      <div className="flags">
        {this.props.flags.map( (flag, key) => <Flag key={key}
                                                    legend = {this.props.legend}
                                                    configs={flag}
                                                    state={this.props.state}
                                                    toogle={this.props.toogle}
                                                    now={{value: (flag.default === 'on'? true : false)}} /> )}
      </div>
    )
  }
}

export default Flags;
