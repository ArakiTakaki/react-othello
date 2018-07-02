import React from 'react'
// import PropTypes from 'prop-types'
import { R } from '../../R/Const'
import Panel from '../../components/modules/Panel'
import OthelloEngine from '../../engine/OthelloEngine'

export default class Othello extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      game:new OthelloEngine()
    }
    this.select = this.select.bind(this)
    this.initialize = this.initialize.bind(this)
  }

  componentWillMount(props){
    this.initialize()
  }

  initialize(){
    this.setState({game_bord:R.initialize_game})
  }

  select(event){
    var loc = event.target.id.split(",")
    var bord = this.state.game_bord
    bord[loc[0]][loc[1]] = 1;
    let game = this.state.game
    console.log(game.getPlayer())
  }

  render(){
    console.log("test")
    return (
      <div>
        <Panel 
          bord={this.state.game_bord}
          onClick={this.select}/>
      </div>
    )     
  }
}


