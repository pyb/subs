function HUD() {
  this.canvas = document.getElementById('hud');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = document.documentElement.clientWidth;
  this.canvas.height = 100;

  this.life = 0;
  this.mines = 0;
  this.power = 0;
  this.points = 0;
  this.time = 0;
  this.players = [];
}

HUD.prototype.update = function(settings, delta) {
  this.life = settings.life;
  this.mines = settings.mines;
  this.power = settings.power;
  this.players = settings.players;
};

HUD.prototype.draw = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.drawTitle();
  this.drawLife();
  this.drawMines();
  this.drawPower();
  this.drawPlayers();
};

HUD.prototype.drawText = function(text, xpos, ypos) {
  var ypos = ypos || 35;
  this.context.fillStyle = '#fff';
  this.context.font = "bold 20px 'VT323'";
  this.context.fillText(text, xpos, ypos);
};

HUD.prototype.drawTitle = function() {
  this.drawText("bit bomber", 40);
};

HUD.prototype.drawLife = function() {
  this.drawText("Life x" + Math.round(this.life), 400);
};

HUD.prototype.drawMines = function() {
  this.drawText("Mine x" + this.mines, 650);
};

HUD.prototype.drawPower = function() {
  this.drawText("Fire x" + this.power, 900);
};

HUD.prototype.drawPlayers = function() {
  this.drawText("Players Connected:", 40, 70);

  for (var i = 1; i < this.players.length; i++) {
    this.drawText(this.players[i].name, 140 + i * 100, 70);
  }
};

