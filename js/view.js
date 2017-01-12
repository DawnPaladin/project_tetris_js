/* global Two */

var TETRIS = TETRIS || {};
TETRIS.view = (function() {
  "use strict";
  var exports = {};
  var CELL_SIDE = 30;

  var two = new Two({ fullscreen: true });
  var canvas = document.getElementById('canvas');
  two.appendTo(canvas);
  var group;

  exports.init = function init(handlers) {
    this.addListeners(handlers);
  };

  exports.addListeners = function(handlers) {
    document.body.addEventListener('keydown', function(e) {
      if (e.key === "ArrowLeft" && handlers.left() ) group.translation.x -= CELL_SIDE;
      if (e.key === "ArrowRight" && handlers.right() ) group.translation.x += CELL_SIDE;
      if (e.key === "ArrowDown" && handlers.down() ) group.translation.y += CELL_SIDE;
      two.update();
    });
  };

  exports.renderBoard = function renderBoard(board) {
    for (var coord in board) {
      drawSquare(board[coord]);
    }
    two.update();
  };

  exports.addPiece = function addPiece(piece) {
    group = two.makeGroup();
    for(var i = 0; i < piece.cells.length; i++) {
      group.add(drawSquare(piece.cells[i]));
    }
    two.update();
  };

  exports.movePieceDown = function() {
    group.translation.y += CELL_SIDE;
    two.update();
  };
  // exports.movePieceLeft = ;
  exports.movePieceRight = function() {
    group.translation.x += CELL_SIDE;
    two.update();
  };

  var drawSquare = function(coord) {
    var center = getCenter(coord);
    var rect = two.makeRectangle(center[0], center[1], CELL_SIDE, CELL_SIDE); // center x, center y, width, height
    rect.fill = coord.value;
    rect.stroke = "silver";
    return rect;
  };

  var getCenter = function(coord) {
    var x = (coord.x * CELL_SIDE) + CELL_SIDE/2;
    var y = (coord.y * CELL_SIDE) + CELL_SIDE/2;
    return [x,y];
  };

  return exports;
})();
