/**
 * Created by Jordan3D on 4/25/2018.
 */
import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ enable, children, onClick, classProp }) => (
  <button
    className={`c-button ${classProp}`}
    onClick={onClick}
    disabled={!enable}
  >
    {children}
  </button>
)

Button.propTypes = {
  enable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  classProp: PropTypes.string.isRequired
}

export default Button
