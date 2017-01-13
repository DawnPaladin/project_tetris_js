/* global Two */

var TETRIS = TETRIS || {};
TETRIS.view = (function() {
  "use strict";
  var exports = {};
  var CELL_SIDE = 30;

  var two = new Two({ width: 600, height: 600, /*type: Two.Types.canvas*/ });
  var canvas = document.getElementById('canvas');
  two.appendTo(canvas);
  var group;

  exports.init = function init(handlers) {
    this.addListeners(handlers);
  };

  exports.addListeners = function(handlers) {
    document.body.addEventListener('keydown', function(e) {
      if (e.key === "ArrowLeft") { handlers.left(); }
      if (e.key === "ArrowRight" ) { handlers.right(); }
      if (e.key === "ArrowDown" ) { handlers.down(); }
      if (e.key === "ArrowUp") { handlers.up(); }
      two.update();
    });
  };

  exports.renderBoard = function renderBoard(board, piece) {
    two.clear();
    for (var coord in board) {
      drawSquare(board[coord]);
    }
    for (var i = 0; i < piece.cells.length; i++) {
      drawSquare(piece.cells[i]);
    }
    two.update();
  };

  exports.updateScore = function(score) {
    document.getElementById('score').innerHTML = score;
  };

  var drawSquare = function(coord) {
    var center = getCenter(coord);
    if (coord.y >= 0) {
      var rect = two.makeRectangle(center[0], center[1], CELL_SIDE, CELL_SIDE); // center x, center y, width, height
      rect.fill = coord.value;
      rect.stroke = "silver";
      return rect;
    }
  };

  var getCenter = function(coord) {
    var x = (coord.x * CELL_SIDE) + CELL_SIDE/2;
    var y = (coord.y * CELL_SIDE) + CELL_SIDE/2;
    return [x,y];
  };

  return exports;
})();
