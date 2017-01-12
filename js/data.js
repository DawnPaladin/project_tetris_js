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
      exports.piece.coreCoord.x -= 1;
      exports.piece.updateCells();
      if (collision(exports.piece.cells)) {
        exports.piece.coreCoord.x += 1;
        exports.piece.updateCells();
        return false;
      } else { return true; }
    },
    right: function movePieceRight() {
      exports.piece.coreCoord.x += 1;
      exports.piece.updateCells();
      if (collision(exports.piece.cells)) {
        exports.piece.coreCoord.x -= 1;
        exports.piece.updateCells();
        return false;
      } else { return true; }
    },
    down: function movePieceDown() {
      exports.piece.coreCoord.y += 1;
      exports.piece.updateCells();
      if (collision(exports.piece.cells)) {
        exports.piece.coreCoord.y -= 1;
        exports.piece.updateCells();
        return false;
      } else { return true; }
    },
  };

  var collision = function collision(cells) {
    var collide = false;
    for (var i = 0; i < cells.length; i++) {
      var cellKey = cells[i].x + "_" + cells[i].y;
      if (exports.board[cellKey]) {
        if (exports.board[cellKey].value) collide = true; // cell already occupied
      } else { collide = true; } // not a valid board space
    }
    return collide;
  };

  var newBoard = function newBoard(size) {
    var grid = {};
    for(var r = 0; r < size; r++) {
      for(var c = -5; c < size; c++) {  // create rows off the top of the screen
        grid[r + "_" + c] = new Coord(r,c);
      }
    }
    exports.boardEdges = { left: 0, right: size - 1, top: 0, bottom: size - 1 };
    return grid;
  };

  var attachPieceToBoard = function attachPieceToBoard() {
    for (var i = 0; i < exports.piece.cells.length; i++) {
      setBoardCell(exports.piece.cells[i]);
    }
  };

  var setBoardCell = function setBoardCell(coord) {
    var cellKey = coord.x + "_" + coord.y;
    if (exports.board[cellKey], coord.value) {
      exports.board[cellKey] = coord;
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

  exports.addPiece = function addPiece() {
    var keys = Object.keys(SHAPES);
    var key = keys[Math.floor(Math.random() * keys.length)];

    exports.piece = new Piece((new Coord(9,0)), SHAPES[key], SHAPES[key].color);

    return exports.piece;
  };

  exports.hitBottom = function hitBottom() {
    // move current into board
    attachPieceToBoard();

    // TODO: check for row complete
    // var fullRows = checkForCompletedRows();
    // shiftBoard(fullRows);

    // add new piece
    return exports.addPiece();
  };

  exports.init = function init(boardSize) {
    exports.board = newBoard(boardSize);
  };

  return exports;
})();
