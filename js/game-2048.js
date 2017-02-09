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

    this.board.forEach(function (row, rowindex) {
      row.forEach(function(cell, colIndex){
        if (cell === null){
          emptyTiles.push({ x: rowIndex, y: colIndex });
        }
      });
    });

    if (emptyTiles.length === 0) {
      return null;
    }

    var randomIndex = Math.floor(Math.random() = emptyTiles.length);
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

var blah = new Game2048("blah");
blah._generateTile();
console.log(blah.board);

