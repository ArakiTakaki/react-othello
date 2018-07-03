import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { R } from '../../R/Const'

const styles = {
  black: {
    background: "#222",
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  white: {
    background: "#ddd",
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  null: {
    background: "#fff0",
    width: 50,
    height: 50,
    cursor:"pointer",
  },
}

function Piece(props) {
  const { classes, behavior, onClick ,x ,y} = props

  if (behavior === R.game_props.black) {
    return (
      <div
        id={y+","+x}
        className={classes.black} />
    )
  }

  if (behavior === R.game_props.white) {
    return (
      <div
        id={y+","+x}
        className={classes.white} />
    )
  }

  return (
    <div
      id={y+","+x}
      className={classes.null}
      onClick={onClick}/>
  )

}

Piece.PropTypes = {
  classes: PropTypes.object.isRequired,
  behavior: PropTypes.number.isRequired,
  onClick: PropTypes.object.isRequired,
}

export default withStyles(styles)(Piece)




