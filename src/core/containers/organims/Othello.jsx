import React from 'react'
// import PropTypes from 'prop-types'
import Panel from '../../components/modules/Panel'
import OthelloEngine from '../../engine/OthelloEngine'
import Typography from '@material-ui/core/Typography';

export default class Othello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
    }
    this.select = this.select.bind(this)
    this.initialize = this.initialize.bind(this)
    this.engine = new OthelloEngine();
    this.setOthello = this.setOthello.bind(this)
  }

  componentWillMount(props) {
    this.initialize()
  }

  initialize() {
    this.engine.Initialize()
    this.setOthello()
  }

  setOthello() {
    this.setState({
      step: this.engine.getStep()
    })
  }

  select(event) {
    let target = event.target.id.split(",")
    this.engine.ChangePiece(target[0], target[1])
    this.setOthello()
  }

  render() {
    return (
      <div clssName="app-othello">
        <Typography
          variant="title"
          gutterBottom
          align="center">
          Othello
      </Typography>
        <Typography
          variant="title"
          gutterBottom
          align="center">
          {this.engine.player}
        </Typography>
        <Panel
          bord={this.engine.getBord()}
          onClick={this.select} />
        <button
          onClick={this.initialize}>
          RESET
        </button>

        <Typography
          variant="title"
          gutterBottom
          align="center">
          {this.state.player}
        </Typography>
        <Typography
          variant="title"
          gutterBottom
          align="center">
          黒:{this.engine.getBlack()} 白:{this.engine.getWhite()}
        </Typography>
        <Typography
          variant="title"
          gutterBottom
          align="center">
          手数 : {this.state.step}
        </Typography>



      </div>
    )
  }
}


