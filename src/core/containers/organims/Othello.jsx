import React from 'react'
// import PropTypes from 'prop-types'
import Panel from '../../components/modules/Panel'
import OthelloEngine from '../../engine/OthelloEngine'

export default class Othello extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      bord:[],
      player:0,
    }
    this.select = this.select.bind(this)
    this.initialize = this.initialize.bind(this)
    this.othelloEngine = new OthelloEngine();
  }

  componentWillMount(props){
    this.initialize()
  }

  initialize(){
    let initBord = this.othelloEngine.getBord()
    let initPlayer = this.othelloEngine.getPlayer()
    this.setState({
      bord:initBord,
      player:initPlayer
    })
  }

  select(event){
    let target = event.target.id.split(",")
    this.othelloEngine.ChangePiece(target[0],target[1])
    this.setState({
      player:this.othelloEngine.getPlayer(),
      bord:this.othelloEngine.getBord()
    })
  }

  render(){
    return (
      <div>
        <Panel 
          bord={this.state.bord}
          onClick={this.select}/>
      </div>
    )     
  }
}


