/**
 * Created by Jordan3D on 4/26/2018.
 */
import React from 'react'
import PropTypes from 'prop-types'

const Cell = ({ children = null, propClass, selected }) => (
  <div className={`cell ${propClass ? propClass :''} ${selected ? 'cell--selected' :''}`}>
    {children}
  </div>
);

Cell.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired,
  propClass: PropTypes.string.isRequired
};

export default Cell
