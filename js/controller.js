var TETRIS = TETRIS || {};
TETRIS.controller = (function(data,view) {
  'use strict';

  // Run Initialization
  data.init(20);
  view.init(data.handlers);

  data.addPiece();

  var gameLoop = function() {
    if (!data.handlers.down()) {
      var newPiece = data.hitBottom();
      view.addPiece(data.piece);
    }
    view.renderBoard(data.board, data.piece);
  };

  setInterval( gameLoop, 250);

})(TETRIS.data, TETRIS.view);
