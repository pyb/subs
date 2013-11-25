var TILESIZE = 40,
    PRESSED_KEYS = [],
    lastFrameTime = 0,
    playersCollection = new PlayersCollection(),
    minesCollection = new MinesCollection(),
    camera = new Camera(),
    currentPlayer,
    otherPlayer,    
    canvas,
    context,
    delta, // time difference between frames
    board,
    conn,
    width, height,
    pn = false,
    playerPos = new Vector(0,0), // fairly useless var (not updated !)
    serverPlayerPos = new Vector(0,0), // where the server says we are
    otherPos  = new Vector(0,0),
    ready = false;

function connected ()
{}

function disconnected ()
{}

function onerror (err, description)
{ throw err; }

function receive(e, flags) {
    if (e.data) {
//      var currentTime = new Date().getTime();
//      this.updateSpeed = currentTime - this.lastUpdate;
//      this.lastUpdate = currentTime;

	var message = JSON.parse(e.data);

	if (message.board)
	    {
		width  = message.board[0];
		height = message.board[1];
		board.tiles = message.board[2];
	    }
	if (message.player)
	    {
		if (!pn)
		{
		    pn = message.player[0];
		    playerPos = new Vector(message.player[1], message.player[2]);
		    serverPlayerPos = new Vector(message.player[1], message.player[2]);
		}
		if (pn == message.player[0])
		{
		    serverPlayerPos = new Vector(message.player[1], message.player[2]);
		}
		else
		{
		    otherPos  = new Vector(message.player[1], message.player[2]);
		}
		if (board.tiles)
		    ready = true;
	    }
    }
}



// main game loop
function main() {
  var currentTime = new Date().getTime();
  delta = (currentTime - lastFrameTime);
  lastFrameTime = currentTime;

  draw();
  update();
  window.requestAnimFrame(main);
}

function setup() {
  canvas.width = 800;
  canvas.height = 600;

  conn = new WebSocket("ws://"+window.location.hostname+":9000");
  if (conn) {
      conn.onopen = connected;
      conn.onclose = disconnected;
      conn.onerror = onerror;
      conn.onmessage = receive;
  } else {
      throw "No connection! :-(";
  }
  
  setup2();
}

function setup2() {
    if (! ready) 
    {
	setTimeout(setup2, 50);
    } 

    board = new Board(width, height);
    camera.setup();

    // Create a new Player
    // var playerPos = new Vector(board.w, board.h).mul(0.5);
    currentPlayer = playersCollection.newPlayer('pyb', playerPos);
    otherPlayer   = playersCollection.newPlayer('foe', otherPos);
}

// does the screen drawing
function draw() {
  Utils.clearCanvas();

  context.save();
  var player = currentPlayer;
  // find the pixel position of the current player
  var newX = player.position.x * TILESIZE - (canvas.width / 2);
  var newY = player.position.y * TILESIZE - (canvas.height / 2);
  // set origin in relation to current player position
  context.translate(-newX, -newY);

  // Queues up all the drawing functions from all the objects
  board.draw();
  playersCollection.draw();
  minesCollection.draw();

  // Camera.draw runs all the queued draw functions
  camera.draw();
  context.restore();
}

// updates the current objects
function update() {
  camera.update(currentPlayer.position);
  board.update();
  minesCollection.update();
  playersCollection.update({keys: PRESSED_KEYS,
			   otherPos: otherPos});
  PRESSED_KEYS = []; // clear all pressed keys for this frame
}

// set up the game and run it
window.onload = function herewego() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  setup();
  main();
};

window.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37: PRESSED_KEYS.push('left'); break;
    case 38: PRESSED_KEYS.push('up'); break;
    case 39: PRESSED_KEYS.push('right'); break;
    case 40: PRESSED_KEYS.push('down'); break;
    case 65: PRESSED_KEYS.push('zoomin'); break; // a
    case 83: PRESSED_KEYS.push('zoomout'); break; // s
    case 32: PRESSED_KEYS.push('leavemine'); break; // space
    case 68: debugger; break;
  }
  // event.preventDefault();
});

