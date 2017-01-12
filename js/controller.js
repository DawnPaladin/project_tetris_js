var TETRIS = TETRIS || {};
TETRIS.controller = (function(data,view) {
  'use strict';

  // Run Initialization
  data.init(20);
  view.init({
    keydown: TETRIS.data.startkey,
    keyup: TETRIS.data.stopkey,
  });
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

  setInterval( gameLoop, 150);

})(TETRIS.data, TETRIS.view);
