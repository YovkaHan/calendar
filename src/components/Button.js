/**
 * Created by Jordan3D on 4/25/2018.
 */
import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ success, children, onClick, classProp }) => (
  <button
    className={`c-button ${classProp}`}
    onClick={onClick}
    disabled={!success}
  >
    {children}
  </button>
)

Button.propTypes = {
  success: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  classProp: PropTypes.string.isRequired
}

export default Button
