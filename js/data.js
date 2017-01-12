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
    o: new Shape([[0,0],[ 1, 0],[ 0,-1],[1,-1]], "yellow"),
    i: new Shape([[0,0],[ 0,-1],[ 0,-2],[0,-3]], "cyan"),
    s: new Shape([[0,0],[ 1, 0],[ 1,-1],[2,-1]], "red"),
    z: new Shape([[0,0],[ 1, 0],[-1,-1],[0,-1]], "green"),
    l: new Shape([[0,0],[ 1, 0],[ 0,-1],[0,-2]], "orange"),
    j: new Shape([[0,0],[ 1, 0],[ 1,-1],[1,-2]], "pink"),
    t: new Shape([[0,0],[-1,-1],[ 0,-1],[1,-1]], "purple")
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

  exports.handlers = {
    left: function movePieceLeft() {
      if (exports.piece.coreCoord.x > exports.boardEdges.left) {
        exports.piece.coreCoord.x -= 1;
        exports.piece.updateCells();
        if (collision(exports.piece.cells)) {
          exports.piece.coreCoord.x += 1;
          exports.piece.updateCells();
          return false;
        } else { return true; }
      } else { return false; }
    },
    right: function movePieceRight() {
      if (exports.piece.coreCoord.x < exports.boardEdges.right) {
        exports.piece.coreCoord.x += 1;
        exports.piece.updateCells();
        if (collision(exports.piece.cells)) {
          exports.piece.coreCoord.x -= 1;
          exports.piece.updateCells();
          return false;
        } else { return true; }
      } else { return false; }
    },
    down: function movePieceDown() {
      if (exports.piece.coreCoord.y < exports.boardEdges.bottom) {
        exports.piece.coreCoord.y += 1;
        exports.piece.updateCells();
        if (collision(exports.piece.cells)) {
          exports.piece.coreCoord.y -= 1;
          exports.piece.updateCells();
          return false;
        } else { return true; }
      } else { return false; }
    },
  };

  var collision = function collision(cells) {
    var collide = false;
    for (var i = 0; i < cells.length; i++) {
      var cellKey = cells[i].x + "_" + cells[i].y;
      if (exports.board[cellKey]) {
        if (exports.board[cellKey].value) collide = true;
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
    exports.boardEdges = { left: 0, right: size - 1, top: 0, bottom: size - 1 };
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
