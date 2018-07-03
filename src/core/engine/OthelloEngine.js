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
      [1, -1]
    ]
    this.tmp = []
  }

  getBord() {
    return this.bord
  }
  getPlayer() {
    return this.player
  }

  Initialize() {
    this.player = R.game_props.black
    this.bord = R.initialize_game
  }

  ChangePiece(y, x) {
    y = Number(y)
    x = Number(x)
    let change = false;
    //方向の検索
    let dirs = this._dirSerch(y, x)

    if (dirs.length === 0) {
      console.log("配置場所間違ってますよ！")
      return
    }

    //方向の先を検索
    for (let value of dirs) {
      let swt = this._straight(y, x, value)
      if (swt) {
        this._write(y, x, value)
        change = true;
      }
    }

    if (change) {
      this.bord[y][x] = this.player
      this.ChangePlayer()
      console.log(this.bord)
    }
  }

  ChangePlayer() {
    if (this.player === R.game_props.black) {
      this.player = R.game_props.white
    } else {
      this.player = R.game_props.black
    }
  }

  _write(y, x, map) {
    let x_p = x + map[1]
    let y_p = y + map[0]
    let loc = this.bord[y_p][x_p]
    while (loc !== R.game_props.null) {
      if (loc === this.player) {
        break;
      }
      this.bord[y_p][x_p] = this.player
      x_p += map[1]
      y_p += map[0]
      loc = this.bord[y_p][x_p]
    }
  }

  _dirSerch(y, x) {
    let list = []
    //方向の探索
    for (let map of this.mapping) {
      try {
        var loc = this.bord[y + map[0]][x + map[1]]
        if (loc !== this.player && loc !== R.game_props.null) {
          list.push(map)
        }
      } catch (e) {
      }
    }
    return list
  }

  //先に黒があるかどうか探索1
  _straight(y, x, map) {
    let x_p = x + map[1]
    let y_p = y + map[0]
    let loc = this.bord[y_p][x_p]
    while (loc !== R.game_props.null) {
      if (loc === this.player) {
        return true
      }
      x_p += map[1]
      y_p += map[0]
      if (this.bord.length <= y_p || this.bord[0].length <= x_p)
        return false
      if (y_p < 0 || x_p < 0)
        return false
      console.log(y_p)
      console.log(x_p)
      loc = this.bord[y_p][x_p]
    }
    return false
  }

}