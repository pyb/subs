var Player = require('../shared/Player');

Player.prototype.message = function(message, playerId, board) {
  message = message.trim().toLowerCase();
  if(! message) return;

  if (message == 'mine') {
    if(this.availableMines > 0){
      var mineId = global.entities.create('Mine', {
        position: {x: this.position.x, y: this.position.y},
        countdown: 3000,
        power: this.power,
        explodingTime: 1000,
        owner: playerId
      });
      if (mineId) {
        this.availableMines--;
        var tileId = board.tile({x: this.position.x, y: this.position.y});
        var tile = entities.find(tileId);
        if (tile) {
          tile.mine = mineId;
        }
      }
    }
  } else if (message == 'left') {
    this.move({x: this.position.x - 1, y: this.position.y}, board);
  } else if (message == 'right') {
    this.move({x: this.position.x + 1, y: this.position.y}, board);
  } else if (message == 'up') {
    this.move({x: this.position.x, y: this.position.y - 1}, board);
  } else if (message == 'down') {
    this.move({x: this.position.x, y: this.position.y + 1}, board);
  }
};

Player.prototype.update = function(now, delta, board) {
  var tileId = board.tile(this.position);
  if (tileId) {
    var tile = entities.find(tileId);
    if (tile) {
      if (tile.isExploding) this.isAlive = false;
    }
  }
};

Player.prototype.canMoveTo = function(position, board) {
  var tileId = board.tile(position);
  if (! tileId) return false;

  var tile = entities.find(tileId);
  if (! tile) return false;

  if (tile.type == 'wall' || tile.type == 'hardwall' || tile.hasMine) {
    return false;
  }
  return true;
};

Player.prototype.move = function(position, board){
  if (this.canMoveTo(position, board)) {
    // move to new position
    this.position = position;
    // collect items at tile location
    // var items = board.tile(this.position).items;
    // while (items) {
    //   this.addItem(items.shift());
    // }
    return true;
  }
  return false;
};

Player.prototype.addItem = function(item) {
  if(item.type == 'fire') this.power++;
  if(item.type == 'mine') this.availableMines++;
};

module.exports = Player;
