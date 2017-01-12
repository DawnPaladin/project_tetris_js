var TETRIS = TETRIS || {};
TETRIS.data = (function() {
  "use strict";
  var exports = {};
  exports.keys = {};

  function Coord(x,y,value) {
    this.x = x;
    this.y = y;
    this.value = value || null;
  }

  function Shape(array, color) {
    color = color || "grey";

    this.color = color;
    this.core = new Coord(0,0,this.color);
    this.cells = array;
  }

  var SHAPES = {
    o: new Shape([[0,0],[1, 0],[0, -1], [1,-1]], "yellow"),
    i: new Shape([[0,0],[0,-1],[0, -2], [0,-3]], "cyan"),
    s: new Shape([[0,0],[1, 0],[1, -1], [2,-1]], "red"),
    z: new Shape([[0,0],[1, 0],[-1,-1],[0,-1]], "green"),
    l: new Shape([[0,0],[1, 0],[0, -1],[0,-2]], "orange"),
    j: new Shape([[0,0],[1, 0],[1, -1],[1,-2]], "pink"),
    t: new Shape([[0,0],[-1,-1],[0,-1],[1,-1]], "purple")
  };

  function Piece(startingCoord, shape, color) {
    this.coreCoord = startingCoord;
    this.updateCells = function updateCells() {
      var array = [];
      for (var i = 0; i < shape.cells.length; i++) {
        array.push(new Coord(
          this.coreCoord.x + shape.cells[i][0],
          this.coreCoord.y + shape.cells[i][1],
          color
        ));
      }
      this.cells = array;
    };
    this.updateCells();
    this.transformation = shape.cells;
    this.color = color;
  }

  // TODO: Refactor
  exports.movePieceDown = function movePieces() {
    if (exports.piece.coreCoord.y < exports.boardEdges.bottom) {
      exports.piece.coreCoord.y += 1;
      exports.piece.updateCells();

      if (collision(exports.piece.cells)) {
        exports.piece.coreCoord.y -= 1;
        exports.piece.updateCells();

        return false;
      }

      return true;
    } else {
      return false;
    }
  };
  exports.movePieceLeft = function movePieces() {
    console.log("moving left");
    if (exports.piece.coreCoord.x > exports.boardEdges.left) {
      exports.piece.coreCoord.x -= 1;
      exports.piece.updateCells();

      if (collision(exports.piece.cells)) {
        exports.piece.coreCoord.x += 1;
        exports.piece.updateCells();

        return false;
      }

      return true;
    } else {
      return false;
    }
  };
  exports.movePieceRight = function movePieces() {
    console.log("moving right");
    if (exports.piece.coreCoord.x < exports.boardEdges.right) {
      exports.piece.coreCoord.x += 1;
      exports.piece.updateCells();

      if (collision(exports.piece.cells)) {
        exports.piece.coreCoord.x -= 1;
        exports.piece.updateCells();

        return false;
      }

      return true;
    } else {
      return false;
    }
  };

  // TODO: Make input event-based
  exports.startkey = function startkey(key){
    TETRIS.data.keys[key] = true;
  };
  exports.stopkey = function stopkey(key){
    TETRIS.data.keys[key] = false;
  };
  exports.movePiece = function movePiece(){
    if (this.keys[40]) { // down arrow
      // exports.movePieceDown();
    }
    if (this.keys[39]) { // right arrow
      if (exports.movePieceRight())
        return "right";
    }
    if (this.keys[37]) { // left arrow
      if (exports.movePieceLeft())
        return "left";
    }
    return false;
    //  if(this.keys[32]){ // spacebar
    //  }

  };

  var collision = function collision(cells) {
    var collide = false;
    for (var i = 0; i < cells.length; i++) {
      var cellKey = cells[i].x + "_" + cells[i].y;
      if (TETRIS.data.board[cellKey]) {
        if (TETRIS.data.board[cellKey].value) collide = true;
      }
    }
    return collide;
  };

  var newBoard = function newBoard(size) {
    var grid = {};
    for(var r = 0; r < size; r++) {
      for(var c = 0; c < size; c++) {
        grid[r + "_" + c] = new Coord(r,c);
      }
    }
    TETRIS.data.boardEdges = { left: 0, right: size - 1, top: 0, bottom: size - 1 };
    return grid;
  };

  var updateBoard = function updateBoard() {
    for (var i = 0; i < exports.piece.cells.length; i++) {
      updateCell(exports.piece.cells[i]);
    }
  };

  var updateCell = function updateCell(coord) {
    var cell = coord.x + "_" + coord.y;
    if (exports.board[cell], coord.value) {
      exports.board[cell] = coord;
      return true;
    } else {
      return false;
    }
  };

  var checkForCompletedRows = function checkForCompletedRows() {
    var fullRow, fullRows = [];

    for (var r = 0; r < exports.boardEdges.bottom + 1; r++) {
      fullRow = true;
      for (var c = 0; c < exports.boardEdges.right + 1; c++) {
          if (!exports.board[r + "_" + c]) fullRow = false;
      }
      if (fullRow) {
        console.log("full row!!!");
        fullRows.push(r);
      }
    }

    return fullRows;
  };

  exports.piece = null;

  exports.addPiece = function addPiece() {
    var keys = Object.keys(SHAPES);
    var key = keys[Math.floor(Math.random() * keys.length)];

    this.piece = new Piece((new Coord(9,0)), SHAPES[key], SHAPES[key].color);

    return this.piece;
  };

  exports.hitBottom = function hitBottom() {
    // move current into board
    updateBoard();

    // TODO: check for row complete
    var fullRows = checkForCompletedRows();
    // shiftBoard(fullRows);

    // add new piece
    this.addPiece();
  };

  exports.init = function init(boardSize) {
    exports.board = newBoard(boardSize);
  };

  return exports;
})();
