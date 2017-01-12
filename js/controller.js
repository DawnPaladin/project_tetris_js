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
    if (data.handlers.down()) {
      view.movePieceDown();
    } else {
      var newPiece = data.hitBottom();
      view.addPiece(data.piece);
    }
  };

  setInterval( gameLoop, 250);

})(TETRIS.data, TETRIS.view);
