import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Piece from '../atoms/OthelloPiece'

let styles = {
  table:{
    display: "flex",
    flexDirection:"column",
    width:"100vw",
    height:"100vw",
    maxHeight:"600px",
    maxWidth:"600px",
    background:"#373C38",

  },
  record: {
    display: "flex",
    flexGrow:1,
  },
  cel: {
    padding:"2%",
    flexGrow:1,
    background: "#3F7955",
    margin:1,
  }
}

function Panel(props) {
  const { classes, bord, onClick } = props
  let table = []
  for (let i in bord) {
    let piece = []
    for (let j in bord[i]) {
      piece.push(
        <div
          className={classes.cel}>
          <Piece
            key={j}
            x={j}
            y={i}
            onClick={onClick}
            behavior={bord[i][j]} />
        </div>

      )
    }
    table.push(
      <div
        key={i}
        className={classes.record}>
        {piece}
      </div>
    )
  }

  return (
    <div className={classes.table}>
      {table}
    </div>
  )
}

Panel.PropTypes = {
  classes: PropTypes.object.isRequired,
  bord: PropTypes.array.isRequired,
  onClick: PropTypes.object.isRequired,
}

export default withStyles(styles)(Panel)