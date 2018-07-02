import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { R } from '../../R/Const'
import Piece from '../atoms/OthelloPiece'

let styles = {

  game_bord:{
    background:"#3F7955",
    border:"solid 4px #373C38",
    padding:10,
  }
}

function Panel(props) {
  const { classes, bord, onClick } = props
  let table = []
  for (let i in bord){
    let piece = []
    for (let j in bord[i]) {
      piece.push(
        <td
          key={j} 
          className={classes.game_bord}>
          <Piece
            x={j}
            y={i}
            onClick={onClick}
            behavior={bord[i][j]}/>
        </td>
      )
    }
    table.push(
      <tr
        key={i}>
        {piece}
      </tr>
    )
  }

  return (
    <table className={classes.bord}>
      <caption>白の手番です</caption>
      <tbody>
        {table}
      </tbody>
    </table>
  )
}

Panel.PropTypes = {
  classes: PropTypes.object.isRequired,
  bord: PropTypes.array.isRequired,
  onClick: PropTypes.object.isRequired,
}

export default withStyles(styles)(Panel)