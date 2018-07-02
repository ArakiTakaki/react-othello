import { R } from '../R/Const'


export default class OthelloEngine {

  constructor() {
    this.player = R.game_props.black
    this.bord = R.initialize_game
    this.mapping = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, 0]
    ]
    this.tmp = []
  }

  getBord(){
    return this.bord
  }
  getPlayer(){
    return this.player
  }
  
  Initialize() {
    this.player = R.game_props.black
    this.bord = R.initialize_game
  }

  ChangePiece(y, x) {
    this.bord[y][x]
    let swt = false;
    let x_p = x
    let y_p = y
    for (let map of this.mapping) {
      this.tmp = []
      let change = this._logic(map, x_p, y_p)
      if (change !== -1 && _recursiveSerch(map, x_p, y_p)) {
        this._change()
        this.bord[y][x] = player
        swt = true
      }
    }
    if(swt){
      this.ChangePlayer()
    }    
  }

  ChangePlayer() {
    if (this.player === R.game_props.black) {
      this.player = R.game_props.white
    } else {
      this.player = R.game_props.black
    }
  }

  _change(){
    for (let map of this.tmp){
      this.bord[map[0]][map[1]] = this.player
    }
  }

  _recursiveSerch(map, x_p, y_p) {
    this.tmp.push = [x_p, y_p]
    let x = x_p + map[0]
    let y = y_p + map[1]
    loc = this.bord[x][y]
    if (loc !== this.player && loc !== R.game_props.null) {
      _recursiveSerch(map, x, y)
    }
    if (loc === this.player){
      return true
    }
    return false
  }

  _logic(map, x, y) {
    try {
      let loc = this.bord[x + map[0]][y + map[1]]
      if (loc != player && loc !== R.game_props.null) {
        return value
      } else {
        return -1
      }
    }
    catch(e) {
      return -1
    }
  }

}