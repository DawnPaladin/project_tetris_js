var TETRIS = TETRIS || {};
TETRIS.controller = (function(data,view) {
  'use strict';

  // Run Initialization
  data.init(20);
  view.init(data.handlers);
  view.renderBoard(data.board);

  data.addPiece();
  view.addPiece(data.piece);

  var gameLoop = function() {
    var direction = data.movePiece();
    if (direction === "right")
      view.movePieceRight();
    if (direction === "left")
      view.movePieceLeft();
    if (data.movePieceDown()) {
      console.log("moving down");
      view.movePieceDown();
    } else {
      console.log("hit Bottom!");
      var newPiece = data.hitBottom();
      view.addPiece(data.piece);
    }
  };

  setInterval( gameLoop, 250);

})(TETRIS.data, TETRIS.view);
