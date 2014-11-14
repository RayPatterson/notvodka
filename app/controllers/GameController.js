_ = require('lodash');

var MoveController = require('./MoveController');
var DataController = require('./DataController');

var MOVE_LIMIT = 3;

var _getGame = function() {

  var game = {
    _id: Date.now(),
    answer: {
      _id: MoveController.getRandomMove()._id
    },
    players: []
  };

  return game;
};

var GameController = {

  getGames: function(players) {

    var games = [];
    var playerDTO;

    // Fill in with dummy players
    while ((players.length % MOVE_LIMIT) !== 0) {
      players.push(DataController.getPlayerDTO(DataController.getMoveDTO(MoveController.getRandomMove()._id)));
    };

    // Why not?
    players = _.shuffle(players);

    while (players.length > 0) {

      game = _getGame();

      while (game.players.length < MOVE_LIMIT) {

        playerDTO = players.pop();

        playerDTO.moveDTO.game = {
          _id: game._id
        };

        playerDTO.moveDTO.answer = {
          _id: game.answer._id
        };

        game.players.push(playerDTO);
      }

      games.push(game);
    }

    return games;
  }
};

module.exports = GameController;