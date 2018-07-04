import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
// import {R} from '../../R/Const'
import MenuItem from '@material-ui/core/MenuItem'

const styles = {
}

function Handle(props){
  const { onClick } = props
  return <MenuItem onClick={onClick}>Profile</MenuItem>
}

Handle.PropTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.object.isRequired,
}

export default withStyles(styles)(Handle)