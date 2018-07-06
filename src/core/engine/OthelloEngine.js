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
    this.isPeasNotPut = false
  }

  getBord() {
    return this.bord
  }

  getPlayer() {
    return this.player
  }

  getWhite() {
    return this.white
  }

  getBlack() {
    return this.black
  }

  getConclusion() {
    return this.conclusion
  }

  getStep() {
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

    //方向先を書き換え
    this.bord[y][x] = this.player;
    for (let value of dirs) {
      this._write(y, x, value)
      change=true;
    }

    if (change) {
      this.step++

      this.black = 0;
      this.white = 0;
      this._findAll(
        function (param) {
          const { x, y, self } = param
          if(self.bord[x][y] === R.game_props.black){
            self.black ++;
          }
          if(self.bord[x][y] === R.game_props.white){
            self.white ++;
          }
        }
      );


      this.bord[y][x] = this.player
      this.ChangePlayer()

      
      // おけるかどうか
      this.isPeasNotPut = true;
      this._findAll( this.isPeasPut);

      if (this.isPeasNotPut) {
        this.ChangePlayer()
      }

      //両者置き場所がなくなったら試合終了
      this.isPeasNotPut = true;
      this._findAll( this.isPeasPut);
      if (this.isPeasNotPut){
        this.conclusion = true
      }



    }
    return false;
  }

  isPeasPut(param){
    const { x, y, self } = param
    if (self.bord[x][y] === R.game_props.null) {
      if (self._dirSerch(x, y).length > 0) {
        console.log("ok")
        self.isPeasNotPut = false;
      }
    }
  }


  ChangePlayer() {
    if (this.player === R.game_props.black) {
      this.player = R.game_props.white
    } else {
      this.player = R.game_props.black
    }
  }

  _findAll(callback) {
    for (var i in this.bord) {
      for (var j in this.bord) {
        callback({
          self: this,
          x: j,
          y: i
        })
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
    x = Number(x)
    y = Number(y)
    let list = []
    for (let map of this.mapping) {
      var loc = this._outOfIndex(y + map[0], x + map[1])
      if ( loc === -1 ){
        continue;
      }
      if (loc === this.player) {
        continue;
      }
      if (loc === R.game_props.null ){
        continue;
      }
      if(!this._isStraight(y,x,map)){
        continue;
      }
      list.push(map)
    }
    return list
  }

  _outOfIndex(y, x) {
    x = Number(x)
    y = Number(y)
    if (y === -1 || x === -1 || x >= this.bord.length || y >= this.bord.length) {
      return -1
    }
    var loc = this.bord[y][x]
    return loc
  }

  /**
   * 
   * @param {int} y y軸の位置データ
   * @param {int} x x軸の位置データ
   * @param {int[2]} map 方向データ [y,x]
   */
  _isStraight(y, x, map) {
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