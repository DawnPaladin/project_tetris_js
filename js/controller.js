var TETRIS = TETRIS || {};
TETRIS.controller = (function(data,view) {
  'use strict';

  // Run Initialization
  data.init(20);
  view.init(data.handlers);

  data.addPiece();

  var gameLoop = function() {
    if (!data.handlers.down()) {
      data.hitBottom();
    }
    view.renderBoard(data.board, data.piece);
    view.updateScore(data.score);
  };

  setInterval( gameLoop, 400);

})(TETRIS.data, TETRIS.view);
