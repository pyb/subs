Item.prototype.draw = function() {
  return this.sprite.draw();
};

Item.prototype.update = function() {
  this.sprite.update();
};

Item.prototype.makeSprites = function() {
  this.sprite = new Sprite(5, this.position, 100);
  var frames = [];

  if(this.type === 'fire'){
    var c1 = Color.CLEAR();
    var c2 = Color.BLUE();
    var c3 = Color.YELLOW('rand');
    var c4 = Color.BLACK('rand');

    var f1 = [[c2, c2, c2, c2, c2],
              [c2, c3, c4, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f2 = [[c2, c2, c2, c2, c2],
              [c2, c4, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f3 = [[c2, c2, c2, c2, c2],
              [c2, c3, c3, c4, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];

    frames = [f1,f2,f3];
  }

  if(this.type === 'mine'){
    var c1 = Color.CLEAR();
    var c2 = Color.BLUE();
    var c3 = Color.DPURPLE('rand');
    var c4 = Color.BLACK('rand');

    var f1 = [[c2, c2, c2, c2, c2],
              [c2, c3, c4, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f2 = [[c2, c2, c2, c2, c2],
              [c2, c4, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f3 = [[c2, c2, c2, c2, c2],
              [c2, c3, c3, c4, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];

    frames = [f1,f2,f3];
  }

  this.sprite.frames = frames;
  return this.sprite;
};