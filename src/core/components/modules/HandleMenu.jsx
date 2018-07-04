import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import Handle from '../atoms/Handle'

const styles = {
}

function Handle(props){
  const { onClick } = props
  return (
    <Menu>
      <Handle
        onClick={onClick}/>
    </Menu>
  )
}

Handle.PropTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.object.isRequired,
}

export default withStyles(styles)(Handle)