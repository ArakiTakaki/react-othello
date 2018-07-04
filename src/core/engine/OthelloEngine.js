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
    this.black = 2
    this.white = 2
    this.tmp = []
    this.conclusion = false
    this.step = 0
  }

  getBord() {
    return this.bord
  }

  getPlayer() {
    return this.player
  }

  getWhite(){
    return this.white
  }

  getBlack(){
    return this.black
  }

  getConclusion(){
    return this.conclusion
  }

  getStep(){
    return this.step
  }

  Initialize() {
    this.player = R.game_props.black
    this.bord = JSON.parse(JSON.stringify(R.initialize_game))
    this.black = 2
    this.white = 2
    this.step = 0
    this.conclusion = false
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

    //プレイヤーのチェンジを行う
    if (change) {
      this.step ++
      this.bord[y][x] = this.player
      this.ChangePlayer()

      this._findAll();
      // 置き場所がない積んでる状態ならプレイヤーを切り替える
      // const result = this.FIndAll()
      // if(result !== 0){
      //   this.ChangePlayer()
      // }
      if ( this.bord.length * this.bord[0].length === this.black + this.white ){
        this.conclusion = true
      }
    }
    return false;
  }


  ChangePlayer() {
    if (this.player === R.game_props.black) {
      this.player = R.game_props.white
    } else {
      this.player = R.game_props.black
    }
  }

  _findAll() {
    this.black = 0;
    this.white = 0;
    for (var i in this.bord) {
      for (var j in this.bord) {
        if (this.bord[i][j] === R.game_props.black) {
          this.black++;
        }
        if (this.bord[i][j] === R.game_props.white)
          this.white++;
      }
    }
  }

  /**
   * _write(x, y, map)
   * @param {int} y y軸の位置データ
   * @param {int} x x軸の位置データ
   * @param {int[]} map 方向データ [y, x]
   */
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

  /**
   * _dirSerch(y, x) 全方向検索
   * @param y Y軸の位置データ
   * @param x X軸の位置データ
   * @return 方向のデータ [y, x]
  */
  _dirSerch(y, x) {
    let list = []
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

  /**
   * 
   * @param {int} y y軸の位置データ
   * @param {int} x x軸の位置データ
   * @param {int[2]} map 方向データ [y,x]
   */
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
      loc = this.bord[y_p][x_p]
    }
    return false
  }

}