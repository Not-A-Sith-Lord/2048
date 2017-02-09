function Game2048(name){
  this.score = 0;
  this.board = [
    [null, null, null, null],
      [null, null, null, null],
        [null, null, null, null],
          [null, null, null, null]
  ];
  this.hasWon = false;
  this.hasLost = false;

  this._generateTile();
  this._generateTile();

}

Game2048.prototype._generateTile = function (){
var tileValue;
  if(Math.random() < 0.8){
  tileValue = 2; }
 else {
  tileValue = 4;
}


var emptyTile = this._getAvailablePosition();

if (emptyTile !== null) {
  let row = emptyTile.x;
  let col = emptyTile.y;
  this.board[row][col] = tileValue;
}
};

Game2048.prototype._getAvailablePosition = function() {
    var emptyTiles = [];

    this.board.forEach(function (row, rowIndex) {
      row.forEach(function(cell, colIndex){
        if (cell === null){
          emptyTiles.push({ x: rowIndex, y: colIndex });
        }
      });
    });

    if (emptyTiles.length === 0) {
      return null;
    }

    var randomIndex = Math.floor(Math.random() * emptyTiles.length);
    return emptyTiles[randomIndex];
  }


//End Generate Tile

Game2048.prototype._moveLeft = function () {
  var newBoard = [];
  var that = this;
  var boardChanged = false;

  this.board.forEach (function (row) {
    var newRow = row.filter(function (i) { return i !== null; });

    for(i = 0; i < newRow.length - 1; i++) {
      if (newRow[i+1] === newRow[i]) {
        ion.sound.play("tap");
        newRow[i]   = newRow[i] * 2;
        newRow[i+1] = null;

        that._updateScore(newRow[i]);
      }
    }

    var merged = newRow.filter( function (i) { return i !== null; });
    while(merged.length < 4) { merged.push(null); }
    if (newRow.length !== row.length) boardChanged = true;

    newBoard.push(merged);
  });

  this.board = newBoard;
  return boardChanged;
};

Game2048.prototype._moveRight = function () {
  var newBoard = [];
  var that = this;
  var boardChanged = false;

  this.board.forEach (function (row) {
    var newRow = row.filter(function (i) { return i !== null; });

    for (i=newRow.length - 1; i>0; i--) {
      // If two adjacent tiles are equal, we collapse them and double value!
      if (newRow[i-1] === newRow[i]) {
        ion.sound.play("tap");
        newRow[i]   = newRow[i] * 2;
        newRow[i-1] = null;
        that._updateScore(newRow[i]);
      }
      if (newRow.length !== row.length) boardChanged = true;
    }

    var merged = newRow.filter( function (i) { return i !== null; });
    while(merged.length < 4) { merged.unshift(null); }
    newBoard.push(merged);
  });

  this.board = newBoard;
  return boardChanged;
};


Game2048.prototype._isGameLost = function () {
  if (this._getAvailablePosition())
    return;

  var that   = this;
  var isLost = true;

  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, cellIndex) {
      var current = that.board[rowIndex][cellIndex];
      var top, bottom, left, right;

      if (that.board[rowIndex][cellIndex - 1]) { left  = that.board[rowIndex][cellIndex - 1]; }
      if (that.board[rowIndex][cellIndex + 1]) { right = that.board[rowIndex][cellIndex + 1]; }
      if (that.board[rowIndex - 1]) { top    = that.board[rowIndex - 1][cellIndex]; }
      if (that.board[rowIndex + 1]) { bottom = that.board[rowIndex + 1][cellIndex]; }

      if (current === top || current === bottom || current === left || current === right)
        isLost = false;
    });
  });

  this.lost = isLost;
};

var blah = new Game2048("blah");
blah._generateTile();
console.log(blah.board);

